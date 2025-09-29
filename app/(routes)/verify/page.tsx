"use client";

import React, { useState } from 'react'
import VerifyForm from './form'
import Link from 'next/link'
import Toast from '@/components/toast';

const VerifyPage = () => {
  const [showToast, setShowToast] = useState<boolean>(false);

  const handleCopy = () => {
    navigator.clipboard.writeText("CodeCoach");
    setTimeout(() => {
      setShowToast(false);
    }, 3000);
    setShowToast(true);
  }

  return (
    <div className='h-screen w-screen flex justify-center items-center'>
        <div className='flex flex-col items-start w-xl max-sm:px-10'>
            <h1 className='font-sans text-white text-3xl'>Verify your <span className='font-display text-green-500'>account</span></h1>
            <div className="border rounded-lg border-gray-700 px-4 py-2 mt-3 flex flex-col gap-2 font-sans">
              <h1 className='text-white text-lg'>How to verify ?</h1>
              <p className='text-gray-500'>Visit <Link href="https://codeforces.com/settings/social" className='text-blue-500 underline'>https://codeforces.com/settings/social</Link> or go to your codeforces profile and click settings and then go to social. There change your institution to <span className='text-green-500 cursor-pointer' onClick={handleCopy}>CodeCoach</span> and save it.</p>
            </div>
            <p className='text-red-500 text-sm mt-2 font-sans'>Note: This is only a one time thing. After, verifying you can change it back to your original institution.</p>
            <VerifyForm />
        </div>
        {showToast && <Toast text="Text copied to clipboard" />}
    </div>
  )
}

export default VerifyPage