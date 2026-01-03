import { Skeleton } from "@/components/ui/skeleton";

const Loader = () => {
    return (
        <div className="flex flex-1 flex-col">
            <Skeleton className='h-10 w-full mt-5' />
            <Skeleton className='h-10 w-40 mt-5' />
            <div className="flex flex-col gap-3 mt-10">
                {Array.from({ length: 5 }).map((_,index) => (
                    <Skeleton key={index} className='h-20 w-full mt-2' />
                ))}
            </div>
        </div>
    )
}

export default Loader;