import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "@/pages/home/page";
import { ThemeProvider } from "@/components/theme-provider";
import LoginPage from "@/pages/auth/login/page";
import RegisterPage from "@/pages/auth/register/page";

function App() {
  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
}

export default App;
