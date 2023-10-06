'use client';

import React from "react";
import { Controller } from "react-hook-form";
import { useTheme } from "@mui/material";
import { DateTime } from "luxon";
import { DesktopDatePicker } from "@/components/DesktopDatePicker/DesktopDatePicker";
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

export type SchedulingFormDatesProps = {
    control: UseSchedulingObject['control'];
};

export const SchedulingFormDates = ({
    control
}: SchedulingFormDatesProps) => {
    const { mode } = React.useContext(ThemeContext);
    const { palette } = useTheme();

    return (
        <SurfaceContainer
            component="section"
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
                Datas
            </H4>

            <Div
                sx={(theme) => ({
                    [theme.breakpoints.up(0)]: {
                        alignItems: "center",
                        display: "flex",
                        gap: pxToRem(16)
                    }
                })}
            >
                <Controller
                    control={control}
                    defaultValue={DateTime.fromISO(DateTime.now().toISODate() ?? "1970-01-01")}
                    name="date.start"
                    render={({ field }) => (
                        // @ts-ignore
                        <DesktopDatePicker
                            {...field}
                            label="Inicial"
                        />
                    )}
                    rules={{
                        required: true
                    }}
                />

                <Controller
                    control={control}
                    defaultValue={DateTime.fromISO(DateTime.now().toISODate() ?? "1970-01-01")}
                    name="date.end"
                    render={({ field }) => (
                        // @ts-ignore
                        <DesktopDatePicker
                            {...field}
                            label="Final"
                        />
                    )}
                    rules={{
                        required: true
                    }}
                />
            </Div>
        </SurfaceContainer>
    );
};