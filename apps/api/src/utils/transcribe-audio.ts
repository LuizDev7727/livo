import { gemini } from '../infra/gemini/client.ts';

export default async function transcribeAudio(
  audioAsBase64: string,
  mimeType: string
) {
  const response = await gemini.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: [
      {
        text: 'Transcreva o áudio para português do Brasil. Seja preciso e natural na transcrição. Mantenha a pontuação adequada e divida o texto em parágrafos quando for apropriado.',
      },
      {
        inlineData: {
          mimeType,
          data: audioAsBase64,
        },
      },
    ],
  });

  if (!response.text) {
    throw new Error('Cannot convert audio');
  }

  return response.text;
}
