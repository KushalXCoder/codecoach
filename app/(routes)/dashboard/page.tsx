"use client";

import { useQuery } from '@tanstack/react-query';
import React, { useEffect } from 'react';
import userStore from '@/store/user.store';

const DashboardPage = () => {
  const { codeforcesId } = userStore();

  const getContestData = async () => {
    try {
        const res = await fetch('/api/contest-data', {
            method: "POST",
            body: JSON.stringify({ codeforcesId }),
            cache: "no-store",
        });

        const resData = await res.json();

        if(!res.ok) {
            throw new Error("Error fetching user contest data", resData.message);
        }

        return resData.data.result;
    } catch (error) {
        console.log(error);
        throw error;
    }
  }

  const { data : userContestData, isLoading, error: isError } = useQuery({
      queryKey: ['dashboard', codeforcesId],
      queryFn: getContestData,
      enabled: !!codeforcesId,
  });

  const chartData = {

  };

  if(!codeforcesId || isLoading) return <div className='text-white'>Loading...</div>;
  if (isError) return <div>Error: {isError.message}</div>;

  return (
    <div className="h-full w-full">
        {/* {console.log(userContestData)} */}
        <h1 className='text-white'>Hi</h1>
        {/* {userContestData.map((contest,index) => (
            <p key={index} className='text-white'>{contest.contestId}</p>
        ))} */}
    </div>
  )
}

export default DashboardPage