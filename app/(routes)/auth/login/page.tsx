"use client";

import { Suspense } from 'react';
import LoginForm from './form';

const LoginPage = () => {
  return (
    <div className='h-screen w-screen flex justify-center items-center z-10'>
        <div className="w-sm text-white flex flex-col">
            {/* Log In Header */}
            <h1 className='font-sans text-3xl'>
                Log In to <span className='font-display text-primary text-4xl'>CodeCoach</span>
            </h1>
            <p className='font-sans text-gray-500 text-xl'>Enter your details to get started</p>

            {/* Form starts here */}
            <Suspense>
              <LoginForm />
            </Suspense>
        </div>
    </div>
  )
}

export default LoginPage