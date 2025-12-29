import React from 'react';
import RegisterForm from './form';

const SignInPage = () => {
  return (
    <div className='h-screen w-screen flex justify-center items-center z-10'>
        <div className="text-white flex flex-col">
            {/* Sign In Header */}
            <h1 className='font-sans text-3xl'>
                Register to <span className='font-display text-primary text-4xl'>CodeCoach</span>
            </h1>
            <p className='font-sans text-gray-500 text-xl'>Enter your details to get started</p>

            {/* Form starts here */}
            <RegisterForm /> 
        </div>
    </div>
  )
}

export default SignInPage