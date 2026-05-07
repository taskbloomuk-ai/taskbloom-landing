'use client';
import { useEffect, useRef, useState } from 'react';
import Globe from 'globe.gl';
import { ukCities, globalCities, cities as allCitiesData } from '@/lib/cities';

// Multi-color beam palette
const beamColors = [
  ['rgba(99,102,241,0.02)', '#6366f1'], // indigo → Americas
  ['rgba(16,185,129,0.02)', '#10b981'], // green → MEA
  ['rgba(124,58,237,0.02)', '#7c3aed'], // purple → Asia
  ['rgba(0,212,255,0.02)', '#00d4ff'], // cyan → Pacific
  ['rgba(245,158,11,0.02)', '#f59e0b'], // amber → Europe
];

function getBeamColor(idx: number) { return beamColors[idx % beamColors.length]; }

export default function GlobeScene() {
  const containerRef = useRef<HTMLDivElement>(null);
  const globeRef = useRef<any>(null);
  const [loaded, setLoaded] = useState(false);
  const [hasWebGL, setHasWebGL] = useState(true);

  useEffect(() => {
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || (canvas.getContext('experimental-webgl') as any);
      if (!gl) { setHasWebGL(false); return; }
    } catch { setHasWebGL(false); return; }

    if (!containerRef.current || globeRef.current) return;

    const container = containerRef.current;
    const w = container.clientWidth;
    const h = container.clientHeight;

    const globe = new Globe(container)
      .globeImageUrl('//unpkg.com/three-globe/example/img/earth-dark.jpg')
      .backgroundImageUrl('//unpkg.com/three-globe/example/img/night-sky.png')
      .width(w).height(h)
      // Points
      .pointAltitude('size')
      .pointColor(() => '#00d4ff')
      .pointRadius(0.5)
      .pointsMerge(true)
      // Arcs — solid communication beams with glow
      .arcColor((d: any) => getBeamColor(d.idx ?? 0))
      .arcDashLength(1)
      .arcDashGap(0)
      .arcDashAnimateTime(0)
      .arcStroke(0.6)
      .arcCurveResolution(64)
      .arcCircularResolution(6)
      // Rings
      .ringColor(() => '#7c3aed')
      .ringMaxRadius(5)
      .ringPropagationSpeed(4)
      // Labels
      .labelColor(() => 'rgba(255,255,255,0.7)')
      .labelDotRadius(0.8)
      .labelSize((d: any) => d.pulse ? 1.2 : 0.9)
      .labelText('name')
      .labelAltitude(0.02)
      .labelResolution(12)
      .labelsData([]);

    const controls = globe.controls();
    if (controls) {
      controls.autoRotate = true;
      controls.autoRotateSpeed = 0.5;
      controls.enableZoom = false;
    }

    // ── City Points ──
    globe.pointsData(allCitiesData.map((c) => ({
      lat: c.lat, lng: c.lng,
      size: c.pulse ? 0.6 : 0.35,
      color: c.pulse ? '#00d4ff' : '#7c3aed',
    })));

    // ── Arc Beams (UK→top 6 global) ──
    const topGlobal = globalCities.slice(0, 6);
    const arcs: { startLat: number; startLng: number; endLat: number; endLng: number; idx: number }[] = [];
    ukCities.forEach((src) => {
      topGlobal.forEach((dst, i) => {
        arcs.push({ startLat: src.lat, startLng: src.lng, endLat: dst.lat, endLng: dst.lng, idx: i });
      });
    });
    globe.arcsData(arcs);

    // ── Pulsing Rings on ALL cities ──
    globe.ringsData(allCitiesData.map((c) => ({
      lat: c.lat, lng: c.lng,
      maxR: c.pulse ? 5 : 2.5,
      propagationSpeed: c.pulse ? 3 : 2,
      repeatPeriod: c.pulse ? 2000 : 3000,
    })));

    // ── Floating City Labels ──
    globe.labelsData(allCitiesData.map((c) => ({
      lat: c.lat, lng: c.lng,
      name: `${c.flag || ''} ${c.name}`,
      size: c.pulse ? 1.2 : 0.9,
      color: c.pulse ? '#00d4ff' : '#94a3b8',
      pulse: c.pulse,
    })));

    globeRef.current = globe;
    setLoaded(true);

    const handleResize = () => {
      if (container) { globe.width(container.clientWidth).height(container.clientHeight); }
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (container) container.innerHTML = '';
      globeRef.current = null;
    };
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
      {!loaded && (
        <div className="absolute inset-0 flex items-center justify-center z-10 rounded-2xl bg-[#12121a] border border-[#1e1e2e]">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full border-2 border-[#2a2a3e] border-t-[#6366f1] animate-spin" />
            <p className="text-sm text-[#64748b]">Loading globe...</p>
          </div>
        </div>
      )}
      {/* Neon glow behind globe */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_center,rgba(99,102,241,0.12),transparent_60%)] rounded-full pointer-events-none" />
      <div ref={containerRef} className={`w-full h-full min-h-[400px] md:min-h-[500px] ${loaded ? '' : 'opacity-0'}`} />
    </div>
  );
}
