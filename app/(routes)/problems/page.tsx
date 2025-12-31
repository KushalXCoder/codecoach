"use client";

import { useQuery } from '@tanstack/react-query';
import userStore from '@/store/user.store';
import { getQuote } from '@/services/quote.service';
import { Skeleton } from '@/components/ui/skeleton';
import DailyQuote from '@/components/quote';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useState } from 'react';
import ProfileSetup from '@/components/profile-setup';

const DashboardPage = () => {
  const { codeforcesId, profileCompleted } = userStore();
  const [tabValue, setTabValue] = useState<'today' | 'past'>('today');
  
  return (
    <div className="flex flex-1 flex-col">
      <DailyQuote />
      {profileCompleted ? (
        <div className='flex flex-1 mt-5'>
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
      ) : (
        <ProfileSetup />
      )}
    </div>
  )
}

export default DashboardPage