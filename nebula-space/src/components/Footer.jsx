export default function Footer() {
  return (
    <footer className="footer-premium">
      <div className="footer-top">
        <div className="f-brand">
          <a href="#" className="f-logo">NEB<em>U</em>LA</a>
          <p className="f-desc">Pioneering the next era of interstellar exploration and sustainable cosmic infrastructure.</p>
        </div>
        <div className="f-links-grid">
          <div className="f-col">
            <h4>Initiatives</h4>
            <a href="#">Artemis Deep</a>
            <a href="#">Kepler Relay</a>
            <a href="#">Voyager Genesis</a>
          </div>
          <div className="f-col">
            <h4>Agency</h4>
            <a href="#">About Us</a>
            <a href="#">Careers</a>
            <a href="#">Press Kit</a>
          </div>
          <div className="f-col">
            <h4>Connect</h4>
            <a href="#">Twitter (X)</a>
            <a href="#">LinkedIn</a>
            <a href="#">GitHub</a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="f-copy">© 2026 NEBULA. Interstellar Exploration Agency.</div>
        <div className="f-legal">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
}
