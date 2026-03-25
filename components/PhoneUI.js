"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ScenarioCard from "./ScenarioCard";

// Overlay styles — explicit 100vw/100vh so no parent containing block can clip them
const BACKDROP = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100vw",
  height: "100vh",
  background: "rgba(28,25,23,0.6)",
  zIndex: 30,
};
const OVERLAY = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100vw",
  height: "100vh",
  zIndex: 40,
  display: "flex",
  alignItems: "center", // Centers vertically
  justifyContent: "center",
  padding: "16px 16px",
  boxSizing: "border-box",
};

export default function PhoneUI({
  scenario,
  isOpen,
  spreeActive,
  onOpen,
  onAnswer,
  disabled,
  notificationCount,
}) {
  const [showPing, setShowPing] = useState(false);

  useEffect(() => {
    if (scenario && !isOpen) {
      setShowPing(true);
      const t = setTimeout(() => setShowPing(false), 3000);
      return () => clearTimeout(t);
    }
  }, [scenario?.id, isOpen]);

  // ── Closed: vibrating phone button ───────────────────────────
  if (!isOpen) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div style={{ position: "relative" }}>
          {showPing && (
            <motion.div
              initial={{ scale: 1, opacity: 0.7 }}
              animate={{ scale: 2.6, opacity: 0 }}
              transition={{ duration: 1.3, repeat: Infinity }}
              style={{
                position: "absolute",
                inset: 0,
                borderRadius: 24,
                border: "2px solid #E03131",
                pointerEvents: "none",
              }}
            />
          )}
          <motion.button
            animate={
              scenario
                ? {
                    rotate: [-4, 4, -4, 4, 0],
                    transition: { repeat: Infinity, duration: 0.45 },
                  }
                : {}
            }
            whileTap={{ scale: 0.88 }}
            onClick={onOpen}
            disabled={!scenario}
            style={{
              position: "relative",
              width: 64,
              height: 64,
              borderRadius: 24,
              background: "#FFFFFF",
              border: `2px solid ${scenario ? "#2D9A4E" : "#D6D3D1"}`,
              boxShadow: scenario ? "0 4px 0 0 #1F6B36" : "0 4px 0 0 #D6D3D1",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 30,
              cursor: scenario ? "pointer" : "default",
              opacity: scenario ? 1 : 0.4,
            }}
          >
            📱
            {notificationCount > 0 && (
              <div
                style={{
                  position: "absolute",
                  top: -8,
                  right: -8,
                  width: 20,
                  height: 20,
                  borderRadius: "50%",
                  background: "#E03131",
                  color: "#fff",
                  fontSize: 10,
                  fontWeight: 900,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  border: "2px solid #F7F4EF",
                }}
              >
                {notificationCount}
              </div>
            )}
          </motion.button>

          <AnimatePresence>
            {showPing && scenario && (
              <motion.div
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                style={{
                  position: "absolute",
                  bottom: "calc(100% + 8px)",
                  left: "50%",
                  transform: "translateX(-50%)",
                  background: "#E03131",
                  color: "#fff",
                  fontSize: 11,
                  padding: "4px 12px",
                  borderRadius: 12,
                  whiteSpace: "nowrap",
                  fontWeight: 700,
                  boxShadow: "0 2px 0 0 #9B1C1C",
                }}
              >
                📩 New message!
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    );
  }

  // ── Open: fixed overlay using 100vw/100vh ─────────────────────
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        style={BACKDROP}
      />
      <div style={OVERLAY}>
        <AnimatePresence mode="wait">
          <motion.div
            key={scenario?.id}
            initial={{ opacity: 0, y: 30, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.96 }}
            transition={{ type: "spring", stiffness: 320, damping: 28 }}
            style={{ width: "100%", maxWidth: 420 }}
          >
            {/* Phone chrome */}
            <div
              style={{
                background: "#1C1917",
                borderRadius: "24px 24px 0 0",
                padding: "10px 16px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    background: "#2D9A4E",
                  }}
                />
                <span style={{ color: "rgba(255,255,255,0.6)", fontSize: 12 }}>
                  Messages
                </span>
              </div>
              <div
                style={{
                  width: 56,
                  height: 16,
                  background: "#000",
                  borderRadius: 999,
                }}
              />
              <div style={{ display: "flex", gap: 4 }}>
                <div
                  style={{
                    width: 12,
                    height: 6,
                    borderRadius: 999,
                    background: "rgba(255,255,255,0.2)",
                  }}
                />
                <div
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: 999,
                    background: "rgba(255,255,255,0.2)",
                  }}
                />
              </div>
            </div>
            <ScenarioCard
              scenario={scenario}
              onAnswer={onAnswer}
              disabled={disabled}
            />
          </motion.div>
        </AnimatePresence>
      </div>
    </>
  );
}
