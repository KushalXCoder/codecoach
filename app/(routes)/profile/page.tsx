"use client";

import { ArrowLeft, Info } from "lucide-react";
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
import { profileStore } from "@/store/profile.store";
import Loader from "@/components/loader";
import Logout from "@/components/logout";
import { getProfileData } from "@/services/profile.service";
import Settings from "@/components/profile/settings";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useEffect, useState } from "react";
import { RatingType } from "@/lib/types/global.types";
import { checkVerified } from "@/lib/helper/checkVerified";
import { Button } from "@/components/ui/button";
import { appStore } from "@/store/app.store";
import { set } from "mongoose";
import CodeforcesDialog from "@/components/codeforces-dialog";

type RatingData = {
  type: RatingType;
  value: number;
};

type DifficultyData = RatingData & {
  color: string;
};

const CHART_CARD_HEIGHT = "h-[360px]";

const ProfilePage = () => {
  const { hydrated, username } = profileStore();
  const { openCodeforcesDialog, setOpenCodeforcesDialog } = appStore();

  const [ratingData, setRatingData] = useState<RatingData[]>([
    { type: "easy", value: 0 },
    { type: "medium", value: 0 },
    { type: "hard", value: 0 },
    { type: "expert", value: 0 },
  ]);

  const [difficultyData, setDifficultyData] = useState<DifficultyData[]>([]);

  const { data, isLoading } = useQuery({
    queryKey: ["profile-data"],
    queryFn: () => getProfileData(username),
    enabled: !!username,
  });

  useEffect(() => {
    if (!data) return;

    data.profileData.solvedQuestions.forEach((type: RatingType) => {
      const ratingType = type.toLowerCase() as RatingType;

      setRatingData((prev) =>
        prev.map((item) =>
          item.type === ratingType
            ? { ...item, value: item.value + 1 }
            : item
        )
      );
    });
  }, [data]);

  useEffect(() => {
    setDifficultyData([
      { type: "easy", value: ratingData[0].value, color: "#22c55e" },
      { type: "medium", value: ratingData[1].value, color: "#eab308" },
      { type: "hard", value: ratingData[2].value, color: "#ef4444" },
      { type: "expert", value: ratingData[3].value, color: "#3b82f6" },
    ]);
  }, [ratingData]);

  const totalSolved = ratingData.reduce((sum, item) => sum + item.value, 0);
  const hasSolvedAny = totalSolved > 0;

  const [isUserVerified, setIsUserVerified] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      const isVerified = await checkVerified();
      setIsUserVerified(isVerified.verified);
    })();
  }, []);

  if (!hydrated || isLoading) {
    return (
      <div className="h-screen flex justify-center items-center">
        <Loader />
      </div>
    );
  }

  return (
    <div className="min-h-screen max-w-3xl mx-auto font-sans py-7">
      <Link href="/problems" className="flex items-center gap-1 text-gray-500 mb-8 w-fit">
        <ArrowLeft className="size-4 hover:underline" />
        Back
      </Link>

      <ProfileHeader username={username} />

      <div className="flex w-full justify-between items-end">
        <p className="text-gray-500">
          {isUserVerified ?
            "Currently, we just track your CodeCoach stats !" :
            "Verify your account with codeforces to track your stats !"
          }
        </p>
        <div className="flex items-center gap-3">
          {!isUserVerified && (
            <Button className="cursor-pointer" onClick={() => setOpenCodeforcesDialog(true)}>
              Verify
            </Button>
          )}
          <Logout className="w-fit" />
        </div>
      </div>

      <div className="mt-5 space-y-6">
        {/* Stats cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <Card className="bg-accent-foreground py-0 justify-center">
            <CardContent className="px-5">
              <p className="text-gray-400 text-sm">Solved</p>
              <h2 className="text-3xl font-semibold text-primary">
                {data?.profileData.solvedQuestions.length}
              </h2>
            </CardContent>
          </Card>

          <Card className="bg-accent-foreground py-0">
            <CardContent className="p-5">
              <p className="text-gray-400 text-sm">Total Problems</p>
              <h2 className="text-3xl font-semibold text-primary">
                {data?.profileData.questions.length ?? 0}
              </h2>
            </CardContent>
          </Card>

          <Card className="bg-accent-foreground py-0">
            <CardContent className="p-5">
              <div className="flex justify-between items-end">
                <p className="text-gray-400 text-sm">Streak</p>
                <Tooltip>
                  <TooltipTrigger>
                    <Info className="text-white size-4" />
                  </TooltipTrigger>
                  <TooltipContent className="font-sans max-w-70">
                    <p className="text-sm">
                      A day is counted only when you solve all the problems
                      assigned for that day.
                    </p>
                  </TooltipContent>
                </Tooltip>
              </div>
              <h2 className="text-3xl font-semibold text-primary">
                {data?.profileData.streak} days 🙂
              </h2>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <div>
          <h1 className="text-white font-semibold text-lg">
            Problem Solving Statistics
          </h1>
          <div className="flex items-center gap-2 mb-3 text-sm text-gray-500">
            <h1>( Easy - 800-1000,</h1>
            <h1>Medium - 1000-1200,</h1>
            <h1>Hard - 1200-1400,</h1>
            <h1>Expert - 1400+ )</h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Pie Chart */}
            <Card className={`bg-accent-foreground py-6 ${CHART_CARD_HEIGHT}`}>
              <CardContent className="px-6 flex flex-col h-full">
                <h3 className="text-white mb-4">Solved by Difficulty</h3>

                {hasSolvedAny ? (
                  <ResponsiveContainer width="100%" height={260}>
                    <PieChart>
                      <Pie
                        data={difficultyData}
                        dataKey="value"
                        nameKey="type"
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
                ) : (
                  <div className="flex-1 flex flex-col items-center justify-center text-gray-400 text-sm">
                    <p className="font-medium text-white">
                      No problems solved yet
                    </p>
                    <p>Solve your first problem to see stats here.</p>
                  </div>
                )}

                {hasSolvedAny && (
                  <div className="mt-4 flex flex-wrap gap-4 justify-center text-sm text-gray-400">
                    {difficultyData.map((item) => (
                      <div key={item.type} className="flex items-center gap-2">
                        <span
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: item.color }}
                        />
                        <span className="capitalize">{item.type}</span>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Bar Chart */}
            <Card className={`bg-accent-foreground py-6 ${CHART_CARD_HEIGHT}`}>
              <CardContent className="px-6 flex flex-col h-full">
                <h3 className="text-white mb-4">Solved by Rating</h3>

                {hasSolvedAny ? (
                  <ResponsiveContainer width="100%" height={260}>
                    <BarChart data={ratingData}>
                      <XAxis dataKey="type" stroke="#9ca3af" />
                      <YAxis stroke="#9ca3af" />
                      <RechartsTooltip />
                      <Bar
                        dataKey="value"
                        fill="#22c55e"
                        radius={[6, 6, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="flex-1 flex flex-col items-center justify-center text-gray-400 text-sm">
                    <p className="font-medium text-white">
                      No rating data yet
                    </p>
                    <p className="text-center">Your progress will appear once you solve problems.</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* User settings */}
        <Card className="bg-accent-foreground">
          <CardContent className="px-6">
            <h3 className="text-white">Account Settings</h3>
            <p className="text-destructive mb-4 text-sm">
              Note: Changes will apply to the questions you will recieve the next
              day or when today's questions time is over.
            </p>
            <Settings />
          </CardContent>
        </Card>
      </div>

      {openCodeforcesDialog && <CodeforcesDialog />}
    </div>
  );
};

export default ProfilePage;