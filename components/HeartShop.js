// "use client";
// /**
//  * HeartShop — Points-to-Lives purchase sheet
//  *
//  * Triggered from HUD when score >= 70 and reputation < MAX_REPUTATION.
//  * Simulates an Interswitch payment authorisation — no real money.
//  *
//  * Props:
//  *   score          — current player score
//  *   onPurchase()   — called with { success, newScore, ref } after transaction
//  *   onClose()      — dismiss without purchasing
//  */
// import { useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { simulatePaymentAuthorization } from "../lib/interswitchClient";

// const LIFE_COST = 70;

// const OVERLAY = {
//   position: "fixed",
//   top: 0,
//   left: 0,
//   width: "100vw",
//   height: "100vh",
//   background: "rgba(28,25,23,0.75)",
//   zIndex: 60,
// };
// const SHEET = {
//   position: "fixed",
//   top: 0,
//   left: 0,
//   width: "100vw",
//   height: "100vh",
//   zIndex: 61,
//   display: "flex",
//   alignItems: "flex-end",
//   justifyContent: "center",
//   padding: "0 16px 32px",
//   boxSizing: "border-box",
// };

// export default function HeartShop({ score, onPurchase, onClose }) {
//   const [status, setStatus] = useState("idle"); // idle | processing | approved | declined
//   const [txnRef, setTxnRef] = useState(null);

//   async function handleBuy() {
//     if (status === "processing") return;
//     setStatus("processing");

//     const result = await simulatePaymentAuthorization({
//       amount: LIFE_COST * 100, // in kobo equivalent for sandbox
//       merchantCode: "NBS-HEARTSHOP-001",
//       reference: `NBS-LIFE-${Date.now()}`,
//     });

//     if (result.success) {
//       setTxnRef(result.data.transactionRef);
//       setStatus("approved");
//       // Short delay so player sees the approval, then close
//       setTimeout(() => {
//         onPurchase({
//           success: true,
//           newScore: score - LIFE_COST,
//           ref: result.data.transactionRef,
//         });
//       }, 1800);
//     } else {
//       setStatus("declined");
//       // Auto-reset after 2.5s so they can try again or close
//       setTimeout(() => setStatus("idle"), 2500);
//     }
//   }

//   const canAfford = score >= LIFE_COST;

//   return (
//     <>
//       {/* Backdrop */}
//       <motion.div
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         exit={{ opacity: 0 }}
//         style={OVERLAY}
//         onClick={status === "processing" ? undefined : onClose}
//       />

//       {/* Sheet */}
//       <div style={SHEET}>
//         <motion.div
//           initial={{ opacity: 0, y: 40, scale: 0.96 }}
//           animate={{ opacity: 1, y: 0, scale: 1 }}
//           exit={{ opacity: 0, y: 40, scale: 0.96 }}
//           transition={{ type: "spring", stiffness: 320, damping: 30 }}
//           onClick={(e) => e.stopPropagation()}
//           style={{
//             width: "100%",
//             maxWidth: 420,
//             background: "#FFFFFF",
//             borderRadius: 24,
//             overflow: "hidden",
//             border: "2px solid #A3D9B1",
//             boxShadow: "0 -4px 32px rgba(45,154,78,0.15)",
//           }}
//         >
//           {/* Top bar */}
//           <div style={{ height: 6, background: "#2D9A4E" }} />

//           <div style={{ padding: 20 }}>
//             {/* Header */}
//             <div
//               style={{
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "space-between",
//                 marginBottom: 16,
//               }}
//             >
//               <div>
//                 <div
//                   style={{
//                     fontFamily: "Nunito, sans-serif",
//                     fontWeight: 900,
//                     fontSize: 17,
//                     color: "#1C1917",
//                   }}
//                 >
//                   ❤️ Restore a Life
//                 </div>
//                 <div style={{ fontSize: 12, color: "#78716C", marginTop: 2 }}>
//                   Powered by Interswitch sandbox · No real money
//                 </div>
//               </div>
//               <button
//                 onClick={onClose}
//                 disabled={status === "processing"}
//                 style={{
//                   background: "#EDE9E1",
//                   border: "none",
//                   borderRadius: 12,
//                   width: 32,
//                   height: 32,
//                   fontSize: 16,
//                   cursor: "pointer",
//                   display: "flex",
//                   alignItems: "center",
//                   justifyContent: "center",
//                 }}
//               >
//                 ✕
//               </button>
//             </div>

