// 'use client'
// import { useAuth } from '@/hooks/useAuth'

// export default function Profile() {
//   const { user, isLoading, isAuthenticated } = useAuth()

//   if (isLoading) return <div>Loading...</div>
//   if (!isAuthenticated) return <div>Please sign in</div>

//   return (
//     <div>
//       <h1>Profile</h1>
//       <p>Name: {user?.name}</p>
//       <p>Email: {user?.id}</p>
//     </div>
//   )
// }


import { getJerseys } from "@/services/jerseyService"
import ProductsDisplay from "./_commponents/ProductDisplay"

const page = async () => {
  const jerseys = await getJerseys()
  return (
    <div className='mt-14'>
      <ProductsDisplay jerseys={jerseys} />
    </div>
  )
}

export default page
