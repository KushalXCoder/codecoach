"use client";

import React, { useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { useRouter } from 'next/navigation';

type FormDetails = {
    email: string,
    password: string,
};

type Errors = {
    errorElement: string,
    errorMessage: string,
};

const RegisterForm = () => {
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormDetails({
        ...formDetails,
        [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if(!formDetails.email) {
        setErrors({
            errorElement: "email",
            errorMessage: "Email is required",
        });
        return;
    } else if(!formDetails.password) {
        setErrors({
            errorElement: "password",
            errorMessage: "Password is required",
        });
        return;
    } else {
        try {
            setErrors(initialErrors);
            setFormDetails(initialFormDetails);

            const res = await fetch('/api/auth/register', {
                method: "POST",
                body: JSON.stringify(formDetails),
            });

            if(res) {
                const data = await res.json();
                if(data.status === "Success") {
                    router.push('/');
                } else if(data.status === "Exists") {
                    router.push('/auth/login');
                }
            }
        } catch (error) {
            console.error("Error submitting form:", error);
        }
    }
  };

  return (
    <form onSubmit={handleSubmit} className='w-full mt-5 flex flex-col items-center'>
        <div className='email flex flex-col gap-2 font-sans mt-3 w-full'>
            <label htmlFor="email" className='text-lg'>Email</label>
            <input type="text" name='email' value={formDetails.email} onChange={handleChange} placeholder='Enter your email here' className='w-full border border-gray-500 outline-0 rounded-lg px-4 py-2 focus:border-green-300'/>
            {errors && errors.errorElement === 'email' && <span className='text-red-500 font-sans'>{errors.errorMessage}</span>}
        </div>
        <div className='password flex flex-col gap-2 font-sans mt-5 w-full'>
            <label htmlFor="password" className='text-lg'>Password</label>
            <input type="password" name='password' value={formDetails.password} onChange={handleChange} placeholder='Enter your password' className='w-full border border-gray-500 outline-0 rounded-lg px-4 py-2 focus:border-green-300'/>
            {errors && errors.errorElement === 'password' && <span className='text-red-500 font-sans'>{errors.errorMessage}</span>}
        </div>
        <button className='w-full flex justify-center items-center rounded-lg py-2 mt-8 font-sans cursor-pointer bg-green-500 hover:bg-green-600 hover:shadow-2xs hover:shadow-white transition-shadow transition-colors'>
            Submit
        </button>
        <div className='flex w-full justify-center items-center mt-6'>
            <hr className='border-gray-500 w-20'/>
            <span className='mx-2 text-gray-500 font-sans'>OR CONTINUE WITH</span>
            <hr className='border-gray-500 w-20'/>
        </div>
        <button type='button' className='mt-4'>
            <FcGoogle className='text-5xl bg-green-100 rounded-sm p-2 cursor-pointer'/> 
        </button>
    </form>
  )
}

export default RegisterForm