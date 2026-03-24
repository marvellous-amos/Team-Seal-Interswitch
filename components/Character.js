"use client";
/**
 * Character — 2D SVG avatar for Chinedu or Omotola
 * Seated at desk, idle animation, reactions on correct/wrong
 */
import { motion, AnimatePresence } from "framer-motion";

// ─── SVG Characters ────────────────────────────────────────────────────────

function ChineduSVG({ reaction }) {
  return (
    <svg
      viewBox="0 0 120 160"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
    >
      {/* Body shadow */}
      <ellipse cx="60" cy="155" rx="35" ry="5" fill="rgba(0,0,0,0.3)" />
      {/* Shirt - dark blue */}
      <rect x="28" y="85" width="64" height="55" rx="8" fill="#1a3a6b" />
      {/* Collar */}
      <path d="M52 85 L60 100 L68 85" fill="white" />
      {/* Arms */}
      <rect x="14" y="88" width="18" height="38" rx="9" fill="#5C3D2E" />
      <rect x="88" y="88" width="18" height="38" rx="9" fill="#5C3D2E" />
      {/* Neck */}
      <rect x="52" y="70" width="16" height="20" rx="4" fill="#5C3D2E" />
      {/* Head */}
      <ellipse cx="60" cy="52" rx="28" ry="30" fill="#5C3D2E" />
      {/* Hair */}
      <ellipse cx="60" cy="26" rx="26" ry="12" fill="#1a0a00" />
      {/* Ears */}
      <ellipse cx="32" cy="52" rx="6" ry="8" fill="#5C3D2E" />
      <ellipse cx="88" cy="52" rx="6" ry="8" fill="#5C3D2E" />
      {/* Eyes */}
      <ellipse
        cx="49"
        cy="48"
        rx="5"
        ry={reaction === "wrong" ? 2 : 5}
        fill="white"
      />
      <ellipse
        cx="71"
        cy="48"
        rx="5"
        ry={reaction === "wrong" ? 2 : 5}
        fill="white"
      />
      <circle cx="49" cy="49" r="3" fill="#1a0a00" />
      <circle cx="71" cy="49" r="3" fill="#1a0a00" />
      {/* Pupil shine */}
      <circle cx="50" cy="48" r="1" fill="white" />
      <circle cx="72" cy="48" r="1" fill="white" />
      {/* Mouth */}
      {reaction === "correct" ? (
        <path
          d="M50 64 Q60 72 70 64"
          stroke="white"
          strokeWidth="2.5"
          fill="none"
          strokeLinecap="round"
        />
      ) : reaction === "wrong" ? (
        <path
          d="M50 68 Q60 62 70 68"
          stroke="white"
          strokeWidth="2.5"
          fill="none"
          strokeLinecap="round"
        />
      ) : (
        <path
          d="M52 65 Q60 68 68 65"
          stroke="white"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
        />
      )}
      {/* Nose */}
      <ellipse cx="60" cy="58" rx="3" ry="2" fill="#4a2e1e" />
      {/* Laptop on desk */}
      <rect x="18" y="128" width="84" height="8" rx="2" fill="#2a2a3a" />
      <rect x="22" y="110" width="76" height="20" rx="3" fill="#1a1a2e" />
      <rect x="24" y="112" width="72" height="16" rx="2" fill="#0d0d1a" />
      {/* Screen glow */}
      <rect
        x="24"
        y="112"
        width="72"
        height="16"
        rx="2"
        fill="url(#screenGlow)"
        opacity="0.6"
      />
      <defs>
        <linearGradient id="screenGlow" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#008751" />
          <stop offset="100%" stopColor="#E94560" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function OmotolaSVG({ reaction }) {
  return (
    <svg
      viewBox="0 0 120 160"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
    >
      {/* Shadow */}
      <ellipse cx="60" cy="155" rx="35" ry="5" fill="rgba(0,0,0,0.3)" />
      {/* Body - ankara pattern suggestion */}
      <rect x="28" y="85" width="64" height="55" rx="8" fill="#8B0057" />
      {/* Pattern dots */}
      {[35, 45, 55, 65, 75, 85].map((x) =>
        [95, 108, 121].map((y) => (
          <circle
            key={`${x}-${y}`}
            cx={x}
            cy={y}
            r="2"
            fill="#F5A623"
            opacity="0.5"
          />
        )),
      )}
      {/* Collar/neckline */}
      <path d="M48 85 Q60 92 72 85" fill="#6B0040" />
      {/* Arms */}
      <rect x="14" y="88" width="17" height="35" rx="8" fill="#5C3D2E" />
      <rect x="89" y="88" width="17" height="35" rx="8" fill="#5C3D2E" />
      {/* Neck */}
      <rect x="52" y="68" width="16" height="22" rx="4" fill="#5C3D2E" />
      {/* Head */}
      <ellipse cx="60" cy="50" rx="27" ry="29" fill="#5C3D2E" />
      {/* Hair - braids/natural */}
      <ellipse cx="60" cy="24" rx="28" ry="14" fill="#1a0a00" />
      {/* Hair bunches */}
      <ellipse cx="35" cy="32" rx="8" ry="14" fill="#1a0a00" />
      <ellipse cx="85" cy="32" rx="8" ry="14" fill="#1a0a00" />
      {/* Gele-style highlight */}
      <path
        d="M32 24 Q60 12 88 24"
        stroke="#F5A623"
        strokeWidth="3"
        fill="none"
        opacity="0.6"
      />
      {/* Ears */}
      <ellipse cx="33" cy="50" rx="5" ry="7" fill="#5C3D2E" />
      <ellipse cx="87" cy="50" rx="5" ry="7" fill="#5C3D2E" />
      {/* Earrings */}
      <circle cx="33" cy="56" r="3" fill="#F5A623" />
      <circle cx="87" cy="56" r="3" fill="#F5A623" />
      {/* Eyes */}
      <ellipse
        cx="49"
        cy="47"
        rx="5"
        ry={reaction === "wrong" ? 2 : 5.5}
        fill="white"
      />
      <ellipse
        cx="71"
        cy="47"
        rx="5"
        ry={reaction === "wrong" ? 2 : 5.5}
        fill="white"
      />
      {/* Eyeshadow */}
      <path d="M44 44 Q49 41 54 44" fill="#8B0057" opacity="0.4" />
      <path d="M66 44 Q71 41 76 44" fill="#8B0057" opacity="0.4" />
      <circle cx="49" cy="48" r="3" fill="#1a0a00" />
      <circle cx="71" cy="48" r="3" fill="#1a0a00" />
      <circle cx="50" cy="47" r="1" fill="white" />
      <circle cx="72" cy="47" r="1" fill="white" />
      {/* Nose */}
      <ellipse cx="60" cy="56" rx="3.5" ry="2.5" fill="#4a2e1e" />
      {/* Lips */}
      {reaction === "correct" ? (
        <path
          d="M50 63 Q60 72 70 63"
          stroke="#E94560"
          strokeWidth="2.5"
          fill="none"
          strokeLinecap="round"
        />
      ) : reaction === "wrong" ? (
        <path
          d="M50 68 Q60 62 70 68"
          stroke="#E94560"
          strokeWidth="2.5"
          fill="none"
          strokeLinecap="round"
        />
      ) : (
        <path
          d="M53 64 Q60 68 67 64"
          stroke="#C94070"
          strokeWidth="2.5"
          fill="none"
          strokeLinecap="round"
        />
      )}
      {/* Laptop */}
      <rect x="18" y="128" width="84" height="8" rx="2" fill="#2a2a3a" />
      <rect x="22" y="110" width="76" height="20" rx="3" fill="#1a1a2e" />
      <rect x="24" y="112" width="72" height="16" rx="2" fill="#0d0d1a" />
      <rect
        x="24"
        y="112"
        width="72"
        height="16"
        rx="2"
        fill="url(#screenGlowF)"
        opacity="0.6"
      />
      <defs>
        <linearGradient id="screenGlowF" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#8B0057" />
          <stop offset="100%" stopColor="#F5A623" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export default function Character({
  characterData,
  reaction = "idle",
  businessType,
}) {
  const isOmotola = characterData?.id === "omotola";

  // Reaction bounce animation
  const reactionVariants = {
    idle: {
      y: [0, -4, 0],
      transition: { repeat: Infinity, duration: 3, ease: "easeInOut" },
    },
    correct: {
      y: [-10, 0],
      scale: [1, 1.05, 1],
      transition: { duration: 0.4 },
    },
    wrong: { x: [-8, 8, -6, 6, 0], transition: { duration: 0.4 } },
  };

  return (
    <motion.div
      className="relative flex flex-col items-center"
      variants={reactionVariants}
      animate={reaction}
    >
      {/* Reaction badges */}
      <AnimatePresence>
        {reaction === "correct" && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.5 }}
            animate={{ opacity: 1, y: -20, scale: 1 }}
            exit={{ opacity: 0, y: -40 }}
            className="absolute -top-8 left-1/2 -translate-x-1/2 bg-[#2DC653] text-white text-xs font-bold px-3 py-1 rounded-full z-20 whitespace-nowrap"
          >
            +10 ✓
          </motion.div>
        )}
        {reaction === "wrong" && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.5 }}
            animate={{ opacity: 1, y: -20, scale: 1 }}
            exit={{ opacity: 0, y: -40 }}
            className="absolute -top-8 left-1/2 -translate-x-1/2 bg-[#E63946] text-white text-xs font-bold px-3 py-1 rounded-full z-20 whitespace-nowrap"
          >
            ❌ Wrong!
          </motion.div>
        )}
      </AnimatePresence>

      {/* Character SVG */}
      <div className="w-28 h-36 drop-shadow-xl">
        {isOmotola ? (
          <OmotolaSVG reaction={reaction} />
        ) : (
          <ChineduSVG reaction={reaction} />
        )}
      </div>

      {/* Name tag */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="mt-2 text-center"
      >
        <span className="text-xs text-white/40 font-mono">
          {characterData?.name || "Pennywise"}
        </span>
      </motion.div>
    </motion.div>
  );
}

// Named export for AnimatePresence usage
export { ChineduSVG, OmotolaSVG };
