// app/layout.jsx
import { UserProvider } from '@auth0/nextjs-auth0/client';

export default function DecorationLayout({ children }: {
  children: React.ReactNode
}) {
  return (
    <UserProvider>
      {children}
    </UserProvider>
  );
}