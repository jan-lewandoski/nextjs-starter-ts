import { authorizedApolloClient } from 'graphql/apolloClient'
import {
  GetAccountByEmailDocument,
  GetAccountByEmailQuery,
  GetAccountByEmailQueryVariables,
} from 'graphql/generated/graphql'
import NextAuth from 'next-auth/next'
import CredentialsProvider from 'next-auth/providers/credentials'

import * as bcrypt from 'bcrypt'

export default NextAuth({
  secret: process.env.NEXTAUTH_SECRET,

  // TODO Add Google and Facebook
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email', placeholder: 'user@example.com' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials) {
          return null
        }

        const { data } = await authorizedApolloClient.query<
          GetAccountByEmailQuery,
          GetAccountByEmailQueryVariables
        >({
          query: GetAccountByEmailDocument,
          variables: {
            email: credentials.email,
          },
        })

        if (!data.account?.password) {
          return null
        }

        const arePasswordsEqual = await bcrypt.compare(credentials.password, data.account.password)

        if (!arePasswordsEqual) {
          return null
        }

        return data.account
      },
    }),
  ],
})
