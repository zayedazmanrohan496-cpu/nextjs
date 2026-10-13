"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { ICard } from "@/types/apps.types";

interface PlanContextType {
  todaysPlan: ICard[];
  savedPlan: ICard[];
  addToPlan: (card: ICard) => void;
  addToSaved: (card: ICard) => void;
  removeFromPlan: (id: number) => void;
  removeFromSaved: (id: number) => void;
  clearPlan: () => void;
}

export const PlanContext = createContext<PlanContextType | undefined>(undefined);

export const PlanProvider = ({ children }: { children: ReactNode }) => {
  const [todaysPlan, setTodaysPlan] = useState<ICard[]>([]);
  const [savedPlan, setSavedPlan] = useState<ICard[]>([]);

  const addToPlan = (card: ICard) => {
    setTodaysPlan((prev) => {
      if (prev.some((item) => item.id === card.id)) return prev;
      return [...prev, card];
    });
  };

  const addToSaved = (card: ICard) => {
    setSavedPlan((prev) => {
      if (prev.some((item) => item.id === card.id)) return prev;
      return [...prev, card];
    });
  };

  const removeFromPlan = (id: number) => {
    setTodaysPlan((prev) => prev.filter((item) => item.id !== id));
  };

  const removeFromSaved = (id: number) => {
    setSavedPlan((prev) => prev.filter((item) => item.id !== id));
  };

  const clearPlan = () => setTodaysPlan([]);

  return (
    <PlanContext.Provider
      value={{
        todaysPlan,
        savedPlan,
        addToPlan,
        addToSaved,
        removeFromPlan,
        removeFromSaved,
        clearPlan,
      }}
    >
      {children}
    </PlanContext.Provider>
  );
};

export const usePlan = () => {
  const context = useContext(PlanContext);
  if (!context) {
    throw new Error("usePlan must be used within a PlanProvider");
  }
  return context;
};