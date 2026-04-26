export default function Hero() {
  return (
    <section id="hero">
      <div className="hero-glow"></div>
      <div className="hero-content">
        <div className="hero-badge">
          <span className="pulse"></span>
          Mission Status: Active
        </div>
        <h1 className="hero-title">
          <span className="line"><span className="word" style={{ animationDelay: '.5s' }}>Beyond</span></span>
          <span className="line"><span className="word ghost" style={{ animationDelay: '.65s' }}>The Stars</span></span>
          <span className="line"><span className="word" style={{ animationDelay: '.8s' }}>Into The</span></span>
          <span className="line"><span className="word ghost" style={{ animationDelay: '.95s' }}>Unknown</span></span>
        </h1>
        <p className="hero-sub">
          Pioneering humanity's next frontier. From orbital stations to interstellar voyages — we engineer the impossible.
        </p>
        <div className="hero-actions">
          <a href="#missions" className="btn-primary" onClick={(e) => { e.preventDefault(); document.getElementById('missions')?.scrollIntoView({ behavior: 'smooth' }); }}>
            Explore Missions
            <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
              <path d="M3 8H13M13 8L8 3M13 8L8 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
          <a href="#technology" className="btn-secondary" onClick={(e) => { e.preventDefault(); document.getElementById('technology')?.scrollIntoView({ behavior: 'smooth' }); }}>
            Our Technology
          </a>
        </div>
      </div>
      <div className="scroll-cue">
        <span>Scroll</span>
        <div className="scroll-line"></div>
      </div>
    </section>
  );
}
