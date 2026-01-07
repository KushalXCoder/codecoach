"use client";

import { toast } from "sonner";
import { Button } from "../ui/button";
import { QuestionsData } from "@/lib/global.types";
import { useQuery } from "@tanstack/react-query";
import { getUserSubmissions } from "@/services/user.service";
import { useEffect, useState } from "react";
import { problemsStore } from "@/store/problems.store";

type SyncButtonProps = {
    codeforcesId: string,
    questions: QuestionsData[],
    tabValue: string,
};

const SyncButton = ({ codeforcesId, questions, tabValue } : SyncButtonProps) => {
    const { setTodaysQuestions } = problemsStore();
    const [userSubmissionsSet, setUserSubmissionsSet] = useState<Set<string>>(new Set());

    const { data: userSubmissions, isLoading, isRefetching, refetch } = useQuery({
        queryKey: ['userSubmissions'],
        queryFn: () => getUserSubmissions(codeforcesId),
        enabled: false,
    });

    const handleSync = async () => {
        if(tabValue === 'past') {
            toast('Sync is only available for today\'s problems.');
            return;
        }

        await refetch();
    }

    useEffect(() => {
        if(!userSubmissions) return;

        const newSet = new Set<string>();

        userSubmissions.submissions.forEach((submission: any) => {
            if(submission.verdict === "OK") {
                const key = `${submission.problem.name}`;
                newSet.add(key);
            };
        });

        setUserSubmissionsSet(newSet);
    }, [userSubmissions]);

    useEffect(() => {
        if(!questions || userSubmissionsSet.size === 0) return;

        const updatedTodaysQuestions = questions.map((question) => {
            if(userSubmissionsSet.has(question.name)) {
                return { ...question, solved: true };
            }
            return question;
        });
        
        console.log("Updated Questions after sync:", updatedTodaysQuestions);
        setTodaysQuestions(updatedTodaysQuestions);
    },[userSubmissionsSet, questions,setTodaysQuestions]);

    return (
        <Button onClick={handleSync} disabled={!questions || questions.length === 0 || isLoading || isRefetching}>
            {isLoading || isRefetching ? 'Syncing...' : 'Sync Submissions'}
        </Button>
    )
}

export default SyncButton;