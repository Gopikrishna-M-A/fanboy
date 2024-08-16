import ProductDetails from "../_commponents/ProductDetails"

const page = async ({ params }) => {
  return (
    <div className='mt-14'>
      <ProductDetails id={params.id} />
    </div>
  )
}

export default page
