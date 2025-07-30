// src/context/TestContext.tsx
import React, { createContext, useReducer } from "react";
import type { ReactNode } from "react";
import { questions } from "../data/questions";

type AnswerMap = Record<string, number>; // id -> value

interface State {
  index: number;
  answers: AnswerMap;
}

type Action =
  | { type: "ANSWER"; id: string; value: number }
  | { type: "NEXT" }
  | { type: "PREV" }
  | { type: "RESET" };

const initialState: State = { index: 0, answers: {} };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "ANSWER":
      return { ...state, answers: { ...state.answers, [action.id]: action.value } };
    case "NEXT":
      return { ...state, index: state.index + 1 };
    case "PREV":
      return { ...state, index: state.index - 1 };
    case "RESET":
      return initialState;
    default:
      return state;
  }
}

export const TestContext = createContext<{
  state: State;
  dispatch: React.Dispatch<Action>;
}>({ state: initialState, dispatch: () => null });

export const TestProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <TestContext.Provider value={{ state, dispatch }}>
      {children}
    </TestContext.Provider>
  );
};
