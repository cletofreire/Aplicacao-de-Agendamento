'use client';

import React from "react";
import {
    useTheme
} from "@mui/material";
import { SchedulingFormDates } from "@/components/SchedulingFormDates/SchedulingFormDates";
import { SchedulingFormEmployees } from "@/components/SchedulingFormEmployees/SchedulingFormEmployees";
import { SchedulingFormRange } from "@/components/SchedulingFormRange/SchedulingFormRange";
import { SchedulingFormSchedulingPattern } from "@/components/SchedulingFormSchedulingPattern/SchedulingFormSchedulingPattern";
import { SchedulingFormTable } from "@/components/SchedulingFormTable/SchedulingFormTable";
import { SurfaceContainer } from "@/components/SurfaceContainer/SurfaceContainer";
import {
    Form,
    H2
} from "@/components/Tags/Tags";
import { ThemeContext } from "@/contexts/ThemeProvider/ThemeProvider";
import { useScheduling } from "@/hooks/useScheduling/useScheduling";
import { joinSx } from "@/utils/joinSx/joinSx";
import { typography } from "@/utils/typography/typography";
import { pxToRem } from "@/utils/unitConverter/unitConverter";

export const SchedulingForm = () => {
    const {
        control,
        dragRow,
        generateSheet,
        getValues,
        handleSubmit,
        namesFieldArray,
        patternFieldArray,
        register,
        setValue,
        updateTable,
        watch
    } = useScheduling();

    const { mode } = React.useContext(ThemeContext);
    const { palette } = useTheme();

    return (
        <Form
            onSubmit={handleSubmit((event) => generateSheet(event))}
            sx={(theme) => ({
                [theme.breakpoints.up(0)]: {
                    display: "flex",
                    flexDirection: "column",
                    gap: pxToRem(16),
                    width: "100%"
                }
            })}
        >
            <SurfaceContainer>
                <H2
                    sx={(theme) => joinSx(theme, typography['HeadlineMedium'](theme), {
                        [theme.breakpoints.up(0)]: {
                            color: palette[mode]["on-surface"],
                            textTransform: "uppercase"
                        }
                    })}
                >
                    Gerente de Escala
                </H2>
            </SurfaceContainer>

            <SchedulingFormDates control={control} />

            <SchedulingFormSchedulingPattern patternFieldArray={patternFieldArray} />

            <SchedulingFormRange
                setValue={setValue}
                watch={watch}
            />

            <SchedulingFormEmployees
                getValues={getValues}
                namesFieldArray={namesFieldArray}
                register={register}
                setValue={setValue}
            />

            <SchedulingFormTable
                dragRow={dragRow}
                getValues={getValues}
                setValue={setValue}
                updateTable={updateTable}
                watch={watch}
            />
        </Form>
    );
};