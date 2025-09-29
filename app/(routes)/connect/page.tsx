import React from 'react';
import ConnectForm from './form';

const ConnectPage = () => {
  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center">
        <div className='flex flex-col gap-2'>
            {/* <h1 className='text-white font-sans text-2xl'>Connect your <span className='font-display text-green-500'>codeforces</span> id</h1> */}
            <h1 className='text-white font-sans text-3xl'>Welcome, <span className='font-display text-green-500'>user</span></h1>
            <div className="w-md flex">
                <ConnectForm />
            </div>
        </div>
    </div>
  )
}

export default ConnectPage