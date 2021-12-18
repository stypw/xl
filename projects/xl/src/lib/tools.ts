export function sleep(interval: number = 500) {
    return new Promise<void>((s) => {
        setTimeout(s, interval);
    })
}

export function nextFrame() {
    return new Promise<void>(s => {
        window.requestAnimationFrame(() => {
            s();
        });
    });
}

export function absolute(pos: [number, number], element: HTMLElement) {
    const rect = element.getBoundingClientRect();
    let [x, y] = pos;

    x -= rect.x;
    y -= rect.y;
    if (x > rect.width) {
        x = rect.width;
    }
    if (y > rect.height) {
        y = rect.height;
    }

    return [x, y];
}