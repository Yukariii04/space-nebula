import { useEffect, useRef } from 'react';

function StatItem({ target, suffix, label }) {
  const numRef = useRef(null);

  useEffect(() => {
    const el = numRef.current;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        let cur = 0;
        const step = target / 70;
        const interval = setInterval(() => {
          cur = Math.min(cur + step, target);
          el.textContent = Math.round(cur) + suffix;
          if (cur >= target) clearInterval(interval);
        }, 14);
        observer.unobserve(el);
      });
    }, { threshold: 0.5 });
    observer.observe(el);
    return () => observer.disconnect();
  }, [target, suffix]);

  return (
    <div className="stat-item">
      <div className="stat-number" ref={numRef}>0</div>
      <div className="stat-label">{label}</div>
    </div>
  );
}

export default function StatsBand() {
  return (
    <div className="stats-band">
      <StatItem target={47} suffix="+" label="Missions Completed" />
      <StatItem target={12} suffix="" label="Active Satellites" />
      <StatItem target={380} suffix="K" label="Light Years Mapped" />
      <StatItem target={2100} suffix="+" label="Crew Members" />
    </div>
  );
}
