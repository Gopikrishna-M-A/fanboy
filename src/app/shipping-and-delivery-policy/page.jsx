import React from 'react';
import { Truck, Package, Clock, MapPin, AlertCircle } from 'lucide-react';

export const generateMetadata = async ({ params }) => {
  return {
    title: `Shipping And Delivery | Fanboy Jerseys`,
  }
}



const ShippingAndDeliveryPolicy = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8 my-10">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <div className="px-6 py-8">
          <h1 className="text-3xl font-bold text-center text-gray-900 mb-8">Shipping and Delivery Policy</h1>
          
          <p className="text-gray-600 mb-6">
            At Fanboy Jerseys, we're committed to delivering your favorite jerseys right to your doorstep, 
            anywhere in India. Our shipping policy is designed to ensure you receive your order 
            quickly and conveniently.
          </p>
          
          <div className="space-y-8">
            <PolicySection 
              icon={<Clock className="text-blue-500" size={24} />}
              title="Order Processing and Shipping Time"
              content={
                <ul className="list-disc pl-5 space-y-2">
                  <li>Orders are typically processed within 1-2 business days after payment confirmation.</li>
                  <li>Once shipped, delivery usually takes 7-10 business days, depending on your location in India.</li>
                  <li>For customized jerseys, please allow an additional 3 business days for processing.</li>
                </ul>
              }
            />
            
            <PolicySection 
              icon={<Truck className="text-blue-500" size={24} />}
              title="Shipping Costs"
              content={
                <div>
                  <p className="font-semibold text-green-600 mb-2">Free Shipping All Over India!</p>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>We offer free shipping on all orders, regardless of order value or destination within India.</li>
                    <li>This applies to all our products, including customized jerseys.</li>
                    <li>No minimum purchase is required to avail free shipping.</li>
                  </ul>
                </div>
              }
            />
            
            <PolicySection 
              icon={<MapPin className="text-blue-500" size={24} />}
              title="Shipping Coverage"
              content={
                <div>
                  <p className="mb-2">We currently ship pan India.</p>
                </div>
              }
            />
            
            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-lg font-semibold mb-4">Additional Information</h3>
              <ul className="space-y-2">
                <InfoItem 
                  icon={<AlertCircle className="text-yellow-500" size={20} />} 
                  text="During peak seasons or sales, processing and shipping times may be slightly longer. We appreciate your patience." 
                />
                <InfoItem 
                  icon={<Package className="text-blue-500" size={20} />} 
                  text="All orders are carefully packaged to ensure your jerseys arrive in perfect condition." 
                />
                 <InfoItem 
                  icon={<Truck className="text-blue-500" size={20} />} 
                  text="Our jerseys are imported from Thailand, ensuring top-notch quality. As a result, shipping may take a little longer, but it's worth the wait for such high-quality products." 
                />
              
              </ul>
            </div>
          </div>
          
          <p className="mt-8 text-sm text-gray-500">
            For any questions or concerns regarding our Shipping and Delivery Policy, 
            please contact our customer service team at fanboysale@gmail.com.
          </p>
        </div>
      </div>
    </div>
  );
};

const PolicySection = ({ icon, title, content }) => (
  <div>
    <div className="flex items-center mb-4">
      {icon}
      <h2 className="text-xl font-semibold ml-2">{title}</h2>
    </div>
    {content}
  </div>
);

const InfoItem = ({ icon, text }) => (
  <li className="flex items-start">
    <span className="mr-2 mt-1">{icon}</span>
    <span>{text}</span>
  </li>
);

export default ShippingAndDeliveryPolicy;