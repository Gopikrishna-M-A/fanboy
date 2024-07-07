import { getJerseysByCategory } from "@/services/jerseyService"
import ProductsDisplay from "../../_commponents/ProductDisplay"

const page = async ({ params }) => {
  const jerseys = await getJerseysByCategory(params.slug)
  return (
    <div className='mt-14'>
      <ProductsDisplay jerseys={jerseys} />
    </div>
  )
}

export default page
