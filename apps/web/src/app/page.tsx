import { ArrowRight, Brain, MessageSquare, Users, Zap } from 'lucide-react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <div className="h-screen w-full">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.03)_1px,transparent_1px)] bg-[size:50px_50px] dark:bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)]" />

      <header className="relative z-10 border border-b backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="flex size-8 items-center justify-center rounded-lg">
                <MessageSquare className="size-5" />
              </div>
              <span className="font-bold text-xl">Livo</span>
            </div>

            <div className="flex items-center space-x-4">
              <Button asChild>
                <Link href={'/auth'}>
                  Get Started
                  <ArrowRight className="ml-2 size-4" />
                </Link>
              </Button>
            </div>
          </nav>
        </div>
      </header>

      <section className="container mx-auto px-4 py-20 text-center">
        <div className="mx-auto max-w-4xl">
          <Badge variant="secondary">
            <Zap className="mr-2 size-4" />
            Interação inteligente ao vivo
            <ArrowRight className="ml-2 size-4" />
          </Badge>

          <h1 className="mb-6 font-bold text-5xl leading-tight md:text-7xl">
            Salas Inteligentes
            <br />
            com <span>IA Avançada</span>
          </h1>

          <p className="mx-auto mb-8 max-w-2xl text-xl leading-relaxed">
            Crie salas interativas, faça perguntas em tempo real e receba
            respostas inteligentes da IA baseadas no conteúdo ao vivo.
            Transforme suas apresentações em experiências envolventes.
          </p>

          <div className="flex flex-col items-center justify-center">
            <Button asChild size="lg">
              <Link href={'/auth'}>
                Criar sala gratuita
                <ArrowRight className="size-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-20">
        <div className="mb-16 text-center">
          <h2 className="mb-4 font-bold text-4xl">Recursos Principais</h2>
          <p className="mx-auto max-w-2xl text-muted-foreground text-xl">
            Descubra como o Livo revoluciona a interação em tempo real com IA
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          <div className="rounded-xl border p-8 transition-colors">
            <div className="mb-6 flex size-12 items-center justify-center rounded-lg">
              <Users className="size-6" />
            </div>
            <h3 className="mb-4 font-semibold text-2xl">Salas Colaborativas</h3>
            <p className="text-muted-foreground leading-relaxed">
              Crie salas personalizadas para suas apresentações, aulas ou
              reuniões. Convide participantes e gerencie interações em tempo
              real.
            </p>
          </div>

          <div className="rounded-xl border p-8 transition-colors">
            <div className="mb-6 flex size-12 items-center justify-center rounded-lg">
              <MessageSquare className="size-6" />
            </div>
            <h3 className="mb-4 font-semibold text-2xl">
              Perguntas Inteligentes
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              Permita que os participantes façam perguntas durante
              apresentações. Sistema inteligente de moderação e priorização de
              questões.
            </p>
          </div>

          <div className="rounded-xl border p-8 transition-colors">
            <div className="mb-6 flex size-12 items-center justify-center rounded-lg">
              <Brain className="size-6" />
            </div>
            <h3 className="mb-4 font-semibold text-2xl">IA Contextual</h3>
            <p className="text-muted-foreground leading-relaxed">
              Nossa IA analisa o conteúdo ao vivo e fornece respostas precisas
              baseadas no contexto da apresentação ou discussão em andamento.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
