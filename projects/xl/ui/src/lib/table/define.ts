import { InjectionToken, TemplateRef } from "@angular/core";
export type Align = "flex-start" | "center" | "flex-end";
export type XlTableHeader = {
    key: string;
    text?: string;
    width?: string;
    realWidth?: number;
    align?: Align;
}
export type XlTableRow = { [k: string]: any };


export interface IXlTable {
    headerTemplate: TemplateRef<any> | null;
    cellTemplate: TemplateRef<any> | null;
}
export const XlTableInjectonToken = new InjectionToken<IXlTable>("XlTableInjectonToken"); 