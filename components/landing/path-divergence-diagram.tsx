"use client";

import { motion } from "framer-motion";
import { GraduationCap, Globe2, Rocket, HeartHandshake } from "lucide-react";

/**
 * Signature visual for MedPath: a single decision point branching into
 * four distinct career paths. This mirrors the product's core idea —
 * one moment of choice, four visible futures — and is reused (in
 * simplified forms) across the hero, "how it works" section, and the
 * result page reveal.
 */

const PATHS = [
  { id: "specialist", color: "#7C3AED", icon: GraduationCap, label: "متخصص آینده", y: 40 },
  { id: "global", color: "#0EA5E9", icon: Globe2, label: "پزشک جهانی", y: 130 },
  { id: "entrepreneur", color: "#F59E0B", icon: Rocket, label: "پزشک کارآفرین", y: 220 },
  { id: "lifestyle", color: "#10B981", icon: HeartHandshake, label: "پزشک متعادل", y: 310 },
];

export function PathDivergenceDiagram() {
  // Origin point (right side, since layout is RTL — paths fan out to the left)
  const originX = 360;
  const originY = 175;

  return (
    <div className="relative w-full max-w-xl mx-auto" dir="ltr">
      <svg
        viewBox="0 0 380 380"
        className="w-full h-auto"
        role="img"
        aria-label="نمودار انشعاب مسیرهای شغلی پزشکی"
      >
        {/* Background grid dots for depth */}
        <g opacity="0.4">
          {Array.from({ length: 8 }).map((_, row) =>
            Array.from({ length: 8 }).map((_, col) => (
              <circle
                key={`${row}-${col}`}
                cx={20 + col * 50}
                cy={20 + row * 50}
                r="1.5"
                fill="#CBD5E1"
              />
            ))
          )}
        </g>

        {/* Connector lines from origin to each path node */}
        {PATHS.map((path, i) => {
          const midX = 180;
          const d = `M ${originX} ${originY} C ${midX + 40} ${originY}, ${midX} ${path.y}, 60 ${path.y}`;
          return (
            <motion.path
              key={path.id}
              d={d}
              fill="none"
              stroke={path.color}
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeDasharray="6 6"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.55 }}
              transition={{ duration: 1.1, delay: 0.3 + i * 0.12, ease: "easeOut" }}
            />
          );
        })}

        {/* Origin node */}
        <motion.g
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, ease: "backOut" }}
        >
          <circle cx={originX} cy={originY} r="22" fill="#2563EB" />
          <circle cx={originX} cy={originY} r="22" fill="#2563EB" opacity="0.15">
            <animate attributeName="r" values="22;34;22" dur="2.8s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.25;0;0.25" dur="2.8s" repeatCount="indefinite" />
          </circle>
          <text
            x={originX}
            y={originY + 5}
            textAnchor="middle"
            fill="white"
            fontSize="11"
            fontWeight="700"
            style={{ fontFamily: "var(--font-vazirmatn)" }}
          >
            شما
          </text>
        </motion.g>

        {/* Path endpoint nodes */}
        {PATHS.map((path, i) => (
          <motion.g
            key={path.id}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.9 + i * 0.12, ease: "backOut" }}
          >
            <circle cx={60} cy={path.y} r="26" fill="white" stroke={path.color} strokeWidth="2.5" />
            <foreignObject x={60 - 12} y={path.y - 12} width="24" height="24">
              <div
                style={{
                  width: 24,
                  height: 24,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: path.color,
                }}
              >
                <path.icon size={16} strokeWidth={2.25} />
              </div>
            </foreignObject>
          </motion.g>
        ))}
      </svg>

      {/* Labels positioned in normal document flow for RTL correctness */}
      <div className="absolute inset-0" dir="rtl">
        {PATHS.map((path, i) => (
          <motion.div
            key={path.id}
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 1.1 + i * 0.12 }}
            className="absolute text-xs font-bold whitespace-nowrap"
            style={{
              color: path.color,
              top: `${(path.y / 380) * 100}%`,
              right: "84%",
              transform: "translateY(-50%)",
            }}
          >
            {path.label}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
