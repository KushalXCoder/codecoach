"use client";

import { toast } from "sonner";
import { Button } from "../ui/button";
import { QuestionsData } from "@/lib/types/global.types";
import { useQuery } from "@tanstack/react-query";
import { getUserSubmissions } from "@/services/user.service";
import { useEffect, useState } from "react";
import { problemsStore } from "@/store/problems.store";
import { syncQuestions } from "@/services/questions.service";

type SyncButtonProps = {
    codeforcesId: string,
    questions: QuestionsData[],
    tabValue: string,
};

const SyncButton = ({ codeforcesId, questions, tabValue } : SyncButtonProps) => {
    const [count, setCnt] = useState<number>(0);
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
                setCnt((prev) => prev + 1);
                return { ...question, solved: true };
            }
            return question;
        });

        // Immedietly send to the store, so that UI updates
        setTodaysQuestions(updatedTodaysQuestions);

        // Fire and Forget to the backend
        syncQuestions(codeforcesId, updatedTodaysQuestions)
        .then(() => {
            toast('Questions synced in the background successfully.');
        })
        .catch((err) => {
            toast(err.message ||'Failed to sync questions in the background.');
        })
    },[userSubmissionsSet, questions, setTodaysQuestions]);

    return (
        <Button onClick={handleSync} disabled={!questions || questions.length === 0 || isLoading || isRefetching}>
            {isLoading || isRefetching ? 'Syncing...' : 'Sync Submissions'}
        </Button>
    )
}

export default SyncButton;