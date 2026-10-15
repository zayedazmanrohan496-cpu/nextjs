"use client";

import React from "react";
import { usePlan } from "@/context/PlanContext";
import { ICard } from "@/types/apps.types";
import { Check, Bookmark, Calendar } from "lucide-react";

interface PlanActionsProps {
  plan: ICard;
}

const PlanActions: React.FC<PlanActionsProps> = ({ plan }) => {
  const { todaysPlan, savedPlan, addToPlan, addToSaved } = usePlan();

  const isAddedToToday = todaysPlan.some((item) => item.id === plan.id);
  const isSaved = savedPlan.some((item) => item.id === plan.id);

  return (
    <div className="flex flex-wrap sm:flex-nowrap gap-4 pt-2">
      {/* Add to Today's Plan Button */}
      <button
        onClick={() => addToPlan(plan)}
        disabled={isAddedToToday}
        className={`flex-1 font-extrabold py-3.5 px-6 rounded-2xl flex items-center justify-center gap-2 transition text-sm tracking-wide ${
          isAddedToToday
            ? "bg-zinc-800 text-[#ccff00] border border-[#ccff00]/40 cursor-default"
            : "bg-[#ccff00] text-black hover:bg-lime-400 cursor-pointer"
        }`}
      >
        {isAddedToToday ? (
          <>
            <Check className="w-4 h-4 stroke-[3]" /> Added to today's plan
          </>
        ) : (
          <>
            <Calendar className="w-4 h-4" /> Add to today's plan
          </>
        )}
      </button>

      {/* Save for Later Button */}
      <button
        onClick={() => addToSaved(plan)}
        disabled={isSaved}
        className={`border font-semibold py-3.5 px-6 rounded-2xl flex items-center justify-center gap-2 transition text-sm tracking-wide ${
          isSaved
            ? "bg-zinc-800/80 text-zinc-400 border-zinc-700 cursor-default"
            : "border-neutral-700 bg-neutral-900/40 text-neutral-200 hover:bg-neutral-800 cursor-pointer"
        }`}
      >
        <Bookmark className="w-4 h-4" />
        {isSaved ? "Saved" : "Save for later"}
      </button>
    </div>
  );
};

export default PlanActions;