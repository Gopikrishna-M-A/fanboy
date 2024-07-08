// "use client"
// import { useAuth } from "@/hooks/useAuth"
// import {
//   Card,
//   CardContent,
//   CardHeader,
//   CardTitle,
//   CardDescription,
// } from "@/components/ui/card"
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Switch } from "@/components/ui/switch"
// import {
//   User,
//   Mail,
//   Phone,
//   Bell,
//   LogOut,
//   MapPin,
// } from "lucide-react"
// import { signIn, signOut } from "next-auth/react"
// import LottieLoader from "@/components/LottieLoader"

// const Profile = () => {
//   const { user, isLoading, isAuthenticated } = useAuth()

//   if (isLoading) {
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <LottieLoader />
//       </div>
//     );
//   }

//   if (!isAuthenticated) {
//     return (
//       <div className='bg-gray-100 min-h-screen flex items-start p-4'>
//         <Card className='mx-auto max-w-md p-6 grid gap-6'>
//           <div className='space-y-2'>
//             <CardTitle className='text-2xl font-bold'>Please Log In</CardTitle>
//             <CardDescription className='text-muted-foreground'>
//               You need to log in to view this profile page. Click the button
//               below to sign in.
//             </CardDescription>
//           </div>
//           <Button onClick={signIn} className='w-full'>
//             Log In
//           </Button>
//         </Card>
//       </div>
//     )
//   }

//   return (
//     <div className='bg-gray-100 min-h-screen pb-44'>
//       <div className='p-4 space-y-4 max-w-xl'>
//         <Card>
//           <CardContent className='pt-6'>
//             <div className='flex items-center space-x-4'>
//               <Avatar className='h-20 w-20'>
//                 <AvatarImage src={user.image} alt={user.name} />
//                 <AvatarFallback>
//                   {user.name
//                     .split(" ")
//                     .map((n) => n[0])
//                     .join("")}
//                 </AvatarFallback>
//               </Avatar>
//               <div>
//                 <h2 className='text-xl font-semibold'>{user.name}</h2>
//                 <p className='text-sm text-muted-foreground'>{user.email}</p>
//               </div>
//             </div>
//           </CardContent>
//         </Card>

//         <Card>
//           <CardHeader>
//             <CardTitle>Personal Information</CardTitle>
//           </CardHeader>
//           <CardContent className='space-y-4'>
//             <div className='space-y-2'>
//               <Label htmlFor='name' className='text-sm font-medium'>
//                 <User className='h-4 w-4 inline mr-2' />
//                 Full Name
//               </Label>
//               <Input id='name' defaultValue={user.name} />
//             </div>
//             <div className='space-y-2'>
//               <Label htmlFor='email' className='text-sm font-medium'>
//                 <Mail className='h-4 w-4 inline mr-2' />
//                 Email
//               </Label>
//               <Input id='email' defaultValue={user.email} />
//             </div>
//             <div className='space-y-2'>
//               <Label htmlFor='phone' className='text-sm font-medium'>
//                 <Phone className='h-4 w-4 inline mr-2' />
//                 Phone
//               </Label>
//               <Input id='phone' defaultValue={user.address?.phone} />
//             </div>
//             <div className='space-y-2'>
//               <Label htmlFor='street' className='text-sm font-medium'>
//                 <MapPin className='h-4 w-4 inline mr-2' />
//                 Street Address
//               </Label>
//               <Input id='street' defaultValue={user.address?.street} />
//             </div>
//             <div className='grid grid-cols-2 gap-4'>
//               <div className='space-y-2'>
//                 <Label htmlFor='city' className='text-sm font-medium'>
//                   City
//                 </Label>
//                 <Input id='city' defaultValue={user.address?.city} />
//               </div>
//               <div className='space-y-2'>
//                 <Label htmlFor='state' className='text-sm font-medium'>
//                   State
//                 </Label>
//                 <Input id='state' defaultValue={user.address?.state} />
//               </div>
//             </div>
//             <div className='space-y-2'>
//               <Label htmlFor='zipcode' className='text-sm font-medium'>
//                 Zipcode
//               </Label>
//               <Input id='zipcode' defaultValue={user.address?.zipcode} />
//             </div>
//           </CardContent>
//         </Card>

//         <Card>
//           <CardContent className='pt-6'>
//             <div className='flex items-center justify-between'>
//               <div className='flex items-center space-x-2'>
//                 <Bell className='h-4 w-4' />
//                 <span className='text-sm font-medium'>Notifications</span>
//               </div>
//               <Switch />
//             </div>
//           </CardContent>
//         </Card>

