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

function TechCard({ num, title, desc, tags, delay }) {
  const cardRef = useRef(null);

  useEffect(() => {
    const card = cardRef.current;
    const onMove = (e) => {
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width;
      const y = (e.clientY - r.top) / r.height;
      card.style.transform = `perspective(900px) rotateX(${(y - 0.5) * -7}deg) rotateY(${(x - 0.5) * 7}deg) translateZ(10px)`;
      card.style.setProperty('--mx', `${x * 100}%`);
      card.style.setProperty('--my', `${y * 100}%`);
    };
    const onLeave = () => { card.style.transform = ''; };
    card.addEventListener('mousemove', onMove);
    card.addEventListener('mouseleave', onLeave);
    return () => {
      card.removeEventListener('mousemove', onMove);
      card.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  return (
    <RevealBlock delay={delay}>
      <div ref={cardRef} className="tech-card">
        <div className="tech-num">{num}</div>
        <h3 className="tech-title">{title}</h3>
        <p className="tech-desc">{desc}</p>
        <div className="tags">
          {tags.map((t, i) => <span className="tag" key={i}>{t}</span>)}
        </div>
      </div>
    </RevealBlock>
  );
}

const techData = [
  {
    num: '01 / 04',
    title: 'Quantum Propulsion',
    desc: 'Our QVDE (Quantum Vacuum Drive Engine) harnesses zero-point energy fluctuations to generate thrust without traditional propellant — enabling sustained acceleration over interstellar distances.',
    tags: ['Zero-Point Energy', 'Ion Cascade', 'Warp Theory', '0.1c Target'],
  },
  {
    num: '02 / 04',
    title: 'Neural Habitat AI',
    desc: 'Self-evolving AI systems that manage life support, resource allocation, and crew psychology across extended deep-space missions. Learns and adapts in real-time.',
    tags: ['Deep Learning', 'Crew Analytics', 'Auto-Repair', 'Emotion Mapping'],
  },
  {
    num: '03 / 04',
    title: 'Stellar Cartography',
    desc: 'Mapping the galaxy with quantum-entangled sensor arrays. Our ATLAS network provides real-time 3D star charts accurate to 0.001 parsec resolution.',
    tags: ['3D Mapping', 'Quantum Sensors', 'ATLAS Network', 'Exoplanet Detection'],
  },
  {
    num: '04 / 04',
    title: 'Cryo-Genesis Pods',
    desc: 'Fourth-generation cryogenic stasis technology with zero cellular degradation. Safe hibernation periods of up to 50 years with full cognitive preservation.',
    tags: ['Cryogenics', 'Bio-Preserve', 'Neural Shield', '50yr Certified'],
  },
];

export default function Technology() {
  return (
    <div id="technology" className="tech-wrap scroll-section">
      <div className="tech-inner">
        <RevealBlock><div className="stag">Core Technology</div></RevealBlock>
        <RevealBlock><h2 className="stitle">Engineering the impossible.</h2></RevealBlock>
        <RevealBlock delay={0.1}><p className="ssub">Breakthrough systems designed for the harshest frontier in existence.</p></RevealBlock>
        <div className="tech-grid">
          {techData.map((item, i) => (
            <TechCard key={i} {...item} delay={i * 0.1} />
          ))}
        </div>
      </div>
    </div>
  );
}
