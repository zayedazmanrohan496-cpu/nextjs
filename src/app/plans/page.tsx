"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Clock, Flame, Star, X, ChevronDown, Check } from "lucide-react";
import { usePlan } from "@/context/PlanContext";

const PlansPage = () => {
  const { todaysPlan, savedPlan, removeFromPlan, removeFromSaved } = usePlan();
  const [activeTab, setActiveTab] = useState<"today" | "saved">("today");
  const [completedIds, setCompletedIds] = useState<number[]>([]);

  const currentList = activeTab === "today" ? todaysPlan : savedPlan;

  const totalExercises = currentList.length;
  const totalMinutes = currentList.reduce((acc, item) => acc + item.duration, 0);
  const totalCalories = currentList.reduce((acc, item) => acc + item.caloriesBurned, 0);

  const toggleComplete = (id: number) => {
    setCompletedIds((prev) =>
      prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id]
    );
  };

  const handleRemove = (id: number) => {
    if (activeTab === "today") {
      removeFromPlan(id);
    } else {
      removeFromSaved(id);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white py-8 px-6 w-full max-w-7xl mx-auto">
      <div className="mb-6">
        <h2 className="text-white text-3xl font-black uppercase tracking-tight">
          MY PLAN
        </h2>
        <p className="text-zinc-400 text-sm mt-1">
          Cap of five lifts for today. Finish them, then load more.
        </p>
      </div>

      <div className="bg-[#13161c] border border-zinc-800/80 rounded-2xl p-6 mb-8 grid grid-cols-3 divide-x divide-zinc-800/80">
        <div className="px-4 first:pl-0">
          <p className="text-xs text-zinc-400 font-medium mb-1">Exercises</p>
          <p className="text-4xl font-extrabold text-[#b4ff00]">{totalExercises}</p>
        </div>
        <div className="px-6">
          <p className="text-xs text-zinc-400 font-medium mb-1">Minutes</p>
          <p className="text-4xl font-extrabold text-white">{totalMinutes}</p>
        </div>
        <div className="px-6">
          <p className="text-xs text-zinc-400 font-medium mb-1">Calories</p>
          <p className="text-4xl font-extrabold text-white">{totalCalories}</p>
        </div>
      </div>

      <div className="flex items-center justify-between mb-6">
        <div className="bg-[#13161c] p-1 rounded-xl border border-zinc-800/80 inline-flex">
          <button
            onClick={() => setActiveTab("today")}
            className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all ${
              activeTab === "today"
                ? "bg-[#1e232d] text-white shadow-sm"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            Today's Plan
          </button>
          <button
            onClick={() => setActiveTab("saved")}
            className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all ${
              activeTab === "saved"
                ? "bg-[#1e232d] text-white shadow-sm"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            Saved
          </button>
        </div>

        <div className="flex items-center gap-2 text-sm">
          <span className="text-zinc-400 font-medium">Sort By</span>
          <button className="bg-[#13161c] border border-zinc-800 text-white px-4 py-2 rounded-xl text-sm flex items-center gap-2">
            <span>Duration</span>
            <ChevronDown className="w-4 h-4 text-zinc-400" />
          </button>
        </div>
      </div>

      {currentList.length === 0 ? (
        <div className="border border-dashed border-zinc-800 rounded-2xl p-16 flex flex-col items-center justify-center text-center my-4 bg-zinc-950/40">
          <h3 className="text-xl font-black uppercase text-white tracking-wide mb-2">
            NOTHING HERE YET
          </h3>
          <p className="text-sm text-zinc-400 mb-6">
            Browse the library and add a lift to get today moving.
          </p>
          <Link
            href="/"
            className="bg-[#b4ff00] hover:bg-[#a0e600] text-black font-bold px-6 py-3 rounded-full text-sm transition-all"
          >
            Go to workouts
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {currentList.map((item) => {
            const isCompleted = completedIds.includes(item.id);
            return (
              <div
                key={item.id}
                className="bg-[#13161c] border border-zinc-800/80 rounded-2xl p-4 flex items-center justify-between hover:border-zinc-700 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="relative w-28 h-20 rounded-xl overflow-hidden bg-zinc-800 flex-shrink-0">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div>
                    <h4 className="font-extrabold text-[#ffffff] text-lg tracking-wide uppercase">
                      {item.name}
                    </h4>
                    <p className="text-xs text-zinc-400 font-medium mb-3">
                      {item.equipment}
                    </p>
                    <div className="flex items-center gap-4 text-xs font-semibold text-zinc-300">
                      <div className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-[#b4ff00]" />
                        <span>{item.duration} min</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Flame className="w-3.5 h-3.5 text-[#b4ff00]" />
                        <span>{item.caloriesBurned} kcal</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="w-3.5 h-3.5 text-[#b4ff00] fill-[#b4ff00]" />
                        <span>{item.rating}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Link
                    href={`/plans/${item.name.toLowerCase().replace(/\s+/g, '-')}`}
                    className="px-4 py-2 bg-[#1c212b] hover:bg-[#252c39] border border-zinc-700/60 rounded-xl text-xs font-semibold text-zinc-200"
                  >
                    View Details
                  </Link>

                  {activeTab === "today" && (
                    <button
                      onClick={() => toggleComplete(item.id)}
                      className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                        isCompleted
                          ? "bg-zinc-800 text-zinc-300"
                          : "bg-[#b4ff00] hover:bg-[#a0e600] text-black"
                      }`}
                    >
                      <Check className="w-4 h-4 stroke-[3]" />
                      {isCompleted ? "Completed" : "Mark as Done"}
                    </button>
                  )}

                  <button
                    onClick={() => handleRemove(item.id)}
                    className="p-2 text-zinc-500 hover:text-zinc-300 transition-colors cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default PlansPage;