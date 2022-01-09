
export type XlMediaQuery = {
    max?: number;
    min?: number;
}
export type XlMedia = {
    lg?: XlMediaQuery;
    md?: XlMediaQuery;
    sm?: XlMediaQuery;
    xs?: XlMediaQuery;
}

export const xlMediaDefault:XlMedia = {
    lg: { min: 1366 },
    md: { min: 1024, max: 1366 },
    sm: { min: 768, max: 1024 },
    xs: { max: 768 }
}

