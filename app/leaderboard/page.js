/**
 * Artifact: app/leaderboard/page.js
 * Global ranking page for NoBeScam players.
 */
"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Trophy, ArrowLeft, Loader2, Target } from "lucide-react";
import { getLeaderboard } from "@/lib/supabaseClient";

export default function LeaderboardPage() {
  const router = useRouter();
  const [rankings, setRankings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      const { data } = await getLeaderboard(20); //
      if (data) setRankings(data);
      setLoading(false);
    }
    loadData();
  }, []);

  if (loading)
    return (
      <div className="min-h-screen bg-bg-base flex items-center justify-center">
        <Loader2 className="animate-spin text-brand" size={32} />
      </div>
    );

  return (
    <div className="min-h-screen bg-bg-base px-4 pt-6 pb-20">
      <div className="max-w-md mx-auto">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-ink-500 font-bold text-sm mb-6"
        >
          <ArrowLeft size={18} /> Back
        </button>

        <div className="text-center mb-8">
          <div className="text-5xl mb-2">🏆</div>
          <h1
            className="text-3xl font-black text-ink-900"
            style={{ fontFamily: "Nunito, sans-serif" }}
          >
            Top Defenders
          </h1>
          <p className="text-ink-500 text-sm">The sharpest MSMEs in Nigeria</p>
        </div>

        <div className="space-y-3">
          {rankings.map((user, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-white border-2 border-ink-300 rounded-2xl p-4 flex items-center gap-4 shadow-card"
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center font-black text-sm ${index < 3 ? "bg-gold text-white" : "bg-bg-sunken text-ink-500"}`}
              >
                {index + 1}
              </div>
              <div className="flex-1">
                <p className="font-black text-ink-900 leading-none">
                  {user.character_name}
                </p>
                <p className="text-[10px] text-ink-500 uppercase font-bold tracking-wider mt-1">
                  {user.business_type?.replace("_", " ")}
                </p>
              </div>
              <div className="text-right">
                <p className="font-black text-brand text-lg leading-none">
                  {user.highest_score.toLocaleString()}
                </p>
                <p className="text-[9px] text-ink-400 font-bold uppercase mt-1">
                  pts
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
