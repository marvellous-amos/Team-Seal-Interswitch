"use client";
import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import Character from "../../components/Character";
import PhoneUI from "../../components/PhoneUI";
import ReputationDisplay from "../../components/ReputationDisplay";
import ExplanationModal from "../../components/ExplanationModal";
import HeartShop from "../../components/HeartShop";
import { getBalancedBatch, resetUsedScenarios } from "../../data/scenarios";
import {
  getUser,
  saveGameSession,
  batchSaveAnswers,
  updateUserStats,
  signOut,
} from "../../lib/supabaseClient";

const MAX_REPUTATION = 3;
const POINTS_CORRECT = 10;
const POINTS_STREAK_5 = 20;
const POINTS_STREAK_10 = 50;
const LEVEL_UP_ACCURACY = 0.85;
const LEVEL_UP_SAMPLE = 20; // FIX: Strict requirement to prevent level skipping

const LEVEL_LABELS = {
  2: {
    title: "Level 2 Unlocked 🔥",
    sub: "Messages are getting trickier. Read every word.",
  },
  3: {
    title: "Level 3 Unlocked ⚡",
    sub: "Scammers now use verified-looking badges. Don't be fooled.",
  },
  4: {
    title: "Level 4 Unlocked 💀",
    sub: "Advanced social engineering. Trust nothing blindly.",
  },
  5: {
    title: "Final Level 🏆",
    sub: "Elite fraud tactics. Only the sharpest survive.",
  },
};

const CHARACTER_BG = {
  chinedu: { bg: "#F7F4EF", accent: "#E8820C" },
  omotola: { bg: "#F7F4EF", accent: "#C94070" },
};

const GRADES = [
  { min: 90, grade: "S", label: "Legendary", color: "#E8820C" },
  { min: 75, grade: "A", label: "Expert", color: "#2D9A4E" },
  { min: 60, grade: "B", label: "Solid", color: "#1D4ED8" },
  { min: 45, grade: "C", label: "Learning", color: "#78716C" },
  { min: 0, grade: "F", label: "Try Again", color: "#E03131" },
];

function getGrade(acc) {
  return GRADES.find((g) => acc >= g.min) || GRADES[4];
}

