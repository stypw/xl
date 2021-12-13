import { InjectionToken, TemplateRef } from "@angular/core";


export interface IXlToggleBox {
    addItem(template: TemplateRef<any>): void;
}

export const IXlToggleBoxInjection = new InjectionToken<IXlToggleBox>("IXlToggleBoxInjection")
