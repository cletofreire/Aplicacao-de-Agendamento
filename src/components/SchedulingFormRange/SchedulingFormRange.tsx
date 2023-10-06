'use client';

import React from "react";
import {
    Slider,
    useTheme
} from "@mui/material";
import { SurfaceContainer } from "@/components/SurfaceContainer/SurfaceContainer";
import {
    Div,
    H4
} from "@/components/Tags/Tags";
import { ThemeContext } from "@/contexts/ThemeProvider/ThemeProvider";
import { UseSchedulingObject } from "@/hooks/useScheduling/useScheduling";
import { joinSx } from "@/utils/joinSx/joinSx";
import { typography } from "@/utils/typography/typography";
import { pxToRem } from "@/utils/unitConverter/unitConverter";

export type SchedulingFormRangeProps = {
    setValue: UseSchedulingObject['setValue'];
    watch: UseSchedulingObject['watch'];
};

export const SchedulingFormRange = ({
    setValue,
    watch
}: SchedulingFormRangeProps) => {
    const { mode } = React.useContext(ThemeContext);
    const { palette } = useTheme();

    return (
        <SurfaceContainer
            sx={(theme) => ({
                [theme.breakpoints.up(0)]: {
                    display: "flex",
                    flexDirection: "column",
                    gap: pxToRem(16)
                }
            })}
        >
            <H4
                sx={(theme) => joinSx(theme, typography['TitleMedium'](theme), {
                    [theme.breakpoints.up(0)]: {
                        color: palette[mode]["on-surface"],
                        textTransform: "uppercase"
                    }
                })}
            >
                Limite de Funcionários ao Dia
            </H4>

            <Div
                sx={(theme) => ({
                    [theme.breakpoints.up(0)]: {
                        display: "flex",
                        padding: `0 ${pxToRem(16)}`,
                        width: "100%"
                    }
                })}
            >
                <Slider
                    disableSwap
                    onChange={(event, value) => setValue("range", value as number[])}
                    value={watch("range")}
                    valueLabelDisplay="auto"
                />
            </Div>
        </SurfaceContainer>
    );
};