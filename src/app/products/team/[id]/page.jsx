import { getJerseysByTeam } from "@/services/jerseyService"
import ProductsDisplay from "../../_commponents/ProductDisplay"
import { getTeamById } from "@/services/teamService"

export const generateMetadata = async ({ params }) => {
  const team = await getTeamById(params.id)
  return {
    title: `${team.name} | Fanboy Jerseys`,
  }
}


const page = async ({ params }) => {
  const jerseys = await getJerseysByTeam(params.id)
  return (
    <div className='mt-14'>
      <ProductsDisplay jerseys={jerseys} />
    </div>
  )
}

export default page
