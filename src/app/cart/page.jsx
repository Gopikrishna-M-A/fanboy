import CartPage from "./_components/CartPage"
import { Suspense } from 'react'
export const generateMetadata = async () => {
  return {
    title: 'Cart | Fanboy Jerseys',
  }
}

const page = async () => {
  return (
    <div className="mt-14 mx-auto p-4 md:py-10 min-h-screen">
      {/* <Suspense fallback={<CartLoading />}> */}
      <CartPage />
      {/* </Suspense> */}
    </div>
  )
}

export default page
