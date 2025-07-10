import { useMutation } from '@tanstack/react-query';
import createQuestionHttp from '@/http/create-question.http';
import { queryClient } from '@/lib/react-query';
import type { Question } from '@/types/question';

export default function useCreateQuestion(roomId: string) {
  return useMutation({
    mutationFn: createQuestionHttp,
    onMutate({ question }) {
      const questions = queryClient.getQueryData<Question[]>([
        'get-questions',
        roomId,
      ]);

      const questionsArray = questions ?? [];

      const newQuestion = {
        id: crypto.randomUUID(),
        question,
        answer: null,
        createdAt: new Date(),
        isGeneratingAnswer: true,
      };

      queryClient.setQueryData<Question[]>(
        ['get-questions', roomId],
        [newQuestion, ...questionsArray]
      );

      return { newQuestion, questions };
    },

    onSuccess(data, _variables, context) {
      queryClient.setQueryData<Question[]>(
        ['get-questions', roomId],
        (questions) => {
          if (!questions) {
            return questions;
          }

          if (!context.newQuestion) {
            return questions;
          }

          return questions.map((question) => {
            if (question.id === context.newQuestion.id) {
              return {
                ...context.newQuestion,
                id: data.questionId,
                answer: data.answer,
                isGeneratingAnswer: false,
              };
            }

            return question;
          });
        }
      );
    },

    onError(_error, _variables, context) {
      if (context?.questions) {
        queryClient.setQueryData<Question[]>(
          ['get-questions', roomId],
          context.questions
        );
      }
    },
  });
}
