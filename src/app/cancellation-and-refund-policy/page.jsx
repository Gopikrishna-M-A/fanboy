import React from 'react';
import { ArrowLeftRight, Mail, Clock, CheckCircle, XCircle, Video } from 'lucide-react';

const CancellationRefundPolicy = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8 my-10">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <div className="px-6 py-8">
          <h1 className="text-3xl font-bold text-center text-gray-900 mb-8">Cancellation and Refund Policy</h1>
          
          <p className="text-gray-600 mb-6">
            At Fanboy Jerseys, we strive to ensure you receive high-quality products. 
            In the rare event that you encounter issues with your order, please follow our return policy carefully.
          </p>
          
          <div className="space-y-8">
            <PolicySection 
              icon={<Video className="text-red-500" size={24} />}
              title="Mandatory Unboxing Video"
              content={
                <div>
                  <p className="font-semibold text-red-600 mb-2">Important: An unboxing video is mandatory for all return requests.</p>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>You must record a continuous video of the package opening process.</li>
                    <li>The video should clearly show:</li>
                    <ul className="list-circle pl-5 space-y-1">
                      <li>The sealed package with shipping label</li>
                      <li>The process of opening the package</li>
                      <li>All items inside the package</li>
                      <li>Any damage or issues with the product</li>
                    </ul>
                    <li>The unboxing video is crucial evidence for processing your return request.</li>
                    <li>Returns without an unboxing video will not be accepted.</li>
                  </ul>
                </div>
              }
            />

            <PolicySection 
              icon={<ArrowLeftRight className="text-blue-500" size={24} />}
              title="Return and Exchange Eligibility"
              content={
                <ul className="list-disc pl-5 space-y-2">
                  <li>You must report any issues within 24 hours of delivery.</li>
                  <li>Original tags and packaging must be intact.</li>
                  <li>Items are eligible for return if they:</li>
                  <ul className="list-circle pl-5 space-y-1">
                    <li>Were in a physically damaged condition at the time of delivery.</li>
                    <li>Do not match with what was ordered.</li>
                  </ul>
                  <li>Customized or personalized jerseys are not eligible for return or exchange unless defective.</li>
                  <li>All return requests must be accompanied by the mandatory unboxing video.</li>
                </ul>
              }
            />
            
            <PolicySection 
              icon={<Mail className="text-blue-500" size={24} />}
              title="How to Initiate a Return or Exchange"
              content={
                <ol className="list-decimal pl-5 space-y-2">
                  <li>Record an unboxing video as soon as you receive your package.</li>
                  <li>Within 24 hours of delivery, email our customer service team at fanboysale@gmail.com with:</li>
                  <ul className="list-circle pl-5 space-y-1">
                    <li>Your order number</li>
                    <li>Reason for return/exchange</li>
                    <li>The unboxing video (you may need to use a file-sharing service for large videos)</li>
                  </ul>
                  <li>Our team will review your request and video evidence within 1-2 business days.</li>
                  <li>If approved, we will provide you with a Return Merchandise Authorization (RMA) number and further instructions.</li>
                  <li>Pack the item securely and include the RMA number on the package.</li>
                  <li>Ship the package to the address provided in the return instructions.</li>
                </ol>
              }
            />
            
            <PolicySection 
              icon={<Clock className="text-blue-500" size={24} />}
              title="Refund Processing Time"
              content={
                <ul className="list-disc pl-5 space-y-2">
                  <li>Refunds will be processed within 7 business days after we receive and inspect the returned item.</li>
                  <li>The refund will be credited back to the original payment method used for the purchase.</li>
                  <li>Please allow an additional 3-5 business days for the refund to appear in your account, depending on your bank or credit card issuer.</li>
                </ul>
              }
            />
            
            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-lg font-semibold mb-4">Additional Information</h3>
              <ul className="space-y-2">
                <InfoItem icon={<CheckCircle className="text-green-500" size={20} />} text="Exchanges are subject to product availability. If the requested item is out of stock, a refund will be issued." />
              </ul>
            </div>
          </div>
          
          <p className="mt-8 text-sm text-gray-500">
            For any questions or concerns regarding our Cancellation and Refund Policy, 
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

export default CancellationRefundPolicy;