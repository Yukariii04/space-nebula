const items = [
  'Deep Space Navigation', 'Quantum Propulsion', 'Orbital Habitats',
  'Exoplanet Survey', 'Stellar Cartography', 'Zero-G Manufacturing',
  'Solar Sail Tech', 'Cryo-Stasis Systems', 'AI Mission Control',
];

export default function Marquee() {
  const doubled = [...items, ...items];
  return (
    <div className="marquee-wrap">
      <div className="marquee-track">
        {doubled.map((item, i) => (
          <div className="m-item" key={i}>
            {item} <span className="m-dot"></span>
          </div>
        ))}
      </div>
    </div>
  );
}
