"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import useStore from '@/store/user.store';

const ConnectForm = () => {
  const router = useRouter();  

  const [inputId, setInputId] = useState<string>("");
  const [errors, setErrors] = useState<string>("");
  const { setCodeforcesId } = useStore();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setErrors("");
    setInputId(e.target.value);
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if(inputId === " ") {
        console.log("Please enter a id");
        setErrors("Please enter a id");
        return;
    }

    setCodeforcesId(inputId);
    router.push("/verify");
  }

  return (
    <form onSubmit={handleSubmit} className='flex flex-col gap-2 font-sans w-full'>
        <input type="text" name='cf_id' value={inputId} onChange={handleChange} placeholder='Enter your codeforces id' className='border border-gray-500 px-4 py-2 rounded-lg w-full text-white/50 focus:border-green-500 focus:outline-1 focus:outline-green-200 transition-colors' required/>
        {errors && <p className='text-red-500'>{errors}</p>}
        <button type='submit' className='bg-green-500 hover:bg-green-600 transition-colors w-1/4 rounded-lg px-4 py-2 cursor-pointer mt-2'>Connect</button>
    </form>
  )
}

export default ConnectForm