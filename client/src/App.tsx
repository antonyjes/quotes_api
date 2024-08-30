import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/home/page";
import { ThemeProvider } from "@/components/theme-provider";

function App() {
  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
}

export default App;
