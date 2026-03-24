// "use client";
// /**
//  * Welcome page — Step 1D: Session persistence
//  *
//  * On mount:
//  *   1. Fetch authenticated user (getUser — server-validated)
//  *   2. Fetch their profile from the users table
//  *   3. If profile exists → hydrate localStorage + go straight to /game
//  *   4. If no profile yet → show welcome screen → start onboarding
//  *
//  * This means returning players never see the onboarding flow again.
//  */

// import { useEffect, useState } from "react";
// import { motion } from "framer-motion";
// import { useRouter } from "next/navigation";
// import { Loader2 } from "lucide-react";
// import {
//   getUser,
//   getUserProfile,
//   signOut,
//   supabase,
// } from "@/lib/supabaseClient";

// // Business metadata — used to re-hydrate localStorage for returning players
// const BUSINESS_MAP = {
//   food_vendor: {
//     id: "food_vendor",
//     name: "Food Vendor",
//     emoji: "🍛",
//   },
//   sportswear: {
//     id: "sportswear",
//     name: "Sportswear Brand",
//     emoji: "👟",
//   },
//   palm_wine: {
//     id: "palm_wine",
//     name: "Palm Wine Supply",
//     emoji: "🍶",
//   },
// };

// // Character metadata — used to re-hydrate localStorage for returning players
// const CHARACTER_MAP = {
//   chinedu: {
//     id: "chinedu",
//     name: "Chinedu",
//     emoji: "👨🏿‍💼",
//     traits: ["Quick thinker", "Tech-savvy", "Market hustler"],
//   },
//   omotola: {
//     id: "omotola",
//     name: "Omotola",
//     emoji: "👩🏿‍💼",
//     traits: ["Street smart", "People reader", "Fearless boss"],
//   },
// };

// export default function WelcomePage() {
//   const router = useRouter();
//   // 'checking' → spinner while we look up profile
//   // 'new'      → show welcome/onboarding CTA
//   // 'returning'→ show "continue" shortcut (brief flash before redirect)
//   const [status, setStatus] = useState("checking");
//   const [profile, setProfile] = useState(null);

//   useEffect(() => {
//     async function checkProfile() {
//       try {
//         const user = await getUser();
//         if (!user) {
//           // Middleware should have caught this — belt-and-suspenders
//           router.replace("/login");
//           return;
//         }

//         const { data, error } = await getUserProfile(user.id);

//         if (error || !data || !data.character_id || !data.business_type) {
//           // New player — no profile written yet
//           setStatus("new");
//           return;
//         }

//         // ── Returning player ─────────────────────────────────────────
//         // Re-hydrate localStorage so story/rules pages have context if visited
//         const character = CHARACTER_MAP[data.character_id];
//         const business = BUSINESS_MAP[data.business_type];

//         if (character)
//           localStorage.setItem("nbs_character", JSON.stringify(character));
//         if (business)
//           localStorage.setItem("nbs_business", JSON.stringify(business));

//         setProfile(data);
//         setStatus("returning");

//         // Short pause so the "Welcome back" flash is readable, then go to game
//         setTimeout(() => router.replace("/game"), 1200);
//       } catch (err) {
//         console.error("[WelcomePage] checkProfile error:", err);
//         setStatus("new"); // fail open — let them onboard
//       }
//     }

//     checkProfile();
//   }, [router]);

//   async function handleSignOut() {
//     await signOut();
//     router.push("/login");
//   }

//   // ── Checking state — full-screen spinner ────────────────────────
//   if (status === "checking") {
//     return (
//       <div className="min-h-screen bg-bg-base flex items-center justify-center">
//         <Loader2 className="w-8 h-8 text-brand animate-spin" />
//       </div>
//     );
//   }

