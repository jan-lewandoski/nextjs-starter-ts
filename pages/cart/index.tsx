import useCart from '@hooks/cart/useCart'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

const CartPage = () => {
  const { cartItems, getCartSize } = useCart()

  return (
    <div className=" grid grid-cols-2 gap-4">
      <div className="grid gap-2">
        <div className="rounded p-4 grid gap-2">
          {cartItems.map((item) => {
            return (
              <div key={item.id} className="flex p-4 shadow-sm">
                <span className="flex-1">
                  {item.amount} x {item.title}
                </span>
                <div className="flex">
                  <span className="mr-2">${item.amount * item.price}</span>
                  <span>Usuń</span>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <div className="font-bold">W koszyku: {getCartSize()}</div>
    </div>
  )
}

export const getStaticProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common', 'navigation'])),
  },
})

export default CartPage
