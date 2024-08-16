import { Skeleton } from "@/components/ui/skeleton"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Shirt } from "lucide-react";


export const ProductCardSkeleton = () => {
  return (
    <div className='mt-5 block w-full sm:w-64 bg-white shadow-sm hover:shadow-md transition-shadow duration-300 rounded-lg overflow-hidden relative'>
      <div className='aspect-w-1 aspect-h-1 w-full relative h-52 md:h-60'>
        <Skeleton className="w-full h-full rounded-lg" />
      </div>
      <div className='p-4'>
        <Skeleton className="h-6 w-3/4 mb-2" />
        <Skeleton className="h-4 w-1/2 mb-4" />
        <div className='flex justify-between items-center'>
          <div>
            <Skeleton className="h-5 w-16 inline-block" />
            <Skeleton className="h-4 w-12 inline-block ml-2" />
          </div>
          <Skeleton className="h-5 w-12" />
        </div>
      </div>
      <div className='absolute top-5 right-3'>
        <Badge variant="secondary">
          <Skeleton className="h-4 w-12" />
        </Badge>
      </div>
    </div>
  )
}

export const TeamSkeleton = () => {
  return (
    <div className='w-20 h-20 md:w-40 md:h-40 bg-gray-200 rounded-full md:rounded-sm md:p-10 flex items-center justify-center relative shadow-md'>
      <Skeleton className="w-full h-full rounded-full md:rounded-sm" />
    </div>
  )
}

export const ProductGridSkeleton = ({ count = 8 }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
      {Array(count).fill(0).map((_, index) => (
        <ProductCardSkeleton key={index} />
      ))}
    </div>
  )
}

export const TeamGridSkeleton = ({ count = 6 }) => {
  return (
    <div className='flex overflow-x-auto pb-2 hide-scrollbar md:grid md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 md:gap-3 md:overflow-hidden'>
      {Array(count).fill(0).map((_, index) => (
        <div key={index} className={`flex-shrink-0 mr-3 ${index === 0 && 'ml-4'} md:ml-0`}>
          <TeamSkeleton />
        </div>
      ))}
    </div>
  )
}

export const ProductDetailsSkeleton = () => {
  return (
    <div className='max-w-7xl mx-auto p-4 space-y-6 mb-32'>
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
        <Card className='lg:sticky lg:top-4'>
          <CardContent className='p-6'>
            <Skeleton className='aspect-square w-full h-[400px]' />
          </CardContent>
        </Card>

        <div className='space-y-6'>
          <Card>
            <CardContent className='p-6 space-y-4'>
              <Skeleton className='h-8 w-3/4' />
              <Skeleton className='h-4 w-full' />
              <Skeleton className='h-4 w-full' />
              <div className='flex justify-between items-center'>
                <Skeleton className='h-6 w-24' />
                <Skeleton className='h-6 w-16' />
              </div>
              <div className='space-y-2'>
                <Skeleton className='h-4 w-16' />
                <div className='flex gap-2'>
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Skeleton key={i} className='h-8 w-8' />
                  ))}
                </div>
              </div>
              <div className='space-y-2'>
                <Skeleton className='h-4 w-16' />
                <div className='flex gap-2'>
                  {[1, 2, 3].map((i) => (
                    <Skeleton key={i} className='h-8 w-16' />
                  ))}
                </div>
              </div>
              <Skeleton className='h-10 w-full' />
            </CardContent>
          </Card>

          <Card>
            <CardContent className='p-6'>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className='flex items-center space-x-3'>
                    <Skeleton className='h-6 w-6 rounded-full' />
                    <div className='space-y-2'>
                      <Skeleton className='h-4 w-20' />
                      <Skeleton className='h-4 w-24' />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Tabs defaultValue='sizeChart' className='w-full'>
        <TabsList className='grid w-full grid-cols-1'>
          <TabsTrigger value='sizeChart'>Size Chart</TabsTrigger>
        </TabsList>
        <TabsContent value='sizeChart' className='mt-4'>
          <Card>
            <CardHeader>
              <Skeleton className='h-6 w-48' />
            </CardHeader>
            <CardContent className='p-4'>
              <div className='space-y-2'>
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className='flex justify-between'>
                    <Skeleton className='h-4 w-16' />
                    <Skeleton className='h-4 w-16' />
                    <Skeleton className='h-4 w-16' />
                    <Skeleton className='h-4 w-16' />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};


export const JerseyImageSkeleton = () => {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-gray-100 animate-pulse">
      <div className="relative">
        <div className="absolute inset-0 bg-gray-200 rounded-full scale-150 animate-ping"></div>
        <Shirt className="h-16 w-16 text-gray-200 z-10 relative" />
      </div>
    </div>
  )
}