//             {/* Cost card */}
//             <div
//               style={{
//                 background: "#F7F4EF",
//                 border: "2px solid #D6D3D1",
//                 borderRadius: 16,
//                 padding: 16,
//                 marginBottom: 16,
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "space-between",
//               }}
//             >
//               <div>
//                 <div
//                   style={{
//                     fontSize: 12,
//                     color: "#78716C",
//                     fontWeight: 700,
//                     textTransform: "uppercase",
//                     letterSpacing: 1,
//                   }}
//                 >
//                   Cost
//                 </div>
//                 <div
//                   style={{
//                     fontFamily: "Nunito, sans-serif",
//                     fontWeight: 900,
//                     fontSize: 26,
//                     color: "#E8820C",
//                   }}
//                 >
//                   70pts
//                 </div>
//               </div>
//               <div style={{ fontSize: 40 }}>❤️</div>
//               <div style={{ textAlign: "right" }}>
//                 <div
//                   style={{
//                     fontSize: 12,
//                     color: "#78716C",
//                     fontWeight: 700,
//                     textTransform: "uppercase",
//                     letterSpacing: 1,
//                   }}
//                 >
//                   Your Balance
//                 </div>
//                 <div
//                   style={{
//                     fontFamily: "Nunito, sans-serif",
//                     fontWeight: 900,
//                     fontSize: 26,
//                     color: canAfford ? "#2D9A4E" : "#E03131",
//                   }}
//                 >
//                   {score}pts
//                 </div>
//               </div>
//             </div>

//             {/* Remaining after purchase */}
//             {canAfford && status === "idle" && (
//               <div
//                 style={{
//                   fontSize: 12,
//                   color: "#78716C",
//                   textAlign: "center",
//                   marginBottom: 16,
//                 }}
//               >
//                 You'll have{" "}
//                 <strong style={{ color: "#1C1917" }}>
//                   {score - LIFE_COST} pts
//                 </strong>{" "}
//                 remaining after this purchase.
//               </div>
//             )}

//             {!canAfford && (
//               <div
//                 style={{
//                   background: "#FDEAEA",
//                   border: "2px solid #F5AAAA",
//                   borderRadius: 12,
//                   padding: "10px 14px",
//                   marginBottom: 16,
//                   fontSize: 13,
//                   color: "#9B1C1C",
//                   fontWeight: 700,
//                   textAlign: "center",
//                 }}
//               >
//                 Not enough points. You need {LIFE_COST - score} more pts.
//               </div>
//             )}

//             {/* Transaction result */}
//             <AnimatePresence mode="wait">
//               {status === "approved" && (
//                 <motion.div
//                   key="approved"
//                   initial={{ opacity: 0, y: 8 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   exit={{ opacity: 0 }}
//                   style={{
//                     background: "#E8F5ED",
//                     border: "2px solid #A3D9B1",
//                     borderRadius: 12,
//                     padding: "10px 14px",
//                     marginBottom: 16,
//                     textAlign: "center",
//                   }}
//                 >
//                   <div style={{ fontSize: 20, marginBottom: 4 }}>✅</div>
//                   <div
//                     style={{
//                       fontFamily: "Nunito, sans-serif",
//                       fontWeight: 900,
//                       fontSize: 14,
//                       color: "#1F6B36",
//                     }}
//                   >
//                     Life Restored!
//                   </div>
//                   <div style={{ fontSize: 11, color: "#78716C", marginTop: 2 }}>
//                     Ref: {txnRef}
//                   </div>
//                 </motion.div>
//               )}

