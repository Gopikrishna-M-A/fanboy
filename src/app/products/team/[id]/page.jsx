import { getJerseysByTeam } from "@/services/jerseyService"
import ProductsDisplay from "../../_commponents/ProductDisplay"

const page = async ({ params }) => {
  const jerseys = await getJerseysByTeam(params.id)
  return (
    <div className='mt-14'>
      <ProductsDisplay jerseys={jerseys} />
    </div>
  )
}

export default page
