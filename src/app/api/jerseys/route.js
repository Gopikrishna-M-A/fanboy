import { getServerSession } from "next-auth"
import { NextResponse } from "next/server"
import {
  getJerseys,
  getJerseyById,
  getJerseysByTeam,
  getJerseysByCategory,
} from "@/services/jerseyService" // Importing jersey functions
import { authOptions } from "../auth/[...nextauth]/options"

export async function GET(request) {
  const session = await getServerSession(authOptions)
  const limit = 10
  const page = 1


  const { searchParams } = new URL(request.url)
  const id = searchParams.get("id")
  const category = searchParams.get('category');
  const teamId = searchParams.get('teamId');

  // If an ID is provided, fetch a single jersey
  if (id) {
    try {
      const jersey = await getJerseyById(id)
      if (!jersey) {
        return NextResponse.json({ error: "Jersey not found" }, { status: 404 })
      }
      return NextResponse.json(jersey)
    } catch (error) {
      console.error("Failed to fetch jersey:", error)
      return NextResponse.json(
        { error: "Failed to fetch jersey" },
        { status: 500 }
      )
    }
  }

    if (category) {
      const jerseys = await getJerseysByCategory(category);
      return NextResponse.json(jerseys);
    }

    if (teamId){
      const jerseys = await getJerseysByTeam(teamId);
      return NextResponse.json(jerseys);
    }
 


  try {
    const jerseys = await getJerseys(limit, page)
    return NextResponse.json( jerseys )
  } catch (error) {
    console.error("Failed to fetch jerseys:", error)
    return NextResponse.json(
      { error: "Failed to fetch jerseys" },
      { status: 500 }
    )
  }
}
