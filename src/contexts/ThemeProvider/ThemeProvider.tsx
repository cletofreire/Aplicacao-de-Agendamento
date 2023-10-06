'use client';

import React from "react";
import { PaletteMode } from "@mui/material";
import { theme as themeObject } from "@/app/theme";

export type ThemeContextObject = {
    mode: PaletteMode;
    update: React.Dispatch<React.SetStateAction<PaletteMode>>;
};

export type ThemeProviderProps = {
    children: React.ReactNode;
};

export const ThemeContext = React.createContext<ThemeContextObject>({} as ThemeContextObject);

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
    const [theme, setTheme] = React.useState<PaletteMode>(themeObject.palette.mode);

    React.useLayoutEffect(() => {
        document.body.style.backgroundColor = themeObject.palette[theme].surface;
    }, [theme]);

    return (
        <ThemeContext.Provider
            value={{
                mode: theme,
                update: setTheme
            }}
        >
            {children}
        </ThemeContext.Provider>
    );
};