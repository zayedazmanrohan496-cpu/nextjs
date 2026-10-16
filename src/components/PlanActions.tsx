"use client";

import React from "react";
import { usePlan } from "@/context/PlanContext";
import { ICard } from "@/types/apps.types";
import { Check, Bookmark, Calendar } from "lucide-react";
import { toast } from "react-toastify";

interface PlanActionsProps {
  plan: ICard;
}

const PlanActions: React.FC<PlanActionsProps> = ({ plan }) => {
  const { todaysPlan, savedPlan, addToPlan, addToSaved } = usePlan();

  const isAddedToToday = todaysPlan.some((item) => item.id === plan.id);
  const isSaved = savedPlan.some((item) => item.id === plan.id);

  const handleAddToPlan = () => {
    if (isAddedToToday) {
      toast.error("Already added to today's plan!", {
        position: "top-right",
        autoClose: 2500,
        theme: "light",
      });
      return;
    }

    addToPlan(plan);
    toast.success("Added to today's plan", {
      position: "top-right",
      autoClose: 2500,
      theme: "light",
    });
  };

  const handleAddToSaved = () => {
    if (isSaved) {
      toast.error("Already saved for later!", {
        position: "top-right",
        autoClose: 2500,
        theme: "light",
      });
      return;
    }

    addToSaved(plan);
    toast.success("Saved for later", {
      position: "top-right",
      autoClose: 2500,
      theme: "light",
    });
  };

  return (
    <div className="flex flex-wrap sm:flex-nowrap gap-4 pt-2">
      {/* Add to Today's Plan Button */}
      <button
        onClick={handleAddToPlan}
        className={`flex-1 font-extrabold py-3.5 px-6 rounded-2xl flex items-center justify-center gap-2 transition text-sm tracking-wide cursor-pointer ${
          isAddedToToday
            ? "bg-zinc-800 text-[#ccff00] border border-[#ccff00]/40"
            : "bg-[#ccff00] text-black hover:bg-lime-400"
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
        onClick={handleAddToSaved}
        className={`border font-semibold py-3.5 px-6 rounded-2xl flex items-center justify-center gap-2 transition text-sm tracking-wide cursor-pointer ${
          isSaved
            ? "bg-zinc-800/80 text-zinc-400 border-zinc-700"
            : "border-neutral-700 bg-neutral-900/40 text-neutral-200 hover:bg-neutral-800"
        }`}
      >
        <Bookmark className="w-4 h-4" />
        {isSaved ? "Saved" : "Save for later"}
      </button>
    </div>
  );
};

export default PlanActions;

