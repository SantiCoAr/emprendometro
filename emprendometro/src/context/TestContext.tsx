// src/context/TestContext.tsx
import { createContext, useReducer, type Dispatch } from "react";

type Answers = Record<string | number, number>;

type State = {
  index: number;
  answers: Answers;
};

type Action =
  | { type: "ANSWER"; id: string | number; value: number }
  | { type: "NEXT" }
  | { type: "PREV" }
  | { type: "RESET" };

const initialState: State = {
  index: 0,
  answers: {},
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "ANSWER":
      return {
        ...state,
        answers: { ...state.answers, [action.id]: action.value }, // inmutable
      };
    case "NEXT":
      return { ...state, index: state.index + 1 };
    case "PREV":
      return { ...state, index: Math.max(0, state.index - 1) };
    case "RESET":
      return initialState;
    default:
      return state;
  }
}

export const TestContext = createContext<{
  state: State;
  dispatch: Dispatch<Action>;
}>({
  state: initialState,
  dispatch: () => undefined,
});

export function TestProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <TestContext.Provider value={{ state, dispatch }}>
      {children}
    </TestContext.Provider>
  );
}
