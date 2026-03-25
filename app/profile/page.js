// /**
//  * Artifact: app/profile/page.js
//  * New Player Dashboard. Displays lifetime stats and identity management.
//  */
// "use client";
// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import { motion } from "framer-motion";
// import {
//   Loader2,
//   TrendingUp,
//   Shield,
//   Target,
//   LogOut,
//   RefreshCcw,
// } from "lucide-react";
// import Character from "@/components/Character";
// import {
//   getUser,
//   getUserProfile,
//   getSupabaseClient,
//   signOut,
// } from "@/lib/supabaseClient";

// export default function ProfilePage() {
//   const router = useRouter();
//   const [profile, setProfile] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     async function loadProfile() {
//       const user = await getUser();
//       if (!user) return router.push("/login");
//       const { data } = await getUserProfile(user.id);
//       setProfile(data);
//       setLoading(false);
//     }
//     loadProfile();
//   }, [router]);

//   async function handleStartOver() {
//     if (
//       !confirm(
//         "Are you sure? This will reset your character and business, but keep your high score.",
//       )
//     )
//       return;
//     const supabase = getSupabaseClient();
//     await supabase
//       .from("users")
//       .update({
//         character_id: null,
//         character_name: null,
//         business_type: null,
//       })
//       .eq("id", profile.id);

//     localStorage.removeItem("nbs_character");
//     localStorage.removeItem("nbs_business");
//     router.push("/select-gender");
//   }

//   if (loading)
//     return (
//       <div className="min-h-screen bg-bg-base flex items-center justify-center">
//         <Loader2 className="animate-spin text-brand" />
//       </div>
//     );

//   const accuracy =
//     profile?.total_correct + profile?.total_wrong > 0
//       ? Math.round(
//           (profile.total_correct /
//             (profile.total_correct + profile.total_wrong)) *
//             100,
//         )
//       : 0;

//   return (
//     <div className="min-h-screen bg-bg-base px-4 py-8 pb-24">
//       {/* Header Card */}
//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         className="max-w-md mx-auto bg-white rounded-3xl p-6 border-2 border-ink-300 shadow-card mb-6 flex items-center gap-6"
//       >
//         <div className="w-24 flex-shrink-0">
//           <Character
//             characterData={{
//               id: profile?.character_id,
//               name: profile?.character_name,
//             }}
//           />
//         </div>
//         <div>
//           <h1
//             className="text-2xl font-black text-ink-900 leading-tight"
//             style={{ fontFamily: "Nunito, sans-serif" }}
//           >
//             {profile?.character_name}
//           </h1>
//           <p className="text-brand font-bold text-sm uppercase tracking-wider">
//             {profile?.business_type?.replace("_", " ")} Vendor
//           </p>
//         </div>
//       </motion.div>

//       {/* Stats Grid */}
//       <div className="max-w-md mx-auto grid grid-cols-2 gap-4 mb-8">
//         <StatBox
//           icon={TrendingUp}
//           label="High Score"
//           value={profile?.highest_score}
//           color="text-gold"
//         />
//         <StatBox
//           icon={Shield}
//           label="Scams Blocked"
//           value={profile?.total_correct}
//           color="text-brand"
//         />
//         <StatBox
//           icon={Target}
//           label="Accuracy"
//           value={`${accuracy}%`}
//           color="text-safe"
//         />
//         <StatBox
//           icon={RefreshCcw}
//           label="Current Level"
//           value={profile?.current_level}
//           color="text-ink-700"
//         />
//       </div>

//       {/* Actions */}
//       <div className="max-w-md mx-auto space-y-4">
//         <button
//           onClick={() => router.push("/game")}
//           className="btn-primary w-full py-5 text-lg"
//         >
//           PLAY NEXT LEVEL →
//         </button>

//         <div className="pt-4 border-t-2 border-ink-300 grid grid-cols-2 gap-3">
//           <button
//             onClick={handleStartOver}
//             className="flex items-center justify-center gap-2 text-ink-500 font-bold text-sm py-3 hover:text-danger transition-colors"
//           >
//             <RefreshCcw size={16} /> Reset Identity
//           </button>
//           <button
//             onClick={async () => {
//               await signOut();
//               router.push("/login");
//             }}
//             className="flex items-center justify-center gap-2 text-ink-500 font-bold text-sm py-3 hover:text-ink-900 transition-colors"
//           >
//             <LogOut size={16} /> Sign Out
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// function StatBox({ icon: Icon, label, value, color }) {
//   return (
//     <div className="bg-white rounded-2xl p-4 border-2 border-ink-300 shadow-card">
//       <Icon className={`${color} mb-2`} size={20} />
//       <p className="text-ink-500 text-[10px] font-black uppercase tracking-widest leading-none mb-1">
//         {label}
//       </p>
//       <p
//         className="text-xl font-black text-ink-900 leading-none"
//         style={{ fontFamily: "Nunito, sans-serif" }}
//       >
//         {value}
//       </p>
//     </div>
//   );
// }
/**
 * Artifact: app/profile/page.js
 * FIXED: Mobile-responsive layout for player statistics and identity management.
 */
"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  Loader2,
  TrendingUp,
  Shield,
  Target,
  LogOut,
  RefreshCcw,
  ArrowLeft,
} from "lucide-react";
import Character from "@/components/Character";
import {
  getUser,
  getUserProfile,
  getSupabaseClient,
  signOut,
} from "@/lib/supabaseClient";

