import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "@/pages/home/page";
import { ThemeProvider } from "@/components/theme-provider";
import LoginPage from "@/pages/auth/login/page";
import RegisterPage from "@/pages/auth/register/page";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"
import QuotePage from "@/pages/quotes/page";
import { useSelector } from "react-redux";
import { User } from "@/lib/data";
import CreateQuotePage from "@/pages/quotes/create/page";
import FavoritesPage from "@/pages/favorites/page";
import AuthorsPage from "@/pages/authors/page";
import TopicsPage from "@/pages/topics/page";

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
            <Route path="/favorites" element={isAuth ? <FavoritesPage /> : <LoginPage />} />
            <Route path="/authors" element={<AuthorsPage />} />
            <Route path="/topics" element={<TopicsPage />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
}

export default App;
