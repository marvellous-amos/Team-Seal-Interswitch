"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  CheckCircle,
  XCircle,
  Loader2,
  Fingerprint,
} from "lucide-react";
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
  const list = SENDERS[cat] || ["Unknown Sender"];
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
    <div
      className="rounded-3xl border-2 border-ink-300 shadow-card overflow-hidden"
      style={{ background: "#FFFFFF" }}
    >
      {/* Category accent line */}
      <div className="h-1.5" style={{ background: style.border }} />

      {/* Header */}
      <div className="px-4 pt-4 pb-2 flex items-start justify-between gap-3">
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
                className="font-black text-sm text-ink-900"
                style={{ fontFamily: "Nunito, sans-serif" }}
              >
                {sender}
              </span>
              {(scenario.verifiedMerchant || scenario.misleadingBadge) && (
                <span className="text-[9px] px-2 py-0.5 rounded-full font-black bg-blue-100 border border-blue-200 text-blue-700 uppercase tracking-tighter">
                  ✔ Verified
                </span>
              )}
            </div>
            <span
              className="text-[9px] px-2 py-0.5 rounded-full font-black mt-1 inline-block uppercase tracking-wider"
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
        <span className="text-[10px] font-bold text-ink-400 flex-shrink-0 mt-1 uppercase">
          Just Now
        </span>
      </div>

      {/* Message Body */}
      <div className="px-4 py-4">
        <div className="bg-bg-base rounded-2xl p-4 border-y-1 border-ink-100 relative">
          <p className="text-ink-900 text-[13px] leading-relaxed font-medium relative z-10">
            {scenario.text}
          </p>
          <div className="absolute top-2 right-2 opacity-5 scale-150 rotate-12 z-0">
            <Fingerprint size={48} />
          </div>
        </div>

        {/* Difficulty pips */}
        <div className="mt-3 flex items-center gap-1.5 px-1">
          <div className="flex gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className="w-2 h-2 rounded-full"
                style={{
                  background: i < scenario.difficulty ? "#E8820C" : "#D6D3D1",
                }}
              />
            ))}
          </div>
          <span className="text-ink-400 text-[10px] font-black uppercase tracking-widest">
            Level {scenario.difficulty} Threat
          </span>
        </div>
      </div>

      {/* Redesigned Identity Tool Section */}
      {scenario.verificationQuery && (
        <div className="px-4 pb-4">
          <div className="bg-brand/5 border-x-1 border-dashed rounded-2xl p-3">
            <div className="flex items-center justify-between gap-3">
              <div className="flex-1">
                <p className="text-[10px] font-black text-ink-500 uppercase tracking-widest mb-1">
                  Sender Identity
                </p>
                <p className="text-[11px] text-ink-600 font-medium leading-tight">
                  {verificationResult
                    ? "Registry scan complete."
                    : "Unsure? Verify this business name against the CAC database."}
                </p>
              </div>

              <div className="flex-shrink-0">
                <AnimatePresence mode="wait">
                  {!verificationResult ? (
                    <motion.button
                      key="verify-btn"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onClick={handleVerify}
                      disabled={verifying}
                      whileTap={{ scale: 0.95 }}
                      className="bg-brand text-white font-black text-[10px] uppercase px-4 py-2.5 rounded-xl shadow-btn hover:brightness-110 transition-all flex items-center gap-2 disabled:opacity-70"
                    >
                      {verifying ? (
                        <>
                          <Loader2 size={12} className="animate-spin" />
                          Scanning...
                        </>
                      ) : (
                        <>
                          <Search size={12} strokeWidth={3} />
                          Verify
                        </>
                      )}
                    </motion.button>
                  ) : (
                    <motion.div
                      key="result-badge"
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className={`flex items-center gap-2 px-3 py-2 rounded-xl border-2 ${
                        verificationResult.status === "found"
                          ? "bg-safe/10 border-safe text-safe"
                          : "bg-danger/10 border-danger text-danger"
                      }`}
                    >
                      {verificationResult.status === "found" ? (
                        <>
                          <CheckCircle size={14} strokeWidth={3} />
                          <span className="font-black text-[10px] uppercase">
                            Registered ({verificationResult.count})
                          </span>
                        </>
                      ) : (
                        <>
                          <XCircle size={14} strokeWidth={3} />
                          <span className="font-black text-[10px] uppercase">
                            No Record
                          </span>
                        </>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="px-4 pb-5 grid grid-cols-2 gap-3 mt-1">
        <motion.button
          whileTap={{ scale: 0.96 }}
          disabled={disabled}
          onClick={() => onAnswer("scam")}
          className="py-4 rounded-2xl font-black text-sm uppercase tracking-wider transition-all disabled:opacity-50"
          style={{
            fontFamily: "Nunito, sans-serif",
            background: "#FDEAEA",
            color: "#9B1C1C",
            border: "2px solid #F5AAAA",
            boxShadow: "0 4px 0 0 #F5AAAA",
          }}
        >
          🚩 Scam
        </motion.button>
        <motion.button
          whileTap={{ scale: 0.96 }}
          disabled={disabled}
          onClick={() => onAnswer("safe")}
          className="py-4 rounded-2xl font-black text-sm uppercase tracking-wider transition-all disabled:opacity-50"
          style={{
            fontFamily: "Nunito, sans-serif",
            background: "#E8F5ED",
            color: "#1F6B36",
            border: "2px solid #A3D9B1",
            boxShadow: "0 4px 0 0 #A3D9B1",
          }}
        >
          ✅ Safe
        </motion.button>
      </div>
    </div>
  );
}
