"use client";

import { useQuery } from '@tanstack/react-query';
import userStore from '@/store/user.store';
import { getQuote } from '@/services/quote.service';
import { Skeleton } from '@/components/ui/skeleton';
import DailyQuote from '@/components/quote';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useState } from 'react';

const DashboardPage = () => {
  const { codeforcesId } = userStore();
  const [tabValue, setTabValue] = useState<'today' | 'past'>('today');
  
  return (
    <div className="h-full w-full">
      <DailyQuote />
      <div className='mt-5'>
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
      </div>
    </div>
  )
}

export default DashboardPage