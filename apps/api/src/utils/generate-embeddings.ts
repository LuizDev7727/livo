import { gemini } from '../infra/gemini/client.ts';

export default async function generateEmbeddings(text: string) {
  const response = await gemini.models.embedContent({
    model: 'text-embedding-004',
    contents: [{ text }],
    config: {
      // Para qual finalidade esse embedding vai ser usado
      taskType: 'RETRIEVAL_DOCUMENT', // Para fazer busca semantica e utilizar esse conteúdo em outros prompts
    },
  });

  if (!response.embeddings?.[0].values) {
    throw new Error('Cannot generate embeddings.');
  }

  return response.embeddings[0].values;
}
