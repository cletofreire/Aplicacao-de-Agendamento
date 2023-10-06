'use client';

import React from "react";
import {
    Checkbox,
    TextField,
    useTheme
} from "@mui/material";
import { Button } from "@/components/Button/Button";
import { SurfaceContainer } from "@/components/SurfaceContainer/SurfaceContainer";
import {
    Div,
    H4,
    Li,
    Span,
    Ul
} from "@/components/Tags/Tags";
import { ThemeContext } from "@/contexts/ThemeProvider/ThemeProvider";
import { UseSchedulingObject } from "@/hooks/useScheduling/useScheduling";
import { joinSx } from "@/utils/joinSx/joinSx";
import { typography } from "@/utils/typography/typography";
import { pxToRem } from "@/utils/unitConverter/unitConverter";

export type SchedulingFormEmployeesProps = {
    getValues: UseSchedulingObject['getValues'];
    namesFieldArray: UseSchedulingObject['namesFieldArray'];
    register: UseSchedulingObject['register'];
    setValue: UseSchedulingObject['setValue'];
};

export const SchedulingFormEmployees = ({
    getValues,
    namesFieldArray,
    register,
    setValue
}: SchedulingFormEmployeesProps) => {
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
                Funcionários
            </H4>

            {namesFieldArray.fields.length !== 0 && (
                <Ul
                    sx={(theme) => ({
                        [theme.breakpoints.up(0)]: {
                            alignItems: "stretch",
                            backgroundColor: palette[mode]["surface-container-high"],
                            boxShadow: `0px ${pxToRem(1)} ${pxToRem(3)} 0px #0000004D, 0px ${pxToRem(4)} ${pxToRem(8)} ${pxToRem(3)} #00000026`,
                            borderRadius: pxToRem(16),
                            display: "flex",
                            flexDirection: "column",
                            listStyleType: "none",
                            maxWidth: "100%",
                            width: "fit-content"
                        }
                    })}
                >
                    {namesFieldArray.fields.map((field, index) => (
                        <Li
                            key={field.id}
                            sx={(theme) => joinSx(theme, typography['BodyLarge'](theme), {
                                [theme.breakpoints.up(0)]: {
                                    alignItems: "center",
                                    color: palette[mode]["on-surface"],
                                    display: "flex",
                                    padding: `${pxToRem(8)} ${pxToRem(16)} ${pxToRem(8)} ${pxToRem(16)}`
                                }
                            })}
                        >
                            <Span
                                sx={(theme) => joinSx(theme, typography['TitleMedium'](theme), {
                                    [theme.breakpoints.up(0)]: {
                                        alignItems: "center",
                                        backgroundColor: palette[mode]["primary-container"],
                                        borderRadius: "50%",
                                        display: "flex",
                                        flexShrink: 0,
                                        height: pxToRem(40),
                                        marginRight: pxToRem(16),
                                        justifyContent: "center",
                                        width: pxToRem(40)
                                    }
                                })}
                            >
                                {field.name[0]}
                            </Span>

                            <Span
                                sx={(theme) => ({
                                    [theme.breakpoints.up(0)]: {
                                        flexGrow: 1,
                                        marginRight: pxToRem(8),
                                        overflow: "hidden",
                                        textOverflow: "ellipsis",
                                        whiteSpace: "nowrap"
                                    }
                                })}
                            >
                                {field.name}
                            </Span>

                            <Checkbox
                                checked={field.woman}
                                onChange={(event) => namesFieldArray.update(index, {
                                    ...field,
                                    woman: !field.woman
                                })}
                            />

                            <Button
                                onClick={(event) => namesFieldArray.remove(index)}
                                variant="icon"
                            >
                                <Span
                                    className="material-symbols-outlined"
                                    sx={(theme) => ({
                                        [theme.breakpoints.up(0)]: {
                                            fontSize: `${pxToRem(24)} !important`,
                                            fontWeight: "500 !important"
                                        }
                                    })}
                                >
                                    delete
                                </Span>
                            </Button>
                        </Li>
                    ))}
                </Ul>
            )}

            <Div
                sx={(theme) => ({
                    [theme.breakpoints.up(0)]: {
                        alignItems: "center",
                        display: "flex",
                        gap: pxToRem(16)
                    }
                })}
            >
                <TextField
                    {...register("name")}
                    label="Nome"
                    sx={(theme) => ({
                        [theme.breakpoints.up(0)]: {
                            ".MuiFormLabel-root": {
                                color: palette[mode]["on-surface-variant"],
                                fontFamily: "var(--font-roboto)",
                                fontSize: pxToRem(16),
                                fontWeight: 400,
                                letterSpacing: pxToRem(0.5),
                                lineHeight: pxToRem(24),
                                maxWidth: `calc(100% - ${pxToRem(24)})`,
                            }
                        }
                    })}
                />

                <Button
                    onClick={(event) => {
                        const normalizeString = (text: string) => {
                            const split = text.toLocaleLowerCase().split(" ");

                            const words = split.map((word) => (
                                word.charAt(0).toLocaleUpperCase() + word.slice(1)
                            ));

                            return words.join(" ");
                        };

                        const name = getValues("name") ?? "";

                        if (name === "") return;

                        namesFieldArray.append({
                            name: name === "" ? "..." : normalizeString(name),
                            woman: false
                        });

                        setValue("name", "");
                    }}
                    variant="with-icon"
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
            </Div>
        </SurfaceContainer>
    );
};