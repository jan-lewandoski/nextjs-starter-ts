import { NextApiHandler } from 'next'
import { SignupFormSchema } from '../signup'

import * as bcrypt from 'bcrypt'
import { apolloClient } from 'graphql/apolloClient'
import {
  CreateAccountDocument,
  CreateAccountMutation,
  CreateAccountMutationVariables,
} from 'graphql/generated/graphql'

const SignupHandler: NextApiHandler = async (req, res) => {
  try {
    const { email, password } = await SignupFormSchema.validate(req.body)

    const passwordHash = await bcrypt.hash(password, 12)

    const user = await apolloClient.mutate<CreateAccountMutation, CreateAccountMutationVariables>({
      mutation: CreateAccountDocument,
      variables: {
        email: email,
        password: passwordHash,
      },
    })

    res.json({ id: user.data?.createAccount?.id, email: user.data?.createAccount?.email })
  } catch (error) {
    res.status(400).json(error)
  }
}

export default SignupHandler
