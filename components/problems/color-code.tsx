const ColorCode = () => {
    return (
        <div className='flex items-center gap-5 mb-5 border border-gray-500 w-fit rounded-md px-4 py-1'>
            {/* <div className='flex items-center text-white font-sans text-sm gap-2'>
                <div className='size-6 bg-accent-foreground rounded-md' />
                Unsolved
            </div> */}
            <h1 className="text-white/50 font-sans">Color Code:</h1>
            <div className='flex items-center text-white font-sans text-sm gap-2'>
                <div className='size-6 bg-green-100/20 rounded-md' />
                Solved
            </div>
        </div>
    )
}

export default ColorCode;