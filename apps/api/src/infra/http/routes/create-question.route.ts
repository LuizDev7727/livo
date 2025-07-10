import { and, eq, sql } from 'drizzle-orm';
import type { FastifyPluginCallbackZod } from 'fastify-type-provider-zod';
import { z } from 'zod/v4';
import generateAnswer from '../../../utils/generate-answer.ts';
import generateEmbeddings from '../../../utils/generate-embeddings.ts';
import { db } from '../../database/client.ts';
import { schema } from '../../database/schema/index.ts';

export const createQuestionRoute: FastifyPluginCallbackZod = (app) => {
  app.post(
    '/api/rooms/:roomId/questions',
    {
      schema: {
        body: z.object({
          question: z.string(),
        }),
        params: z.object({
          roomId: z.string(),
        }),
      },
    },
    async (request, reply) => {
      const { roomId } = request.params;

      const { question } = request.body;

      const embeddings = await generateEmbeddings(question);

      const embeddingsAsString = `[${embeddings.join(',')}]`;

      const chunks = await db
        .select({
          id: schema.audioChuncks.id,
          transcription: schema.audioChuncks.transcription,
          similarity: sql<
            number[]
          >`1- (${schema.audioChuncks.embeddings} <=> ${embeddingsAsString}::vector)`,
        })
        .from(schema.audioChuncks)
        .where(
          and(
            eq(schema.audioChuncks.roomId, roomId),
            sql`1 - (${schema.audioChuncks.embeddings} <=> ${embeddingsAsString}::vector)  >  0.7`
          )
        )
        .orderBy(
          sql`${schema.audioChuncks.embeddings} <=> ${embeddingsAsString}::vector`
        )
        .limit(3);

      let answer: string | null = null;

      if (chunks.length > 0) {
        const transcriptions = chunks.map((chunck) => chunck.transcription);

        answer = await generateAnswer(question, transcriptions);
      }

      const result = await db
        .insert(schema.questions)
        .values({
          question,
          roomId,
          answer,
        })
        .returning();

      const insertedQuestion = result[0];

      if (!insertedQuestion) {
        throw new Error('Failed to create new question.');
      }

      return reply
        .status(201)
        .send({ questionId: insertedQuestion.id, answer });
    }
  );
};
