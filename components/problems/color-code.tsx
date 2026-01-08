const ColorCode = () => {
    return (
        <div className='flex items-center gap-5 mb-5'>
            <div className='flex items-center text-white font-sans text-sm gap-2'>
                <div className='size-6 bg-accent-foreground rounded-md' />
                Unsolved
            </div>
            <div className='flex items-center text-white font-sans text-sm gap-2'>
                <div className='size-6 bg-green-100/20 rounded-md' />
                Solved
            </div>
        </div>
    )
}

export default ColorCode;