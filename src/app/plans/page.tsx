"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Clock, Flame, Star, X, ChevronDown, Check } from "lucide-react";
import { usePlan } from "@/context/PlanContext";
import { toast } from "react-toastify";

type SortOption = "duration" | "calories" | "rating";

const PlansPage = () => {
  const { todaysPlan, savedPlan, removeFromPlan, removeFromSaved } = usePlan();
  const [activeTab, setActiveTab] = useState<"today" | "saved">("today");
  const [completedIds, setCompletedIds] = useState<number[]>([]);
  const [sortBy, setSortBy] = useState<SortOption>("duration");
  const [isSortOpen, setIsSortOpen] = useState(false);

  const rawList = activeTab === "today" ? todaysPlan : savedPlan;

  // Dynamic Sorting Logic based on selected option
  const currentList = [...rawList].sort((a, b) => {
    if (sortBy === "duration") {
      return b.duration - a.duration;
    }
    if (sortBy === "calories") {
      return b.caloriesBurned - a.caloriesBurned;
    }
    if (sortBy === "rating") {
      return b.rating - a.rating;
    }
    return 0;
  });

  const totalExercises = currentList.length;
  const totalMinutes = currentList.reduce((acc, item) => acc + item.duration, 0);
  const totalCalories = currentList.reduce((acc, item) => acc + item.caloriesBurned, 0);

  const toggleComplete = (id: number) => {
    setCompletedIds((prev) =>
      prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id]
    );
  };

  const handleRemove = (id: number, name: string) => {
    if (activeTab === "today") {
      removeFromPlan(id);
      toast.error(`"${name}" removed from today's plan`, {
        position: "top-right",
        autoClose: 2500,
        theme: "light",
      });
    } else {
      removeFromSaved(id);
      toast.error(`"${name}" removed from saved list`, {
        position: "top-right",
        autoClose: 2500,
        theme: "light",
      });
    }
  };

  const sortLabels: Record<SortOption, string> = {
    duration: "Duration",
    calories: "Calories",
    rating: "Rating",
  };

  return (
    <div className="min-h-screen bg-black text-white py-6 sm:py-8 px-4 sm:px-6 w-full max-w-7xl mx-auto">
      {/* Page Title */}
      <div className="mb-6">
        <h2 className="text-white text-2xl sm:text-3xl font-black uppercase tracking-tight">
          MY PLAN
        </h2>
        <p className="text-zinc-400 text-xs sm:text-sm mt-1">
          Cap of five lifts for today. Finish them, then load more.
        </p>
      </div>

      {/* Top Stats Overview */}
      <div className="bg-[#13161c] border border-zinc-800/80 rounded-2xl p-4 sm:p-6 mb-6 sm:mb-8 grid grid-cols-3 divide-x divide-zinc-800/80">
        <div className="px-2 sm:px-4 first:pl-0 text-center sm:text-left">
          <p className="text-[10px] sm:text-xs text-zinc-400 font-medium mb-1">Exercises</p>
          <p className="text-2xl sm:text-4xl font-extrabold text-[#b4ff00]">{totalExercises}</p>
        </div>
        <div className="px-2 sm:px-6 text-center sm:text-left">
          <p className="text-[10px] sm:text-xs text-zinc-400 font-medium mb-1">Minutes</p>
          <p className="text-2xl sm:text-4xl font-extrabold text-white">{totalMinutes}</p>
        </div>
        <div className="px-2 sm:px-6 text-center sm:text-left">
          <p className="text-[10px] sm:text-xs text-zinc-400 font-medium mb-1">Calories</p>
          <p className="text-2xl sm:text-4xl font-extrabold text-white">{totalCalories}</p>
        </div>
      </div>

      {/* Tabs and Sort Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-6 relative">
        <div className="bg-[#13161c] p-1 rounded-xl border border-zinc-800/80 flex sm:inline-flex">
          <button
            onClick={() => setActiveTab("today")}
            className={`flex-1 sm:flex-none px-4 sm:px-5 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
              activeTab === "today"
                ? "bg-[#1e232d] text-white shadow-sm"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            Today's Plan
          </button>
          <button
            onClick={() => setActiveTab("saved")}
            className={`flex-1 sm:flex-none px-4 sm:px-5 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
              activeTab === "saved"
                ? "bg-[#1e232d] text-white shadow-sm"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            Saved
          </button>
        </div>

        {/* Dynamic Sort Dropdown */}
        <div className="relative flex items-center justify-between sm:justify-end gap-2 text-xs sm:text-sm">
          <span className="text-zinc-400 font-medium">Sort By</span>
          
          <div className="relative">
            <button
              onClick={() => setIsSortOpen((prev) => !prev)}
              className="bg-[#13161c] border border-zinc-800 text-white px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm flex items-center gap-2 cursor-pointer hover:border-zinc-700 transition"
            >
              <span>{sortLabels[sortBy]}</span>
              <ChevronDown className={`w-4 h-4 text-zinc-400 transition-transform ${isSortOpen ? "rotate-180" : ""}`} />
            </button>

            {isSortOpen && (
              <div className="absolute right-0 mt-2 w-36 bg-[#13161c] border border-zinc-800 rounded-xl shadow-xl z-20 py-1">
                {(["duration", "calories", "rating"] as SortOption[]).map((option) => (
                  <button
                    key={option}
                    onClick={() => {
                      setSortBy(option);
                      setIsSortOpen(false);
                    }}
                    className={`w-full text-left px-4 py-2 text-xs sm:text-sm transition hover:bg-[#1e232d] ${
                      sortBy === option ? "text-[#b4ff00] font-bold" : "text-zinc-300"
                    }`}
                  >
                    {sortLabels[option]}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Empty State vs List State */}
      {currentList.length === 0 ? (
        <div className="border border-dashed border-zinc-800 rounded-2xl p-8 sm:p-16 flex flex-col items-center justify-center text-center my-4 bg-zinc-950/40">
          <h3 className="text-lg sm:text-xl font-black uppercase text-white tracking-wide mb-2">
            NOTHING HERE YET
          </h3>
          <p className="text-xs sm:text-sm text-zinc-400 mb-6">
            Browse the library and add a lift to get today moving.
          </p>
          <Link
            href="/"
            className="bg-[#b4ff00] hover:bg-[#a0e600] text-black font-bold px-6 py-3 rounded-full text-xs sm:text-sm transition-all"
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
                className="bg-[#13161c] border border-zinc-800/80 rounded-2xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-zinc-700 transition-colors"
              >
                {/* Left Item Info */}
                <div className="flex items-start sm:items-center gap-3 sm:gap-4">
                  <div className="relative w-24 h-20 sm:w-28 sm:h-20 rounded-xl overflow-hidden bg-zinc-800 flex-shrink-0">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div>
                    <h4 className="font-extrabold text-white text-base sm:text-lg tracking-wide uppercase">
                      {item.name}
                    </h4>
                    <p className="text-xs text-zinc-400 font-medium mb-2 sm:mb-3">
                      {item.equipment}
                    </p>
                    <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-[11px] sm:text-xs font-semibold text-zinc-300">
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

                {/* Right Action Buttons */}
                <div className="flex items-center justify-between md:justify-end gap-2 sm:gap-3 pt-3 md:pt-0 border-t border-zinc-800/60 md:border-t-0">
                  <Link
                    href={`/plans/${item.name.toLowerCase().replace(/\s+/g, '-')}`}
                    className="flex-1 md:flex-none text-center px-3 sm:px-4 py-2 bg-[#1c212b] hover:bg-[#252c39] border border-zinc-700/60 rounded-xl text-xs font-semibold text-zinc-200"
                  >
                    View Details
                  </Link>

                  {activeTab === "today" && (
                    <button
                      onClick={() => toggleComplete(item.id)}
                      className={`flex-1 md:flex-none justify-center px-3 sm:px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
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
                    onClick={() => handleRemove(item.id, item.name)}
                    className="p-2 text-zinc-500 hover:text-zinc-300 transition-colors cursor-pointer"
                    aria-label="Remove item"
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