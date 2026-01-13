import { userPrevQuestions } from "@/services/user.service";
import { profileStore } from "@/store/profile.store";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import Loader from "./loader";
import ProblemBox from "./problem-box";
import { QuestionsData } from "@/lib/types/global.types";

const PastQuestions = () => {
    const { hydrated, codeforcesId } = profileStore();

    const { data: pastQuestions, isLoading: pastQuestionsLoading, isError: pastQuestionsError } = useQuery({
        queryKey: ['past-questions'],
        queryFn: () => userPrevQuestions(codeforcesId),
        enabled: hydrated && !!codeforcesId,
    });

    if(!hydrated || pastQuestionsLoading) {
        return <Loader />;
    }

    return (
        <div className='flex flex-col gap-3 my-5'>
            {pastQuestions && pastQuestions.data.length > 0 ? (
                    pastQuestions.data.map((question: QuestionsData) => (
                        <ProblemBox question={question} />
                    ))
                ) : (
                    <p className="text-gray-400">No past questions found.</p>
                )
            }
        </div>
    )
}

export default PastQuestions;