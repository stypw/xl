export function sleep(interval: number = 500) {
    return new Promise<void>((s) => {
        setTimeout(s, interval);
    })
}