//   // ── Returning player — brief flash before redirect ───────────────
//   if (status === "returning" && profile) {
//     const char = CHARACTER_MAP[profile.character_id];
//     const biz = BUSINESS_MAP[profile.business_type];
//     return (
//       <div className="min-h-screen bg-bg-base flex items-center justify-center px-4">
//         <motion.div
//           initial={{ opacity: 0, scale: 0.92 }}
//           animate={{ opacity: 1, scale: 1 }}
//           className="text-center"
//         >
//           <div className="text-6xl mb-3">{char?.emoji ?? "🛡️"}</div>
//           <h2
//             className="text-2xl font-black text-ink-900 mb-1"
//             style={{ fontFamily: "Nunito, sans-serif" }}
//           >
//             Welcome back, {profile.character_name}!
//           </h2>
//           <p className="text-ink-500 text-sm">
//             {biz?.emoji} {biz?.name} · Resuming your game…
//           </p>
//           <Loader2 className="w-5 h-5 text-brand animate-spin mx-auto mt-5" />
//         </motion.div>
//       </div>
//     );
//   }

//   // ── New player — full welcome screen ────────────────────────────
//   return (
//     <div className="min-h-screen bg-bg-base flex flex-col items-center justify-center px-4">
//       {/* Nigerian flag stripe */}
//       <div className="fixed top-0 left-0 right-0 h-1.5 flex z-50">
//         <div className="flex-1 bg-brand" />
//         <div className="flex-1 bg-bg-base border-y border-ink-300" />
//         <div className="flex-1 bg-brand" />
//       </div>

//       <div className="w-full max-w-sm text-center">
//         <motion.div
//           initial={{ scale: 0, rotate: -30 }}
//           animate={{ scale: 1, rotate: 0 }}
//           transition={{ type: "spring", stiffness: 160, damping: 12 }}
//           className="text-8xl mb-4 inline-block"
//         >
//           🛡️
//         </motion.div>

//         <motion.h1
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.3 }}
//           className="text-5xl font-black text-ink-900 mb-2"
//           style={{ fontFamily: "Nunito, sans-serif" }}
//         >
//           NoBeScam
//         </motion.h1>

//         <motion.p
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 0.45 }}
//           className="text-ink-500 text-base mb-8"
//         >
//           Africa's First MSME Cyber-Survival Game
//         </motion.p>

//         {/* Mission card */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.6 }}
//           className="card p-5 mb-6 text-left"
//         >
//           <p className="text-xs font-black text-brand uppercase tracking-widest mb-2">
//             Your Mission
//           </p>
//           <p className="text-ink-700 text-sm leading-relaxed">
//             You've received a ₦5M grant to build your dream business. But YAHOO
//             Corp — Africa's most dangerous cybercrime syndicate — has been hired
//             by your enemies to destroy everything you've worked for.
//           </p>
//           <p className="text-ink-700 text-sm leading-relaxed mt-2">
//             They'll send fake messages to your phone. Some look completely real.
//             Can you tell the difference?
//           </p>

//           <div className="flex gap-3 mt-4">
//             <div className="flex-1 bg-danger-bg border-2 border-danger-border rounded-xl p-3 text-center">
//               <div className="text-2xl mb-1">🔴</div>
//               <div className="text-danger-text text-xs font-black">SCAM</div>
//             </div>
//             <div className="flex-1 bg-safe-bg border-2 border-safe-border rounded-xl p-3 text-center">
//               <div className="text-2xl mb-1">🟢</div>
//               <div className="text-safe-text text-xs font-black">SAFE</div>
//             </div>
//           </div>
//         </motion.div>

//         <motion.div
//           initial={{ opacity: 0, y: 16 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.75 }}
//           className="space-y-3"
//         >
//           <motion.button
//             whileTap={{ scale: 0.97 }}
//             onClick={() => router.push("/select-gender")}
//             className="btn-primary w-full text-base"
//           >
//             BEGIN YOUR JOURNEY →
//           </motion.button>

//           <button
//             onClick={handleSignOut}
//             className="w-full text-ink-500 hover:text-ink-700 text-sm transition-colors py-2 font-medium"
//           >
//             Sign Out
//           </button>

