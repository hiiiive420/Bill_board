import { useEffect, useMemo, useRef, useState } from "react";

const numberPattern = /^(\d+)(.*)$/;

export default function CountUpValue({ value, duration = 1200 }) {
  const ref = useRef(null);
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);

  const parts = useMemo(() => {
    const match = String(value).match(numberPattern);

    if (!match) return null;

    return {
      target: Number(match[1]),
      suffix: match[2],
    };
  }, [value]);

  useEffect(() => {
    if (!parts || hasStarted) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.35 }
    );

    if (ref.current) observer.observe(ref.current);

    return () => observer.disconnect();
  }, [hasStarted, parts]);

  useEffect(() => {
    if (!parts || !hasStarted) return undefined;

    let frameId;
    const start = performance.now();

    const animate = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);

      setCount(Math.round(parts.target * eased));

      if (progress < 1) {
        frameId = requestAnimationFrame(animate);
      }
    };

    frameId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(frameId);
  }, [duration, hasStarted, parts]);

  if (!parts) {
    return <span ref={ref}>{value}</span>;
  }

  return (
    <span ref={ref}>
      {count}
      {parts.suffix}
    </span>
  );
}