export default function GamePage() {
  const router = useRouter();
  const answerStartRef = useRef(Date.now());
  const spreeTimerRef = useRef(null);
  const reputationRef = useRef(MAX_REPUTATION);
  const answerQueueRef = useRef([]);

  const [character, setCharacter] = useState(null);
  const [business, setBusiness] = useState(null);
  const [userId, setUserId] = useState(null);
  const [scenarios, setScenarios] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [totalAnswered, setTotalAnswered] = useState(0);
  const [totalCorrect, setTotalCorrect] = useState(0);
  const [scamsBlocked, setScamsBlocked] = useState(0);
  const [safeBlocked, setSafeBlocked] = useState(0);
  const [reputation, setReputation] = useState(MAX_REPUTATION);
  const [level, setLevel] = useState(1);
  const [history, setHistory] = useState([]); // Array of {scenario_id, correct, level_at_answer}
  const [gameOver, setGameOver] = useState(false);
  const [spreeActive, setSpreeActive] = useState(false);
  const [phoneOpen, setPhoneOpen] = useState(false);
  const [reaction, setReaction] = useState("idle");
  const [showExplanation, setShowExplanation] = useState(false);
  const [lastAnswer, setLastAnswer] = useState(null);
  const [lastWasCorrect, setLastWasCorrect] = useState(null);
  const [scorePopup, setScorePopup] = useState(null);
  const [answerDisabled, setAnswerDisabled] = useState(false);
  const [milestone, setMilestone] = useState(null);
  const [showShop, setShowShop] = useState(false);

  useEffect(() => {
    async function init() {
      const c = JSON.parse(localStorage.getItem("nbs_character") || "{}");
      const b = JSON.parse(localStorage.getItem("nbs_business") || "{}");
      setCharacter(c);
      setBusiness(b);
      const user = await getUser();
      if (user) {
        setUserId(user.id);
        // Step 4B Prep: Load their current level from DB
        setLevel(user.current_level || 1);
      }
      setScenarios(getBalancedBatch(b.id || "food_vendor", 1, 20));
      resetUsedScenarios();
    }
    init();
    return () => {
      if (spreeTimerRef.current) clearTimeout(spreeTimerRef.current);
    };
  }, []);
  //  to be removed once we have a proper login flow and can test with real users
  async function handleSignOut() {
    await signOut();
    router.push("/login");
  }

  const checkLevelUp = useCallback(
    async (currentLevel, updatedHistory, currentScore) => {
      const nextLevel = currentLevel + 1;
      if (nextLevel > 5) return;

      // Filter based on the level they just played
      const levelScenarios = updatedHistory.filter(
        (h) => h.level_at_answer === currentLevel,
      );

      if (levelScenarios.length >= LEVEL_UP_SAMPLE) {
        const correct = levelScenarios.filter((h) => h.correct).length;
        const accuracy = correct / levelScenarios.length;

        if (accuracy >= LEVEL_UP_ACCURACY) {
          setLevel(nextLevel);
          setMilestone({ level: nextLevel, ...LEVEL_LABELS[nextLevel] });
          setSpreeActive(false);
          setPhoneOpen(false);

          // FIX: Sync level to Supabase immediately
          if (userId) {
            await updateUserStats(userId, {
              score: currentScore,
              level: nextLevel,
              totalCorrect: 0,
              totalWrong: 0,
            });
          }
        }
      }
    },
    [userId],
  );

  async function handleAnswer(selected) {
    if (!currentScenario || answerDisabled) return;
    setAnswerDisabled(true);
    const rt = Date.now() - answerStartRef.current;
    const isCorrect = selected === currentScenario.label;

    // Track stats
    const newAnswered = totalAnswered + 1;
    const newCorrect = isCorrect ? totalCorrect + 1 : totalCorrect;
    setTotalAnswered(newAnswered);
    setTotalCorrect(newCorrect);
    setLastAnswer(selected);
    setLastWasCorrect(isCorrect);

    // Track detailed history for leveling logic
    const answerLog = {
      scenario_id: currentScenario.id,
      correct: isCorrect,
      level_at_answer: level,
      timestamp: new Date().toISOString(),
    };
    const updatedHistory = [...history, answerLog];
    setHistory(updatedHistory);

    let newScore = score;
    if (isCorrect) {
      if (selected === "scam") setScamsBlocked((p) => p + 1);
      const ns = streak + 1;
      setStreak(ns);
      let earned = POINTS_CORRECT,
        msg = `+${POINTS_CORRECT}`;
      if (ns === 10) {
        earned += POINTS_STREAK_10;
        msg = `+${earned} 💥 MEGA!`;
      } else if (ns === 5) {
        earned += POINTS_STREAK_5;
        msg = `+${earned} 🔥 STREAK!`;
      }

      newScore += earned;
      setScore(newScore);
      setReaction("correct");
      setScorePopup(msg);
      setTimeout(() => setScorePopup(null), 1600);

      // Check for level up immediately
      await checkLevelUp(level, updatedHistory, newScore);

      setSpreeActive(true);
      spreeTimerRef.current = setTimeout(() => {
        setReaction("idle");
        setAnswerDisabled(false);
        setCurrentIndex((p) => p + 1);
        answerStartRef.current = Date.now();
        if (currentIndex >= scenarios.length - 4) {
          setScenarios((p) => [
            ...p,
            ...getBalancedBatch(business?.id, level, 20),
          ]);
        }
      }, 1200);
    } else {
      if (selected === "scam" && currentScenario.label === "safe")
        setSafeBlocked((p) => p + 1);
      setStreak(0);
      setReaction("wrong");
      setSpreeActive(false);
      setPhoneOpen(false);
      const newReputation = reputation - 1;
      setReputation(newReputation);
      reputationRef.current = newReputation;
      setShowExplanation(true);
    }

    if (userId) {
      answerQueueRef.current.push({
        user_id: userId,
        scenario_id: currentScenario.id,
        selected_answer: selected,
        correct: isCorrect,
        response_time: rt,
        level_at_answer: level,
        business_type: business?.id,
      });
      if (answerQueueRef.current.length >= 5) {
        const toFlush = [...answerQueueRef.current];
        answerQueueRef.current = [];
        batchSaveAnswers(toFlush).catch(console.error);
      }
    }
  }

  async function triggerGameOver() {
    setGameOver(true);
    const acc =
      totalAnswered > 0 ? Math.round((totalCorrect / totalAnswered) * 100) : 0;
    if (!userId) return;

    if (answerQueueRef.current.length > 0) {
      await batchSaveAnswers(answerQueueRef.current).catch(console.error);
      answerQueueRef.current = [];
    }

    await saveGameSession({
      user_id: userId,
      score,
      accuracy: acc,
      level_reached: level,
      scams_blocked: scamsBlocked,
      safe_blocked: safeBlocked,
      total_answered: totalAnswered,
    }).catch(console.error);

    await updateUserStats(userId, {
      score,
      level,
      totalCorrect,
      totalWrong: totalAnswered - totalCorrect,
    }).catch(console.error);
  }

  function handleExplanationClose() {
    setShowExplanation(false);
    setReaction("idle");
    setAnswerDisabled(false);
    if (reputationRef.current <= 0) {
      triggerGameOver();
      return;
    }
    setCurrentIndex((p) => p + 1);
    answerStartRef.current = Date.now();
    if (currentIndex >= scenarios.length - 4) {
      setScenarios((p) => [...p, ...getBalancedBatch(business?.id, level, 20)]);
    }
  }

  const currentScenario = scenarios[currentIndex] || null;
  const charBg = CHARACTER_BG[character?.id] || CHARACTER_BG.chinedu;
  const liveAcc =
    totalAnswered > 0 ? Math.round((totalCorrect / totalAnswered) * 100) : 100;

  if (gameOver) {
    const acc =
      totalAnswered > 0 ? Math.round((totalCorrect / totalAnswered) * 100) : 0;
    const { grade, label, color } = getGrade(acc);
    return (
      <div className="min-h-screen bg-bg-base flex flex-col items-center justify-center px-4 py-10">
        <div className="fixed top-0 left-0 right-0 h-1.5 flex z-50">
          <div className="flex-1 bg-brand" />
          <div className="flex-1 bg-bg-base border-y border-ink-300" />
          <div className="flex-1 bg-brand" />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-sm"
        >
          <div className="text-center mb-6">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="text-7xl mb-3 inline-block"
            >
              {acc >= 70 ? "🏆" : "📉"}
            </motion.div>
            <h1
              className="text-3xl font-black text-ink-900 mb-1"
              style={{ fontFamily: "Nunito, sans-serif" }}
            >
              {acc >= 70 ? "Business Saved!" : "YAHOO Corp Won!"}
            </h1>
          </div>
          <div className="card p-5 mb-4 bg-white rounded-3xl border-2 border-ink-300 shadow-card">
            <div className="flex items-center justify-between pb-4 mb-4 border-b-2 border-ink-200">
              <div>
                <p className="text-xs font-black text-ink-500 uppercase tracking-widest">
                  Final Grade
                </p>
                <p className="text-sm text-ink-700 font-semibold">{label}</p>
              </div>
              <span
                className="text-6xl font-black"
                style={{ fontFamily: "Nunito, sans-serif", color }}
              >
                {grade}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[
                {
                  label: "Score",
                  value: score.toLocaleString(),
                  icon: "⭐",
                  color: "#E8820C",
                },
                {
                  label: "Accuracy",
                  value: `${acc}%`,
                  icon: "🎯",
                  color: "#2D9A4E",
                },
                {
                  label: "Level Reached",
                  value: level,
                  icon: "📈",
                  color: "#1D4ED8",
                },
                {
                  label: "Scams Blocked",
                  value: scamsBlocked,
                  icon: "🛡️",
                  color: "#2D9A4E",
                },
              ].map((s) => (
                <div key={s.label} className="bg-bg-sunken rounded-xl p-3">
                  <div className="text-lg mb-0.5">{s.icon}</div>
                  <div
                    className="text-2xl font-black text-ink-900"
                    style={{ fontFamily: "Nunito, sans-serif", color: s.color }}
                  >
                    {s.value}
                  </div>
                  <div className="text-ink-500 text-xs mt-0.5">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => window.location.reload()}
              className="btn-primary py-4"
            >
              🔄 Again
            </button>
            <button
              onClick={() => router.push("/profile")}
              className="btn-neutral py-4 shadow-btn-neutral border-2 border-ink-300"
            >
              🏠 Home
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div
      className="h-[100dvh] flex flex-col relative overflow-hidden"
      style={{ background: charBg.bg }}
    >
      <div className="flex-none h-1.5 flex">
        <div className="flex-1 bg-brand" />
        <div className="flex-1 border-y border-ink-200" />
        <div className="flex-1 bg-brand" />
      </div>

      <div className="flex-none px-4 py-3 bg-white/80 backdrop-blur-md border-b-2 border-ink-300">
        <div className="flex items-center justify-between max-w-lg mx-auto">
          <ReputationDisplay
            reputation={reputation}
            maxReputation={MAX_REPUTATION}
          />
          <div
            className="font-black text-lg text-ink-900"
            style={{ fontFamily: "Nunito, sans-serif", color: charBg.accent }}
          >
            {score.toLocaleString()}pts
          </div>
          <div className="flex items-center gap-2">
            {score >= 70 && reputation < MAX_REPUTATION && (
              <motion.button
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                onClick={() => setShowShop(true)}
                className="bg-brand-light border-2 border-brand/30 rounded-xl px-2 py-1 flex items-center gap-1 shadow-sm"
              >
                <span className="text-xs">❤️</span>
                <span className="font-black text-[10px] text-brand">+70</span>
              </motion.button>
            )}
            <div className="text-right">
              <div className="text-ink-700 text-[10px] font-black uppercase tracking-wider">
                {business?.name}
              </div>
              <div className="text-ink-400 text-[10px] font-bold">
                LVL {level}
              </div>
            </div>
          </div>
        </div>
        <div className="max-w-lg mx-auto mt-2 h-1.5 bg-ink-200 rounded-full overflow-hidden">
          <motion.div
            className="h-full rounded-full"
            style={{ background: charBg.accent }}
            animate={{ width: `${liveAcc}%` }}
          />
        </div>
      </div>
      <button
        onClick={handleSignOut}
        className="w-full text-ink-500 hover:text-ink-700 text-sm transition-colors py-2 font-medium"
      >
        Sign Out
      </button>
      <button
        onClick={() => router.push("/profile")}
        className="w-full text-ink-500 hover:text-ink-700 text-sm transition-colors py-2 font-medium"
      >
        Return to Profile
      </button>

      <div className="flex-1 flex flex-col items-center justify-center relative px-4 pt-12 pb-24">
        <AnimatePresence>
          {streak >= 3 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-4 bg-gold-light border-2 border-gold-border rounded-full px-4 py-1 flex items-center gap-2"
            >
              <span>🔥</span>
              <span
                className="font-black text-xs text-gold-text uppercase"
                style={{ fontFamily: "Nunito, sans-serif" }}
              >
                {streak} streak
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="relative">
          {scorePopup && (
            <motion.div
              initial={{ opacity: 0, y: 0 }}
              animate={{ opacity: 1, y: -40 }}
              className="absolute -top-12 left-1/2 -translate-x-1/2 bg-brand text-white font-black px-4 py-1.5 rounded-2xl text-xs shadow-btn"
            >
              {scorePopup}
            </motion.div>
          )}
          <Character characterData={character} reaction={reaction} />
        </div>

        <p className="text-ink-500 text-xs mt-6 font-bold uppercase tracking-widest">
          {spreeActive
            ? "📨 Messages incoming..."
            : "📱 Tap phone to check messages"}
        </p>

        {!phoneOpen && (
          <div className="mt-4">
            <PhoneUI
              scenario={currentScenario}
              isOpen={false}
              onOpen={() => {
                setPhoneOpen(true);
                setSpreeActive(true);
                answerStartRef.current = Date.now();
              }}
              notificationCount={currentScenario ? 1 : 0}
            />
          </div>
        )}
      </div>

      {phoneOpen && (
        <PhoneUI
          scenario={currentScenario}
          isOpen={true}
          spreeActive={spreeActive}
          onAnswer={handleAnswer}
          disabled={answerDisabled}
        />
      )}

      <AnimatePresence>
        {showExplanation && (
          <ExplanationModal
            scenario={currentScenario}
            wasCorrect={lastWasCorrect}
            onContinue={handleExplanationClose}
          />
        )}
        {showShop && (
          <HeartShop
            score={score}
            onClose={() => setShowShop(false)}
            onPurchase={({ newScore }) => {
              setScore(newScore);
              setReputation((r) => Math.min(r + 1, MAX_REPUTATION));
              reputationRef.current = Math.min(
                reputationRef.current + 1,
                MAX_REPUTATION,
              );
              setShowShop(false);
            }}
          />
        )}

        {/* Milestone interstitial */}
        {milestone && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-ink-900/60 backdrop-blur-md">
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              className="bg-white relative z-[101]  p-10 text-center rounded shadow-lifted max-w-sm"
              style={{ background: "#FFFFFF" }}
            >
              <div className="text-6xl mb-4">🔓</div>
              <h2
                className="text-3xl font-black text-ink-900 mb-2"
                style={{ fontFamily: "Nunito, sans-serif" }}
              >
                {milestone.title}
              </h2>
              <p className="text-ink-500 text-sm mb-8 leading-relaxed font-medium">
                {milestone.sub}
              </p>

              <div className="flex justify-center gap-2 mb-8">
                {[1, 2, 3, 4, 5].map((lvl) => (
                  <div
                    key={lvl}
                    className={`w-3 h-3 rounded-full ${lvl <= milestone.level ? "bg-brand scale-125" : "bg-ink-300"}`}
                  />
                ))}
              </div>

              <button
                onClick={() => setMilestone(null)}
                className="btn-primary w-full py-5 text-lg shadow-btn"
              >
                I'M READY →
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
