"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { DeviceFrame } from "@/components/ui/device-frame";

const STATIONS = [
  { name: "Pilot & Front Pax", weight: "340 lbs", ok: true },
  { name: "Fuel (38 gal)", weight: "228 lbs", ok: true, isFuel: true },
  { name: "Baggage Area 1", weight: "25 lbs", ok: true },
];

// CG envelope polygon — realistic C172S Normal Category
const ENVELOPE_POINTS = [
  { cg: 35.0, wt: 1500 },
  { cg: 35.0, wt: 2100 },
  { cg: 36.5, wt: 2400 },
  { cg: 40.5, wt: 2400 },
  { cg: 47.3, wt: 2400 },
  { cg: 47.3, wt: 1500 },
];

// Graph mapping params
const GRAPH = {
  minCG: 33, maxCG: 49,
  minWT: 1400, maxWT: 2500,
  padX: 40, padY: 30,
  width: 320, height: 200,
};

function mapCG(cg: number) {
  return GRAPH.padX + ((cg - GRAPH.minCG) / (GRAPH.maxCG - GRAPH.minCG)) * (GRAPH.width - 2 * GRAPH.padX);
}
function mapWT(wt: number) {
  return GRAPH.padY + ((GRAPH.maxWT - wt) / (GRAPH.maxWT - GRAPH.minWT)) * (GRAPH.height - 2 * GRAPH.padY);
}

const envelopePath = ENVELOPE_POINTS
  .map((p, i) => `${i === 0 ? "M" : "L"} ${mapCG(p.cg).toFixed(1)},${mapWT(p.wt).toFixed(1)}`)
  .join(" ") + " Z";

// Simulated data points — match real app values
const takeoffPoint = { cg: 40.2, wt: 1985 };
const landingPoint = { cg: 39.8, wt: 1850 };

