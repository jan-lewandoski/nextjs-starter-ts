import { Button } from '@chakra-ui/react'
import { signIn, signOut, useSession } from 'next-auth/react'
import Cart from './Cart'

const Navbar = () => {
  const { data } = useSession()
  return (
    <nav className="p-4 h-16 align-middle w-full border-b-2 flex justify-end fixed z-50 top-0 left-0 bg-white">
      <ul className="w-100 flex justify-end align-middle self-center"></ul>
      {!data ? (
        <Button
          mr={4}
          size={'sm'}
          borderRadius={'full'}
          colorScheme={'blue'}
          variant={'outline'}
          onClick={() => signIn()}
        >
          Sign in
        </Button>
      ) : (
        <Button
          mr={4}
          size={'sm'}
          borderRadius={'full'}
          colorScheme={'blue'}
          variant={'outline'}
          onClick={() => signOut()}
        >
          Sign out
        </Button>
      )}
      <Cart />
    </nav>
  )
}
export default Navbar
