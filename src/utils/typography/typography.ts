import {
    SxProps,
    Theme
} from "@mui/material";
import { pxToRem } from "@/utils/unitConverter/unitConverter";

type Sx = SxProps<Theme> | undefined;

export type Typography = {
    BodyLarge: (arg0: Theme) => Sx;
    HeadlineMedium: (arg0: Theme) => Sx;
    TitleMedium: (arg0: Theme) => Sx;
};

export const typography: Typography = {
    BodyLarge: (theme) => ({
        [theme.breakpoints.up(0)]: {
            fontFamily: "var(--font-roboto)",
            fontSize: pxToRem(16),
            fontWeight: 400,
            letterSpacing: pxToRem(0.5),
            lineHeight: pxToRem(24)
        }
    }),
    HeadlineMedium: (theme) => ({
        [theme.breakpoints.up(0)]: {
            fontFamily: "var(--font-roboto)",
            fontSize: pxToRem(20),
            fontWeight: 400,
            lineHeight: pxToRem(36)
        }
    }),
    TitleMedium: (theme) => ({
        [theme.breakpoints.up(0)]: {
            fontFamily: "var(--font-roboto)",
            fontSize: pxToRem(16),
            fontWeight: 500,
            letterSpacing: pxToRem(0.15),
            lineHeight: pxToRem(24)
        }
    })
};