//               {status === "declined" && (
//                 <motion.div
//                   key="declined"
//                   initial={{ opacity: 0, y: 8 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   exit={{ opacity: 0 }}
//                   style={{
//                     background: "#FDEAEA",
//                     border: "2px solid #F5AAAA",
//                     borderRadius: 12,
//                     padding: "10px 14px",
//                     marginBottom: 16,
//                     textAlign: "center",
//                   }}
//                 >
//                   <div style={{ fontSize: 20, marginBottom: 4 }}>❌</div>
//                   <div
//                     style={{
//                       fontFamily: "Nunito, sans-serif",
//                       fontWeight: 900,
//                       fontSize: 14,
//                       color: "#9B1C1C",
//                     }}
//                   >
//                     Transaction Declined
//                   </div>
//                   <div style={{ fontSize: 11, color: "#78716C", marginTop: 2 }}>
//                     Interswitch risk check failed. Try again.
//                   </div>
//                 </motion.div>
//               )}
//             </AnimatePresence>

//             {/* Interswitch branding */}
//             <div
//               style={{
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//                 gap: 6,
//                 marginBottom: 16,
//               }}
//             >
//               <div
//                 style={{
//                   width: 20,
//                   height: 20,
//                   background: "#E03131",
//                   borderRadius: 4,
//                   display: "flex",
//                   alignItems: "center",
//                   justifyContent: "center",
//                 }}
//               >
//                 <span style={{ color: "#fff", fontSize: 10, fontWeight: 900 }}>
//                   IS
//                 </span>
//               </div>
//               <span style={{ fontSize: 11, color: "#78716C" }}>
//                 Secured by Interswitch Sandbox
//               </span>
//             </div>

//             {/* CTA */}
//             <motion.button
//               whileTap={{ scale: status === "processing" ? 1 : 0.97 }}
//               onClick={handleBuy}
//               disabled={
//                 !canAfford || status === "processing" || status === "approved"
//               }
//               style={{
//                 width: "100%",
//                 padding: "14px 0",
//                 borderRadius: 16,
//                 border: "none",
//                 fontFamily: "Nunito, sans-serif",
//                 fontWeight: 900,
//                 fontSize: 14,
//                 cursor:
//                   !canAfford || status !== "idle" ? "not-allowed" : "pointer",
//                 opacity: !canAfford || status === "approved" ? 0.5 : 1,
//                 background: status === "processing" ? "#EDE9E1" : "#2D9A4E",
//                 color: status === "processing" ? "#78716C" : "#FFFFFF",
//                 boxShadow:
//                   status === "processing"
//                     ? "0 4px 0 0 #D6D3D1"
//                     : "0 4px 0 0 #1F6B36",
//                 transition: "all 0.2s",
//               }}
//             >
//               {status === "processing"
//                 ? "⏳ Processing…"
//                 : status === "approved"
//                   ? "✅ Done!"
//                   : `Buy 1 Life — 70pts`}
//             </motion.button>
//           </div>
//         </motion.div>
//       </div>
//     </>
//   );
// }

"use client";
/**
 * HeartShop — Points-to-Lives purchase sheet
 *
 * Triggered from HUD when score >= 70 and reputation < MAX_REPUTATION.
 * Simulates an Interswitch payment authorisation — no real money.
 *
 * Props:
 *   score          — current player score
 *   onPurchase()   — called with { success, newScore, ref } after transaction
 *   onClose()      — dismiss without purchasing
 */
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { purchaseLife } from "../lib/interswitchClient";
import { getUser } from "../lib/supabaseClient";

const LIFE_COST = 70;

const OVERLAY = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100vw",
  height: "100vh",
  background: "rgba(28,25,23,0.75)",
  zIndex: 60,
};
const SHEET = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100vw",
  height: "100vh",
  zIndex: 61,
  display: "flex",
  alignItems: "flex-end",
  justifyContent: "center",
  padding: "0 16px 32px",
  boxSizing: "border-box",
};

