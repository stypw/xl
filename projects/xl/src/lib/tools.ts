export function sleep(interval: number = 500) {
    return new Promise<void>((s) => {
        setTimeout(s, interval);
    })
}

export function nextFrame() {
    return new Promise<void>(s => {
        window.requestAnimationFrame(()=>{
            s();
        });
    });
}