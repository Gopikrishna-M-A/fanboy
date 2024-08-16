import Landing from "./_components/Landing"
import { getAllTeams } from "@/services/teamService"
import { getJerseys } from "@/services/jerseyService"

const page = async () => {
  const teams = await getAllTeams()
  const jerseys = await getJerseys()
  return (
    <div className='mt-14'>
      <Landing teams={teams} jerseys={jerseys}/>
    </div>
  )
}

export default page
