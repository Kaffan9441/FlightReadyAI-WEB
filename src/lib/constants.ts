export const SITE = {
  name: "FlightReadyAI",
  tagline: "Preflight Intelligence",
  description:
    "Voice-controlled checklists, AI-powered briefings, and real-time weight & balance — all built for the cockpit.",
  url: "https://flightreadyai.com",
};

export const STATS = [
  { value: 150, suffix: "+", label: "Beta Pilots" },
  { value: 2400, suffix: "+", label: "Checklists Completed" },
  { value: 6, suffix: "", label: "Aircraft Supported" },
  { value: 99.7, suffix: "%", label: "Checklist Accuracy" },
];

export const AIRCRAFT = [
  { name: "Cessna 150", variant: "1969", type: "Trainer" },
  { name: "Cessna 152", variant: "1978", type: "Trainer" },
  { name: "Cessna 172S", variant: "Skyhawk", type: "Trainer" },
  { name: "Piper Cherokee 140", variant: "PA-28", type: "Trainer" },
  { name: "Cirrus SR20", variant: "G6", type: "Complex" },
  { name: "Diamond DA40", variant: "Star", type: "Trainer" },
];

export const CHECKLIST_ITEMS = [
  { challenge: "Fuel Quantity", response: "CHECK VISUALLY", section: "Exterior" },
  { challenge: "Oil Level", response: "4-6 QUARTS", section: "Exterior" },
  { challenge: "Control Surfaces", response: "FREE AND CORRECT", section: "Exterior" },
  { challenge: "Pitot Tube Cover", response: "REMOVED", section: "Exterior" },
  { challenge: "Fuel Caps", response: "SECURE", section: "Exterior" },
  { challenge: "Avionics Master", response: "OFF", section: "Cockpit" },
  { challenge: "Mixture", response: "RICH", section: "Cockpit" },
  { challenge: "Primer", response: "LOCKED", section: "Cockpit" },
];

export const GLOBE_AIRPORTS = [
  { lat: 37.36, lng: -121.93, label: "KSJC" },
  { lat: 40.64, lng: -73.78, label: "KJFK" },
  { lat: 51.47, lng: -0.46, label: "EGLL" },
  { lat: 35.55, lng: 139.78, label: "RJTT" },
  { lat: -33.95, lng: 151.18, label: "YSSY" },
  { lat: 1.36, lng: 103.99, label: "WSSS" },
  { lat: 25.25, lng: 55.36, label: "OMDB" },
  { lat: 49.01, lng: 2.55, label: "LFPG" },
  { lat: 33.94, lng: -118.41, label: "KLAX" },
  { lat: 43.68, lng: -79.63, label: "CYYZ" },
];

export const GLOBE_ROUTES: { from: [number, number]; to: [number, number] }[] =
  [
    { from: [37.36, -121.93], to: [40.64, -73.78] },
    { from: [40.64, -73.78], to: [51.47, -0.46] },
    { from: [51.47, -0.46], to: [35.55, 139.78] },
    { from: [35.55, 139.78], to: [-33.95, 151.18] },
    { from: [37.36, -121.93], to: [1.36, 103.99] },
    { from: [51.47, -0.46], to: [25.25, 55.36] },
    { from: [40.64, -73.78], to: [49.01, 2.55] },
    { from: [33.94, -118.41], to: [43.68, -79.63] },
    { from: [1.36, 103.99], to: [-33.95, 151.18] },
  ];
