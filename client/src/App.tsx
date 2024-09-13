import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "@/pages/home/page";
import { ThemeProvider } from "@/components/theme-provider";
import LoginPage from "@/pages/auth/login/page";
import RegisterPage from "@/pages/auth/register/page";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"
import QuotePage from "@/pages/quote/page";
import { useSelector } from "react-redux";
import { User } from "@/lib/data";
import CreateQuotePage from "@/pages/quote/create";

function App() {
  const isAuth = Boolean(useSelector((state: { user: User }) => state.user));

  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <ToastContainer />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/quotes/:quoteId" element={<QuotePage />} />
            <Route path="/quotes/create" element={isAuth ? <CreateQuotePage /> : <LoginPage />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
}

export default App;
