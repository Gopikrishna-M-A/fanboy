// JERSEYS

import axios from "axios";

export async function fetchJerseys() {
try {
  const response = await axios.get("/api/jerseys")
  if (!response.ok) throw new Error("Failed to fetch jerseys")
    console.log("jerseys###",response);
  return response.json()
} catch (error) {
  console.log("ererrrrr$$###",error);
}
}

export async function fetchJersey(id) {
  const response = await fetch(`/api/jerseys?id=${id}`)
  if (!response.ok) throw new Error("Failed to fetch jersey")
  return response.json()
}

export async function fetchJerseysByCategory(category) {
  const response = await fetch(`/api/jerseys?category=${category}`)
  if (!response.ok) throw new Error(`Failed to fetch ${category} jerseys`)
  return response.json()
}

export async function fetchJerseysByTeam(teamId) {
  const response = await fetch(`/api/jerseys?teamId=${teamId}`)
  if (!response.ok) throw new Error(`Failed to fetch team jerseys`)
  return response.json()
}


// TEAMS

export async function fetchTeams() {
  const response = await fetch("/api/teams")
  if (!response.ok) throw new Error("Failed to fetch teams")
  return response.json()
}


// ORDERS

export async function fetchOrders() {
  const response = await fetch("/api/orders")
  if (!response.ok) throw new Error("Failed to fetch orders")
  return response.json()
}

