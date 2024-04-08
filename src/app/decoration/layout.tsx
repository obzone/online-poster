// app/layout.jsx
import { UserProvider } from '@auth0/nextjs-auth0/client';
import { getSession } from '@auth0/nextjs-auth0';
import { getAllAdministrators } from '../actions/user';
import styles from './page.module.scss'

export default async function DecorationLayout({ children }: {
  children: React.ReactNode
}) {
  const { user } = await getSession() as any || {}
  // fetch user from budibase usertable
  // check whether current user in budibase user table
  // if not display error page

  const admistrators = await getAllAdministrators()
  const currentUserWithAuth = admistrators?.find(({email}: {email: string}) => {
    return email == user.email
  })

  if (!currentUserWithAuth) return (
    <div className={styles.withoutAccessContainer} >WITHOUT ACCESS PERMISSION</div>
  )

  return (
    <UserProvider>
      {children}
    </UserProvider>
  );
}