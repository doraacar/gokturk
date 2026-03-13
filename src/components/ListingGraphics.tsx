export const PlotMapGraphic = () => (
  <svg viewBox="0 0 400 300" className="w-full h-full">
    <rect x="0" y="0" width="400" height="300" fill="#FAFAFA" />
    <g stroke="#1A1A1A" strokeWidth="2" fill="none" opacity="0.3">
      <rect x="80" y="60" width="120" height="90" />
      <rect x="200" y="60" width="140" height="90" />
      <rect x="80" y="150" width="80" height="90" />
      <rect x="160" y="150" width="80" height="90" />
      <rect x="240" y="150" width="100" height="90" />
    </g>
    <rect x="120" y="100" width="40" height="30" fill="#B22222" opacity="0.8" />
    <g stroke="#B22222" strokeWidth="1.5" fill="none">
      <circle cx="320" cy="80" r="25" />
      <line x1="320" y1="55" x2="320" y2="65" />
      <line x1="345" y1="80" x2="335" y2="80" />
      <line x1="320" y1="105" x2="320" y2="95" />
      <line x1="295" y1="80" x2="305" y2="80" />
      <text x="315" y="85" fontSize="12" fill="#B22222" fontWeight="bold">N</text>
    </g>
    <line x1="60" y1="260" x2="110" y2="260" stroke="#1A1A1A" strokeWidth="2" opacity="0.4" />
    <line x1="60" y1="255" x2="60" y2="265" stroke="#1A1A1A" strokeWidth="2" opacity="0.4" />
    <line x1="110" y1="255" x2="110" y2="265" stroke="#1A1A1A" strokeWidth="2" opacity="0.4" />
    <text x="70" y="280" fontSize="14" fill="#1A1A1A" opacity="0.6">50m</text>
  </svg>
);

export const VillaArchitectureGraphic = () => (
  <svg viewBox="0 0 400 300" className="w-full h-full">
    <rect x="0" y="0" width="400" height="300" fill="#FAFAFA" />
    <g stroke="#1A1A1A" strokeWidth="2" fill="none" opacity="0.3">
      <polygon points="200,60 120,140 280,140" />
      <rect x="140" y="140" width="120" height="100" />
      <rect x="160" y="170" width="30" height="40" />
      <rect x="210" y="170" width="30" height="40" />
      <rect x="185" y="210" width="30" height="30" />
      <line x1="120" y1="240" x2="280" y2="240" />
      <rect x="100" y="180" width="40" height="60" />
      <rect x="260" y="180" width="40" height="60" />
    </g>
    <rect x="165" y="175" width="25" height="35" fill="#B22222" opacity="0.6" />
    <rect x="215" y="175" width="25" height="35" fill="#B22222" opacity="0.6" />
    <line x1="80" y1="140" x2="80" y2="240" stroke="#1A1A1A" strokeWidth="1" strokeDasharray="4,4" opacity="0.3" />
    <line x1="320" y1="140" x2="320" y2="240" stroke="#1A1A1A" strokeWidth="1" strokeDasharray="4,4" opacity="0.3" />
    <g stroke="#B22222" strokeWidth="1.5" fill="none">
      <circle cx="340" cy="100" r="30" />
      <circle cx="340" cy="100" r="25" />
      <line x1="340" y1="70" x2="340" y2="130" />
      <line x1="310" y1="100" x2="370" y2="100" />
    </g>
  </svg>
);

export const TopographicMapGraphic = () => (
  <svg viewBox="0 0 400 300" className="w-full h-full">
    <rect x="0" y="0" width="400" height="300" fill="#FAFAFA" />
    <g stroke="#1A1A1A" strokeWidth="1.5" fill="none" opacity="0.25">
      <ellipse cx="200" cy="150" rx="140" ry="80" />
      <ellipse cx="200" cy="150" rx="120" ry="65" />
      <ellipse cx="200" cy="150" rx="100" ry="50" />
      <ellipse cx="200" cy="150" rx="80" ry="40" />
      <ellipse cx="200" cy="150" rx="60" ry="30" />
      <ellipse cx="200" cy="150" rx="40" ry="20" />
    </g>
    <g stroke="#B22222" strokeWidth="2" fill="none">
      <ellipse cx="200" cy="150" rx="100" ry="50" />
      <ellipse cx="200" cy="150" rx="60" ry="30" />
    </g>
    <g fill="#1A1A1A" fontSize="12" opacity="0.6">
      <text x="250" y="120">100m</text>
      <text x="250" y="155">80m</text>
      <text x="250" y="185">60m</text>
    </g>
    <g stroke="#B22222" strokeWidth="1.5" fill="none">
      <line x1="320" y1="240" x2="370" y2="240" />
      <line x1="320" y1="240" x2="327" y2="235" />
      <line x1="320" y1="240" x2="327" y2="245" />
      <text x="315" y="260" fontSize="14" fill="#B22222" fontWeight="bold">N</text>
    </g>
  </svg>
);
