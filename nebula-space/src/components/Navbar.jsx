import { useEffect, useState } from 'react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleClick = (e, id) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className={scrolled ? 'scrolled' : ''} id="navbar">
      <a href="#" className="nav-logo">NEB<em>U</em>LA</a>
      <ul className="nav-links">
        <li><a href="#missions" onClick={(e) => handleClick(e, 'missions')}>Missions</a></li>
        <li><a href="#technology" onClick={(e) => handleClick(e, 'technology')}>Technology</a></li>
        <li><a href="#timeline" onClick={(e) => handleClick(e, 'timeline')}>Timeline</a></li>
        <li><a href="#contact" onClick={(e) => handleClick(e, 'contact')}>Contact</a></li>
      </ul>
      <a href="#contact" onClick={(e) => handleClick(e, 'contact')} className="nav-cta">Join the Mission</a>
    </nav>
  );
}
