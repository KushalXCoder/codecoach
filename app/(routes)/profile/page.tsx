"use client";

import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip as RechartsTooltip,
} from "recharts";
import { Card, CardContent } from "@/components/ui/card";
import ProfileHeader from "@/components/profile/profile-header";
import { useQuery } from "@tanstack/react-query";
import { userPrevQuestions } from "@/services/user.service";
import { profileStore } from "@/store/profile.store";
import Loader from "@/components/loader";
import Logout from "@/components/logout";
import { getProfileData } from "@/services/profile.service";
import { useEffect } from "react";
import Settings from "@/components/profile/settings";

const difficultyData = [
  { name: "Easy", value: 120, color: "#22c55e" },
  { name: "Medium", value: 90, color: "#eab308" },
  { name: "Hard", value: 30, color: "#ef4444" },
];

const ratingData = [
  { rating: "800–1000", solved: 40 },
  { rating: "1000–1200", solved: 55 },
  { rating: "1200–1400", solved: 65 },
  { rating: "1400–1600", solved: 50 },
  { rating: "1600+", solved: 30 },
];

const ProfilePage = () => {
    const { hydrated, codeforcesId } = profileStore();

    const { data, isLoading, isError } = useQuery({
        queryKey: ['profile-data'],
        queryFn: () => getProfileData(codeforcesId),
        enabled: !!codeforcesId,
    });

    useEffect(() => {
        console.log(data);
    }, [data]);

    if(!hydrated || isLoading) {
        return (
            <div className="h-screen flex justify-center items-center">
                <Loader />
            </div>
        );
    }

    return (
        <div className="min-h-screen max-w-3xl mx-auto font-sans py-7">
            <Link href="/problems" className="flex items-center gap-1 text-gray-500 mb-8">
                <ArrowLeft className="size-4 hover:underline" />
                Back
            </Link>

            <ProfileHeader codeforcesId={codeforcesId} />
            <div className="flex w-full justify-between items-end">
                <p className="text-blue-500">Currently, we just track your CodeCoach stats !</p>
                <Logout className="mt-3 w-1/6" />
            </div>

            <div className="mt-5 space-y-6">
            {/* Stats cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                    <Card className="bg-accent-foreground py-0 justify-center">
                        <CardContent className="px-5">
                            <p className="text-gray-400 text-sm">Solved</p>
                            <h2 className="text-3xl font-semibold text-primary">{data?.profileData.solvedQuestions}</h2>
                        </CardContent>
                    </Card>
                    <Card className="bg-accent-foreground py-0">
                        <CardContent className="p-5">
                            <p className="text-gray-400 text-sm">Total Problems</p>
                            <h2 className="text-3xl font-semibold text-primary">{data?.profileData.questions.length}</h2>
                        </CardContent>
                    </Card>
                    <Card className="bg-accent-foreground py-0">
                        <CardContent className="p-5">
                            <p className="text-gray-400 text-sm">Streak</p>
                            <h2 className="text-3xl font-semibold text-primary">5 days 🔥</h2>
                        </CardContent>
                    </Card>
                </div>

                {/* Charts */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {/* Pie Chart */}
                    <Card className="bg-accent-foreground py-6 justify-center h-fit">
                        <CardContent className="px-6">
                            <h3 className="text-white mb-4">Solved by Difficulty</h3>
                            <ResponsiveContainer width="100%" height={260}>
                                <PieChart>
                                    <Pie
                                        data={difficultyData}
                                        dataKey="value"
                                        nameKey="name"
                                        innerRadius={60}
                                        outerRadius={90}
                                        paddingAngle={5}
                                    >
                                    {difficultyData.map((entry, index) => (
                                        <Cell key={index} fill={entry.color} />
                                    ))}
                                    </Pie>
                                    <RechartsTooltip />
                                </PieChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>

                    {/* Bar Chart */}
                    <Card className="bg-accent-foreground py-6 h-fit">
                        <CardContent className="px-6">
                            <h3 className="text-white mb-4">Solved by Rating</h3>
                            <ResponsiveContainer width="100%" height={260}>
                                <BarChart data={ratingData}>
                                    <XAxis dataKey="rating" stroke="#9ca3af" />
                                    <YAxis stroke="#9ca3af" />
                                    <RechartsTooltip />
                                    <Bar dataKey="solved" radius={[6, 6, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>
                </div>

                {/* User settings */}
                <Card className="bg-accent-foreground">
                    <CardContent className="px-6">
                        <h3 className="text-white">Account Settings</h3>
                        <p className="text-destructive mb-4 text-sm">Note: Changes will apply to the questions you will recieve the next day or when today's questions time is over.</p>
                        <Settings />
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

export default ProfilePage;