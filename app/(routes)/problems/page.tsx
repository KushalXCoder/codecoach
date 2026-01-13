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
import { QuestionsData } from '@/lib/types/global.types';
import PastQuestions from '@/components/problems/past-questions';
import SyncButton from '@/components/problems/sync-button';
import { problemsStore } from '@/store/problems.store';
import ColorCode from '@/components/problems/color-code';

const DashboardPage = () => {
  const { hydrated, profileCompleted } = userStore();
  const { hydrated: profileHydrated, codeforcesId, rating, dailyLimit, improveTopics, experiencedTopics } = profileStore();
  const { hydrated: problemsHydrated, todaysQuestions, setTodaysQuestions } = problemsStore();

  const [tabValue, setTabValue] = useState<string>('today');
  const [visibleCnt, setVisibleCnt] = useState<number>(5);
  
  const { leveledQuestions, loading: questionsLoading, isError: questionsError } = useFilterData();

  useEffect(() => {
    console.log(leveledQuestions);
  }, [leveledQuestions]);
  
  const leveledQuestionsLength = 
    leveledQuestions.low.length +
    leveledQuestions.mid.length +
    leveledQuestions.high.length;

  const enableAiQuestions = profileHydrated && !questionsLoading && leveledQuestionsLength > 0;
  console.log('Enable AI Questions:', enableAiQuestions);
  
  const { data: selectedQuestions, isError: selectedQuestionsError } = useQuery({
    queryKey: ['questions', codeforcesId],
    queryFn: () => getFinalSelectedProblems({ codeforcesId, rating, dailyLimit, improveTopics, experiencedTopics, leveledQuestions }),
    enabled: !!enableAiQuestions,
  });
  
  useEffect(() => {
    if (selectedQuestions?.selectedProblems) {
      setTodaysQuestions(selectedQuestions.selectedProblems);
    }
  }, [selectedQuestions, setTodaysQuestions]);

  const hasLeveledQuestions = leveledQuestionsLength > 0;
  const hasQuestions = todaysQuestions.length > 0;

  if(!hydrated || !profileHydrated || !problemsHydrated || !hasLeveledQuestions || !hasQuestions) {
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
      {/* <DailyQuote quote={quote!} /> */}
      {profileCompleted ? (
        <div className='flex flex-col flex-1'>
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
              <SyncButton codeforcesId={codeforcesId} tabValue={tabValue} />
            </div>
            <TabsContent value='today'>
              <div className='flex flex-col gap-3 my-5'>
                {todaysQuestions
                  .slice(0,visibleCnt)
                  .map((question: QuestionsData) => (
                    <ProblemBox key={question._id} question={question} />
                ))}
              </div>
              {dailyLimit! > 5 ? (
                <div className='w-full flex justify-between items-center'>
                  <button
                    className='text-blue-500 hover:underline cursor-pointer'
                    onClick={() => setVisibleCnt((prev) => prev === 10 ? 5 : 10)}
                  >
                    {visibleCnt === 10 ? 'Show less' : 'Load More'}
                  </button>
                  <p className='text-gray-500'>That's not it, you got more questions down!</p>
                </div>
              ) : (
                <p className='text-gray-500 text-end'>Solve this all and you are done for the day!</p>
              )}
            </TabsContent>
            <TabsContent value='past'>
              <PastQuestions />
            </TabsContent>
          </Tabs>
        </div>
      ) : (
        <h1>Hi</h1>
      )}
    </div>
  )
}

export default DashboardPage