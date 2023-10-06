'use client';

import React from "react";
import {
    ButtonBase,
    ButtonBaseProps,
    Palette,
    PaletteMode,
    SxProps,
    Theme,
    useTheme
} from "@mui/material";
import { ThemeContext } from "@/contexts/ThemeProvider/ThemeProvider";
import { pxToRem } from "@/utils/unitConverter/unitConverter";

export type ButtonProps = ButtonBaseProps & {
    variant?: "icon" | "no-icon" | "with-icon";
};

type Variant = {
    "icon": (arg0: VariantArg0) => SxProps<Theme> | undefined;
    "no-icon": (arg0: VariantArg0) => SxProps<Theme> | undefined;
    "with-icon": (arg0: VariantArg0) => SxProps<Theme> | undefined;
};

type VariantArg0 = {
    mode: PaletteMode;
    palette: Palette;
    theme: Theme;
};

export const Button = React.forwardRef<any, ButtonProps>(({
    variant: variantProp = "with-icon",
    ...props
}, ref) => {
    const { mode } = React.useContext(ThemeContext);
    const { palette } = useTheme();

    return (
        <ButtonBase
            {...props}
            ref={ref}
            sx={(theme) => ({
                ...variant[variantProp]({
                    mode: mode,
                    palette: palette,
                    theme: theme
                })
            })}
            type={props.type ? props.type : "button"}
        >
            {props.children}
        </ButtonBase >
    );
});

const variant: Variant = {
    "icon": ({ mode, palette, theme }) => ({
        [theme.breakpoints.up(0)]: {
            alignItems: "center",
            backgroundColor: "transparent",
            borderRadius: "50%",
            color: palette[mode]["on-surface-variant"],
            display: "flex",
            flexShrink: 0,
            height: pxToRem(40),
            justifyContent: "center",
            transitionDuration: "0.2s",
            transitionProperty: "background-color",
            transitionTimingFunction: "cubic-bezier(0.2, 0, 0, 1)",
            width: pxToRem(40),
            ":hover": {
                backgroundColor: `${palette[mode]["on-surface-variant"]}14`
            }
        }
    }),
    "no-icon": ({ mode, palette, theme }) => ({
        [theme.breakpoints.up(0)]: {
            alignItems: "center",
            backgroundColor: palette[mode]['primary'],
            borderRadius: pxToRem(100),
            color: palette[mode]["on-primary"],
            display: "flex",
            fontFamily: "var(--font-roboto)",
            fontSize: pxToRem(14),
            fontWeight: 500,
            justifyContent: "center",
            letterSpacing: pxToRem(0.1),
            lineHeight: pxToRem(20),
            minHeight: pxToRem(40),
            padding: `${pxToRem(5)} ${pxToRem(24)}`,
            transitionDuration: "0.2s",
            transitionProperty: "box-shadow",
            transitionTimingFunction: "cubic-bezier(0.2, 0, 0, 1)",
            width: "fit-content",
            ":hover": {
                boxShadow: `0px ${pxToRem(1)} ${pxToRem(3)} ${pxToRem(1)} #00000026, 0px ${pxToRem(1)} ${pxToRem(2)} 0px #0000004D`
            }
        }
    }),
    "with-icon": ({ mode, palette, theme }) => ({
        [theme.breakpoints.up(0)]: {
            [theme.breakpoints.up(0)]: {
                alignItems: "center",
                backgroundColor: palette[mode].primary,
                border: "none",
                borderRadius: pxToRem(100),
                color: palette[mode]["on-primary"],
                display: "flex",
                fontFamily: "var(--font-roboto)",
                fontSize: pxToRem(14),
                fontWeight: 500,
                letterSpacing: pxToRem(0.1),
                lineHeight: pxToRem(20),
                gap: pxToRem(8),
                minHeight: pxToRem(40),
                padding: `${pxToRem(5)} ${pxToRem(24)} ${pxToRem(5)} ${pxToRem(16)}`,
                transitionDuration: "0.2s",
                transitionProperty: "box-shadow",
                transitionTimingFunction: "cubic-bezier(0.2, 0, 0, 1)",
                width: "fit-content",
                ":hover": {
                    boxShadow: `0px ${pxToRem(1)} ${pxToRem(3)} ${pxToRem(1)} #00000026, 0px ${pxToRem(1)} ${pxToRem(2)} 0px #0000004D`
                }
            }
        }
    })
};