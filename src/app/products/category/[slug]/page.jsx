import ProductsDisplay from "../../_commponents/ProductDisplay"

export const generateMetadata = async ({ params }) => {
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const capitalizedSlug = capitalizeFirstLetter(params.slug);
  return {
    title: `${capitalizedSlug} Jerseys | Fanboy Jerseys`,
  }
}

const page = async ({ params }) => {
  return (
    <div className='mt-14'>
     <ProductsDisplay queryKey="category" queryParam={params.slug} />
    </div>
  )
}

export default page
