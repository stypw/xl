import { Injectable } from "@angular/core";
import { Call } from "../types/types";

const oneDay = 1000 * 60 * 60 * 24;
export function daySpan(ms: number) {
    return Math.floor(ms / oneDay);
}

const monthMax = 11;
const monthMin = 0;

export type PanelType = "YEAR" | "MONTH" | "DATE";

@Injectable()
export class DatetimeDateService {
    value = {
        year: 0,
        month: 0,
        date: 0,
        hour: 0,
        minute: 0,
        second: 0
    };
    year: number;
    month: number;
    date: number;
    hour: number;
    minute: number;
    second: number;

    panelType: PanelType = "MONTH";

    setValue(year: number, month: number, date?: number, hour?: number, minute?: number, second?: number) {

        this.value.year = year;
        this.value.month = month;

        if (date !== undefined && date !== null) {
            this.value.date = date;
        }
        if (hour !== undefined && hour !== null) {
            this.value.hour = hour;
        }
        if (minute !== undefined && minute !== null) {
            this.value.minute = minute;
        }
        if (second !== undefined && second !== null) {
            this.value.second = second;
        }
    }

    setPanel(type: PanelType) {
        this.panelType = type;
    }

    setMonth(m: number) {
        if (m < monthMin || m > monthMax) return;
        let change = false;
        if (this.month != m) {
            change = true;
        }
        this.month = m;
        if (change) this.triggerMonthChange();
    }

    setData(year: number, month: number, date?: number, hour?: number, minute?: number, second?: number) {
        let monthChange = false;
        if (year !== this.year || month !== this.month) {
            monthChange = true;
        }
        this.year = year;
        this.month = month;

        if (date !== undefined && date !== null) {
            this.date = date;
        }
        if (hour !== undefined && hour !== null) {
            this.hour = hour;
        }
        if (minute !== undefined && minute !== null) {
            this.minute = minute;
        }
        if (second !== undefined && second !== null) {
            this.second = second;
        }
        if (monthChange) {
            this.triggerMonthChange();
        }
    }

    toYear(y: number) {
        let change = false;
        if (this.year != y) {
            change = true;
        }
        this.year = y;
        if (change) this.triggerMonthChange();
    }
    toPrevYear() {
        this.year--;
        this.triggerMonthChange();
    }
    toNextYear() {
        this.year++;
        this.triggerMonthChange();
    }
    toPrevMonth() {
        let m = this.month - 1;
        let y = this.year;
        if (m < monthMin) {
            m = monthMax;
            y--;
        }
        this.year = y;
        this.month = m;
        this.triggerMonthChange();
    }
    toNextMonth() {
        let m = this.month + 1;
        let y = this.year;
        if (m > monthMax) {
            m = monthMin;
            y++;
        }
        this.year = y;
        this.month = m;
        this.triggerMonthChange();
    }
    triggerMonthChange() {
        for (let handle of this.monthChangeHandlers) {
            handle();
        }
    }

    private monthChangeHandlers: Call[] = [];
    onMonthChange(handle: Call) {
        this.monthChangeHandlers.push(handle);
    }
    offMonthChangeHandle(handle: Call) {
        let idx = this.monthChangeHandlers.indexOf(handle);
        if (idx < 0) return;
        this.monthChangeHandlers.splice(idx, 1);
    }

    get currMonth() {
        return new Date(this.year, this.month);
    }

    get prevMonth() {
        let m = this.month - 1;
        let y = this.year;
        if (m < monthMin) {
            m = monthMax;
            y--;
        }
        return new Date(y, m);
    }
    get nextMonth() {
        let m = this.month + 1;
        let y = this.year;
        if (m > monthMax) {
            m = monthMin;
            y++;
        }
        return new Date(y, m);
    }

    constructor() {
        let n = new Date();
        this.year = n.getFullYear();
        this.month = n.getMonth();
        this.date = n.getDate();
        this.hour = n.getHours();
        this.minute = n.getMinutes();
        this.second = n.getSeconds();

        this.value.year = n.getFullYear();
        this.value.month = n.getMonth();
        this.value.date = n.getDate();
        this.value.hour = n.getHours();
        this.value.minute = n.getMinutes();
        this.value.second = n.getSeconds();
    }

}