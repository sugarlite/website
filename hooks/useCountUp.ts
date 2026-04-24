import { useEffect, useState } from "react";

export function useCountUp(
  end: number,
  duration: number = 2000,
  start: number = 0,
  isActive: boolean = true
) {
  const [count, setCount] = useState(start);

  useEffect(() => {
    if (!isActive) {
      setCount(start);
      return;
    }

    let startTime: number | null = null;
    let animationFrame: number;

    const easeOutQuart = (t: number) => 1 - Math.pow(1 - t, 4);

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const easedProgress = easeOutQuart(progress);
      setCount(Math.floor(easedProgress * (end - start) + start));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration, start, isActive]);

  return count;
}
