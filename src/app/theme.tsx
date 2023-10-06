'use client';

import { createTheme } from "@mui/material";

declare module "@mui/material/styles" {
    interface Palette {
        "dark": {
            "error": string;
            "on-primary": string;
            "on-surface": string;
            "on-surface-variant": string;
            "outline-variant": string;
            "primary": string;
            "primary-container": string;
            "surface": string;
            "surface-container": string;
            "surface-container-high": string;
            "tertiary": string;
            "default": string;
        };
        "light": {
            "error": string;
            "on-primary": string;
            "on-surface": string;
            "on-surface-variant": string;
            "outline-variant": string;
            "primary": string;
            "primary-container": string;
            "surface": string;
            "surface-container": string;
            "surface-container-high": string;
            "tertiary": string;
            "default": string;
        };
    }

    interface PaletteOptions {
        "dark"?: {
            "error"?: string;
            "on-primary"?: string;
            "on-surface"?: string;
            "on-surface-variant"?: string;
            "outline-variant"?: string;
            "primary"?: string;
            "primary-container"?: string;
            "surface"?: string;
            "surface-container"?: string;
            "surface-container-high"?: string;
            "tertiary"?: string;
            "default"?: string;
        };
        "light"?: {
            "error"?: string;
            "on-primary"?: string;
            "on-surface"?: string;
            "on-surface-variant"?: string;
            "outline-variant"?: string;
            "primary"?: string;
            "primary-container"?: string;
            "surface"?: string;
            "surface-container"?: string;
            "surface-container-high"?: string;
            "tertiary"?: string;
            "default"?: string;
        }
    }
};

export const theme = createTheme({
    "palette": {
        "dark": {
            "error": "#FFB4AB",
            "on-primary": "#00391F",
            "on-surface": "#C5C7C3",
            "on-surface-variant": "#C0C9C0",
            "outline-variant": "#414942",
            "primary": "#78DAA0",
            "primary-container": "#005230",
            "surface": "#111412",
            "surface-container": "#1D201E",
            "surface-container-high": "#282B28",
            "tertiary": "#A3CDDB",
            "default": "#FFFFFF"
        },
        "light": {
            "error": "#BA1A1A",
            "on-primary": "#FFFFFF",
            "on-surface": "#191C1A",
            "on-surface-variant": "#414942",
            "outline-variant": "#C0C9C0",
            "primary": "#006D41",
            "primary-container": "#94F7BA",
            "surface": "#F8FAF5",
            "surface-container": "#EDEEEA",
            "surface-container-high": "#E7E9E4",
            "tertiary": "#3B6470",
            "default": "#000000"
        },
        "mode": "dark"
    }
});