//           <div className="flex items-center justify-center gap-4 text-ink-500 text-xs">
//             <span>📱 Mobile-First</span>
//             <span>·</span>
//             <span>🇳🇬 Made in Nigeria</span>
//             <span>·</span>
//             <span>🔒 No Real Money</span>
//           </div>
//         </motion.div>
//       </div>
//     </div>
//   );
// }

"use client";
/**
 * Welcome page — Step 1D: Session persistence
 *
 * On mount:
 *   1. Fetch authenticated user (getUser — server-validated)
 *   2. Fetch their profile from the users table
 *   3. If profile exists → hydrate localStorage + go straight to /game
 *   4. If no profile yet → show welcome screen → start onboarding
 *
 * This means returning players never see the onboarding flow again.
 */

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import {
  getUser,
  getUserProfile,
  signOut,
  getSupabaseClient,
} from "@/lib/supabaseClient";
import { createPlayerWallet } from "@/lib/interswitchClient";

// Business metadata — used to re-hydrate localStorage for returning players
const BUSINESS_MAP = {
  food_vendor: {
    id: "food_vendor",
    name: "Food Vendor",
    emoji: "🍛",
  },
  sportswear: {
    id: "sportswear",
    name: "Sportswear Brand",
    emoji: "👟",
  },
  palm_wine: {
    id: "palm_wine",
    name: "Palm Wine Supply",
    emoji: "🍶",
  },
};

// Character metadata — used to re-hydrate localStorage for returning players
const CHARACTER_MAP = {
  chinedu: {
    id: "chinedu",
    name: "Chinedu",
    emoji: "👨🏿‍💼",
    traits: ["Quick thinker", "Tech-savvy", "Market hustler"],
  },
  omotola: {
    id: "omotola",
    name: "Omotola",
    emoji: "👩🏿‍💼",
    traits: ["Street smart", "People reader", "Fearless boss"],
  },
};

