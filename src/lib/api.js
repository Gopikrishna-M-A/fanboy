export async function fetchJerseys() {
  const response = await fetch("/api/jerseys")
  if (!response.ok) throw new Error("Failed to fetch jerseys")
  return response.json()
}

export async function fetchJerseysByCategory(category) {
  const response = await fetch(`/api/jerseys?category=${category}`)
  if (!response.ok) throw new Error(`Failed to fetch ${category} jerseys`)
  return response.json()
}

export async function fetchTeams() {
  const response = await fetch("/api/teams")
  if (!response.ok) throw new Error("Failed to fetch teams")
  return response.json()
}
