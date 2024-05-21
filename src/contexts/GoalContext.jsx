import { createContext, useContext, useState } from "react";

const GoalContext = createContext();

export function GoalProvider({ children }) {
  const [goals, setGoals] = useState([]);
  const [currentGoalText, setCurrentGoalText] = useState("");

  return (
    <GoalContext.Provider
      value={{
        goals,
        setGoals,
        currentGoalText,
        setCurrentGoalText,
      }}
    >
      {children}
    </GoalContext.Provider>
  );
}

export function useGoalContext() {
  return useContext(GoalContext);
}
