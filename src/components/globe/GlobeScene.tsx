'use client';
import { useEffect, useRef } from 'react';
import Globe from 'globe.gl';
import * as THREE from 'three';
import { ukCities, globalCities, taskFeedItems } from '@/lib/cities';

export default function GlobeScene() {
  const containerRef = useRef<HTMLDivElement>(null);
  const globeRef = useRef<any>(null);

  useEffect(() => {
    if (!containerRef.current || globeRef.current) return;

    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

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

    // Points for all cities
    const allCities = [...ukCities, ...globalCities];
    const points = allCities.map((c) => ({
      lat: c.lat,
      lng: c.lng,
      size: c.pulse ? 0.5 : 0.25,
      color: c.pulse ? '#00d4ff' : '#7c3aed',
    }));
    globe.pointsData(points);

    // Arcs from UK cities to global
    const arcs: {
      startLat: number; startLng: number;
      endLat: number; endLng: number;
    }[] = [];
    ukCities.forEach((src) => {
      globalCities.forEach((dst) => {
        arcs.push({
          startLat: src.lat,
          startLng: src.lng,
          endLat: dst.lat,
          endLng: dst.lng,
        });
      });
    });
    globe.arcsData(arcs);

    // Pulsing rings on UK cities
    const rings = ukCities.map((c) => ({
      lat: c.lat,
      lng: c.lng,
      maxR: 5,
      propagationSpeed: 3,
      repeatPeriod: 2000,
    }));
    globe.ringsData(rings);

    globeRef.current = globe;

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div ref={containerRef} className="w-full h-full min-h-[400px] md:min-h-[500px]" />
  );
}
