import { BrowserRouter, Routes, Route } from "react-router-dom";
import StartPage from "./pages/StartPage";
import TestPage from "./pages/TestPage";
import ResultPage from "./pages/ResultPage";
import { TestProvider } from "./context/TestContext";

function App() {
  return (
    <TestProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<StartPage />} />
          <Route path="/test" element={<TestPage />} />
          <Route path="/result" element={<ResultPage />} />
        </Routes>
      </BrowserRouter>
    </TestProvider>
  );
}

export default App;

