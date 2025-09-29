"use client";

import React, { useState } from 'react';
import userStore from '@/store/user.store';
import { useRouter } from 'next/navigation';
import Toast from '@/components/toast';

type ToastState = {
  text: string,
  flag: boolean,
};

const VerifyForm = () => {
  const [showToast, setShowToast] = useState<ToastState>({
    text: "",
    flag: false,
  });

  const router = useRouter();
  const { codeforcesId, setJustRegistered } = userStore();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const res = await fetch(`/api/verify`, {
        method: "POST",
        body: JSON.stringify({ codeforcesId }),
        cache: "no-store",
    });

    if(res.ok) {
      const resData = await res.json();
      
      const valToCheck = resData.data.result[0].organization;
      if(valToCheck === "CodeCoach") {
          // To show toast on the homepage
          setJustRegistered(true);
          // Redirect to homepage
          router.push("/dashboard/problems");
          try {
            const res = await fetch('/api/store-id', {
              method: "PUT",
              body: JSON.stringify({ codeforcesId }),
              credentials: "include",
            });
            if(res.ok) {
              const data = await res.json();
              console.log(data);
            }
          } catch (error) {
            console.log("Error saving id", error);
          }
      }
      else {
          setTimeout(() => {
            setShowToast({ text: "", flag: false });
          }, 3000);
          setShowToast({ text: "Verification failed, please try again.", flag: true });
          console.log("Verfication failed");
      }
    } else {
      return;
    }
  }

  return (
    <form onSubmit={handleSubmit} className='w-full mt-3 font-sans'>
        {/* <input type="text" placeholder='Enter the code here' className='w-full border border-gray-500 outline-0 px-4 py-2 focus:outline-2 focus:outline-green-200 focus:border-green-500 rounded-lg text-white'/> */}
        <button type='submit' className='bg-green-500 hover:bg-green-600 cursor-pointer rounded-lg px-4 py-2 mt-2'>Verify</button>
        {showToast.flag && <Toast text={showToast.text} />}
    </form>
  )
}

export default VerifyForm