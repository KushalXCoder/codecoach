"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import VerifyDialog from './verify-dailog';
import { Input } from '../ui/input';
import { profileStore } from '@/store/profile.store';
import { Button } from '../ui/button';
import { toast } from 'sonner';
import { checkVerified } from '@/lib/helper/checkVerified';

const CodeforcesInput = () => {
  const router = useRouter();  

  const [errors, setErrors] = useState<string>("");
  const [openDialog, setOpenDialog] = useState<boolean>(false);

  const { codeforcesId, setCodeforcesId } = profileStore();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setErrors("");
    setCodeforcesId(e.target.value);
  }

  const handleConnect = async () => {
    if(!codeforcesId || codeforcesId.trim() === "") {
        setErrors("Codeforces ID cannot be empty");
        return;
    }

    setOpenDialog(true);
  }

  return (
    <div className='flex flex-col gap-2 font-sans w-full'>
      <div className='flex flex-col gap-2'>
        <label htmlFor="cf_id" className='text-white'>Codeforces ID</label>
        <div className='flex items-center gap-3'>
          <Input
              type='text'
              name='cf_id'
              value={codeforcesId}
              onChange={handleChange}
              className='text-white'
              placeholder='Enter your codeforces id'
          />
          <Button
            type='submit'
            className='bg-green-500 hover:bg-green-600 transition-colors w-1/4 rounded-lg px-4 py-2 cursor-pointer'
            onClick={handleConnect}
          >
              Connect
          </Button>
        </div>
      </div>
      {errors && <p className='text-red-500'>{errors}</p>}
      {openDialog && <VerifyDialog codeforcesId={codeforcesId} open={openDialog} setOpen={setOpenDialog} />}
    </div>
  )
}

export default CodeforcesInput;