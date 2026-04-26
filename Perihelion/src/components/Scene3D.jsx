import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function Scene3D() {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 2000);
    camera.position.z = 80;

    // Starfield particles
    const starCount = 3000;
    const starPos = new Float32Array(starCount * 3);
    const starColors = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount; i++) {
      starPos[i * 3] = (Math.random() - 0.5) * 500;
      starPos[i * 3 + 1] = (Math.random() - 0.5) * 500;
      starPos[i * 3 + 2] = (Math.random() - 0.5) * 500;
      const brightness = 0.3 + Math.random() * 0.7;
      starColors[i * 3] = brightness * (0.6 + Math.random() * 0.4);
      starColors[i * 3 + 1] = brightness * (0.5 + Math.random() * 0.5);
      starColors[i * 3 + 2] = brightness;
    }
    const starGeo = new THREE.BufferGeometry();
    starGeo.setAttribute('position', new THREE.Float32BufferAttribute(starPos, 3));
    starGeo.setAttribute('color', new THREE.Float32BufferAttribute(starColors, 3));
    const starMat = new THREE.PointsMaterial({
      size: 0.4, vertexColors: true, transparent: true, opacity: 0.6, sizeAttenuation: true
    });
    const stars = new THREE.Points(starGeo, starMat);
    scene.add(stars);

    // Central planet - Icosahedron
    const planetGeo = new THREE.IcosahedronGeometry(18, 2);
    const planetMat = new THREE.MeshBasicMaterial({
      color: 0x7B5CFF, wireframe: true, transparent: true, opacity: 0.1
    });
    const planet = new THREE.Mesh(planetGeo, planetMat);
    scene.add(planet);

    // Inner glow sphere
    const glowGeo = new THREE.IcosahedronGeometry(16, 3);
    const glowMat = new THREE.MeshBasicMaterial({
      color: 0x7B5CFF, wireframe: true, transparent: true, opacity: 0.04
    });
    const glow = new THREE.Mesh(glowGeo, glowMat);
    scene.add(glow);

    // Orbital rings
    const makeRing = (radius, color, opacity, rotX, rotY) => {
      const geo = new THREE.TorusGeometry(radius, 0.1, 8, 120);
      const mat = new THREE.MeshBasicMaterial({ color, transparent: true, opacity });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.rotation.x = rotX;
      mesh.rotation.y = rotY;
      scene.add(mesh);
      return mesh;
    };
    const ring1 = makeRing(32, 0x7B5CFF, 0.12, Math.PI / 4, 0);
    const ring2 = makeRing(44, 0xFF5C8A, 0.08, Math.PI / 3, Math.PI / 5);
    const ring3 = makeRing(26, 0x5CAAFF, 0.06, 0, Math.PI / 3);
    const ring4 = makeRing(55, 0x7B5CFF, 0.04, Math.PI / 6, Math.PI / 4);

    // Nebula dust particles
    const dustCount = 600;
    const dustPos = new Float32Array(dustCount * 3);
    for (let i = 0; i < dustCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const r = 20 + Math.random() * 40;
      dustPos[i * 3] = Math.cos(angle) * r;
      dustPos[i * 3 + 1] = (Math.random() - 0.5) * 30;
      dustPos[i * 3 + 2] = Math.sin(angle) * r;
    }
    const dustGeo = new THREE.BufferGeometry();
    dustGeo.setAttribute('position', new THREE.Float32BufferAttribute(dustPos, 3));
    const dustMat = new THREE.PointsMaterial({
      color: 0x7B5CFF, size: 0.6, transparent: true, opacity: 0.25, sizeAttenuation: true
    });
    const dust = new THREE.Points(dustGeo, dustMat);
    scene.add(dust);

    // Mouse & scroll tracking
    let mouseX = 0, mouseY = 0, scrollProgress = 0;

    const onMouseMove = (e) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    const onScroll = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      scrollProgress = window.scrollY / maxScroll;
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('scroll', onScroll, { passive: true });

    let t = 0;
    let animId;
    const tick = () => {
      animId = requestAnimationFrame(tick);
      t += 0.003;

      // Stars rotate slowly
      stars.rotation.y = t * 0.02;
      stars.rotation.x = t * 0.008;

      // Planet rotates and morphs
      planet.rotation.y = t * 0.15;
      planet.rotation.x = t * 0.05 + mouseY * 0.05;
      planet.scale.setScalar(1 + Math.sin(t * 0.5) * 0.03);

      glow.rotation.y = -t * 0.1;
      glow.rotation.x = t * 0.08;

      // Rings orbit
      ring1.rotation.z = t * 0.1 + mouseX * 0.04;
      ring2.rotation.z = -t * 0.07;
      ring2.rotation.y = t * 0.05;
      ring3.rotation.x = t * 0.12;
      ring3.rotation.y = t * 0.08;
      ring4.rotation.z = t * 0.03;
      ring4.rotation.x = -t * 0.04;

      // Dust orbits
      dust.rotation.y = t * 0.06;
      dust.rotation.x = t * 0.02;

      // Camera responds to scroll
      camera.position.x += (mouseX * 5 - camera.position.x) * 0.03;
      camera.position.y += (-mouseY * 5 - camera.position.y) * 0.03;

      // Zoom out as user scrolls + rotate scene
      camera.position.z = 80 + scrollProgress * 60;
      scene.rotation.y = scrollProgress * Math.PI * 0.5;

      // Shift planet opacity based on scroll
      planetMat.opacity = 0.1 - scrollProgress * 0.04;
      ring1.material.opacity = 0.12 - scrollProgress * 0.05;

      camera.lookAt(0, 0, 0);
      renderer.render(scene, camera);
    };
    tick();

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      container.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, []);

  return <div ref={containerRef} className="scene-3d" />;
}
