import { useState, useEffect, useCallback } from "react";
import "./App.css";
import PrimarySearchAppBar from "./components/NavBar";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { darkTheme, lightTheme } from "./common/theme";

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
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <CssBaseline />
      <PrimarySearchAppBar toggleTheme={toggleTheme} isDarkMode={isDarkMode} />
    </ThemeProvider>
  );
};

export default App;
