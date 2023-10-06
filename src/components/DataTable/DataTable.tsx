'use client';

import React from "react";
import {
    Box,
    BoxProps,
    useTheme
} from "@mui/material";
import {
    Table as TagTable,
    Tbody,
    Td,
    Th,
    Thead,
    Tr
} from "@/components/Tags/Tags";
import { ThemeContext } from "@/contexts/ThemeProvider/ThemeProvider";
import { joinSx } from "@/utils/joinSx/joinSx";
import { pxToRem } from "@/utils/unitConverter/unitConverter";

export const Table = React.forwardRef<HTMLTableElement, BoxProps>((props, ref) => {
    const { mode } = React.useContext(ThemeContext);
    const { palette } = useTheme();

    return (
        <TagTable
            {...props}
            ref={ref}
            sx={(theme) => joinSx(theme, {
                [theme.breakpoints.up(0)]: {
                    backgroundColor: palette[mode]["surface-container-high"],
                    borderCollapse: "collapse",
                    borderSpacing: 0,
                    textAlign: "center",
                    userSelect: "none"
                }
            }, props.sx)}
        >
            {props.children}
        </TagTable>
    );
});

export const TableBody = React.forwardRef<HTMLTableSectionElement, BoxProps>((props, ref) => (
    <Tbody
        {...props}
        ref={ref}
    >
        {props.children}
    </Tbody>
));

export const TableDataCell = React.forwardRef<HTMLTableCellElement, BoxProps>((props, ref) => {
    return (
        <Td
            {...props}
            ref={ref}
            sx={(theme) => joinSx(theme, {
                padding: `0 ${pxToRem(16)}`,
            }, props.sx)}
        >
            {props.children}
        </Td>
    );
});

export const TableHead = React.forwardRef<HTMLTableSectionElement, BoxProps>((props, ref) => (
    <Thead
        {...props}
        ref={ref}
    >
        {props.children}
    </Thead>
));

export const TableHeaderCell = React.forwardRef<HTMLTableCellElement, BoxProps>((props, ref) => {
    return (
        <Th
            {...props}
            ref={ref}
            sx={(theme) => joinSx(theme, {
                [theme.breakpoints.up(0)]: {
                    padding: `0 ${pxToRem(16)}`
                }
            }, props.sx)}
        >
            {props.children}
        </Th>
    );
});

export const TableRow = React.forwardRef<HTMLTableRowElement, BoxProps>((props, ref) => {
    const { mode } = React.useContext(ThemeContext);
    const { palette } = useTheme();

    return (
        <Tr
            {...props}
            ref={ref}
            sx={(theme) => joinSx(theme, {
                [theme.breakpoints.up(0)]: {
                    color: palette[mode]["on-surface"],
                    borderColor: `${palette[mode]["on-surface"]}1F`,
                    borderStyle: "solid",
                    borderWidth: pxToRem(1),
                    borderLeft: "none",
                    borderRight: "none",
                    fontFamily: "var(--font-roboto-condensed)",
                    fontSize: pxToRem(14),
                    fontWeight: 400,
                    height: pxToRem(52),
                    whiteSpace: "nowrap",
                    ":last-of-type": {
                        borderBottom: "none"
                    }
                }
            }, props.sx)}
        >
            {props.children}
        </Tr>
    );
});

export const TableRowHeader = React.forwardRef<HTMLTableRowElement, BoxProps>((props, ref) => {
    const { mode } = React.useContext(ThemeContext);
    const { palette } = useTheme();

    return (
        <Tr
            {...props}
            ref={ref}
            sx={(theme) => joinSx(theme, {
                [theme.breakpoints.up(0)]: {
                    color: `${palette[mode]["on-surface"]}99`,
                    fontFamily: "var(--font-roboto-condensed)",
                    fontSize: pxToRem(14),
                    fontWeight: 700,
                    height: pxToRem(56),
                    whiteSpace: "nowrap"
                }
            }, props.sx)}
        >
            {props.children}
        </Tr>
    );
});