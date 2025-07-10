import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { QuestionForm } from '@/components/question-form';
import QuestionList from '@/components/question-list';
import { Button } from '@/components/ui/button';
import RecordRoomAudio from './record-audio';

type RoomPageParams = {
  params: Promise<{ id: string }>;
};

export default async function Room({ params }: RoomPageParams) {
  const { id } = await params;
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <Link href={'/dashboard/rooms'}>
          <Button variant={'outline'}>
            <ArrowLeft className="mr-2 size-4" />
            Voltar ao Início
          </Button>
        </Link>
        <RecordRoomAudio roomId={id} />
      </div>

      <div>
        <h1 className="mb-2 font-bold text-3xl text-foreground">
          Sala de Perguntas
        </h1>

        <p>Faça perguntas e receba respostas com IA</p>
      </div>

      <div className="mb-8">
        <QuestionForm roomId={id} />
      </div>

      <QuestionList roomId={id} />
    </div>
  );
}
