'use client';
import { useScroll, useTransform, motion } from 'framer-motion';
import { ukCities, globalCities } from '@/lib/cities';

function lngToX(lng: number) { return ((lng + 180) / 360) * 100; }
function latToY(lat: number) { return ((90 - lat) / 180) * 100; }

const allCities = [...ukCities, ...globalCities];

// Simplified world continent outlines as SVG paths
const continents = (
  <g fill="none" stroke="#6366f1" strokeWidth="0.5" opacity="0.4">
    {/* North America */}
    <path d="M150,80 L170,75 L195,80 L210,85 L220,95 L225,110 L230,130 L235,150 L225,165 L210,175 L195,180 L190,190 L185,200 L175,205 L180,215 L190,225 L185,235 L175,240 L165,235 L160,225 L155,215 L145,210 L135,200 L130,185 L125,170 L120,155 L115,140 L110,125 L115,110 L120,100 L130,90 L140,85 Z" />
    {/* Greenland */}
    <path d="M225,55 L235,50 L248,55 L250,70 L245,85 L235,90 L225,85 L220,70 Z" />
    {/* South America */}
    <path d="M195,240 L205,235 L215,240 L220,255 L225,270 L220,290 L215,310 L210,325 L200,335 L190,340 L185,330 L180,315 L175,300 L175,285 L178,265 L182,250 Z" />
    {/* Europe */}
    <path d="M390,100 L400,90 L415,85 L430,88 L440,95 L448,105 L450,115 L445,125 L435,130 L425,135 L415,140 L405,138 L395,132 L388,125 L385,115 Z" />
    {/* UK / Ireland */}
    <path d="M370,100 L378,95 L385,100 L388,110 L385,118 L378,120 L370,115 Z" />
    {/* Scandinavia */}
    <path d="M420,55 L432,50 L445,52 L455,60 L458,75 L455,88 L445,92 L435,90 L425,85 L420,75 Z" />
    {/* Africa */}
    <path d="M395,145 L410,140 L425,145 L440,150 L448,165 L450,185 L445,205 L438,220 L425,235 L415,245 L405,250 L395,248 L388,240 L382,225 L378,205 L380,185 L385,165 Z" />
    {/* Madagascar */}
    <path d="M455,215 L462,210 L468,215 L470,230 L465,242 L458,245 L452,240 Z" />
    {/* Asia */}
    <path d="M460,90 L475,85 L495,80 L515,78 L535,80 L555,85 L570,92 L580,105 L585,120 L580,140 L570,155 L555,165 L540,170 L525,168 L510,165 L498,158 L488,148 L480,135 L475,120 L468,108 Z" />
    {/* Middle East / India */}
    <path d="M475,145 L490,140 L505,145 L515,155 L520,170 L515,185 L505,195 L495,200 L485,195 L478,185 L472,170 Z" />
    {/* Southeast Asia */}
    <path d="M540,170 L555,165 L570,172 L580,185 L585,200 L575,210 L560,215 L545,210 L535,200 L530,185 Z" />
    {/* Japan */}
    <path d="M600,100 L610,95 L618,100 L620,115 L618,128 L610,132 L600,128 L595,115 Z" />
    {/* Australia */}
    <path d="M590,310 L610,300 L630,305 L645,315 L650,330 L645,345 L630,355 L610,358 L595,350 L585,335 Z" />
    {/* New Zealand */}
    <path d="M665,350 L672,345 L678,350 L680,362 L675,370 L668,372 L662,365 Z" />
    {/* Antarctica hint */}
    <path d="M100,540 L300,530 L500,535 L700,525 L900,530 L1100,520 L1100,580 L100,580 Z" opacity="0.15" />
  </g>
);

export default function WorldMapBackground() {
  const { scrollY } = useScroll();
  const mapY = useTransform(scrollY, [0, 1000], [0, 120]);

  return (
    <motion.div
      style={{ y: mapY }}
      className="absolute inset-0 overflow-hidden pointer-events-none will-change-transform"
    >
      {/* World map SVG */}
      <svg
        viewBox="0 0 700 400"
        className="absolute inset-0 w-full h-full opacity-[0.04] md:opacity-[0.06] lg:opacity-[0.08]"
        preserveAspectRatio="xMidYMid meet"
        aria-hidden="true"
      >
        {continents}
      </svg>

      {/* City blinking dots */}
      {allCities.map((city) => (
        <div
          key={city.name}
          className="absolute w-1.5 h-1.5 md:w-2 md:h-2 rounded-full animate-city-pulse"
          style={{
            left: `${lngToX(city.lng)}%`,
            top: `${latToY(city.lat)}%`,
            background: city.pulse ? '#00d4ff' : '#6366f1',
            boxShadow: city.pulse
              ? '0 0 6px rgba(0,212,255,0.5)'
              : '0 0 4px rgba(99,102,241,0.3)',
            animationDelay: `${Math.random() * 4}s`,
            animationDuration: `${2 + Math.random() * 2}s`,
            transform: 'translate(-50%, -50%)',
          }}
        />
      ))}

      {/* Connection lines from UK cities to global */}
      <svg
        viewBox="0 0 700 400"
        className="absolute inset-0 w-full h-full opacity-[0.03] md:opacity-[0.05]"
        preserveAspectRatio="xMidYMid meet"
        aria-hidden="true"
      >
        {ukCities.map((src) =>
          globalCities.slice(0, 5).map((dst, i) => (
            <line
              key={`${src.name}-${dst.name}`}
              x1={`${lngToX(src.lng)}%`}
              y1={`${latToY(src.lat)}%`}
              x2={`${lngToX(dst.lng)}%`}
              y2={`${latToY(dst.lat)}%`}
              stroke="#6366f1"
              strokeWidth="0.3"
              opacity={0.6 - i * 0.1}
              strokeDasharray="3 3"
            />
          ))
        )}
      </svg>
    </motion.div>
  );
}
