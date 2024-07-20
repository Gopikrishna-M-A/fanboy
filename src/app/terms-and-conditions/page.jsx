import React from 'react';
import { Info, Calendar, Shield, AlertTriangle, UserX } from 'lucide-react';

const TermsAndConditions = () => {
  const today = new Date();
  const currentYear = today.getFullYear();
  const effectiveDate = `January 1, ${currentYear}`;

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8 my-10">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <div className="px-6 py-8">
          <h1 className="text-3xl font-bold text-center text-gray-900 mb-8">Terms and Conditions</h1>
          
          <p className="text-gray-600 mb-6">
            Welcome to Fanboy Jerseys. These Terms and Conditions govern your use of our website and services. 
            By accessing or using our website, you agree to be bound by these Terms and Conditions.
          </p>
          
          <div className="space-y-8">
            <Section 
              icon={<Info className="text-blue-500" size={24} />}
              title="1. Contact Information"
              content={
                <div>
                  <p>Fanboy Jerseys</p>
                  <p>Email: fanboysale@gmail.com</p>
                  <p>Phone: +91 9446931531</p>
                  <p>Address: Kotteth Road kakkanad Ernakulam, Kerala 682030, India</p>
                </div>
              }
            />
            
            <Section 
              icon={<Calendar className="text-blue-500" size={24} />}
              title="2. Effective Date"
              content={
                <p>These Terms and Conditions are effective as of {effectiveDate}. We reserve the right to change these terms at any time. Your continued use of the site after changes are posted constitutes your acceptance of the updated terms.</p>
              }
            />
            
            <Section 
              icon={<Shield className="text-blue-500" size={24} />}
              title="3. Limitation of Liability and Disclaimer of Warranties"
              content={
                <div>
                  <p className="mb-2">3.1 Limitation of Liability:</p>
                  <p className="mb-4">To the fullest extent permitted by applicable law, Fanboy Jerseys shall not be liable for any indirect, incidental, special, consequential or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible losses, resulting from:</p>
                  <ul className="list-disc pl-5 mb-4">
                    <li>Your access to or use of or inability to access or use the site;</li>
                    <li>Any conduct or content of any third party on the site;</li>
                    <li>Any content obtained from the site; and</li>
                    <li>Unauthorized access, use or alteration of your transmissions or content.</li>
                  </ul>
                  <p className="mb-2">3.2 Disclaimer of Warranties:</p>
                  <p>The site and its content are provided on an "as is" and "as available" basis without any warranties of any kind. We disclaim all warranties, including, but not limited to, the warranty of title, merchantability, non-infringement of third parties rights, and fitness for particular purpose.</p>
                </div>
              }
            />
            
            <Section 
              icon={<AlertTriangle className="text-blue-500" size={24} />}
              title="4. Rules of Conduct"
              content={
                <div>
                  <p className="mb-2">When using our website, you agree to:</p>
                  <ul className="list-disc pl-5">
                    <li>Comply with all applicable laws and regulations;</li>
                    <li>Provide accurate and complete information when creating an account or making a purchase;</li>
                    <li>Use the website and its features for lawful purposes only;</li>
                    <li>Respect the intellectual property rights of Fanboy Jerseys and other users;</li>
                    <li>Not engage in any activity that could disable, overburden, or impair the proper working of the website;</li>
                    <li>Not attempt to gain unauthorized access to any part of the website or any system or network connected to the website.</li>
                  </ul>
                </div>
              }
            />
            
            <Section 
              icon={<UserX className="text-blue-500" size={24} />}
              title="5. User Restrictions"
              content={
                <div>
                  <p className="mb-2">Users are prohibited from:</p>
                  <ul className="list-disc pl-5">
                    <li>Using the website for any illegal or unauthorized purpose;</li>
                    <li>Creating multiple accounts for fraudulent or abusive purposes;</li>
                    <li>Attempting to manipulate or interfere with our review or rating systems;</li>
                    <li>Uploading or transmitting viruses or any other type of malicious code;</li>
                    <li>Collecting or harvesting any information about other users, including email addresses, without their consent;</li>
                    <li>Impersonating any person or entity, or falsely stating or otherwise misrepresenting your affiliation with a person or entity;</li>
                    <li>Interfering with or disrupting the website or servers or networks connected to the website.</li>
                  </ul>
                </div>
              }
            />
          </div>
          
          <p className="mt-8 text-sm text-gray-500">
            By using Fanboy Jerseys, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions. 
            If you do not agree to these terms, please do not use our website or services.
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

export default TermsAndConditions;