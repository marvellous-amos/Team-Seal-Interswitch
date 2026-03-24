"use client";
import { motion } from "framer-motion";

const BACKDROP = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100vw",
  height: "100vh",
  background: "rgba(28,25,23,0.82)",
  zIndex: 50,
};
const OVERLAY = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100vw",
  height: "100vh",
  zIndex: 51,
  display: "flex",
  alignItems: "flex-end",
  justifyContent: "center",
  padding: "0 16px 32px",
  boxSizing: "border-box",
};

export default function ExplanationModal({ scenario, wasCorrect, onContinue }) {
  if (!scenario) return null;
  const isScam = scenario.label === "scam";

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        style={BACKDROP}
        onClick={onContinue}
      />

      <div style={OVERLAY}>
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 40, scale: 0.95 }}
          transition={{ type: "spring", stiffness: 320, damping: 30 }}
          onClick={(e) => e.stopPropagation()}
          style={{
            width: "100%",
            maxWidth: 420,
            background: "#FFFFFF",
            borderRadius: 24,
            overflow: "hidden",
            border: wasCorrect ? "2px solid #A3D9B1" : "2px solid #F5AAAA",
            boxShadow: wasCorrect
              ? "0 -4px 32px rgba(45,154,78,0.15)"
              : "0 -4px 32px rgba(224,49,49,0.15)",
          }}
        >
          {/* Top bar */}
          <div
            style={{
              height: 6,
              background: wasCorrect ? "#2D9A4E" : "#E03131",
            }}
          />

          <div style={{ padding: 20 }}>
            {/* Header */}
            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: 12,
                marginBottom: 16,
              }}
            >
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 16,
                  flexShrink: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 22,
                  background: wasCorrect ? "#E8F5ED" : "#FDEAEA",
                  border: wasCorrect
                    ? "2px solid #A3D9B1"
                    : "2px solid #F5AAAA",
                }}
              >
                {wasCorrect ? "✅" : "❌"}
              </div>
              <div>
                <div
                  style={{
                    fontFamily: "Nunito, sans-serif",
                    fontWeight: 900,
                    fontSize: 15,
                    color: wasCorrect ? "#1F6B36" : "#9B1C1C",
                  }}
                >
                  {wasCorrect
                    ? "Correct! 🎉"
                    : `That was a ${isScam ? "SCAM" : "SAFE"} message!`}
                </div>
                <div style={{ fontSize: 11, color: "#78716C", marginTop: 2 }}>
                  {wasCorrect
                    ? `This is ${isScam ? "🔴 a SCAM" : "🟢 SAFE"} — well spotted!`
                    : `You called it ${isScam ? "🟢 safe" : "🔴 a scam"} — it was ${isScam ? "🔴 a scam" : "🟢 safe"}`}
                </div>
              </div>
            </div>

            {/* Explanation box */}
            <div
              style={{
                background: "#EDE9E1",
                border: "1.5px solid #D6D3D1",
                borderRadius: 16,
                padding: 16,
                marginBottom: 16,
              }}
            >
              <div
                style={{
                  fontSize: 11,
                  fontWeight: 900,
                  textTransform: "uppercase",
                  letterSpacing: 1,
                  color: "#E8820C",
                  marginBottom: 8,
                }}
              >
                💡 Why?
              </div>
              <div style={{ fontSize: 13, color: "#44403C", lineHeight: 1.6 }}>
                {scenario.explanation}
              </div>
            </div>

            {/* Red flags */}
            {!wasCorrect && (
              <div style={{ marginBottom: 16 }}>
                <div
                  style={{
                    fontSize: 11,
                    fontWeight: 900,
                    textTransform: "uppercase",
                    letterSpacing: 1,
                    color: "#78716C",
                    marginBottom: 8,
                  }}
                >
                  Red Flags to Remember
                </div>
                {getRedFlags(scenario).map((flag, i) => (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      gap: 8,
                      fontSize: 12,
                      color: "#44403C",
                      marginBottom: 6,
                    }}
                  >
                    <span style={{ color: "#E03131", flexShrink: 0 }}>⚠</span>
                    {flag}
                  </div>
                ))}
              </div>
            )}

            {/* CTA */}
            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={onContinue}
              style={{
                width: "100%",
                padding: "14px 0",
                borderRadius: 16,
                fontFamily: "Nunito, sans-serif",
                fontWeight: 900,
                fontSize: 14,
                cursor: "pointer",
                background: wasCorrect ? "#2D9A4E" : "#FDEAEA",
                color: wasCorrect ? "#FFFFFF" : "#9B1C1C",
                border: wasCorrect ? "none" : "2px solid #F5AAAA",
                boxShadow: wasCorrect
                  ? "0 4px 0 0 #1F6B36"
                  : "0 4px 0 0 #F5AAAA",
              }}
            >
              {wasCorrect ? "NEXT CHALLENGE →" : "GOT IT — NEXT →"}
            </motion.button>
          </div>
        </motion.div>
      </div>
    </>
  );
}

function getRedFlags(scenario) {
  const flags = [];
  const text = scenario.text.toLowerCase();
  if (text.includes("pin") || text.includes("atm pin"))
    flags.push("No bank ever asks for your ATM PIN via SMS");
  if (text.includes("bvn")) flags.push("Sharing BVN enables SIM swap fraud");
  if (text.includes("urgent") || text.includes("now!"))
    flags.push("Urgency is a pressure tactic — real institutions allow time");
  if (text.includes("gmail.com"))
    flags.push("Real banks use official domains, never @gmail.com");
  if (text.includes("fee") || text.includes("processing fee"))
    flags.push("Legitimate grants NEVER require upfront fees");
  if (text.includes("click") || text.includes("http"))
    flags.push("Always verify links — check the actual domain");
  if (flags.length === 0) {
    flags.push("When in doubt, verify through official channels");
    flags.push("Search for the company's official number independently");
  }
  return flags.slice(0, 3);
}
