import { Skeleton } from '@/components/ui/skeleton'

const Loading = () => {
  return (
    <div className='grid grid-cols-1 gap-4 p-4 lg:grid-cols-3'>
      {Array.from({ length: 20 }).map((el: any, index: number) => {
        return <Skeleton key={index} className='h-40 w-full' />
      })}
    </div>
  )
}

export default Loading
