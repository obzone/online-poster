// app/layout.jsx
import { UserProvider } from '@auth0/nextjs-auth0/client';
import { getSession } from '@auth0/nextjs-auth0';

export default async function DecorationLayout({ children }: {
  children: React.ReactNode
}) {
  const { user } = await getSession() as any
  // fetch user from budibase usertable
  // check whether current user in budibase user table
  // if not display error page

  return (
    <UserProvider>
      {children}
    </UserProvider>
  );
}