import { useThemeStore } from "@/stores";
import { useEffect } from "react";

const ThemeProvider = () => {
  const theme = useThemeStore((state) => state.theme);

  useEffect(() => {
    const htmlTag = document.documentElement;

    if (theme === 'dark') {
      htmlTag.classList.add('dark');
      htmlTag.classList.remove('light');
    } else {
      htmlTag.classList.add('light');
      htmlTag.classList.remove('dark');
    }

  }, [theme]);


  return null;
}

export default ThemeProvider
