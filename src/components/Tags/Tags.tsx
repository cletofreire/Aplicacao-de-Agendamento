'use client';

import React from "react";
import {
    Box,
    BoxProps
} from "@mui/material";

export const Body = React.forwardRef<any, BoxProps>((props, ref) => (
    <Body
        {...props}
        component="body"
        ref={ref}
    >
        {props.children}
    </Body>
));

export const Div = React.forwardRef<any, BoxProps>((props, ref) => (
    <Box
        {...props}
        component="div"
        ref={ref}
    >
        {props.children}
    </Box>
));

export const Fieldset = React.forwardRef<any, BoxProps>((props, ref) => (
    <Box
        {...props}
        component="fieldset"
        ref={ref}
    >
        {props.children}
    </Box>
));

export const Form = React.forwardRef<any, BoxProps>((props, ref) => (
    <Box
        {...props}
        component="form"
        ref={ref}
    >
        {props.children}
    </Box>
));

export const Input = React.forwardRef<any, BoxProps>((props, ref) => (
    <Box
        {...props}
        component="input"
        ref={ref}
    >
        {props.children}
    </Box>
));

export const H2 = React.forwardRef<any, BoxProps>((props, ref) => (
    <Box
        {...props}
        component="h2"
        ref={ref}
    >
        {props.children}
    </Box>
));

export const H4 = React.forwardRef<any, BoxProps>((props, ref) => (
    <Box
        {...props}
        component="h4"
        ref={ref}
    >
        {props.children}
    </Box>
));

export const Label = React.forwardRef<any, BoxProps>((props, ref) => (
    <Box
        {...props}
        component="label"
        ref={ref}
    >
        {props.children}
    </Box>
));

export const Legend = React.forwardRef<any, BoxProps>((props, ref) => (
    <Box
        {...props}
        component="legend"
        ref={ref}
    >
        {props.children}
    </Box>
));

export const Li = React.forwardRef<any, BoxProps>((props, ref) => (
    <Box
        {...props}
        component="li"
        ref={ref}
    >
        {props.children}
    </Box>
));

export const Section = React.forwardRef<any, BoxProps>((props, ref) => (
    <Box
        {...props}
        component="section"
        ref={ref}
    >
        {props.children}
    </Box>
));

export const Span = React.forwardRef<any, BoxProps>((props, ref) => (
    <Box
        {...props}
        component="span"
        ref={ref}
    >
        {props.children}
    </Box>
));

export const Table = React.forwardRef<any, BoxProps>((props, ref) => (
    <Box
        {...props}
        component="table"
        ref={ref}
    >
        {props.children}
    </Box>
));

export const Tbody = React.forwardRef<any, BoxProps>((props, ref) => (
    <Box
        {...props}
        component="tbody"
        ref={ref}
    >
        {props.children}
    </Box>
));

export const Td = React.forwardRef<any, BoxProps>((props, ref) => (
    <Box
        {...props}
        component="td"
        ref={ref}
    >
        {props.children}
    </Box>
));

export const Th = React.forwardRef<any, BoxProps>((props, ref) => (
    <Box
        {...props}
        component="th"
        ref={ref}
    >
        {props.children}
    </Box>
));

export const Thead = React.forwardRef<any, BoxProps>((props, ref) => (
    <Box
        {...props}
        component="thead"
        ref={ref}
    >
        {props.children}
    </Box>
));

export const Tr = React.forwardRef<any, BoxProps>((props, ref) => (
    <Box
        {...props}
        component="tr"
        ref={ref}
    >
        {props.children}
    </Box>
));

export const Ul = React.forwardRef<any, BoxProps>((props, ref) => (
    <Box
        {...props}
        component="ul"
        ref={ref}
    >
        {props.children}
    </Box>
));