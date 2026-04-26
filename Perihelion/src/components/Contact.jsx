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

export default function Contact() {
  return (
    <div id="contact" className="cta-wrap scroll-section">
      <div className="cta-glow"></div>
      <div style={{ position: 'relative', zIndex: 1 }}>
        <RevealBlock>
          <div className="stag" style={{ justifyContent: 'center' }}>Join Us</div>
        </RevealBlock>
        <RevealBlock>
          <h2 className="cta-title">
            Ready to explore<br />
            <span className="ghost">the cosmos</span><br />
            <span className="hi">together?</span>
          </h2>
        </RevealBlock>
        <RevealBlock delay={0.1}>
          <p className="cta-sub">
            The universe doesn't wait. Neither should you.<br />
            Apply for our next crew selection or partner with PERIHELION.
          </p>
        </RevealBlock>
        <RevealBlock delay={0.2}>
          <a href="#" className="btn-primary" style={{ fontSize: '13px', padding: '19px 54px', display: 'inline-flex' }}>
            Apply for Crew Selection
            <svg width="17" height="17" viewBox="0 0 16 16" fill="none" style={{ marginLeft: '10px' }}>
              <path d="M3 8H13M13 8L8 3M13 8L8 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </RevealBlock>
      </div>
    </div>
  );
}
