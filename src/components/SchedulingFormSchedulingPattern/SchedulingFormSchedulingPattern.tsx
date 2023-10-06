'use client';

import React from "react";
import {
    FormGroup,
    Checkbox,
    useTheme
} from "@mui/material";
import { Button } from "@/components/Button/Button";
import { SurfaceContainer } from "@/components/SurfaceContainer/SurfaceContainer";
import { H4, Div, Span } from "@/components/Tags/Tags";
import { ThemeContext } from "@/contexts/ThemeProvider/ThemeProvider";
import { UseSchedulingObject } from "@/hooks/useScheduling/useScheduling";
import { joinSx } from "@/utils/joinSx/joinSx";
import { typography } from "@/utils/typography/typography";
import { pxToRem } from "@/utils/unitConverter/unitConverter";

export type SchedulingFormSchedulingPatternProps = {
    patternFieldArray: UseSchedulingObject['patternFieldArray'];
};

export const SchedulingFormSchedulingPattern = ({
    patternFieldArray
}: SchedulingFormSchedulingPatternProps) => {
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
                Padrão de Agendamento
            </H4>

            <FormGroup
                sx={(theme) => ({
                    [theme.breakpoints.up(0)]: {
                        alignItems: "center",
                        borderLeft: `${pxToRem(1)} solid ${palette[mode]["outline-variant"]}`,
                        borderRight: `${pxToRem(1)} solid ${palette[mode]["outline-variant"]}`,
                        display: "flex",
                        flexDirection: "row",
                        width: "fit-content"
                    }
                })}
            >
                {patternFieldArray.fields.map((field, index) => (
                    <Checkbox
                        checked={field.value === 0 ? false : true}
                        key={field.id}
                        onChange={(event) => patternFieldArray.update(index, {
                            value: event.target.checked === true ? 1 : 0,
                        })}
                    />
                ))}
            </FormGroup>

            <Div
                sx={(theme) => ({
                    [theme.breakpoints.up(0)]: {
                        alignItems: "center",
                        display: "flex",
                        gap: pxToRem(16)
                    }
                })}
            >
                <Button
                    onClick={(event) => patternFieldArray.append({ value: 0 })}
                >
                    <Span
                        className="material-symbols-outlined"
                        sx={(theme) => ({
                            [theme.breakpoints.up(0)]: {
                                fontSize: `${pxToRem(18)} !important`,
                                fontWeight: "600 !important"
                            }
                        })}
                    >
                        add
                    </Span>

                    Adicionar
                </Button>

                <Button
                    onClick={(event) => {
                        if (patternFieldArray.fields.length <= 1) return;

                        patternFieldArray.remove(
                            patternFieldArray.fields.length - 1
                        );
                    }}
                >
                    <Span
                        className="material-symbols-outlined"
                        sx={(theme) => ({
                            [theme.breakpoints.up(0)]: {
                                fontSize: `${pxToRem(18)} !important`,
                                fontWeight: "500 !important"
                            }
                        })}
                    >
                        remove
                    </Span>

                    Remover
                </Button>
            </Div>
        </SurfaceContainer>
    );
};