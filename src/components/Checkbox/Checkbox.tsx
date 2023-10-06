'use client';

import React from "react";
import {
    Checkbox as MUICheckbox,
    CheckboxProps,
    useTheme
} from "@mui/material";
import { Div } from "@/components/Tags/Tags";
import { ThemeContext } from "@/contexts/ThemeProvider/ThemeProvider";
import { pxToRem } from "@/utils/unitConverter/unitConverter";

export const Checkbox = React.forwardRef<any, CheckboxProps>((props, ref) => {
    const { mode } = React.useContext(ThemeContext);
    const { palette } = useTheme();

    return (
        <Div
            sx={(theme) => ({
                [theme.breakpoints.up(0)]: {
                    alignItems: "center",
                    display: "flex",
                    height: pxToRem(48),
                    justifyContent: "center",
                    width: pxToRem(48),
                    ".MuiButtonBase-root": {
                        alignItems: "center",
                        color: palette[mode].primary,
                        display: "flex",
                        height: pxToRem(40),
                        justifyContent: "center",
                        padding: 0,
                        width: pxToRem(40),
                        ":hover": {
                            backgroundColor: `${palette[mode].primary}14`
                        }
                    },
                    ".MuiSvgIcon-root": {
                        color: palette[mode].primary
                    }
                }
            })}
        >
            <MUICheckbox
                {...props}
                ref={ref}
            />
        </Div>
    );
});