import { useState, useEffect, useCallback } from "react";
import "./App.css";
import PrimarySearchAppBar from "./components/NavBar";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { darkTheme, lightTheme } from "./common/theme";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserAuthForm from "./pages/UserAuthForm";

const useThemeMode = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);

  const toggleTheme = useCallback(() => {
    setIsDarkMode((prevMode) => !prevMode);
    // Optional: You can add localStorage to persist theme preference
    localStorage.setItem("theme", !isDarkMode ? "dark" : "light");
  }, [isDarkMode]);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setIsDarkMode(true);
    }
  }, []);

  return { isDarkMode, toggleTheme };
};

const App = () => {
  const { isDarkMode, toggleTheme } = useThemeMode();

  return (
    <BrowserRouter>
      <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
        <CssBaseline />

        <Routes>
          <Route
            path="/"
            element={
              <PrimarySearchAppBar
                toggleTheme={toggleTheme}
                isDarkMode={isDarkMode}
              />
            }
          >
            <Route path="signin" element={<UserAuthForm type="signin" />} />
            <Route path="signup" element={<UserAuthForm type="signup" />} />
          </Route>
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default App;
