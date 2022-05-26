import NextAuth from 'next-auth/next'
import CredentialsProvider from 'next-auth/providers/credentials'

export default NextAuth({
  // TODO Add Google and Facebook
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email', placeholder: 'user@example.com' },
        password: { label: 'Password', type: 'password' },
      },
      // eslint-disable-next-line
      async authorize(credentials, req) {
        // Zapytanie do GraphCMS
        console.log(credentials)
        const user = { id: 1, email: 'user@example.com' }

        if (user) {
          return user
        } else {
          return null
        }
      },
    }),
  ],
})
