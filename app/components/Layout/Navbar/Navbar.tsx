import Cart from './Cart'

const Navbar = () => {
  return (
    <nav className="p-4 h-16 align-middle w-full border-b-2 flex justify-between fixed z-50 top-0 left-0 bg-white">
      <ul className="w-100 flex justify-end align-middle self-center"></ul>
      <Cart />
    </nav>
  )
}
export default Navbar
