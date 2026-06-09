import { useRef, useEffect } from 'react';
import * as THREE from 'three';

export default function WarpBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const frameRef = useRef<number>(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x000000, 0.0008);

    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      3000
    );
    camera.position.z = 1000;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    renderer.domElement.style.display = 'block';
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Create distant stars (15,000 particles)
    const starCount = 15000;
    const starGeometry = new THREE.BufferGeometry();
    const starPositions = new Float32Array(starCount * 3);
    const starSizes = new Float32Array(starCount);

    for (let i = 0; i < starCount; i++) {
      starPositions[i * 3] = (Math.random() - 0.5) * 4000;
      starPositions[i * 3 + 1] = (Math.random() - 0.5) * 4000;
      starPositions[i * 3 + 2] = (Math.random() - 0.5) * 4000;
      starSizes[i] = Math.random() * 0.5 + 0.3;
    }

    starGeometry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    starGeometry.setAttribute('size', new THREE.BufferAttribute(starSizes, 1));

    const starMaterial = new THREE.PointsMaterial({
      color: 0xaaaaaa,
      size: 0.8,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const stars = new THREE.Points(starGeometry, starMaterial);
    scene.add(stars);

    // Create neon particles (5,000 particles)
    const neonCount = 5000;
    const neonGeometry = new THREE.BufferGeometry();
    const neonPositions = new Float32Array(neonCount * 3);

    for (let i = 0; i < neonCount; i++) {
      neonPositions[i * 3] = (Math.random() - 0.5) * 3000;
      neonPositions[i * 3 + 1] = (Math.random() - 0.5) * 3000;
      neonPositions[i * 3 + 2] = Math.random() * 3000;
    }

    neonGeometry.setAttribute('position', new THREE.BufferAttribute(neonPositions, 3));

    const neonMaterial = new THREE.PointsMaterial({
      color: 0xccff00,
      size: 1.2,
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const neonParticles = new THREE.Points(neonGeometry, neonMaterial);
    scene.add(neonParticles);

    // Scroll-based speed
    let baseSpeed = 2;
    let targetSpeed = 2;
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const scrollDelta = Math.abs(window.scrollY - lastScrollY);
      targetSpeed = Math.min(2 + scrollDelta * 0.1, 15);
      lastScrollY = window.scrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    // Animation loop
    const animate = () => {
      frameRef.current = requestAnimationFrame(animate);

      // Lerp speed back to base
      baseSpeed += (targetSpeed - baseSpeed) * 0.05;
      targetSpeed += (2 - targetSpeed) * 0.02;

      // Move stars
      const starPosArray = starGeometry.attributes.position.array as Float32Array;
      for (let i = 0; i < starCount; i++) {
        starPosArray[i * 3 + 2] -= baseSpeed * 0.3;
        if (starPosArray[i * 3 + 2] < -1000) {
          starPosArray[i * 3 + 2] += 4000;
        }
      }
      starGeometry.attributes.position.needsUpdate = true;

      // Move neon particles faster
      const neonPosArray = neonGeometry.attributes.position.array as Float32Array;
      for (let i = 0; i < neonCount; i++) {
        neonPosArray[i * 3 + 2] -= baseSpeed * 0.8;
        if (neonPosArray[i * 3 + 2] < -1000) {
          neonPosArray[i * 3 + 2] += 3000;
        }
      }
      neonGeometry.attributes.position.needsUpdate = true;

      // Slow rotation
      stars.rotation.z += 0.0002;
      neonParticles.rotation.z -= 0.0003;

      renderer.render(scene, camera);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(frameRef.current);
      renderer.dispose();
      starGeometry.dispose();
      starMaterial.dispose();
      neonGeometry.dispose();
      neonMaterial.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
      }}
    />
  );
}
