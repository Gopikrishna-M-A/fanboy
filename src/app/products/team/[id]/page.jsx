import ProductsDisplay from "../../_commponents/ProductDisplay"
import { getTeamById } from "@/services/teamService"

export const generateMetadata = async ({ params }) => {
  const team = await getTeamById(params.id)
  return {
    title: `${team.name} | Fanboy Jerseys`,
  }
}

const page = async ({ params }) => {
  return (
    <div className='mt-14'>
      <ProductsDisplay queryKey="team" queryParam={params.id} />
    </div>
  )
}

export default page
