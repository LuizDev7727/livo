'use client';

import useRoomQuestions from '@/hooks/use-room-questions';
import { QuestionItem } from './question-item';

interface QuestionListProps {
  roomId: string;
}

export default function QuestionList(props: QuestionListProps) {
  const { data: questions = [] } = useRoomQuestions(props.roomId);

  const hasQuestions = questions.length > 0;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="font-semibold text-2xl text-foreground">
          Perguntas & Respostas
        </h2>
      </div>

      {hasQuestions ? (
        questions.map((question) => {
          return <QuestionItem key={question.id} question={question} />;
        })
      ) : (
        <p className="text-muted-foreground text-sm">
          The question list is currently empty
        </p>
      )}
    </div>
  );
}