export function WeightBalanceMockup() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <div ref={ref}>
      <DeviceFrame variant="ipad">
        <div className="w-full h-full bg-[#0A1A2F] flex flex-col text-white overflow-hidden">
          {/* Nav bar - matching real app */}
          <div className="flex items-center justify-between px-6 py-3 border-b border-[#354555]">
            <div className="flex items-center gap-2">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M10 3L5 8l5 5" stroke="#007AFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span className="text-[14px] font-semibold text-[#007AFF]">Hangar</span>
            </div>
            <p className="text-[17px] font-semibold">Weight & Balance</p>
            <div className="w-12" />
          </div>

          {/* Aircraft header */}
          <div className="px-4 py-3">
            <div className="flex items-center gap-3">
              <div>
                <p className="text-[17px] font-bold">C172S · N172SP</p>
                <p className="text-[12px] font-medium text-[#8899AA]">Max T/O: 2,400 lbs</p>
              </div>
            </div>
          </div>

          {/* CG Envelope Graph */}
          <div className="px-4">
            <div className="bg-[#1C2A3A] border border-[#354555] rounded-2xl p-3">
              <p className="text-[10px] font-bold tracking-[1px] text-[#8899AA] uppercase mb-2">
                CG Envelope
              </p>
              <svg
                viewBox={`0 0 ${GRAPH.width} ${GRAPH.height}`}
                className="w-full"
                preserveAspectRatio="xMidYMid meet"
              >
                {/* Grid lines */}
                {isInView && [1600, 1800, 2000, 2200, 2400].map((wt, i) => (
                  <motion.line
                    key={`h-${i}`}
                    x1={GRAPH.padX}
                    y1={mapWT(wt)}
                    x2={GRAPH.width - GRAPH.padX}
                    y2={mapWT(wt)}
                    stroke="#354555"
                    strokeWidth="0.5"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.5 }}
                    transition={{ delay: 0.1 + i * 0.03 }}
                  />
                ))}
                {isInView && [35, 38, 41, 44, 47].map((cg, i) => (
                  <motion.line
                    key={`v-${i}`}
                    x1={mapCG(cg)}
                    y1={GRAPH.padY}
                    x2={mapCG(cg)}
                    y2={GRAPH.height - GRAPH.padY}
                    stroke="#354555"
                    strokeWidth="0.5"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.5 }}
                    transition={{ delay: 0.1 + i * 0.03 }}
                  />
                ))}

                {/* Envelope polygon */}
                {isInView && (
                  <motion.path
                    d={envelopePath}
                    fill="rgba(48, 209, 88, 0.15)"
                    stroke="rgba(48, 209, 88, 0.6)"
                    strokeWidth="2"
                    initial={{ pathLength: 0, fillOpacity: 0 }}
                    animate={{ pathLength: 1, fillOpacity: 1 }}
                    transition={{ duration: 0.6, ease: "easeInOut" }}
                  />
                )}

                {/* Dashed connection line T/O → LDG */}
                {isInView && (
                  <motion.line
                    x1={mapCG(takeoffPoint.cg)}
                    y1={mapWT(takeoffPoint.wt)}
                    x2={mapCG(landingPoint.cg)}
                    y2={mapWT(landingPoint.wt)}
                    stroke="rgba(136, 153, 170, 0.5)"
                    strokeWidth="1"
                    strokeDasharray="4 3"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.7, duration: 0.3 }}
                  />
                )}

                {/* Takeoff point */}
                {isInView && (
                  <motion.g
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <circle
                      cx={mapCG(takeoffPoint.cg)}
                      cy={mapWT(takeoffPoint.wt)}
                      r="6"
                      fill="#30D158"
                    />
                    <text
                      x={mapCG(takeoffPoint.cg)}
                      y={mapWT(takeoffPoint.wt) - 14}
                      textAnchor="middle"
                      fill="#30D158"
                      fontSize="9"
                      fontWeight="700"
                    >
                      T/O
                    </text>
                  </motion.g>
                )}

                {/* Landing point */}
                {isInView && (
                  <motion.g
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.65, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <circle
                      cx={mapCG(landingPoint.cg)}
                      cy={mapWT(landingPoint.wt)}
                      r="5"
                      fill="#007AFF"
                    />
                    <text
                      x={mapCG(landingPoint.cg)}
                      y={mapWT(landingPoint.wt) - 12}
                      textAnchor="middle"
                      fill="#007AFF"
                      fontSize="9"
                      fontWeight="700"
                    >
                      LDG
                    </text>
                  </motion.g>
                )}

                {/* Axis labels */}
                <text x={GRAPH.width / 2} y={GRAPH.height - 4} textAnchor="middle" fill="#8899AA" fontSize="8">
                  CG (inches)
                </text>
                <text x={6} y={GRAPH.height / 2} textAnchor="middle" fill="#8899AA" fontSize="8" transform={`rotate(-90, 6, ${GRAPH.height / 2})`}>
                  Weight (lbs)
                </text>
              </svg>
            </div>
          </div>

          {/* Station rows */}
          <div className="flex-1 overflow-hidden px-4 py-3 space-y-[10px]">
            <p className="text-[10px] font-bold tracking-[1px] text-[#8899AA] uppercase">
              Loading Stations
            </p>
            {STATIONS.map((station, i) => (
              <motion.div
                key={i}
                className="flex items-center gap-3 bg-[#1C2A3A] border border-[#354555] rounded-xl px-3 py-[10px]"
                initial={{ opacity: 0, y: 6 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3 + i * 0.08 }}
              >
                <div className="flex items-center gap-1.5 flex-1">
                  {station.isFuel && (
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                      <path d="M3 8V3a1 1 0 011-1h2a1 1 0 011 1v5" stroke="#FFD60A" strokeWidth="1" strokeLinecap="round"/>
                      <path d="M2 8h6" stroke="#FFD60A" strokeWidth="1" strokeLinecap="round"/>
                    </svg>
                  )}
                  <p className="text-[13px] font-semibold text-white">{station.name}</p>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-[13px] font-medium text-white">{station.weight}</span>
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                    <circle cx="5" cy="5" r="4.5" stroke="#30D158" strokeWidth="1"/>
                    <path d="M3 5l1.5 1.5L7 4" stroke="#30D158" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Results card */}
          <div className="px-4 pb-3">
            <motion.div
              className="bg-[#1C2A3A] border-[1.5px] border-[#30D158]/40 rounded-2xl px-4 py-3"
              initial={{ opacity: 0, scale: 0.97 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.55, duration: 0.3 }}
            >
              <div className="flex items-center justify-between mb-2">
                <p className="text-[10px] font-bold tracking-[1px] text-[#8899AA] uppercase">
                  Results
                </p>
                {/* Pass badge */}
                <div className="flex items-center gap-1 bg-[#30D158]/15 rounded-full px-2.5 py-1">
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                    <circle cx="5" cy="5" r="4.5" stroke="#30D158" strokeWidth="1"/>
                    <path d="M3 5l1.5 1.5L7 4" stroke="#30D158" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span className="text-[10px] font-bold text-[#30D158]">PASS</span>
                </div>
              </div>

              {/* Takeoff row */}
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[13px] font-bold text-white">Takeoff</p>
                  <p className="text-[11px] text-[#8899AA]">
                    1,985 lbs <span className="text-[10px]">/ 2,400</span>
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-[13px] font-semibold text-white">40.20 in</p>
                  <p className="text-[10px] font-semibold text-[#30D158]">Within limits</p>
                </div>
              </div>

              {/* Divider */}
              <div className="h-px bg-[#354555] my-2" />

              {/* Landing row */}
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[13px] font-bold text-white">Landing</p>
                  <p className="text-[11px] text-[#8899AA]">
                    1,850 lbs <span className="text-[10px]">/ 2,400</span>
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-[13px] font-semibold text-white">39.80 in</p>
                  <p className="text-[10px] font-semibold text-[#30D158]">Within limits</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </DeviceFrame>
    </div>
  );
}
