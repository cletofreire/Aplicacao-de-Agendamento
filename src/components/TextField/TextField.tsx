'use client';

import React from "react";
import { BoxProps } from "@mui/material";
import {
    Div,
    Input,
    Label,
    Span
} from "@/components/Tags/Tags";

export type TextFieldProps = {
    label: React.ReactNode;
    props?: {
        container: BoxProps
        input: BoxProps;
    };
};

export const TextField = React.forwardRef<HTMLInputElement, TextFieldProps>(({
    label,
    props
}, ref) => {
    const [focus, setFocus] = React.useState<boolean>(false);

    const id = React.useId();

    return (
        <Div>
            <Input
                {...props?.input}
                onBlur={(event) => {
                    setFocus(false);

                    if (props?.input.onBlur !== undefined) props.input.onBlur(event);
                }}
                onFocus={(event) => {
                    setFocus(true);

                    if (props?.input.onFocus !== undefined) props.input.onFocus(event);
                }}
                ref={ref}
            />

            <Div>
                <Div>
                    <Span />
                    <Span />
                    <Span />
                </Div>

                <Label>
                    {label}
                </Label>
            </Div>
        </Div>
    );
});