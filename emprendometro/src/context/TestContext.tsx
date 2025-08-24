import { createContext, useReducer } from "react";
import type { Dispatch, ReactNode } from "react";

/** --- Estado y acciones --- */
type AnswerValue = number; // 0..3
export type TestState = {
  index: number;
  answers: Record<number, AnswerValue>;
};

const initialState: TestState = {
  index: 0,
  answers: {},
};

type Action =
  | { type: "ANSWER"; id: number; value: AnswerValue }
  | { type: "NEXT" }
  | { type: "PREV" }
  | { type: "RESET" };

function reducer(state: TestState, action: Action): TestState {
  switch (action.type) {
    case "ANSWER":
      return {
        ...state,
        answers: { ...state.answers, [action.id]: action.value },
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

/** --- Contexto --- */
export const TestContext = createContext<{
  state: TestState;
  dispatch: Dispatch<Action>;
}>({
  state: initialState,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  dispatch: () => {},
});

/** --- Provider --- */
export function TestProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <TestContext.Provider value={{ state, dispatch }}>
      {children}
    </TestContext.Provider>
  );
}
