import { QuestionsData, RankedData } from "@/lib/types/global.types"
import { ArrowUpRightFromSquare, CircleCheck } from "lucide-react";
import Link from "next/link"
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

type ProblemBoxProps = {
    question: QuestionsData;
}

const baseUrl = "https://codeforces.com/contest";

const ProblemBox = ({ question } : ProblemBoxProps) => {
    const link = `${baseUrl}/${question.contestId}/problem/${question.index}`;
    return (
        <div
            key={question._id}
            className={`flex justify-between items-center border p-3 text-primary
            border-accent-foreground rounded-lg font-sans
            ${question.solved ? 'bg-green-100/20' : 'hover:bg-accent-foreground'}`}
        >
            <div>
                <h1 className='text-lg flex items-center gap-2'>
                    {question.name}
                    {question.solved && <CircleCheck className="size-4 text-blue-500 mb-0.5" />}
                </h1>
                <p className='text-gray-500'>Rating: {question.rating}</p>
            </div>
            <div className="flex items-center gap-3">
                <Link href={link} target="_blank">
                    <Tooltip>
                        <TooltipTrigger>
                            <ArrowUpRightFromSquare className="size-5" />
                        </TooltipTrigger>
                        <TooltipContent>
                            <p className="font-sans">Visit</p>
                        </TooltipContent>
                    </Tooltip>
                </Link>
            </div>
        </div>
    )
}

export default ProblemBox;