import React from 'react';
import { Phone, Mail, MapPin, Globe } from 'lucide-react';

export const generateMetadata = async () => {
  return {
    title: 'Support | Fanboy Jerseys',
  }
}

const ContactDetails = () => {
  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
        <h1 className="text-3xl font-bold text-center mb-6 text-green-600">Contact Us</h1>
        <div className="space-y-4">
          <div className="flex items-center">
            <Phone className="text-green-500 mr-4" size={24} />
            <div>
              <p className="font-semibold">Phone</p>
              <p className="text-gray-600">+91 9446931531</p>
            </div>
          </div>
          <div className="flex items-center">
            <Mail className="text-green-500 mr-4" size={24} />
            <div>
              <p className="font-semibold">Email</p>
              <p className="text-gray-600">fanboysale@gmail.com</p>
            </div>
          </div>
          <div className="flex items-start">
            <MapPin className="text-green-500 mr-4 mt-1" size={24} />
            <div>
              <p className="font-semibold">Address</p>
              <p className="text-gray-600">Kotteth Road kakkanad<br />Ernakulam, Kerala 682030,<br />India</p>
            </div>
          </div>
          
        </div>
        <div className="mt-8 text-center text-gray-500">
          <p>We're here to assist you with any questions about our jerseys!</p>
          <p>Business hours: Mon-Fri, 12AM-12PM IST</p>
        </div>
      </div>
    </div>
  );
};

export default ContactDetails;