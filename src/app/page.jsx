import Landing from "./_components/Landing"
import { getAllTeams } from "@/services/teamService"
import { getJerseys, getJerseysByCategory } from "@/services/jerseyService"

const page = async () => {
  const teams = await getAllTeams()
  const jerseys = await getJerseys()
  const clubs = await getJerseysByCategory('club')
  const international = await getJerseysByCategory('international')
  return (
    <div className='mt-14'>
      <Landing teams={teams} jerseys={jerseys} clubs={clubs} international={international}/>
    </div>
  )
}

export default page
