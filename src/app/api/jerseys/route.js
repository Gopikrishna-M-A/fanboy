import { NextResponse } from "next/server"
import {
  getJerseys,
  getJerseyById,
  getJerseysByTeam,
  getJerseysByCategory,
} from "@/services/jerseyService" // Importing jersey functions

export async function GET(request) {

  const { searchParams } = new URL(request.url)
  const id = searchParams.get("id")
  const category = searchParams.get('category');
  const teamId = searchParams.get('teamId');
  const limit = parseInt(searchParams.get('limit') || '10', 10)
  const page = parseInt(searchParams.get('page') || '1', 10)

  try {
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
