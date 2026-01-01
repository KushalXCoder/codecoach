"use client";

import Link from 'next/link';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Loader from '@/components/loader';
import { profileStore } from '@/store/profile.store';
import userStore from '@/store/user.store';

type Errors = {
    errorElement: string,
    errorMessage: string,
};

type FormDetails = {
    email: string,
    password: string,
};

const LoginForm = () => {
  const router = useRouter();  

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

  const { setProfileCompleted } = userStore();
  const { hydrateFromServer } = profileStore();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setErrors(initialErrors);
    setFormDetails({
        ...formDetails,
        [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);

    if(!formDetails.email) {
        setErrors({ errorElement: "email", errorMessage: "Email is missing" });
        setLoading(false);
        return;
    } else if(!formDetails.password) {
        setErrors({ errorElement: "password", errorMessage: "Password is missing" });
        setLoading(false);
        return;
    }

    try {
        const res = await fetch('/api/auth/login', {
            method: "POST",
            body: JSON.stringify(formDetails),
        });

        if(!res.ok) {
            throw new Error("Failed to login");
        }

        const data = await res.json();

        hydrateFromServer(data.user);
        setProfileCompleted(true);
        
        router.push('/problems');
    } catch (error) {
        console.error("Failed login attempt", error);
        setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className='w-full mt-5 flex flex-col items-center'>
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
        <button disabled={isLoading} className='w-full flex justify-center items-center rounded-lg py-2 mt-8 font-sans cursor-pointer bg-green-500 hover:bg-green-600 hover:shadow-2xs hover:shadow-white transition-shadow transition-colors'>
            {isLoading ? (
                <Loader />
            ) : (
                "Submit"
            )}
        </button>
        <h1 className='mt-4 font-sans'>Already a member? <Link href="/auth/register" className='text-primary hover:underline transition-all'>Register</Link></h1>
    </form>
  )
}

export default LoginForm