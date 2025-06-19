export function throttle<T extends (...args: any[]) => any>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;
  let lastFn: number | undefined;
  let lastTime: number;

  return function (this: ThisParameterType<T>, ...args: Parameters<T>): void {
    const context = this;

    if (!inThrottle) {
      func.apply(context, args);
      lastTime = Date.now();
      inThrottle = true;
    } else {
      clearTimeout(lastFn);
      lastFn = window.setTimeout(() => {
        if (Date.now() - lastTime >= delay) {
          func.apply(context, args);
          lastTime = Date.now();
        }
        inThrottle = false;
      }, Math.max(delay - (Date.now() - lastTime), 0));
    }
  };
}

export function getNextIndex(yMap : Map<number, number>, columns: number): {minCol: number, minY: number} {
  let minCol = 0;
  let minY = yMap.get(0) || 0;
  for (let col = 1; col < columns; col++) {
    const colY = yMap.get(col) || 0;
    if (colY < minY) {
      minCol = col;
      minY = colY;
    }
  }
  return {minCol, minY};
}