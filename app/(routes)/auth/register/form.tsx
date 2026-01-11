"use client";

import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { toast } from 'sonner';

type FormDetails = {
    email: string,
    password: string,
};

type Errors = {
    errorElement: string,
    errorMessage: string,
};

const RegisterForm = () => {
  const error = useSearchParams().get('error');

  useEffect(() => {
    if(error) {
      toast(error === 'missing' ? "Email or Password is missing"
          : error === 'invalid' ? "Invalid Email or Password"
          : error === 'server' ? "Internal Server Error"
          : error === 'exists' ? "User already exists"
          : "An unknown error occurred"
      );
    };
  }, [error]);

  const initialErrors = {
    errorElement: "",
    errorMessage: "",
  };

  const initialFormDetails = {
    email: "",
    password: "",
  };

  const [errors, setErrors] = useState<Errors>(initialErrors);
  const [formDetails, setFormDetails] = useState<FormDetails>(initialFormDetails);
  const [isLoading, setLoading] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormDetails({
        ...formDetails,
        [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    setLoading(true);
  };

  return (
    <form
        action='/api/auth/register'
        method='POST'
        onSubmit={handleSubmit}
        className='w-full mt-5 flex flex-col items-center'
    >
        <div className='email flex flex-col gap-2 font-sans mt-3 w-full'>
            <label htmlFor="email" className='text-lg'>Email</label>
            <input type="email" name='email' value={formDetails.email} onChange={handleChange} placeholder='Enter your email here' className='w-full border border-gray-500 outline-0 rounded-lg px-4 py-2 focus:border-green-300'/>
            {errors && errors.errorElement === 'email' && <span className='text-red-500 font-sans'>{errors.errorMessage}</span>}
        </div>
        <div className='password flex flex-col gap-2 font-sans mt-5 w-full'>
            <label htmlFor="password" className='text-lg'>Password</label>
            <input type="password" name='password' value={formDetails.password} onChange={handleChange} placeholder='Enter your password' className='w-full border border-gray-500 outline-0 rounded-lg px-4 py-2 focus:border-green-300'/>
            {errors && errors.errorElement === 'password' && <span className='text-red-500 font-sans'>{errors.errorMessage}</span>}
        </div>
        <button disabled={isLoading} className='w-full flex justify-center items-center rounded-lg py-2 mt-8 font-sans cursor-pointer bg-green-500 hover:bg-green-600'>
            {isLoading ? (
                "Submitting..."
            ) : (
                "Submit"
            )}
        </button>
        <h1 className='mt-4 font-sans'>Already a member? <Link href="/auth/login" className='text-primary hover:underline transition-all'>Login</Link></h1>
        {/* <div className='flex w-full justify-center items-center mt-3'>
            <hr className='border-gray-500 w-20'/>
            <span className='mx-2 text-gray-500 font-sans'>OR CONTINUE WITH</span>
            <hr className='border-gray-500 w-20'/>
        </div>
        <button type='button' className='mt-4'>
            <FcGoogle className='text-5xl bg-green-100 rounded-sm p-2 cursor-pointer'/> 
        </button> */}
    </form>
  )
}

export default RegisterForm