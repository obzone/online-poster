// app/api/auth/[auth0]/route.js
import { handleAuth, handleLogin } from '@auth0/nextjs-auth0';
import { env } from 'process';

export const GET = handleAuth({
  login: handleLogin({
    returnTo: env.AUTH0_SUCCESS_CALLBACK_URL
  })
});