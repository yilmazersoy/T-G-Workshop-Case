// src/theme.ts
import { createTheme } from "@mui/material/styles";

type PaletteMode = "light" | "dark";

const cssVarsMap: Record<PaletteMode, Record<string, string>> = {
    light: {
        "--primary-color": "#673ab7",
        "--secondary-color": "#009688",
        "--background-color": "#f5f5f5",
        "--text-color": "#222",
        "--button": "#673ab7",
    },
    dark: {
        "--primary-color": "#90caf9",
        "--secondary-color": "#f48fb1",
        "--background-color": "#121212",
        "--text-color": "#fff",
        "--button": "#673ab7",
    },
};

export const getMuiTheme = (mode: PaletteMode) =>
    createTheme({
        palette: {
            mode,
            primary: { main: cssVarsMap[mode]["--primary-color"] },
            secondary: { main: cssVarsMap[mode]["--secondary-color"] },
            background: { default: cssVarsMap[mode]["--background-color"] },
            text: { primary: cssVarsMap[mode]["--text-color"] },
        },
        typography: {
            fontFamily: "Inter, sans-serif",
        },
    });

export function applyCssVariables(mode: PaletteMode) {
    const root = document.documentElement;
    const vars = cssVarsMap[mode];
    for (const key in vars) {
        root.style.setProperty(key, vars[key]);
    }
}
