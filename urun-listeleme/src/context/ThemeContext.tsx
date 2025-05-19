import React, {
    createContext,
    useContext,
    useMemo,
    useState,
    useEffect,
} from "react";
import { ThemeProvider, CssBaseline, PaletteMode } from "@mui/material";
import { getMuiTheme, applyCssVariables } from "../theme/theme";

const ThemeContext = createContext({
    toggleTheme: () => {},
    mode: "light" as PaletteMode,
});

// eslint-disable-next-line react-refresh/only-export-components
export function useThemeToggle() {
    return useContext(ThemeContext);
}

export function CustomThemeProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const [mode, setMode] = useState<PaletteMode>("light");

    useEffect(() => {
        const stored = localStorage.getItem("theme");
        if (stored === "dark" || stored === "light") setMode(stored);
    }, []);

    useEffect(() => {
        localStorage.setItem("theme", mode);
        applyCssVariables(mode);
    }, [mode]);

    const theme = useMemo(() => getMuiTheme(mode), [mode]);

    const toggleTheme = () => {
        setMode((prev) => (prev === "light" ? "dark" : "light"));
    };

    return (
        <ThemeContext.Provider value={{ toggleTheme, mode }}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                {children}
            </ThemeProvider>
        </ThemeContext.Provider>
    );
}
