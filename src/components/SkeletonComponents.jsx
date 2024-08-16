import { Skeleton } from "@/components/ui/skeleton"
import { Badge } from "@/components/ui/badge"

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