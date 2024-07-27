import { getServerSession } from 'next-auth';
import { UserConfirmationEmail, OwnerNotificationEmail } from '../../../components/email-templates';
import { Resend } from 'resend';
import { authOptions } from '../auth/[...nextauth]/options';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

  const { amount, jerseys, orderId, shippingAddress } = await request.json();
  try {
    console.log(amount, jerseys, orderId, shippingAddress);
    // Send confirmation email to the user
    // const userEmailData = await resend.emails.send({
    //   from: 'fanboy@fanboyjerseys.in',
    //   to: [session.user.email],
    //   subject: 'Order Confirmation - Fanboy Jerseys',
    //   react: UserConfirmationEmail({ 
    //     name: session.user.name, 
    //     orderId, 
    //     items: jerseys, 
    //     total: amount, 
    //     shippingAddress 
    //   }),
    // })


    // // Send notification email to the owner
    // const ownerEmailData = await resend.emails.send({
    //   from: 'fanboy@fanboyjerseys.in',
    //   to: ['fanboysale@gmail.com'],
    //   subject: 'New Order Received - Fanboy Jerseys',
    //   react: OwnerNotificationEmail({ 
    //     orderId, 
    //     items: jerseys, 
    //     total: amount, 
    //     customerName: session.user.name, 
    //     shippingAddress 
    //   }),
    // });

    // Fake responses for testing
        const userEmailData = {
          id: 'fakeUserEmailId',
          status: 'sent',
          to: session.user.email,
          subject: 'Order Confirmation - Fanboy Jerseys'
      };

      const ownerEmailData = {
          id: 'fakeOwnerEmailId',
          status: 'sent',
          to: 'fanboysale@gmail.com',
          subject: 'New Order Received - Fanboy Jerseys'
      };

    console.log('User email sent:', userEmailData);
    console.log('Owner email sent:', ownerEmailData);

    return Response.json({ success: true, userEmail: userEmailData, ownerEmail: ownerEmailData });
  } catch (error) {
    console.error('Error sending emails:', error);
    return Response.json({ error: 'Failed to send emails' });
  }
}