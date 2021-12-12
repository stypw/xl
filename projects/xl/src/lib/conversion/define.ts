import { InjectionToken } from "@angular/core";


export interface IXlConversionBox {
    getIndex(actived?: boolean): number;
    getOrder(idx: number): number;
    active(idx: number): void;
}

export const IXlConversionInjection = new InjectionToken<IXlConversionBox>('IXlConversionInjection');