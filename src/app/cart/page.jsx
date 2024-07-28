import CartPage from "./_components/CartPage"

export const generateMetadata = async () => {
  return {
    title: 'Cart | Fanboy Jerseys',
  }
}

const page = async () => {
  return (
    <div className="mt-14 mx-auto p-4 md:py-10 bg-gray-100 min-h-screen">
      <CartPage />
    </div>
  )
}

export default page
