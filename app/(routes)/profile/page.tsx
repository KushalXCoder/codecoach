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
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import ProfileHeader from "@/components/profile/profile-header";
import { useQuery } from "@tanstack/react-query";
import { userPrevQuestions } from "@/services/user.service";
import { profileStore } from "@/store/profile.store";
import { useEffect } from "react";
import Loader from "@/components/loader";

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

    const { data: prevQuestions, isLoading: prevQuestionsLoading, isError: prevQuestionsError } = useQuery({
        queryKey: ['previous-questions'],
        queryFn: async () => userPrevQuestions(codeforcesId),
        enabled: !!codeforcesId,
    });

    useEffect(() => {
        console.log("Previous Questions:", prevQuestions);
    }, [prevQuestions]);

    if(!hydrated) {
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
            <div className="mt-12 space-y-6">
            {/* Stats cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                    <Card className="bg-accent-foreground py-0 justify-center">
                        <CardContent className="px-5">
                            <p className="text-gray-400 text-sm">Solved</p>
                            <h2 className="text-3xl font-semibold text-primary">240</h2>
                        </CardContent>
                    </Card>

                    <Card className="bg-accent-foreground py-0">
                        <CardContent className="p-5">
                            <p className="text-gray-400 text-sm">Total Problems</p>
                            <h2 className="text-3xl font-semibold text-primary">{prevQuestions?.data.length}</h2>
                        </CardContent>
                    </Card>

                    <Card className="bg-accent-foreground py-0">
                        <CardContent className="p-5">
                            <p className="text-gray-400 text-sm">Acceptance</p>
                            <h2 className="text-3xl font-semibold text-primary">68%</h2>
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
                        <h3 className="text-white mb-6">Preferences</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div>
                                <label className="text-gray-400 text-sm">Your Rating</label>
                                <Input
                                    type="number"
                                    defaultValue={1450}
                                    className="mt-2 text-primary"
                                />
                            </div>
                            <div>
                                <label className="text-gray-400 text-sm">Daily Problem Limit</label>
                                <Input
                                    type="number"
                                    defaultValue={5}
                                    className="mt-2 text-primary"
                                />
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

export default ProfilePage;