export default function ProfilePage() {
  const router = useRouter();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProfile() {
      const user = await getUser();
      if (!user) return router.push("/login");
      const { data } = await getUserProfile(user.id);
      setProfile(data);
      setLoading(false);
    }
    loadProfile();
  }, [router]);

  async function handleStartOver() {
    if (
      !confirm(
        "Are you sure? This will reset your character and business, but keep your high score.",
      )
    )
      return;
    const supabase = getSupabaseClient();
    await supabase
      .from("users")
      .update({
        character_id: null,
        character_name: null,
        business_type: null,
      })
      .eq("id", profile.id);

    localStorage.removeItem("nbs_character");
    localStorage.removeItem("nbs_business");
    router.push("/select-gender");
  }

  if (loading)
    return (
      <div className="min-h-screen bg-bg-base flex items-center justify-center">
        <Loader2 className="animate-spin text-brand" size={32} />
      </div>
    );

  const accuracy =
    profile?.total_correct + profile?.total_wrong > 0
      ? Math.round(
          (profile.total_correct /
            (profile.total_correct + profile.total_wrong)) *
            100,
        )
      : 0;

  return (
    <div className="min-h-screen bg-bg-base px-4 pt-6 pb-24">
      {/* Top Navigation */}
      <div className="max-w-md mx-auto mb-6">
        <button
          onClick={() => router.push("/game")}
          className="flex items-center gap-2 text-ink-500 font-bold text-sm hover:text-brand transition-colors"
        >
          <ArrowLeft size={18} /> Back to Game
        </button>
      </div>

      {/* Identity Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md mx-auto bg-white rounded-3xl p-6 border-2 border-ink-300 shadow-card mb-6 flex flex-col sm:flex-row items-center text-center sm:text-left gap-4 sm:gap-8"
      >
        <div className="w-32 h-32 flex-shrink-0 bg-bg-sunken rounded-2xl p-2 flex items-center justify-center">
          <Character
            characterData={{
              id: profile?.character_id,
              name: profile?.character_name,
            }}
            reaction="idle"
          />
        </div>
        <div className="min-w-0 flex-1">
          <h1
            className="text-3xl font-black text-ink-900 leading-tight mb-1"
            style={{ fontFamily: "Nunito, sans-serif" }}
          >
            {profile?.character_name || "Merchant"}
          </h1>
          <p className="text-brand font-black text-xs uppercase tracking-widest inline-block px-3 py-1 bg-brand-light rounded-full">
            {profile?.business_type?.replace("_", " ") || "Starter Business"}
          </p>
          <p className="text-ink-500 text-sm mt-3 font-medium">
            Joined{" "}
            {new Date(profile?.created_at).toLocaleDateString("en-NG", {
              month: "long",
              year: "numeric",
            })}
          </p>
        </div>
      </motion.div>

      {/* Statistics Grid */}
      <div className="max-w-md mx-auto grid grid-cols-2 gap-4 mb-8">
        <StatBox
          icon={TrendingUp}
          label="High Score"
          value={profile?.highest_score || 0}
          color="text-gold"
        />
        <StatBox
          icon={Shield}
          label="Scams Blocked"
          value={profile?.total_correct || 0}
          color="text-brand"
        />
        <StatBox
          icon={Target}
          label="Accuracy"
          value={`${accuracy}%`}
          color="text-safe"
        />
        <StatBox
          icon={RefreshCcw}
          label="Current Level"
          value={profile?.current_level || 1}
          color="text-ink-700"
        />
      </div>

      {/* Action Buttons */}
      <div className="max-w-md mx-auto space-y-4">
        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={() => router.push("/game")}
          className="btn-primary w-full py-5 text-lg shadow-btn"
        >
          PLAY NEXT LEVEL →
        </motion.button>

        <div className="pt-4 grid grid-cols-2 gap-3">
          <button
            onClick={handleStartOver}
            className="flex items-center justify-center gap-2 text-ink-500 font-bold text-xs py-4 px-2 rounded-2xl border-2 border-ink-300 hover:bg-danger-bg hover:text-danger hover:border-danger-border transition-all"
          >
            <RefreshCcw size={14} /> Reset Identity
          </button>
          <button
            onClick={async () => {
              await signOut();
              router.push("/login");
            }}
            className="flex items-center justify-center gap-2 text-ink-500 font-bold text-xs py-4 px-2 rounded-2xl border-2 border-ink-300 hover:bg-bg-sunken hover:text-ink-900 transition-all"
          >
            <LogOut size={14} /> Sign Out
          </button>
        </div>
      </div>
    </div>
  );
}

function StatBox({ icon: Icon, label, value, color }) {
  return (
    <div className="bg-white rounded-2xl p-4 border-2 border-ink-300 shadow-card flex flex-col items-center sm:items-start text-center sm:text-left">
      <div className={`p-2 rounded-xl mb-2 bg-bg-sunken ${color}`}>
        <Icon size={20} />
      </div>
      <p className="text-ink-500 text-[10px] font-black uppercase tracking-widest leading-none mb-1.5">
        {label}
      </p>
      <p
        className="text-2xl font-black text-ink-900 leading-none truncate w-full"
        style={{ fontFamily: "Nunito, sans-serif" }}
      >
        {value}
      </p>
    </div>
  );
}
