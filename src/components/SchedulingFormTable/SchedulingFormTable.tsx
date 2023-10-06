'use client';

import React from "react";
import { useTheme } from "@mui/material";
import { ScrollContainer } from "react-indiana-drag-scroll";
import { Button } from "@/components/Button/Button";
import {
    Table,
    TableBody,
    TableDataCell,
    TableHead,
    TableHeaderCell,
    TableRow,
    TableRowHeader
} from "@/components/DataTable/DataTable";
import { SurfaceContainer } from "@/components/SurfaceContainer/SurfaceContainer";
import {
    Div,
    H2,
    Span
} from "@/components/Tags/Tags";
import { ThemeContext } from "@/contexts/ThemeProvider/ThemeProvider";
import { UseSchedulingObject } from "@/hooks/useScheduling/useScheduling";
import { joinSx } from "@/utils/joinSx/joinSx";
import { typography } from "@/utils/typography/typography";
import { pxToRem } from "@/utils/unitConverter/unitConverter";

export type SchedulingFormTableProps = {
    dragRow: UseSchedulingObject['dragRow'];
    getValues: UseSchedulingObject['getValues'];
    setValue: UseSchedulingObject['setValue'];
    updateTable: UseSchedulingObject['updateTable'];
    watch: UseSchedulingObject['watch'];
};

export const SchedulingFormTable = ({
    dragRow,
    getValues,
    setValue,
    updateTable,
    watch
}: SchedulingFormTableProps) => {
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
            <H2
                sx={(theme) => joinSx(theme, typography['TitleMedium'](theme), {
                    [theme.breakpoints.up(0)]: {
                        color: palette[mode]["on-surface"],
                        textTransform: "uppercase"
                    }
                })}
            >
                Tabela
            </H2>

            <Button
                onClick={() => updateTable({
                    generateNewDrag: true,
                    getValues,
                    setValue
                })}
                type="button"
                variant="no-icon"
            >
                Gerar Tabela
            </Button>

            {watch("table").length !== 0 && (
                <ScrollContainer
                    style={{
                        backgroundColor: palette[mode]["surface-container-high"],
                        borderColor: `${palette[mode]["on-surface"]}1F`,
                        borderRadius: pxToRem(16),
                        borderStyle: "solid",
                        borderWidth: pxToRem(1),
                        boxShadow: `0px ${pxToRem(1)} ${pxToRem(3)} 0px #0000004D, 0px ${pxToRem(4)} ${pxToRem(8)} ${pxToRem(3)} #00000026`,
                        maxWidth: "100%",
                        width: "fit-content"
                    }}
                >
                    <Table>
                        <TableHead>
                            <TableRowHeader>
                                {watch("table")[0].map((column: string, index) => {
                                    const date = column.split(",");

                                    return (
                                        <TableHeaderCell key={index}>
                                            {date[0]} <br /> {date[1]}
                                        </TableHeaderCell>
                                    );
                                })}
                            </TableRowHeader>
                        </TableHead>

                        <TableBody>
                            {watch("table").map((row, index) => {
                                if (index === 0) return null;

                                if (index === watch("table").length - 1) return (
                                    <TableRow key={index}>
                                        {row.map((column, jindex) => {
                                            if (
                                                typeof column === "boolean" &&
                                                column === false
                                            ) return (
                                                <TableDataCell key={`${index}-${jindex}`} />
                                            );

                                            if (
                                                typeof column === "boolean" &&
                                                column === true
                                            ) return (
                                                <TableDataCell key={`${index}-${jindex}`}>
                                                    <Span
                                                        className="material-symbols-outlined"
                                                        sx={(theme) => ({
                                                            [theme.breakpoints.up(0)]: {
                                                                color: palette[mode]['error'],
                                                                fontSize: `${pxToRem(24)} !important`,
                                                                fontWeight: "500 !important"
                                                            }
                                                        })}
                                                    >
                                                        warning
                                                    </Span>
                                                </TableDataCell>
                                            );

                                            return (
                                                <TableDataCell
                                                    key={`${index}-${jindex}`}
                                                    sx={(theme) => ({
                                                        [theme.breakpoints.up(0)]: {
                                                            fontWeight: 700
                                                        }
                                                    })}
                                                >
                                                    Violações
                                                </TableDataCell>
                                            );
                                        })}
                                    </TableRow>
                                );

                                return (
                                    <TableRow key={index}>
                                        {row.map((column, jindex) => {
                                            if (jindex === 0) return (
                                                <TableDataCell key={`${index}-${jindex}`}>
                                                    <Div
                                                        sx={(theme) => ({
                                                            [theme.breakpoints.up(0)]: {
                                                                alignItems: "center",
                                                                display: "flex",
                                                                gap: pxToRem(16),
                                                                justifyContent: "space-between"
                                                            }
                                                        })}
                                                    >
                                                        <Button
                                                            onClick={() => dragRow({
                                                                direction: "right",
                                                                getValues: getValues,
                                                                row: index,
                                                                setValue: setValue
                                                            })}
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
                                                                chevron_left
                                                            </Span>
                                                        </Button>

                                                        {column}

                                                        <Button
                                                            onClick={() => dragRow({
                                                                direction: "left",
                                                                getValues: getValues,
                                                                row: index,
                                                                setValue: setValue
                                                            })}
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
                                                                chevron_right
                                                            </Span>
                                                        </Button>
                                                    </Div>
                                                </TableDataCell>
                                            );

                                            return (
                                                <TableDataCell key={`${index}-${jindex}`}>
                                                    {column === 1 ? (
                                                        <Span
                                                            className="material-symbols-outlined"
                                                            sx={(theme) => ({
                                                                [theme.breakpoints.up(0)]: {
                                                                    color: palette[mode]['tertiary'],
                                                                    fontSize: `${pxToRem(24)} !important`,
                                                                    fontWeight: "500 !important"
                                                                }
                                                            })}
                                                        >
                                                            work
                                                        </Span>
                                                    ) : (
                                                        <Span
                                                            className="material-symbols-outlined"
                                                            sx={(theme) => ({
                                                                [theme.breakpoints.up(0)]: {
                                                                    color: palette[mode]['error'],
                                                                    fontSize: `${pxToRem(24)} !important`,
                                                                    fontWeight: "500 !important"
                                                                }
                                                            })}
                                                        >
                                                            home
                                                        </Span>
                                                    )}
                                                </TableDataCell>
                                            );
                                        })}
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </ScrollContainer>
            )}

            <Button
                type="submit"
                variant="no-icon"
            >
                Salvar
            </Button>
        </SurfaceContainer>
    );
};