'use client';
import { useEffect, useRef, useState } from 'react';
import Globe from 'globe.gl';
import { ukCities, globalCities } from '@/lib/cities';

export default function GlobeScene() {
  const containerRef = useRef<HTMLDivElement>(null);
  const globeRef = useRef<any>(null);
  const [loaded, setLoaded] = useState(false);
  const [hasWebGL, setHasWebGL] = useState(true);

  useEffect(() => {
    // WebGL check
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) { setHasWebGL(false); return; }
    } catch { setHasWebGL(false); return; }

    if (!containerRef.current || globeRef.current) return;

    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    // Load textures with caching
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      if (!containerRef.current) return;
      try {
        const globe = new Globe(container, { animateIn: true })
          .globeImageUrl('//unpkg.com/three-globe/example/img/earth-dark.jpg')
          .backgroundImageUrl('//unpkg.com/three-globe/example/img/night-sky.png')
          .width(width)
          .height(height)
          .pointAltitude('size')
          .pointColor(() => '#00d4ff')
          .pointRadius(0.4)
          .pointsMerge(true)
          .arcColor(() => ['rgba(99,102,241,0.01)', '#6366f1'])
          .arcDashLength(0.4)
          .arcDashGap(0.2)
          .arcDashAnimateTime(3000)
          .arcStroke(0.3)
          .ringColor(() => '#7c3aed')
          .ringMaxRadius(4)
          .ringPropagationSpeed(2)
          .labelsData([]);

        const controls = globe.controls();
        if (controls) {
          controls.autoRotate = true;
          controls.autoRotateSpeed = 0.6;
          controls.enableZoom = false;
        }

        const allCities = [...ukCities, ...globalCities];
        globe.pointsData(allCities.map((c) => ({
          lat: c.lat, lng: c.lng,
          size: c.pulse ? 0.5 : 0.25,
          color: c.pulse ? '#00d4ff' : '#7c3aed',
        })));

        // Reduce arcs: connect each UK city to 5 nearest global cities
        const topGlobal = globalCities.slice(0, 5);
        const arcs: { startLat: number; startLng: number; endLat: number; endLng: number }[] = [];
        ukCities.forEach((src) => {
          topGlobal.forEach((dst) => {
            arcs.push({ startLat: src.lat, startLng: src.lng, endLat: dst.lat, endLng: dst.lng });
          });
        });
        globe.arcsData(arcs);

        globe.ringsData(ukCities.map((c) => ({
          lat: c.lat, lng: c.lng, maxR: 5, propagationSpeed: 3, repeatPeriod: 2000,
        })));

        globeRef.current = globe;
        setLoaded(true);

        const handleResize = () => {
          if (container) {
            const w = container.clientWidth;
            const h = container.clientHeight;
            globe.width(w).height(h);
          }
        };
        window.addEventListener('resize', handleResize);

        return () => {
          window.removeEventListener('resize', handleResize);
          if (container) container.innerHTML = '';
          globeRef.current = null;
        };
      } catch { setHasWebGL(false); }
    };
    img.onerror = () => setHasWebGL(false);
    img.src = '//unpkg.com/three-globe/example/img/earth-dark.jpg';
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!hasWebGL) {
    return (
      <div className="w-full h-full min-h-[400px] md:min-h-[500px] flex items-center justify-center rounded-2xl bg-[#12121a] border border-[#1e1e2e]">
        <div className="text-center p-8">
          <div className="text-5xl mb-4">🌍</div>
          <p className="text-sm text-[#64748b]">Interactive globe requires WebGL</p>
          <p className="text-xs text-[#64748b] mt-1">Please use a modern browser</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full min-h-[400px] md:min-h-[500px]">
      {/* Loading skeleton */}
      {!loaded && (
        <div className="absolute inset-0 flex items-center justify-center z-10 rounded-2xl bg-[#12121a] border border-[#1e1e2e]">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full border-2 border-[#2a2a3e] border-t-[#6366f1] animate-spin" />
            <p className="text-sm text-[#64748b]">Loading globe...</p>
          </div>
        </div>
      )}
      <div ref={containerRef} className={`w-full h-full min-h-[400px] md:min-h-[500px] ${loaded ? '' : 'opacity-0'}`} />
    </div>
  );
}