export default function WelcomePage() {
  const supabase = getSupabaseClient();
  const router = useRouter();
  // 'checking' → spinner while we look up profile
  // 'new'      → show welcome/onboarding CTA
  // 'returning'→ show "continue" shortcut (brief flash before redirect)
  const [status, setStatus] = useState("checking");
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    async function checkProfile() {
      try {
        const user = await getUser();
        if (!user) {
          // Middleware should have caught this — belt-and-suspenders
          router.replace("/login");
          return;
        }

        const { data, error } = await getUserProfile(user.id);

        if (error || !data || !data.character_id || !data.business_type) {
          // New player — no profile written yet
          setStatus("new");
          return;
        }
        // ── Returning player ─────────────────────────────────────────
        if (!data.wallet_id) {
          try {
            const walletData = await createPlayerWallet({
              playerId: user.id,
              playerName: data.character_name,
              playerEmail: user.email,
            });

            if (walletData?.walletId) {
              await supabase
                .from("users")
                .update({ wallet_id: walletData.walletId })
                .eq("id", user.id);

              localStorage.setItem("nbs_wallet_id", walletData.walletId);

              if (walletData.virtualAccount) {
                localStorage.setItem(
                  "nbs_wallet_va",
                  walletData.virtualAccount,
                );
              }
            }
          } catch (err) {
            console.warn("[welcome] wallet setup failed:", err.message);
          }
        } else {
          localStorage.setItem("nbs_wallet_id", data.wallet_id);
          localStorage.setItem(
            "nbs_wallet_va",
            data.virtual_account || "7620595503",
          );
        }

        // ── Returning player ─────────────────────────────────────────
        // Re-hydrate localStorage so story/rules pages have context if visited
        const character = CHARACTER_MAP[data.character_id];
        const business = BUSINESS_MAP[data.business_type];

        if (character)
          localStorage.setItem("nbs_character", JSON.stringify(character));
        if (business)
          localStorage.setItem("nbs_business", JSON.stringify(business));

        setProfile(data);
        setStatus("returning");

        // Short pause so the "Welcome back" flash is readable, then go to game
        setTimeout(() => router.replace("/game"), 1200);
      } catch (err) {
        console.error("[WelcomePage] checkProfile error:", err);
        setStatus("new"); // fail open — let them onboard
      }
    }

    checkProfile();
  }, [router]);

  async function handleSignOut() {
    await signOut();
    router.push("/login");
  }

  // ── Checking state — full-screen spinner ────────────────────────
  if (status === "checking") {
    return (
      <div className="min-h-screen bg-bg-base flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-brand animate-spin" />
      </div>
    );
  }

  // ── Returning player — brief flash before redirect ───────────────
  if (status === "returning" && profile) {
    const char = CHARACTER_MAP[profile.character_id];
    const biz = BUSINESS_MAP[profile.business_type];
    return (
      <div className="min-h-screen bg-bg-base flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="text-6xl mb-3">{char?.emoji ?? "🛡️"}</div>
          <h2
            className="text-2xl font-black text-ink-900 mb-1"
            style={{ fontFamily: "Nunito, sans-serif" }}
          >
            Welcome back, {profile.character_name}!
          </h2>
          <p className="text-ink-500 text-sm">
            {biz?.emoji} {biz?.name} · Resuming your game…
          </p>
          <Loader2 className="w-5 h-5 text-brand animate-spin mx-auto mt-5" />
        </motion.div>
      </div>
    );
  }

  // ── New player — full welcome screen ────────────────────────────
  return (
    <div className="min-h-screen bg-bg-base flex flex-col items-center justify-center px-4">
      {/* Nigerian flag stripe */}
      <div className="fixed top-0 left-0 right-0 h-1.5 flex z-50">
        <div className="flex-1 bg-brand" />
        <div className="flex-1 bg-bg-base border-y border-ink-300" />
        <div className="flex-1 bg-brand" />
      </div>

      <div className="w-full max-w-sm text-center">
        <motion.div
          initial={{ scale: 0, rotate: -30 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 160, damping: 12 }}
          className="text-8xl mb-4 inline-block"
        >
          🛡️
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-5xl font-black text-ink-900 mb-2"
          style={{ fontFamily: "Nunito, sans-serif" }}
        >
          NoBeScam
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.45 }}
          className="text-ink-500 text-base mb-8"
        >
          Africa's First MSME Cyber-Survival Game
        </motion.p>

        {/* Mission card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="card p-5 mb-6 text-left"
        >
          <p className="text-xs font-black text-brand uppercase tracking-widest mb-2">
            Your Mission
          </p>
          <p className="text-ink-700 text-sm leading-relaxed">
            You've received a ₦5M grant to build your dream business. But YAHOO
            Corp — Africa's most dangerous cybercrime syndicate — has been hired
            by your enemies to destroy everything you've worked for.
          </p>
          <p className="text-ink-700 text-sm leading-relaxed mt-2">
            They'll send fake messages to your phone. Some look completely real.
            Can you tell the difference?
          </p>

          <div className="flex gap-3 mt-4">
            <div className="flex-1 bg-danger-bg border-2 border-danger-border rounded-xl p-3 text-center">
              <div className="text-2xl mb-1">🔴</div>
              <div className="text-danger-text text-xs font-black">SCAM</div>
            </div>
            <div className="flex-1 bg-safe-bg border-2 border-safe-border rounded-xl p-3 text-center">
              <div className="text-2xl mb-1">🟢</div>
              <div className="text-safe-text text-xs font-black">SAFE</div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.75 }}
          className="space-y-3"
        >
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={() => router.push("/select-gender")}
            className="btn-primary w-full text-base"
          >
            BEGIN YOUR JOURNEY →
          </motion.button>

          <button
            onClick={handleSignOut}
            className="w-full text-ink-500 hover:text-ink-700 text-sm transition-colors py-2 font-medium"
          >
            Sign Out
          </button>

          <div className="flex items-center justify-center gap-4 text-ink-500 text-xs">
            <span>📱 Mobile-First</span>
            <span>·</span>
            <span>🇳🇬 Made in Nigeria</span>
            <span>·</span>
            <span>🔒 No Real Money</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
