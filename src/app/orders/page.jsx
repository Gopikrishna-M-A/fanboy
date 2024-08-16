import OrdersListing from "./_components/OrdersListing";

export const generateMetadata = async () => {
  return {
    title: 'Orders | Fanboy Jerseys',
  }
}

const Page = async () => {
    return (
      <div className='mt-14'>
        <OrdersListing />
      </div>
    );
}

export default Page;



