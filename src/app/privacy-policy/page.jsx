import React from 'react';
import { Shield, Database, Clipboard, Lock, Share2 } from 'lucide-react';


export const generateMetadata = async () => {
  return {
    title: 'Privacy Policy | Fanboy Jerseys',
  }
}

const PrivacyPolicy = () => {
    const today = new Date();
    const currentYear = today.getFullYear();
    const lastUpdated = `January 1, ${currentYear}`;

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8 my-10">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <div className="px-6 py-8">
          <h1 className="text-3xl font-bold text-center text-gray-900 mb-8">Privacy Policy</h1>
          
          <p className="text-gray-600 mb-6">
            At Fanboy Jerseys, we are committed to protecting your privacy and ensuring the security of your personal information. 
            This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website 
            or make a purchase from us.
          </p>

          <p className="text-gray-600 mb-6">
            By using our website, you agree to the collection and use of information in accordance with this policy. 
            This Privacy Policy was last updated on {lastUpdated}.
          </p>
          
          <div className="space-y-8">
            <Section 
              icon={<Database className="text-blue-500" size={24} />}
              title="1. Information We Collect"
              content={
                <div>
                  <p className="mb-2">We collect the following types of personal information:</p>
                  <ul className="list-disc pl-5">
                    <li>Name</li>
                    <li>Email address</li>
                    <li>Phone number</li>
                    <li>Billing address</li>
                    <li>Shipping address</li>
                    <li>Payment information</li>
                    <li>Purchase history</li>
                  </ul>
                </div>
              }
            />
            
            <Section 
              icon={<Clipboard className="text-blue-500" size={24} />}
              title="2. How We Collect Information"
              content={
                <div>
                  <p className="mb-2">We collect information in the following ways:</p>
                  <ul className="list-disc pl-5">
                    <li>When you create an account on our website</li>
                    <li>When you make a purchase</li>
                    <li>When you contact our customer service</li>
                  </ul>
                </div>
              }
            />
            
            <Section 
              icon={<Shield className="text-blue-500" size={24} />}
              title="3. How We Use Your Information"
              content={
                <div>
                  <p className="mb-2">We use your personal information for the following purposes:</p>
                  <ul className="list-disc pl-5">
                    <li>To process and fulfill your orders</li>
                    <li>To communicate with you about your orders, products, and services</li>
                    <li>To provide customer support</li>
                    <li>To send you marketing communications (with your consent)</li>
                    <li>To improve our website and user experience</li>
                    <li>To detect and prevent fraud</li>
                    <li>To comply with legal obligations</li>
                  </ul>
                </div>
              }
            />
            
            <Section 
              icon={<Lock className="text-blue-500" size={24} />}
              title="4. How We Protect Your Information"
              content={
                <div>
                  <p className="mb-2">We implement a variety of security measures to maintain the safety of your personal information:</p>
                  <ul className="list-disc pl-5">
                    <li>Use of SSL (Secure Sockets Layer) encryption for all transmitted data</li>
                    <li>Regular security assessments and penetration testing</li>
                    <li>Access controls and authentication measures for our systems</li>
                    <li>Secure, encrypted storage of personal data</li>
                  </ul>
                  <p className="mt-2">While we strive to use commercially acceptable means to protect your personal information, no method of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee its absolute security.</p>
                </div>
              }
            />
            
            <Section 
              icon={<Share2 className="text-blue-500" size={24} />}
              title="5. Information Sharing with Third Parties"
              content={
                <div>
                  <p className="mb-2">We may share your personal information with third parties in the following circumstances:</p>
                  <ul className="list-disc pl-5">
                    <li>With service providers who help us operate our business (e.g., payment processors, shipping companies)</li>
                    <li>With marketing and advertising partners (with your consent)</li>
                    <li>In response to a legal request or when required by law</li>
                    <li>To protect our rights, privacy, safety, or property</li>
                    <li>In connection with the sale or transfer of our business assets</li>
                  </ul>
                  <p className="mt-2">We do not sell your personal information to third parties. When we share information with third parties, we require them to respect the security of your personal data and to treat it in accordance with the law.</p>
                </div>
              }
            />
          </div>
          
          <p className="mt-8 text-sm text-gray-500">
            If you have any questions about this Privacy Policy, please contact us at fanboysale@gmail.com.
          </p>
        </div>
      </div>
    </div>
  );
};

const Section = ({ icon, title, content }) => (
  <div>
    <div className="flex items-center mb-4">
      {icon}
      <h2 className="text-xl font-semibold ml-2">{title}</h2>
    </div>
    {content}
  </div>
);

export default PrivacyPolicy;