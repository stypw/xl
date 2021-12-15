import { InjectionToken } from "@angular/core";

export interface IXlAnchor {
    get scrollRange():[number,number];
    get hash():string;
    active(): void;
    unactive(): void;
}
export interface IXlAnchorGroup {
    addItem(item: IXlAnchor): void;
    scrollTo(item:IXlAnchor):void;
    xlTopOffset:number;
}

export const IXlAnchorGroupToken = new InjectionToken<IXlAnchorGroup>("IXlAnchorGroupToken");

