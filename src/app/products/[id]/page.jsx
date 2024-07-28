import ProductDetails from "../_commponents/ProductDetails"
import { getJerseyById } from "@/services/jerseyService"

export const generateMetadata = async ({ params }) => {
  const jersey = await getJerseyById(params.id)
  return {
    title: `${jersey.name} | Fanboy Jerseys`,
  }
}

const page = async ({ params }) => {
  const jersey = await getJerseyById(params.id)
  // console.log("jersey",jersey);
  return (
    <div className='mt-14'>
      <ProductDetails jerseyData={jersey} />
    </div>
  )
}

export default page