//         <Button
//           variant='destructive'
//           onClick={signOut}
//           className='w-full mt-6 flex items-center justify-center gap-2'>
//           <LogOut className='h-4 w-4' /> Log Out
//         </Button>
//       </div>
//     </div>
//   )
// }

// export default Profile



"use client"
import { useAuth } from "@/hooks/useAuth"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import {
  User,
  Mail,
  Phone,
  Bell,
  LogOut,
  MapPin,
} from "lucide-react"
import { signIn, signOut } from "next-auth/react"
import LottieLoader from "@/components/LottieLoader"

const Profile = () => {
  const { user, isLoading, isAuthenticated } = useAuth()

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <LottieLoader />
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className='bg-gray-100 min-h-screen flex items-center justify-center p-4'>
        <Card className='w-full max-w-md p-6 grid gap-6'>
          <div className='space-y-2'>
            <CardTitle className='text-2xl font-bold'>Please Log In</CardTitle>
            <CardDescription className='text-muted-foreground'>
              You need to log in to view this profile page. Click the button
              below to sign in.
            </CardDescription>
          </div>
          <Button onClick={signIn} className='w-full'>
            Log In
          </Button>
        </Card>
      </div>
    )
  }

  return (
    <div className='bg-gray-100 pb-20 min-h-screen pb-12 md:pb-24'>
      <div className='container mx-auto p-4 md:p-8 space-y-6 max-w-4xl'>
        <Card>
          <CardContent className='pt-6'>
            <div className='flex gap-2 md:gap-5 items-start '>
              <Avatar className='h-14 w-14'>
                <AvatarImage src={user.image} alt={user.name} />
                <AvatarFallback>
                  {user.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div className='text-left'>
                <h2 className='text-2xl md:text-3xl font-semibold'>{user.name}</h2>
                <p className='text-sm md:text-base text-muted-foreground'>{user.email}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className='grid md:grid-cols-2 gap-6'>
          <Card className='md:col-span-2'>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div className='grid md:grid-cols-2 gap-4'>
                <div className='space-y-2'>
                  <Label htmlFor='name' className='text-sm font-medium'>
                    <User className='h-4 w-4 inline mr-2' />
                    Full Name
                  </Label>
                  <Input id='name' defaultValue={user.name} />
                </div>
                <div className='space-y-2'>
                  <Label htmlFor='email' className='text-sm font-medium'>
                    <Mail className='h-4 w-4 inline mr-2' />
                    Email
                  </Label>
                  <Input id='email' defaultValue={user.email} />
                </div>
              </div>
              <div className='grid md:grid-cols-2 gap-4'>
                <div className='space-y-2'>
                  <Label htmlFor='phone' className='text-sm font-medium'>
                    <Phone className='h-4 w-4 inline mr-2' />
                    Phone
                  </Label>
                  <Input id='phone' defaultValue={user.address?.phone} />
                </div>
                <div className='space-y-2'>
                  <Label htmlFor='street' className='text-sm font-medium'>
                    <MapPin className='h-4 w-4 inline mr-2' />
                    Street Address
                  </Label>
                  <Input id='street' defaultValue={user.address?.street} />
                </div>
              </div>
              <div className='grid md:grid-cols-3 gap-4'>
                <div className='space-y-2'>
                  <Label htmlFor='city' className='text-sm font-medium'>
                    City
                  </Label>
                  <Input id='city' defaultValue={user.address?.city} />
                </div>
                <div className='space-y-2'>
                  <Label htmlFor='state' className='text-sm font-medium'>
                    State
                  </Label>
                  <Input id='state' defaultValue={user.address?.state} />
                </div>
                <div className='space-y-2'>
                  <Label htmlFor='zipcode' className='text-sm font-medium'>
                    Zipcode
                  </Label>
                  <Input id='zipcode' defaultValue={user.address?.zipcode} />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className='pt-6'>
              <div className='flex items-center justify-between'>
                <div className='flex items-center space-x-2'>
                  <Bell className='h-4 w-4' />
                  <span className='text-sm font-medium'>Notifications</span>
                </div>
                <Switch />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className='pt-6'>
              <Button
                variant='destructive'
                onClick={signOut}
                className='w-full flex items-center justify-center gap-2'>
                <LogOut className='h-4 w-4' /> Log Out
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default Profile