export default function HeartShop({ score, onPurchase, onClose }) {
  const [status, setStatus] = useState("idle");
  const [txnRef, setTxnRef] = useState(null);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    async function fetchUser() {
      const user = await getUser();
      if (user) setUserId(user.id);
    }
    fetchUser();
  }, []);

  async function handleBuy() {
    if (status === "processing" || !userId) return;
    setStatus("processing");

    const walletId = localStorage.getItem("nbs_wallet_id");

    const result = await purchaseLife({
      userId,
      walletId: walletId || "MOCK",
      costInPoints: 70,
    });

    if (result.success) {
      setTxnRef(result.transactionRef);
      setStatus("approved");
      setTimeout(() => {
        onPurchase({
          success: true,
          newScore: score - 70,
          ref: result.transactionRef,
        });
      }, 1800);
    } else {
      setStatus("declined");
      setTimeout(() => setStatus("idle"), 2500);
    }
  }
  const canAfford = score >= LIFE_COST;

  return (
    <>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        style={OVERLAY}
        onClick={status === "processing" ? undefined : onClose}
      />

      {/* Sheet */}
      <div style={SHEET}>
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 40, scale: 0.96 }}
          transition={{ type: "spring", stiffness: 320, damping: 30 }}
          onClick={(e) => e.stopPropagation()}
          style={{
            width: "100%",
            maxWidth: 420,
            background: "#FFFFFF",
            borderRadius: 24,
            overflow: "hidden",
            border: "2px solid #A3D9B1",
            boxShadow: "0 -4px 32px rgba(45,154,78,0.15)",
          }}
        >
          {/* Top bar */}
          <div style={{ height: 6, background: "#2D9A4E" }} />

          <div style={{ padding: 20 }}>
            {/* Header */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: 16,
              }}
            >
              <div>
                <div
                  style={{
                    fontFamily: "Nunito, sans-serif",
                    fontWeight: 900,
                    fontSize: 17,
                    color: "#1C1917",
                  }}
                >
                  ❤️ Restore a Life
                </div>
                <div style={{ fontSize: 12, color: "#78716C", marginTop: 2 }}>
                  Powered by Interswitch sandbox · No real money
                </div>
              </div>
              <button
                onClick={onClose}
                disabled={status === "processing"}
                style={{
                  background: "#EDE9E1",
                  border: "none",
                  borderRadius: 12,
                  width: 32,
                  height: 32,
                  fontSize: 16,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                ✕
              </button>
            </div>

            {/* Cost card */}
            <div
              style={{
                background: "#F7F4EF",
                border: "2px solid #D6D3D1",
                borderRadius: 16,
                padding: 16,
                marginBottom: 16,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <div>
                <div
                  style={{
                    fontSize: 12,
                    color: "#78716C",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: 1,
                  }}
                >
                  Cost
                </div>
                <div
                  style={{
                    fontFamily: "Nunito, sans-serif",
                    fontWeight: 900,
                    fontSize: 26,
                    color: "#E8820C",
                  }}
                >
                  70pts
                </div>
              </div>
              <div style={{ fontSize: 40 }}>❤️</div>
              <div style={{ textAlign: "right" }}>
                <div
                  style={{
                    fontSize: 12,
                    color: "#78716C",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: 1,
                  }}
                >
                  Your Balance
                </div>
                <div
                  style={{
                    fontFamily: "Nunito, sans-serif",
                    fontWeight: 900,
                    fontSize: 26,
                    color: canAfford ? "#2D9A4E" : "#E03131",
                  }}
                >
                  {score}pts
                </div>
              </div>
            </div>

            {/* Remaining after purchase */}
            {canAfford && status === "idle" && (
              <div
                style={{
                  fontSize: 12,
                  color: "#78716C",
                  textAlign: "center",
                  marginBottom: 16,
                }}
              >
                You'll have{" "}
                <strong style={{ color: "#1C1917" }}>
                  {score - LIFE_COST} pts
                </strong>{" "}
                remaining after this purchase.
              </div>
            )}

            {!canAfford && (
              <div
                style={{
                  background: "#FDEAEA",
                  border: "2px solid #F5AAAA",
                  borderRadius: 12,
                  padding: "10px 14px",
                  marginBottom: 16,
                  fontSize: 13,
                  color: "#9B1C1C",
                  fontWeight: 700,
                  textAlign: "center",
                }}
              >
                Not enough points. You need {LIFE_COST - score} more pts.
              </div>
            )}

            {/* Transaction result */}
            <AnimatePresence mode="wait">
              {status === "approved" && (
                <motion.div
                  key="approved"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  style={{
                    background: "#E8F5ED",
                    border: "2px solid #A3D9B1",
                    borderRadius: 12,
                    padding: "10px 14px",
                    marginBottom: 16,
                    textAlign: "center",
                  }}
                >
                  <div style={{ fontSize: 20, marginBottom: 4 }}>✅</div>
                  <div
                    style={{
                      fontFamily: "Nunito, sans-serif",
                      fontWeight: 900,
                      fontSize: 14,
                      color: "#1F6B36",
                    }}
                  >
                    Life Restored!
                  </div>
                  <div style={{ fontSize: 11, color: "#78716C", marginTop: 2 }}>
                    Ref: {txnRef}
                  </div>
                </motion.div>
              )}

              {status === "declined" && (
                <motion.div
                  key="declined"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  style={{
                    background: "#FDEAEA",
                    border: "2px solid #F5AAAA",
                    borderRadius: 12,
                    padding: "10px 14px",
                    marginBottom: 16,
                    textAlign: "center",
                  }}
                >
                  <div style={{ fontSize: 20, marginBottom: 4 }}>❌</div>
                  <div
                    style={{
                      fontFamily: "Nunito, sans-serif",
                      fontWeight: 900,
                      fontSize: 14,
                      color: "#9B1C1C",
                    }}
                  >
                    Transaction Declined
                  </div>
                  <div style={{ fontSize: 11, color: "#78716C", marginTop: 2 }}>
                    Interswitch risk check failed. Try again.
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Interswitch branding */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 6,
                marginBottom: 16,
              }}
            >
              <div
                style={{
                  width: 20,
                  height: 20,
                  background: "#E03131",
                  borderRadius: 4,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <span style={{ color: "#fff", fontSize: 10, fontWeight: 900 }}>
                  IS
                </span>
              </div>
              <span style={{ fontSize: 11, color: "#78716C" }}>
                Secured by Interswitch Sandbox
              </span>
            </div>

            {/* CTA */}
            <motion.button
              whileTap={{ scale: status === "processing" ? 1 : 0.97 }}
              onClick={handleBuy}
              disabled={
                !canAfford || status === "processing" || status === "approved"
              }
              style={{
                width: "100%",
                padding: "14px 0",
                borderRadius: 16,
                border: "none",
                fontFamily: "Nunito, sans-serif",
                fontWeight: 900,
                fontSize: 14,
                cursor:
                  !canAfford || status !== "idle" ? "not-allowed" : "pointer",
                opacity: !canAfford || status === "approved" ? 0.5 : 1,
                background: status === "processing" ? "#EDE9E1" : "#2D9A4E",
                color: status === "processing" ? "#78716C" : "#FFFFFF",
                boxShadow:
                  status === "processing"
                    ? "0 4px 0 0 #D6D3D1"
                    : "0 4px 0 0 #1F6B36",
                transition: "all 0.2s",
              }}
            >
              {status === "processing"
                ? "⏳ Processing…"
                : status === "approved"
                  ? "✅ Done!"
                  : `Buy 1 Life — 70pts`}
            </motion.button>
          </div>
        </motion.div>
      </div>
    </>
  );
}
