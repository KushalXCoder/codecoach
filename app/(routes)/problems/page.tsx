"use client";

import { useQuery } from '@tanstack/react-query';
import userStore from '@/store/user.store';
import { getQuote } from '@/services/quote.service';
import DailyQuote from '@/components/quote';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useEffect, useState } from 'react';
import ProfileSetup from '@/components/profile-setup';
import Loader from './loader';
import { useFilterData } from '@/hooks/use-filter-data';
import ProblemBox from '@/components/problems/problem-box';
import { profileStore } from '@/store/profile.store';
import { getFinalSelectedProblems } from '@/services/ai.service';
import { QuestionsData } from '@/lib/global.types';
import PastQuestions from '@/components/problems/past-questions';
import SyncButton from '@/components/problems/sync-button';
import { problemsStore } from '@/store/problems.store';
import ColorCode from '@/components/problems/color-code';

const DashboardPage = () => {
  const { hydrated, profileCompleted } = userStore();
  const { hydrated: profileHydrated, codeforcesId, rating, dailyLimit, improveTopics, experiencedTopics } = profileStore();
  const { todaysQuestions, setTodaysQuestions } = problemsStore();

  const [tabValue, setTabValue] = useState<string>('today');

  const { data: quote, isLoading: isQuoteLoading } = useQuery({
      queryKey: ['quote'],
      queryFn: getQuote,
      staleTime: 24 * 60 * 60 * 1000,
  });
  
  const { leveledQuestions, loading: questionsLoading, isError: questionsError } = useFilterData();
  
  const enableAiQuestions = profileHydrated && !questionsLoading && leveledQuestions;
  
  const { data: selectedQuestions, isLoading: selectedQuestionsLoading, isError: selectedQuestionsError } = useQuery({
    queryKey: ['questions'],
    queryFn: () => getFinalSelectedProblems({ codeforcesId, rating, dailyLimit, improveTopics, experiencedTopics, leveledQuestions }),
    enabled: !!enableAiQuestions,
  });

  useEffect(() => {
    setTodaysQuestions(selectedQuestions?.selectedProblems);
  },[selectedQuestions]);

  if(!hydrated || !profileHydrated || questionsLoading || selectedQuestionsLoading) {
    return <Loader />;
  }

  if(questionsError || selectedQuestionsError) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <p className="text-red-500">Error loading questions. Please try again later.</p>
      </div>
    )
  }
  
  return (
    <div className="flex flex-1 flex-col">
      <DailyQuote quote={quote!} />
      {profileCompleted ? (
        <div className='flex flex-col flex-1 mt-5'>
          <ColorCode />
          <Tabs defaultValue='today' onValueChange={(value) => setTabValue(value)} className='font-sans'>
            <div className='flex justify-between items-center'>
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
              <SyncButton codeforcesId={codeforcesId} questions={selectedQuestions?.selectedProblems} tabValue={tabValue} />
            </div>
            <TabsContent value='today'>
              <div className='flex flex-col gap-3 my-5'>
                {todaysQuestions && todaysQuestions.map((question: QuestionsData) => (
                  <ProblemBox question={question} />
                ))}
              </div>
            </TabsContent>
            <TabsContent value='past'>
              <PastQuestions />
            </TabsContent>
          </Tabs>
        </div>
      ) : (
        <ProfileSetup />
      )}
    </div>
  )
}

export default DashboardPage