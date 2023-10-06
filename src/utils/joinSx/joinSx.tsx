import {
    SxProps,
    Theme
} from "@mui/material";
import { mergeDeepRight } from "ramda";

type Sx = SxProps<Theme> | undefined;

export type JoinSx = (
    arg0: Theme,
    arg1: Sx,
    arg2: Sx
) => {};

export const joinSx: JoinSx = (theme, sx01, sx02) => {
    return mergeDeepRight({
        ...(typeof sx01 === "function" ? sx01(theme) : sx01)
    }, {
        ...(typeof sx02 === "function" ? sx02(theme) : sx02)
    });
};