import dbConnect from "./db"
import Jersey from "./models/Jersey"
import Team from "./models/Team"

export async function getJerseys(limit = 10, page = 1) {
  await dbConnect()

  // const jerseys = await Jersey.find({})
  //   .lean();

  const allJerseys = await Jersey.find().sort({ name: 1 }).populate({
    path: "team",
    model: Team,
  })

  // // Create a Map to store unique jerseys
  const uniqueJerseys = new Map()

  // Iterate through all jerseys and keep only the first occurrence of each name
  allJerseys.forEach((jersey) => {
    if (!uniqueJerseys.has(jersey.name)) {
      uniqueJerseys.set(jersey.name, jersey)
    }
  })

  // Convert the Map values back to an array
  const distinctJerseys = Array.from(allJerseys)

  return JSON.parse(JSON.stringify(distinctJerseys))
}

export async function getJerseyById(id) {
  await dbConnect()

  const mainJersey = await Jersey.findById(id)
    .populate({
      path: "team",
      model: Team,
    })
    .lean()

  if (!mainJersey) {
    return null
  }

  // Find all jerseys with the same name
  const allVariants = await Jersey.find({ name: mainJersey.name })
    .populate({
      path: "team",
      model: Team,
    })
    .lean()

  // Organize variants
  const variants = Object.fromEntries(
    ["firstcopy", "master", "player"]
      .map(variant => {
        const found = allVariants.find(j => j.variant === variant);
        return found ? [variant, found] : null;
      })
      .filter(Boolean)
  );

  // Combine main jersey data with variants
  const result = {
    ...mainJersey,
    variants,
  }

  return result ? JSON.parse(JSON.stringify(result)) : null
}

export async function getJerseysByTeam(teamId) {
  await dbConnect()

  const allJerseys = await Jersey.find({ team: teamId })
    .sort({ name: 1 })
    .populate({
      path: "team",
      model: Team,
    })

  // Create a Map to store unique jerseys
  const uniqueJerseys = new Map()

  // Iterate through all jerseys and keep only the first occurrence of each name
  allJerseys.forEach((jersey) => {
    if (!uniqueJerseys.has(jersey.name)) {
      uniqueJerseys.set(jersey.name, jersey)
    }
  })

  // Convert the Map values back to an array
  const distinctJerseys = Array.from(uniqueJerseys.values())

  return JSON.parse(JSON.stringify(distinctJerseys))
}

export async function getJerseysByCategory(category) {
  await dbConnect()

  const allJerseys = await Jersey.find({ category })
    .sort({ name: 1 })
    .populate({
      path: "team",
      model: Team,
    })

  // Create a Map to store unique jerseys
  const uniqueJerseys = new Map()

  // Iterate through all jerseys and keep only the first occurrence of each name
  allJerseys.forEach((jersey) => {
    if (!uniqueJerseys.has(jersey.name)) {
      uniqueJerseys.set(jersey.name, jersey)
    }
  })

  // Convert the Map values back to an array
  const distinctJerseys = Array.from(allJerseys)

  return JSON.parse(JSON.stringify(distinctJerseys))
}

export async function createJersey(jerseyData) {
  await dbConnect()

  const jersey = new Jersey(jerseyData)
  const result = await jersey.save()

  return JSON.parse(JSON.stringify(result))
}

export async function updateJersey(id, updateData) {
  await dbConnect()

  const updatedJersey = await Jersey.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true,
    lean: true,
  })

  return updatedJersey ? JSON.parse(JSON.stringify(updatedJersey)) : null
}

export async function deleteJersey(id) {
  await dbConnect()

  const deletedJersey = await Jersey.findByIdAndDelete(id)

  return deletedJersey ? JSON.parse(JSON.stringify(deletedJersey)) : null
}