import { getJerseys } from "@/services/jerseyService"
import ProductsDisplay from "./_commponents/ProductDisplay"

const page = async () => {
  // const jerseys = await getJerseys()
  const jerseys = []
  console.log("jerseys",jerseys);
  return (
    <div className='mt-14'>
      <ProductsDisplay jerseys={jerseys} />
    </div>
  )
}

export default page
