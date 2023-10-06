'use client';

import React from "react";
import {
    Box,
    BoxProps,
    useTheme
} from "@mui/material";
import { ThemeContext } from "@/contexts/ThemeProvider/ThemeProvider";
import { joinSx } from "@/utils/joinSx/joinSx";
import { pxToRem } from "@/utils/unitConverter/unitConverter";

export type SurfaceContainerProps = BoxProps & {
    component?: keyof React.JSX.IntrinsicElements;
};

export const SurfaceContainer = React.forwardRef<any, SurfaceContainerProps>((props, ref) => {
    const { mode } = React.useContext(ThemeContext);
    const { palette } = useTheme();

    return (
        <Box
            {...props}
            ref={ref}
            sx={(theme) => joinSx(theme, {
                [theme.breakpoints.up(0)]: {
                    backgroundColor: palette[mode]["surface-container"],
                    border: "none",
                    borderRadius: pxToRem(16),
                    boxShadow: `0px ${pxToRem(2)} ${pxToRem(6)} ${pxToRem(2)} #00000026, 0px ${pxToRem(1)} ${pxToRem(2)} 0px #0000004D`,
                    padding: pxToRem(16),
                }
            }, props.sx)}
        >
            {props.children}
        </Box>
    );
});