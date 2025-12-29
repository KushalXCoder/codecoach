import { getQuote } from "@/services/quote.service";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "./ui/skeleton";

const DailyQuote = () => {
    const { data: quote, isLoading: isQuoteLoading } = useQuery({
        queryKey: ['quote'],
        queryFn: getQuote,
        refetchInterval: 24 * 60 * 60 * 1000,
    });
    console.log(quote);
    return (
        <>
            {isQuoteLoading ? (
                <Skeleton className='h-15 p-3' />
            ) : (
                <div className='font-sans text-white border border-zinc-600 p-3 rounded-lg text-center'>
                    <p className='text-lg italic'>"{quote?.quote}" - {quote?.author || "Unknown"}</p>
                </div>
            )}
        </>
    )
}

export default DailyQuote;