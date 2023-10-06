export type PxToRem = (px: number) => string;

export const pxToRem: PxToRem = (px) => (
    `${px / 16}rem`
);