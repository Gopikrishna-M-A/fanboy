import { getServerSession } from "next-auth";
import OrdersListing from "./_components/OrdersListing";
import { getOrderHistory } from '@/services/orderService'
import { authOptions } from "../api/auth/[...nextauth]/options";
const Page = async () => {
  const session = await getServerSession(authOptions);
  const orderHistory = await getOrderHistory(session?.user?.id)
  const serializedOrderHistory = JSON.parse(JSON.stringify(orderHistory))
    return (
      <div className='mt-14'>
        <OrdersListing orders={serializedOrderHistory}/>
      </div>
    );
}

export default Page;



