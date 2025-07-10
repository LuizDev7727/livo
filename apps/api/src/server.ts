import '@opentelemetry/auto-instrumentations-node/register';

import { fastifyCors } from '@fastify/cors';
import { fastifyJwt } from '@fastify/jwt';
import fastifyMultipart from '@fastify/multipart';
import { env } from '@livo/env';
import fastify from 'fastify';
import {
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from 'fastify-type-provider-zod';
import { authenticateWithGoogle } from './infra/http/routes/authenticate-with-google.route.ts';
import { createQuestionRoute } from './infra/http/routes/create-question.route.ts';
import { createRoomRoute } from './infra/http/routes/create-room.route.ts';
import { getRoomQuestions } from './infra/http/routes/get-room-questions.route.ts';
import { getRoomsRoute } from './infra/http/routes/get-rooms.route.ts';
import { uploadAudioRoute } from './infra/http/routes/upload-audio.route.ts';

const app = fastify().withTypeProvider<ZodTypeProvider>();

app.register(fastifyCors, {
  origin: 'http://localhost:3000',
});

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
});

app.register(fastifyMultipart);

app.setSerializerCompiler(serializerCompiler);
app.setValidatorCompiler(validatorCompiler);

app.register(getRoomsRoute);
app.register(createRoomRoute);
app.register(getRoomQuestions);
app.register(createQuestionRoute);
app.register(uploadAudioRoute);
app.register(authenticateWithGoogle);

app.listen({ port: env.PORT });
