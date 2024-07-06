import Landing from "./_components/Landing"
import { getAllTeams } from "@/services/teamService"

const page = async () => {
  const teams = await getAllTeams()
  return (
    <div className='mt-14'>
      <Landing teams={teams} />
    </div>
  )
}

export default page
