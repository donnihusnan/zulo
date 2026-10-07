"use client";

import { useEffect, useRef, useState } from "react";

interface CountUpProps {
  to: number;
  from?: number;
  duration?: number;
  delay?: number;
  className?: string;
  separator?: string;
  prefix?: string;
  suffix?: string;
}

export function CountUp({
  to,
  from = 0,
  duration = 2,
  delay = 0,
  className = "",
  separator = ".",
  prefix = "",
  suffix = "",
}: CountUpProps) {
  const [count, setCount] = useState<number>(from);
  const elementRef = useRef<HTMLSpanElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [hasAnimated]);

  useEffect(() => {
    if (!hasAnimated) return;

    let startTime: number | null = null;
    let animationFrameId: number;

    const easeOutExpo = (t: number): number => {
      return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
    };

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp + delay * 1000;
      
      const elapsed = Math.max(0, timestamp - startTime);
      const progress = Math.min(elapsed / (duration * 1000), 1);
      const easedProgress = easeOutExpo(progress);

      const current = Math.floor(from + (to - from) * easedProgress);
      setCount(current);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(step);
      } else {
        setCount(to);
      }
    };

    animationFrameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animationFrameId);
  }, [hasAnimated, from, to, duration, delay]);

  const formattedCount = count
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, separator);

  return (
    <span ref={elementRef} className={`tabular-nums ${className}`}>
      {prefix}
      {formattedCount}
      {suffix}
    </span>
  );
}

export default CountUp;
