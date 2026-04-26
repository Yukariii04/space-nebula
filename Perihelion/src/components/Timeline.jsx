import { useEffect, useRef } from 'react';

function RevealBlock({ children, delay = 0, className = '' }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} className={`reveal ${className}`} style={{ transitionDelay: `${delay}s` }}>
      {children}
    </div>
  );
}

const steps = [
  { num: '01', title: '2025', desc: 'Kepler Relay Alpha deployed in Mars orbit. First quantum-linked data transmission across 225 million km.' },
  { num: '02', title: '2027', desc: 'Artemis Deep lunar base achieves self-sustaining biosphere. First crew of 12 begins year-long rotation.' },
  { num: '03', title: '2031', desc: 'Voyager Genesis probe launches on a 40-year journey to Proxima Centauri at 10% speed of light.' },
  { num: '04', title: '2040', desc: 'First orbital city — PERIHELION Station — reaches full operational capacity: 5,000 permanent residents.' },
];

export default function Timeline() {
  return (
    <div id="timeline" className="timeline-wrap scroll-section">
      <RevealBlock><div className="stag">Mission Timeline</div></RevealBlock>
      <RevealBlock><h2 className="stitle">From launch to <span style={{ color: 'var(--accent)' }}>legacy</span>.</h2></RevealBlock>
      <div className="timeline-grid">
        {steps.map((step, i) => (
          <RevealBlock key={i} delay={i * 0.1}>
            <div className="t-dot" style={{
              background: `rgba(123,92,255,${1 - i * 0.2})`,
              boxShadow: i === 0 ? '0 0 18px rgba(123,92,255,.5)' : 'none'
            }}></div>
            <div className="t-num">{step.num}</div>
            <div className="t-title">{step.title}</div>
            <div className="t-desc">{step.desc}</div>
          </RevealBlock>
        ))}
      </div>
    </div>
  );
}
