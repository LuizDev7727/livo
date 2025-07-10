'use client';

import { Radio } from 'lucide-react';
import { useRef, useState } from 'react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import uploadAudioHttp from '@/http/upload-audio.http';

const isRecordingSupported =
  !!navigator.mediaDevices &&
  typeof navigator.mediaDevices.getUserMedia === 'function' &&
  typeof window.MediaRecorder === 'function';

type RecordRoomAudioProps = {
  roomId: string;
};
export default function RecordRoomAudio({ roomId }: RecordRoomAudioProps) {
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const recorder = useRef<MediaRecorder | null>(null);
  const intervalRef = useRef<NodeJS.Timeout>(null);

  function stopRecording() {
    setIsRecording(false);
    if (recorder.current && recorder.current.state !== 'inactive') {
      recorder.current.stop();
    }

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  }

  async function uploadAudio(audio: Blob) {
    const formData = new FormData();
    formData.append('file', audio, 'audio.webm');
    await uploadAudioHttp({
      roomId,
      body: formData,
    });
  }

  function createRecorder(audio: MediaStream) {
    recorder.current = new MediaRecorder(audio, {
      mimeType: 'audio/webm',
      audioBitsPerSecond: 64_000,
    });

    recorder.current.onstart = () => {
      toast('Start recording.');
    };

    recorder.current.onstop = () => {
      toast('Stop recording.');
    };

    recorder.current.ondataavailable = (event) => {
      if (event.data.size > 0) {
        uploadAudio(event.data);
      }
    };

    recorder.current.start();
  }

  async function startRecordAudio() {
    if (!isRecordingSupported) {
      toast('The browser does not support recording audio.');
    }

    setIsRecording(true);

    const audio = await navigator.mediaDevices.getUserMedia({
      audio: {
        echoCancellation: true,
        noiseSuppression: true,
        sampleRate: 44_100,
      },
    });

    intervalRef.current = setInterval(() => {
      recorder.current?.stop();
      createRecorder(audio);
    }, 5000);
  }

  return (
    <div>
      {isRecording ? (
        <Button onClick={stopRecording}>
          <Radio className="size-4" />
          Stop Recording
        </Button>
      ) : (
        <Button onClick={startRecordAudio}>
          <Radio className="size-4" />
          Start Recording
        </Button>
      )}
    </div>
  );
}
