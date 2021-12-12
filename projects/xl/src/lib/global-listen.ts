export interface IGlobalListener {
    on<K extends keyof WindowEventMap>(type: K, listener: (this: Window, ev: WindowEventMap[K]) => any): void;
    on(type: string, listener: EventListenerOrEventListenerObject): void;
    off<K extends keyof WindowEventMap>(type: K): void;
    off(type: string): void;
    destory(): void;
}


type ListenerSet = {
    [type: string]: EventListenerOrEventListenerObject;
}

class GlobalListener implements IGlobalListener {
    listenerSet: ListenerSet = {};
    on(type: string, listener: EventListenerOrEventListenerObject): void {
        let old = this.listenerSet[type];
        if (old) {
            window.removeEventListener(type, old);
        }
        this.listenerSet[type] = listener;
        window.addEventListener(type, listener);
    }
    off(type: string): void {
        let listener = this.listenerSet[type];
        if (listener) {
            window.removeEventListener(type, listener);
            delete (this.listenerSet)[type];
        }
    }

    destory(): void {
        for (const type in this.listenerSet) {
            let listener = this.listenerSet[type];
            if (listener) {
                window.removeEventListener(type, listener);
            }
        }
        this.listenerSet = {};
    }
}

export namespace IGlobalListener {
    export function create(): IGlobalListener {
        return new GlobalListener();
    }
}
