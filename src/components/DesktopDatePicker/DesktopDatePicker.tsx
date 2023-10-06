'use client';

import React from "react";
import {
    DesktopDatePicker as MUIDesktopDatePicker,
    DesktopDatePickerProps
} from "@mui/x-date-pickers";
import { DateTime } from "luxon";

export const DesktopDatePicker = React.forwardRef<any, DesktopDatePickerProps<DateTime>>((props, ref) => {
    return (
        <MUIDesktopDatePicker
            {...props}
            ref={ref}
        />
    );
});