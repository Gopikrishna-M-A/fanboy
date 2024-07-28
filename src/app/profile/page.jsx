import React from 'react'
import Profile from './_components/Profile'

export const generateMetadata = async ({ params }) => {
  return {
    title: `Profile | Fanboy Jerseys`,
  }
}


const page = () => {
  return (
    <div className='mt-14 '>
        <Profile/>
    </div>
  )
}

export default page