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

export default function Missions() {
  return (
    <div id="missions" className="missions-wrap scroll-section">
      <div className="missions-inner">
        <div className="missions-grid">
          <RevealBlock>
            <div className="stag">Our Missions</div>
            <div className="m-big-text">
              Not just reaching <span className="hi">the stars</span>. Building a <span className="hi">civilization</span>
              <span className="dim"> that thrives across the cosmos.</span>
            </div>
          </RevealBlock>
          <RevealBlock delay={0.15} className="m-points">
            <div className="m-point">
              <div className="m-num">01</div>
              <div>
                <h4>Project Artemis Deep</h4>
                <p>Establishing permanent lunar outposts with self-sustaining biosphere technology. First crew rotation scheduled for 2028.</p>
              </div>
            </div>
            <div className="m-point">
              <div className="m-num">02</div>
              <div>
                <h4>Kepler Relay Network</h4>
                <p>Deploying a constellation of quantum-linked relay stations spanning from Mars orbit to the asteroid belt.</p>
              </div>
            </div>
            <div className="m-point">
              <div className="m-num">03</div>
              <div>
                <h4>Voyager Genesis</h4>
                <p>Our flagship interstellar probe — the first human-made object engineered to reach Proxima Centauri within a single generation.</p>
              </div>
            </div>
          </RevealBlock>
        </div>
      </div>
    </div>
  );
}
