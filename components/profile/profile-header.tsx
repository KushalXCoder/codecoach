import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { ArrowUpRightFromSquareIcon } from "lucide-react";
import Link from "next/link";

type ProfileHeaderProps = {
    codeforcesId: string;
};

const ProfileHeader = ({ codeforcesId } : ProfileHeaderProps) => {
    const link = `https://codeforces.com/profile/${codeforcesId}`;

    return (
        <div className="flex gap-5 items-center">
            <div className="border-2 shrink-0 border-gray-500 size-20 rounded-full p-1">
                <Tooltip>
                    <TooltipTrigger className=" h-full w-full bg-primary rounded-full text-white flex justify-center items-center text-3xl">
                        <p>{codeforcesId.charAt(0)}</p>
                    </TooltipTrigger>
                    <TooltipContent className="font-sans">{codeforcesId}</TooltipContent>
                </Tooltip>
            </div>
            <div className="w-full flex justify-between items-center text-white">
                <div>
                    <h1 className="text-xl">{codeforcesId}</h1>
                    <p className="text-gray-500">This is your profile page.</p>
                </div>
                <Link href={link} target="_blank" className="hover:text-primary">
                    <ArrowUpRightFromSquareIcon />
                </Link>
            </div>
        </div>
    )
}

export default ProfileHeader;