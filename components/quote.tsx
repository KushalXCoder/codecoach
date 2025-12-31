type DailyQuoteProps = {
    quote: {
        quote: string;
        author: string;
    }
};

const DailyQuote = ({ quote } : DailyQuoteProps) => {
    return (
        <div className='font-sans text-white border border-zinc-600 p-3 rounded-lg text-center'>
            <p className='text-lg italic'>"{quote?.quote}" - {quote?.author || "Unknown"}</p>
        </div>
    )
}

export default DailyQuote;