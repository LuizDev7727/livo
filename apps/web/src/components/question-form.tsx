'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import useCreateQuestion from '@/hooks/use-create-question';
import {
  type CreateQuestionFormData,
  createQuestionSchema,
} from '@/schemas/create-question-schema';
import { Label } from './ui/label';

interface QuestionFormProps {
  roomId: string;
}

export function QuestionForm({ roomId }: QuestionFormProps) {
  const { mutateAsync: createQuestion } = useCreateQuestion(roomId);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CreateQuestionFormData>({
    resolver: zodResolver(createQuestionSchema),
    defaultValues: {
      question: '',
    },
  });

  async function handleCreateQuestion({ question }: CreateQuestionFormData) {
    await createQuestion({
      roomId,
      question,
    });
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Fazer uma Pergunta</CardTitle>
        <CardDescription>
          Digite sua pergunta abaixo para receber uma resposta gerada por I.A.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          className="flex flex-col gap-4"
          onSubmit={handleSubmit(handleCreateQuestion)}
        >
          <Label>Sua Pergunta</Label>
          <Textarea
            {...register('question')}
            className="min-h-[100px]"
            disabled={isSubmitting}
            placeholder="O que você gostaria de saber?"
          />
          {errors.question && (
            <p className="text-red-600">{errors.question.message}</p>
          )}
          <Button disabled={isSubmitting} type="submit">
            {isSubmitting ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              'Create question'
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
