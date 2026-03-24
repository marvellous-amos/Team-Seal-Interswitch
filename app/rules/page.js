"use client";
/**
 * Rules page — final onboarding step.
 * On "Let's Go!" click:
 *   1. Verify auth session
 *   2. Parse character + business objects from localStorage
 *   3. Write profile to Supabase (upsert, no-op on return visit)
 *   4. Navigate to /game
 */

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  ShieldCheck,
  Zap,
  Clock,
  Trophy,
  ArrowRight,
  Loader2,
} from "lucide-react";
import { getUser, createUserProfile } from "@/lib/supabaseClient";

const rules = [
  {
    icon: ShieldCheck,
    color: "text-brand",
    bg: "bg-brand/10",
    title: "Read every message carefully",
    body: "Scammers copy real businesses. Check sender details, grammar, and urgency.",
  },
  {
    icon: Zap,
    color: "text-gold",
    bg: "bg-gold/10",
    title: "Tap SCAM or SAFE",
    body: "You get one chance per message. Wrong answer costs you a life ❤️.",
  },
  {
    icon: Clock,
    color: "text-danger",
    bg: "bg-danger/10",
    title: "Beat the clock",
    body: "Faster correct answers earn bonus points. Hesitation is expensive.",
  },
  {
    icon: Trophy,
    color: "text-brand",
    bg: "bg-brand/10",
    title: "Climb the leaderboard",
    body: "Top scorers get bragging rights — and maybe a prize from our sponsors.",
  },
];

export default function RulesPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function handleStart() {
    setLoading(true);
    setError(null);

    try {
      // 1. Verify auth
      const user = await getUser();
      if (!user) {
        router.push("/login?redirect=/rules");
        return;
      }

      // 2. Parse full objects saved by select-gender + select-business
      //    Both pages store JSON.stringify(fullObject) — parse them here
      const characterRaw = localStorage.getItem("nbs_character");
      const businessRaw = localStorage.getItem("nbs_business");

      if (!characterRaw || !businessRaw) {
        // Missing onboarding data — restart onboarding
        router.push("/select-gender");
        return;
      }

      const character = JSON.parse(characterRaw); // { id, name, emoji, ... }
      const business = JSON.parse(businessRaw); // { id, name, emoji, ... }

      // 3. Upsert profile — ignoreDuplicates means return visits are no-ops
      const { error: profileError } = await createUserProfile(
        user.id,
        character, // full object — supabaseClient extracts .id and .name
        business, // full object — supabaseClient extracts .id
        user.email,
      );

      if (profileError) {
        setError("Could not save your profile. Please try again.");
        setLoading(false);
        return;
      }

      // 4. Into the game
      router.push("/game");
    } catch (err) {
      console.error("[RulesPage] handleStart error:", err);
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-bg-base flex flex-col items-center justify-center px-4 py-10">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="text-center mb-8"
      >
        <span className="inline-block text-4xl mb-3">📋</span>
        <h1 className="font-display text-3xl font-extrabold text-ink-900">
          How to Play
        </h1>
        <p className="mt-2 text-ink-500 text-sm font-body max-w-xs mx-auto">
          Protect your business. Spot the scams before they reach your wallet.
        </p>
      </motion.div>

      {/* Rules cards */}
      <div className="w-full max-w-sm space-y-3 mb-8">
        {rules.map((rule, i) => {
          const Icon = rule.icon;
          return (
            <motion.div
              key={rule.title}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 + i * 0.08, duration: 0.35 }}
              className="flex items-start gap-4 bg-white border-2 border-ink-200 rounded-2xl p-4 shadow-solid-sm"
            >
              <div
                className={`flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center ${rule.bg}`}
              >
                <Icon className={`w-5 h-5 ${rule.color}`} />
              </div>
              <div>
                <p className="font-display font-bold text-ink-900 text-sm">
                  {rule.title}
                </p>
                <p className="text-ink-500 text-xs font-body mt-0.5 leading-relaxed">
                  {rule.body}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Error */}
      {error && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-danger text-sm font-body mb-4 text-center"
        >
          {error}
        </motion.p>
      )}

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.4 }}
        className="w-full max-w-sm"
      >
        <button
          onClick={handleStart}
          disabled={loading}
          className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Setting up…</span>
            </>
          ) : (
            <>
              <span>Let's Go!</span>
              <ArrowRight className="w-5 h-5" />
            </>
          )}
        </button>
      </motion.div>
    </main>
  );
}
