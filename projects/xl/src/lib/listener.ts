export interface IXlListener {
    on<K extends keyof WindowEventMap>(type: K, listener: (this: Window, ev: WindowEventMap[K]) => any): void;
    on(type: string, listener: EventListenerOrEventListenerObject): void;
    off<K extends keyof WindowEventMap>(type: K): void;
    off(type: string): void;
    destory(): void;
}

export interface CanListen {
    addEventListener<K extends keyof WindowEventMap>(type: K, listener: (this: Window, ev: WindowEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof WindowEventMap>(type: K, listener: (this: Window, ev: WindowEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}


type ListenerSet = {
    [type: string]: EventListenerOrEventListenerObject;
}

class XlListener implements IXlListener {
    listenerSet: ListenerSet = {};
    on(type: string, listener: EventListenerOrEventListenerObject): void {
        let old = this.listenerSet[type];
        if (old) {
            this.listener.removeEventListener(type, old);
        }
        this.listenerSet[type] = listener;
        this.listener.addEventListener(type, listener);
    }
    off(type: string): void {
        let listener = this.listenerSet[type];
        if (listener) {
            this.listener.removeEventListener(type, listener);
            delete (this.listenerSet)[type];
        }
    }

    destory(): void {
        for (const type in this.listenerSet) {
            let listener = this.listenerSet[type];
            if (listener) {
                this.listener.removeEventListener(type, listener);
            }
        }
        this.listenerSet = {};
    }

    listener: CanListen = window;

    constructor(element?: CanListen) {
        if (element) {
            this.listener = element;
        }
    }
}

export namespace IXlListener {
    export function create(element?: CanListen): IXlListener {
        return new XlListener(element);
    }
}
