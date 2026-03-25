"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, CheckCircle, XCircle, Loader2 } from "lucide-react";
import { verifyBusiness } from "../lib/interswitchClient";

const CATEGORY_ICONS = {
  "Customer Message": "👤",
  Supplier: "📦",
  Bank: "🏦",
  Grant: "🏛️",
  "Payment Request": "💳",
};

const CATEGORY_STYLE = {
  "Customer Message": { bg: "#FEF3E2", border: "#F9C57A", text: "#92400E" },
  Supplier: { bg: "#F5F5F4", border: "#D6D3D1", text: "#44403C" },
  Bank: { bg: "#EFF6FF", border: "#93C5FD", text: "#1E40AF" },
  Grant: { bg: "#E8F5ED", border: "#A3D9B1", text: "#1F6B36" },
  "Payment Request": { bg: "#FDEAEA", border: "#F5AAAA", text: "#9B1C1C" },
};

const SENDERS = {
  "Customer Message": ["Emeka O.", "Chioma A.", "Bola T.", "Tunde M."],
  Supplier: ["Alhaji Musa", "Mama Nkechi", "Philly Supplies Ltd"],
  Bank: ["GTBank", "Access Bank", "Zenith Bank", "UBA", "Opay"],
  Grant: ["TEF Foundation", "CBN Grants", "LSETF", "SME Office"],
  "Payment Request": [
    "Paystack",
    "Flutterwave",
    "Interswitch",
    "Unknown Sender",
  ],
};

function getSender(cat) {
  const list = SENDERS[cat] || ["Unknown"];
  return list[Math.floor(Math.random() * list.length)];
}

export default function ScenarioCard({ scenario, onAnswer, disabled }) {
  const style = CATEGORY_STYLE[scenario.category] || CATEGORY_STYLE["Supplier"];
  const icon = CATEGORY_ICONS[scenario.category] || "📩";
  const sender = scenario.sender || getSender(scenario.category);

  const [verifying, setVerifying] = useState(false);
  const [verificationResult, setVerificationResult] = useState(null);

  async function handleVerify() {
    if (verifying || !scenario.verificationQuery) return;
    setVerifying(true);

    // Call the Interswitch Marketplace Proxy
    const result = await verifyBusiness(scenario.verificationQuery);

    if (result.success && result.companies?.length > 0) {
      setVerificationResult({
        status: "found",
        count: result.companies.length,
      });
    } else {
      setVerificationResult({ status: "not_found" });
    }
    setVerifying(false);
  }

  return (
    <div style={{ background: "#FFFFFF" }}>
      {/* Category accent line */}
      <div className="h-1" style={{ background: style.border }} />

      {/* Header */}
      <div className="px-4 pt-3 pb-2 flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center text-lg flex-shrink-0"
            style={{
              background: style.bg,
              border: `1.5px solid ${style.border}`,
            }}
          >
            {icon}
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span
                className="font-black text-sm"
                style={{ fontFamily: "Nunito, sans-serif", color: "#1C1917" }}
              >
                {sender}
              </span>
              {(scenario.verifiedMerchant || scenario.misleadingBadge) && (
                <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-blue-50 border border-blue-200 text-blue-700">
                  ✔ Verified
                </span>
              )}
            </div>
            <span
              className="text-[10px] px-2 py-0.5 rounded-full font-semibold mt-0.5 inline-block"
              style={{
                background: style.bg,
                color: style.text,
                border: `1px solid ${style.border}`,
              }}
            >
              {scenario.category}
            </span>
          </div>
        </div>
        <span className="text-[11px] text-ink-400 flex-shrink-0 mt-1">
          Received just now
        </span>
      </div>

      {/* Message */}
      <div className="px-4 pb-3">
        <p className="text-ink-900 text-sm leading-relaxed">{scenario.text}</p>

        {/* Difficulty */}
        <div className="mt-2 flex items-center gap-1.5">
          <div className="flex gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className="w-1.5 h-1.5 rounded-full"
                style={{
                  background: i < scenario.difficulty ? "#E8820C" : "#D6D3D1",
                }}
              />
            ))}
          </div>
          <span className="text-ink-400 text-[11px]">
            Difficulty {scenario.difficulty}/5
          </span>
        </div>
      </div>

      {/* Identity Tool Section — Triggered by scenarios with verificationQuery */}
      {scenario.verificationQuery && (
        <div className="px-4 pb-4">
          <div className="bg-bg-sunken border-2 border-ink-100 rounded-xl p-2.5 flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <Search size={14} className="text-ink-400" />
              <span className="text-[10px] font-black text-ink-500 uppercase tracking-wider">
                CAC Registry
              </span>
            </div>

            <AnimatePresence mode="wait">
              {!verificationResult ? (
                <button
                  onClick={handleVerify}
                  disabled={verifying}
                  className="text-brand font-black text-[10px] uppercase hover:underline disabled:opacity-50 flex items-center gap-1.5"
                >
                  {verifying && <Loader2 size={12} className="animate-spin" />}
                  {verifying ? "Searching..." : "Verify Business"}
                </button>
              ) : (
                <motion.div
                  initial={{ opacity: 0, x: 5 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center gap-1.5"
                >
                  {verificationResult.status === "found" ? (
                    <>
                      <CheckCircle size={14} className="text-safe" />
                      <span className="text-safe font-black text-[10px] uppercase">
                        Registered ({verificationResult.count})
                      </span>
                    </>
                  ) : (
                    <>
                      <XCircle size={14} className="text-danger" />
                      <span className="text-danger font-black text-[10px] uppercase">
                        Not Found
                      </span>
                    </>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      )}

      {/* Buttons */}
      <div className="px-4 pb-4 grid grid-cols-2 gap-3">
        <motion.button
          whileTap={{ scale: 0.95 }}
          disabled={disabled}
          onClick={() => onAnswer("scam")}
          className="py-4 rounded-2xl font-black text-sm disabled:opacity-40 disabled:cursor-not-allowed"
          style={{
            fontFamily: "Nunito, sans-serif",
            background: "#FDEAEA",
            color: "#9B1C1C",
            border: "2px solid #F5AAAA",
            boxShadow: "0 4px 0 0 #F5AAAA",
          }}
        >
          🔴 SCAM
        </motion.button>
        <motion.button
          whileTap={{ scale: 0.95 }}
          disabled={disabled}
          onClick={() => onAnswer("safe")}
          className="py-4 rounded-2xl font-black text-sm disabled:opacity-40 disabled:cursor-not-allowed"
          style={{
            fontFamily: "Nunito, sans-serif",
            background: "#E8F5ED",
            color: "#1F6B36",
            border: "2px solid #A3D9B1",
            boxShadow: "0 4px 0 0 #A3D9B1",
          }}
        >
          🟢 SAFE
        </motion.button>
      </div>
    </div>
  );
}
