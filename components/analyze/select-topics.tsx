"use client";

import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AnalyzeData, SelectTopicsProps } from "@/lib/types/global.types";
import { profileStore } from "@/store/profile.store";
import { X } from "lucide-react";
import { toast } from "sonner";

const SelectTopics = ({ type } : SelectTopicsProps) => {
    const topics = [
        "Math",
        "Greedy",
        "Two Pointers",
        "Prefix / Difference Array",
        "Binary Search",
        "Bit Manipulation",
        "DFS / BFS",
        "Graphs",
        "Trees",
        "DP",
        "Number Theory",
        "Geometry",
        "Strings",
        "Data Structures (Segment Tree, Fenwick)"
    ];

    const { experiencedTopics, improveTopics, setExperiencedTopics, setImproveTopics } = profileStore();
    
    const selectedType = type === "improve" ? improveTopics : experiencedTopics;
    const placeholderText = type === "improve" ? "Select a topic you want to improve (at max 3)" : "Select topics you are experienced in";

    const handleChange = (value: string) => {
        if(type === "improve") {
            if(improveTopics.length === 3) {
                toast("You can select at most 3 improve topics");
                return;
            }
            setImproveTopics([...improveTopics, value]);
        } else {
            setExperiencedTopics([...experiencedTopics, value]);
        }
    }

    const handleRemove = (topic: string) => {
        if(type === "improve") {
            const updated = improveTopics.filter(t => t !== topic);
            setImproveTopics(updated);
        } else {
            const updated = experiencedTopics.filter(t => t !== topic);
            setExperiencedTopics(updated);
        }
    }
    return (
        <div className="flex flex-col gap-2 relative">
            <label htmlFor="" className="text-white">{placeholderText}</label>
            <Select onValueChange={handleChange}>
                <SelectTrigger className="w-full text-primary">
                    <SelectValue placeholder="Topics" className="text-primary" />
                </SelectTrigger>
                <SelectContent position="popper">
                    <SelectGroup className="font-sans max-h-48 overflow-y-auto">
                        <SelectLabel>Topics</SelectLabel>
                        {topics.map((topic, index) => (
                            <SelectItem key={index} value={topic}>{topic}</SelectItem>
                        ))}
                    </SelectGroup>
                </SelectContent>
            </Select>
            {selectedType?.length > 0 && (
                <div className="flex flex-wrap items-center gap-2">
                    {selectedType.map((topic, index) => (
                        <div key={index} className="flex items-center gap-2 px-4 py-1 rounded-xl bg-primary text-white w-fit text-sm">
                            {topic}
                            <X onClick={() => handleRemove(topic)} className="size-3 mt-0.5 hover:text-red-500 transition-colors" />
                        </div>
                    ))}
                </div>
            )}
        </div>   
    )
}

export default SelectTopics;