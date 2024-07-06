import ProductDetails from "../_commponents/ProductDetails"
import { getJerseyById } from "@/services/jerseyService"

const page = async ({ params }) => {
  const jersey = await getJerseyById(params.id)
  return (
    <div className='mt-14'>
      <ProductDetails jersey={jersey} />
    </div>
  )
}

export default page
