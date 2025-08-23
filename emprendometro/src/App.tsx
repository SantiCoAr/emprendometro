import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { TestProvider } from "./context/TestContext";
import Header from "./components/Header";

import StartPage from "./pages/StartPage";
import TestPage from "./pages/TestPage";
import ResultPage from "./pages/ResultPage";
import LoginPage from "./pages/LoginPage";
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <TestProvider>
          <Header />
          <Routes>
            <Route path="/" element={<StartPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route
              path="/test"
              element={
                <ProtectedRoute forbidCompleted>
                  <TestPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/result"
              element={
                <ProtectedRoute requireCompleted>
                  <ResultPage />
                </ProtectedRoute>
              }
            />
          </Routes>
        </TestProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}


