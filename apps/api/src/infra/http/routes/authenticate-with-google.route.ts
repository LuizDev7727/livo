import { env } from '@livo/env';
import { eq } from 'drizzle-orm';
import type { FastifyPluginCallbackZod } from 'fastify-type-provider-zod';
import { z } from 'zod/v4';
import { db } from '../../database/client.ts';
import { schema } from '../../database/schema/index.ts';

export const authenticateWithGoogle: FastifyPluginCallbackZod = (app) => {
  app.post(
    '/api/auth/google',
    {
      schema: {
        body: z.object({
          code: z.string(),
        }),
      },
    },
    async (request, reply) => {
      const { code } = request.body;

      const googleOauthUrl = new URL('https://oauth2.googleapis.com/token');

      googleOauthUrl.searchParams.set('client_id', env.GOOGLE_CLIENT_ID);
      googleOauthUrl.searchParams.set(
        'client_secret',
        env.GOOGLE_CLIENT_SECRET
      );
      googleOauthUrl.searchParams.set('redirect_uri', env.GOOGLE_REDIRECT_URI);
      googleOauthUrl.searchParams.set('grant_type', 'authorization_code');
      googleOauthUrl.searchParams.set('code', code);

      const googleAccessTokenRequest = await fetch(googleOauthUrl, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
        },
      });

      const googleAccessTokenResponse = await googleAccessTokenRequest.json();

      const { access_token: googleAccessToken } = z
        .object({
          access_token: z.string(),
          token_type: z.literal('Bearer'),
          scope: z.string(),
        })
        .parse(googleAccessTokenResponse);

      //use googleAccessToken to get channel informations like, name, email and etc.
      const googleYoutubeAccountDataRequest = await fetch(
        'https://www.googleapis.com/oauth2/v3/userinfo',
        {
          headers: {
            Authorization: `Bearer ${googleAccessToken}`,
          },
        }
      );

      const googleYoutubeAccountBody =
        await googleYoutubeAccountDataRequest.json();

      const { name, picture, email } = z
        .object({
          email: z.string(),
          name: z.string(),
          picture: z.string(),
        })
        .parse(googleYoutubeAccountBody);

      const [userSaved] = await db
        .select({
          id: schema.users.id,
        })
        .from(schema.users)
        .where(eq(schema.users.email, email));

      let userId: string;

      if (userSaved?.id) {
        userId = userSaved.id;
      } else {
        const [newUser] = await db
          .insert(schema.users)
          .values({
            name,
            email,
            avatarUrl: picture,
          })
          .returning({
            id: schema.users.id,
          });
        userId = newUser.id;
      }

      const token = await reply.jwtSign(
        {
          sub: userId,
        },
        {
          sign: {
            expiresIn: '1h',
          },
        }
      );

      return reply.status(201).send({ token });
    }
  );
};
