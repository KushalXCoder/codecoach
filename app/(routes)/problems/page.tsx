"use client";

import { useQuery } from '@tanstack/react-query';
import userStore from '@/store/user.store';
import { getQuote } from '@/services/quote.service';
import { Skeleton } from '@/components/ui/skeleton';
import DailyQuote from '@/components/quote';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useState } from 'react';
import ProfileSetup from '@/components/profile-setup';
import Loader from './loader';
import { useFilterData } from '@/hooks/use-filter-data';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const DashboardPage = () => {
  const { hydrated, profileCompleted } = userStore();
  const [tabValue, setTabValue] = useState<'today' | 'past'>('today');

  const link = "https://codeforces.com/contest";

  const { data: quote, isLoading: isQuoteLoading } = useQuery({
      queryKey: ['quote'],
      queryFn: getQuote,
      refetchInterval: 24 * 60 * 60 * 1000,
  });

  const { data: questions, loading: questionsLoading } = useFilterData();
  console.log("Filtered Data in Dashboard:", questions);

  if(!hydrated || isQuoteLoading || questionsLoading) {
    return <Loader />;
  }
  
  return (
    <div className="flex flex-1 flex-col">
      <DailyQuote quote={quote!} />
      {profileCompleted ? (
        <div className='flex flex-col flex-1 mt-10'>
          <div className='flex justify-between items-center'>
            <Tabs defaultValue='today' className='font-sans'>
              <TabsList className='bg-white/80 *:px-3'>
                <TabsTrigger
                  value="today"
                  className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  Today
                </TabsTrigger>

                <TabsTrigger
                  value="past"
                  className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  Past
                </TabsTrigger>
              </TabsList>
            </Tabs>
            <Button>
              Sync Problems
            </Button>
          </div>
          <div className='flex flex-col gap-3 my-5'>
            {questions.map((q) => (
              <Link key={q.problem._id} href={`${link}/${q.problem.contestId}/problem/${q.problem.index}`} target="_blank">
                <div className='border p-3 text-primary border-accent-foreground rounded-lg font-sans hover:bg-accent-foreground'>
                  <h1 className='text-lg'>{q.problem.name}</h1>
                  <p className='text-gray-500'>Rating: {q.problem.rating}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      ) : (
        <ProfileSetup />
      )}
    </div>
  )
}

export default DashboardPage