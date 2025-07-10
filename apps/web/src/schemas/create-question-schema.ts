import { z } from 'zod/v4';

export const createQuestionSchema = z.object({
  question: z
    .string()
    .min(1, 'question is required')
    .min(10, 'question must have at leat 10 caracters')
    .max(500, 'question must have until 500 caracters'),
});

export type CreateQuestionFormData = z.infer<typeof createQuestionSchema>;
