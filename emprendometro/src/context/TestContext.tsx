import { createContext, useReducer, type Dispatch } from "react";

export type AnswersMap = Record<string, number>;

type State = {
  index: number;
  answers: AnswersMap;
};

type Action =
  | { type: "ANSWER"; id: string; value: number }
  | { type: "NEXT" }
  | { type: "PREV" }
  | { type: "RESET" }
  | { type: "GOTO"; index: number };

const initialState: State = {
  index: 0,
  answers: {},
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "ANSWER": {
      // NUNCA mutar; siempre copiar
      return {
        ...state,
        answers: { ...state.answers, [action.id]: action.value },
      };
    }
    case "NEXT":
      return { ...state, index: state.index + 1 };
    case "PREV":
      return { ...state, index: Math.max(0, state.index - 1) };
    case "GOTO":
      return { ...state, index: Math.max(0, action.index) };
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
  dispatch: () => {},
});

export function TestProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <TestContext.Provider value={{ state, dispatch }}>
      {children}
    </TestContext.Provider>
  );
}

