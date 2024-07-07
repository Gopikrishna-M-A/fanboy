import React from 'react';
import { CheckCircle } from 'lucide-react';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const PaymentSuccessCard = ({ customerName }) => {
  return (
    <Link href='/orders'>
    <Card className="w-full max-w-md mx-auto text-center">
      <CardHeader>
        <CheckCircle className="w-16 h-16 mx-auto text-green-500" />
        <h2 className="mt-4 text-2xl font-bold text-gray-800">Payment Successful!</h2>
      </CardHeader>
      <CardContent>
        <p className="text-lg text-gray-600">
          Thank you, {customerName}! Your payment has been processed successfully.
        </p>
        <p className="mt-2 text-sm text-gray-500">
          Your jersey(s) will be on their way to you soon. We hope you enjoy wearing them as much as we enjoyed creating them!
        </p>
      </CardContent>
      <CardFooter className="flex justify-center">
        <Button>
          View Order Details
        </Button>
      </CardFooter>
    </Card>
    </Link>
  );
};

export default PaymentSuccessCard;