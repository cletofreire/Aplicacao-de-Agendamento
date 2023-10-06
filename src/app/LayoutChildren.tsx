'use client';

import { ThemeProvider as MUIThemeProvider } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterLuxon } from "@mui/x-date-pickers/AdapterLuxon";
import { theme } from "@/app/theme";
import { ThemeProvider } from "@/contexts/ThemeProvider/ThemeProvider";

export type LayoutChildrenProps = {
    children: React.ReactNode;
};

export const LayoutChildren = ({
    children
}: LayoutChildrenProps) => (
    <LocalizationProvider dateAdapter={AdapterLuxon}>
        <MUIThemeProvider theme={theme}>
            <ThemeProvider>
                {children}
            </ThemeProvider>
        </MUIThemeProvider>
    </LocalizationProvider>
);