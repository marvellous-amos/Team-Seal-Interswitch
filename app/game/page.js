"use client";
import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import Character from "../../components/Character";
import PhoneUI from "../../components/PhoneUI";
import ReputationDisplay from "../../components/ReputationDisplay";
import ExplanationModal from "../../components/ExplanationModal";
import HeartShop from "../../components/HeartShop";
import { getBalancedBatch } from "../../data/scenarios";
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
const LEVEL_UP_STREAK = 8;
const LEVEL_UP_ACCURACY = 0.85;
const LEVEL_UP_SAMPLE = 20;

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
  chinedu: { bg: "#F0E2C8", accent: "#E8820C" },
  omotola: { bg: "#EDD5D9", accent: "#C94070" },
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
  const reputationRef = useRef(MAX_REPUTATION); // mirrors reputation state, readable synchronously
  const answerQueueRef = useRef([]); // batched answers — flushed every 5 or on game over

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
      if (user) setUserId(user.id);
      setScenarios(getBalancedBatch(b.id || "food_vendor", 1, 20));
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

  const currentScenario = scenarios[currentIndex] || null;
  const charBg = CHARACTER_BG[character?.id] || CHARACTER_BG.chinedu;

  const checkLevelUp = useCallback(
    (str, ans, cor) => {
      if (level >= 5) return false;
      if (str >= LEVEL_UP_STREAK) return true;
      if (ans >= LEVEL_UP_SAMPLE && cor / ans >= LEVEL_UP_ACCURACY) return true;
      return false;
    },
    [level],
  );

  function loadMore(lvl) {
    setScenarios((p) => [
      ...p,
      ...getBalancedBatch(business?.id || "food_vendor", lvl, 20),
    ]);
  }

  async function handleAnswer(selected) {
    if (!currentScenario || answerDisabled) return;
    setAnswerDisabled(true);
    const rt = Date.now() - answerStartRef.current;
    const isCorrect = selected === currentScenario.label;
    const newAnswered = totalAnswered + 1;
    const newCorrect = isCorrect ? totalCorrect + 1 : totalCorrect;
    setTotalAnswered(newAnswered);
    setTotalCorrect(newCorrect);
    setLastAnswer(selected);
    setLastWasCorrect(isCorrect);

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
      } else if (ns > 10 && ns % 5 === 0) {
        earned += POINTS_STREAK_5;
        msg = `+${earned} 🔥`;
      }
      setScore((s) => s + earned);
      setReaction("correct");
      setScorePopup(msg);
      setTimeout(() => setScorePopup(null), 1600);
      if (currentIndex >= scenarios.length - 4) loadMore(level);

      if (checkLevelUp(ns, newAnswered, newCorrect)) {
        const nl = Math.min(level + 1, 5);
        setLevel(nl);
        setStreak(0);
        loadMore(nl);
        setSpreeActive(false);
        setPhoneOpen(false);
        setTimeout(() => {
          setReaction("idle");
          setAnswerDisabled(false);
          setCurrentIndex((p) => p + 1);
          setMilestone({ level: nl, ...LEVEL_LABELS[nl] });
        }, 800);
        if (userId) {
          // Push to queue and flush immediately on level-up (natural pause point)
          answerQueueRef.current.push({
            user_id: userId,
            scenario_id: currentScenario.id,
            selected_answer: selected,
            correct: true,
            response_time: rt,
            level_at_answer: level,
            business_type: business?.id,
          });
          batchSaveAnswers(answerQueueRef.current).then(() => {
            answerQueueRef.current = [];
          });
        }
        return;
      }

      setSpreeActive(true);
      spreeTimerRef.current = setTimeout(() => {
        setReaction("idle");
        setAnswerDisabled(false);
        setCurrentIndex((p) => p + 1);
        answerStartRef.current = Date.now();
      }, 1200);
    } else {
      if (selected === "scam" && currentScenario.label === "safe")
        setSafeBlocked((p) => p + 1);
      setStreak(0);
      setReaction("wrong");
      setSpreeActive(false);
      setPhoneOpen(false);
      // Compute synchronously so handleExplanationClose can read the true new value
      const newReputation = reputation - 1;
      setReputation(newReputation);
      reputationRef.current = newReputation;
      setShowExplanation(true);
    }
    // Queue answer — flush to DB every 5 answers (reduces Supabase round-trips)
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

  function handlePhoneOpen() {
    setPhoneOpen(true);
    setSpreeActive(true);
    answerStartRef.current = Date.now();
  }

  function handleExplanationClose() {
    setShowExplanation(false);
    setReaction("idle");
    setAnswerDisabled(false);
    // Use ref — state may not have settled yet when this runs
    if (reputationRef.current <= 0) {
      triggerGameOver();
      return;
    }
    setCurrentIndex((p) => p + 1);
    answerStartRef.current = Date.now();
    if (currentIndex >= scenarios.length - 4) loadMore(level);
  }

  async function triggerGameOver() {
    setGameOver(true);
    const acc =
      totalAnswered > 0 ? Math.round((totalCorrect / totalAnswered) * 100) : 0;
    localStorage.setItem(
      "nbs_last_session",
      JSON.stringify({
        score,
        accuracy: acc,
        level,
        scamsBlocked,
        safeBlocked,
        totalAnswered,
      }),
    );
    if (!userId) return;

    // Flush any remaining queued answers before closing the session
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

    // updateUserStats now uses MAX logic internally — pass named fields
    await updateUserStats(userId, {
      score,
      level,
      totalCorrect,
      totalWrong: totalAnswered - totalCorrect,
    }).catch(console.error);
  }

  // ── Game Over ─────────────────────────────────────────────────
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
              transition={{ type: "spring", stiffness: 200, delay: 0.15 }}
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
            <p className="text-ink-500 text-sm">
              {acc >= 70
                ? `${character?.name} protected their business!`
                : `${character?.name}'s business took heavy damage.`}
            </p>
          </div>
          <div className="card p-5 mb-4">
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
                  value: `${level}`,
                  icon: "📈",
                  color: "#1D4ED8",
                },
                {
                  label: "Scams Blocked",
                  value: scamsBlocked,
                  icon: "🛡️",
                  color: "#2D9A4E",
                },
                {
                  label: "Questions",
                  value: totalAnswered,
                  icon: "📊",
                  color: "#78716C",
                },
                {
                  label: "Safe Blocked",
                  value: safeBlocked,
                  icon: "⚠️",
                  color: "#E03131",
                },
              ].map((s) => (
                <div key={s.label} className="bg-bg-sunken rounded-xl p-3">
                  <div className="text-lg mb-0.5">{s.icon}</div>
                  <div
                    className="text-2xl font-black"
                    style={{ fontFamily: "Nunito, sans-serif", color: s.color }}
                  >
                    {s.value}
                  </div>
                  <div className="text-ink-500 text-xs mt-0.5">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
          {safeBlocked > 0 && (
            <div className="bg-danger-bg border-2 border-danger-border rounded-2xl p-4 mb-4">
              <p className="text-danger-text text-xs font-bold mb-1">
                ⚠ Real Messages Wrongly Blocked
              </p>
              <p className="text-danger-text/80 text-xs leading-relaxed">
                You flagged {safeBlocked} real message
                {safeBlocked > 1 ? "s" : ""} as scam.
              </p>
            </div>
          )}
          <div className="grid grid-cols-2 gap-3">
            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={() => {
                setScore(0);
                setStreak(0);
                setTotalAnswered(0);
                setTotalCorrect(0);
                setScamsBlocked(0);
                setSafeBlocked(0);
                setReputation(MAX_REPUTATION);
                setLevel(1);
                setCurrentIndex(0);
                setGameOver(false);
                setReaction("idle");
                setSpreeActive(false);
                setPhoneOpen(false);
                setScenarios(
                  getBalancedBatch(business?.id || "food_vendor", 1, 20),
                );
              }}
              className="btn-primary flex items-center justify-center gap-2 py-4"
            >
              🔄 Again
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={() => router.push("/welcome")}
              className="btn-neutral flex items-center justify-center gap-2 py-4"
            >
              🏠 Home
            </motion.button>
          </div>
        </motion.div>
      </div>
    );
  }

  const liveAcc =
    totalAnswered > 0 ? Math.round((totalCorrect / totalAnswered) * 100) : 100;

  // ── Main game — 100dvh, no overflow-hidden anywhere ────────────
  // KEY: overflow-hidden is REMOVED from all parent divs.
  // PhoneUI open state uses fixed positioning — it must not have
  // any ancestor with overflow:hidden or transform, or fixed breaks.
  // Solution: render open PhoneUI as a sibling at the root level.
  return (
    <div className="h-[100dvh] flex flex-col" style={{ background: charBg.bg }}>
      {/* Flag stripe */}
      <div className="flex-none h-1.5 flex">
        <div className="flex-1 bg-brand" />
        <div
          className="flex-1 border-y border-ink-200"
          style={{ background: charBg.bg }}
        />
        <div className="flex-1 bg-brand" />
      </div>

      {/* HUD */}
      <div
        className="flex-none px-4 py-2.5"
        style={{
          background: "rgba(255,255,255,0.75)",
          borderBottom: "2px solid #D6D3D1",
        }}
      >
        <div className="flex items-center justify-between max-w-lg mx-auto">
          <ReputationDisplay
            reputation={reputation}
            maxReputation={MAX_REPUTATION}
          />
          <div
            className="font-black text-lg text-center"
            style={{ fontFamily: "Nunito, sans-serif", color: charBg.accent }}
          >
            {score.toLocaleString()}pts
          </div>
          <div className="flex items-center gap-2">
            {/* Shop button — only visible when affordable and not at full health */}
            {score >= 70 && reputation < MAX_REPUTATION && !gameOver && (
              <motion.button
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setShowShop(true)}
                style={{
                  background: "#E8F5ED",
                  border: "2px solid #A3D9B1",
                  borderRadius: 12,
                  padding: "4px 8px",
                  cursor: "pointer",
                  boxShadow: "0 2px 0 0 #A3D9B1",
                  display: "flex",
                  alignItems: "center",
                  gap: 4,
                }}
              >
                <span style={{ fontSize: 14 }}>❤️</span>
                <span
                  style={{
                    fontFamily: "Nunito, sans-serif",
                    fontWeight: 900,
                    fontSize: 11,
                    color: "#1F6B36",
                  }}
                >
                  +70
                </span>
              </motion.button>
            )}
            <div className="text-right">
              <div className="text-ink-700 text-xs font-bold">
                {business?.emoji} {business?.name}
              </div>
              <div className="text-ink-400 text-[11px]">📈 Level {level}</div>
            </div>
          </div>
        </div>
        <div
          className="max-w-lg mx-auto mt-1.5 h-1.5 rounded-full overflow-hidden"
          style={{ background: "#D6D3D1" }}
        >
          <motion.div
            className="h-full rounded-full"
            style={{ background: charBg.accent }}
            animate={{ width: `${liveAcc}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>

      <button
        onClick={handleSignOut}
        className="w-full text-ink-500 hover:text-ink-700 text-sm transition-colors py-2 font-medium"
      >
        Sign Out
      </button>
      {/* Character area — flex-1, NO overflow:hidden */}
      <div className="flex-1 flex flex-col items-center justify-center relative px-4">
        <AnimatePresence>
          {streak >= 3 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              className="absolute top-4 flex items-center gap-2 rounded-full px-4 py-1.5 border-2"
              style={{
                background: "rgba(232,130,12,0.12)",
                borderColor: "rgba(232,130,12,0.35)",
              }}
            >
              <span>🔥</span>
              <span
                className="font-black text-sm"
                style={{ fontFamily: "Nunito, sans-serif", color: "#E8820C" }}
              >
                {streak} streak
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {scorePopup && (
            <motion.div
              key={scorePopup}
              initial={{ opacity: 0, y: 10, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-16 font-black px-4 py-1.5 rounded-2xl text-sm whitespace-nowrap text-white"
              style={{
                fontFamily: "Nunito, sans-serif",
                background: "#2D9A4E",
                boxShadow: "0 4px 0 0 #1F6B36",
              }}
            >
              {scorePopup}
            </motion.div>
          )}
        </AnimatePresence>

        {character && (
          <Character
            characterData={character}
            reaction={reaction}
            businessType={business?.id}
          />
        )}

        <p className="text-ink-500 text-xs mt-3 text-center font-medium">
          {totalAnswered === 0
            ? "Tap the phone to check your first message 📱"
            : spreeActive
              ? "📨 Messages incoming…"
              : "📱 New message — tap to read"}
        </p>

        {/* Closed phone button — only shown when phone is closed */}
        {!phoneOpen && (
          <div className="mt-6">
            <PhoneUI
              scenario={currentScenario}
              isOpen={false}
              spreeActive={spreeActive}
              onOpen={handlePhoneOpen}
              onAnswer={handleAnswer}
              disabled={answerDisabled}
              notificationCount={currentScenario ? 1 : 0}
            />
          </div>
        )}
      </div>

      {/* ── Open phone — at JSX root, no ancestor with overflow/transform ── */}
      {/* This ensures fixed positioning works correctly */}
      {phoneOpen && (
        <PhoneUI
          scenario={currentScenario}
          isOpen={true}
          spreeActive={spreeActive}
          onOpen={handlePhoneOpen}
          onAnswer={handleAnswer}
          disabled={answerDisabled}
          notificationCount={0}
        />
      )}

      {/* Explanation modal */}
      <AnimatePresence>
        {showExplanation && lastAnswer && (
          <ExplanationModal
            scenario={currentScenario}
            wasCorrect={lastWasCorrect}
            onContinue={handleExplanationClose}
          />
        )}
      </AnimatePresence>

      {/* Heart Shop */}
      <AnimatePresence>
        {showShop && (
          <HeartShop
            score={score}
            onPurchase={({ newScore }) => {
              setScore(newScore);
              setReputation((r) => Math.min(r + 1, MAX_REPUTATION));
              reputationRef.current = Math.min(
                reputationRef.current + 1,
                MAX_REPUTATION,
              );
              setShowShop(false);
            }}
            onClose={() => setShowShop(false)}
          />
        )}
      </AnimatePresence>

      {/* Milestone interstitial */}
      <AnimatePresence>
        {milestone && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50"
              style={{ background: "rgba(28,25,23,0.82)" }}
            />
            <div className="fixed inset-0 z-50 flex items-center justify-center px-6">
              <motion.div
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.85 }}
                transition={{ type: "spring", stiffness: 260, damping: 22 }}
                className="w-full max-w-sm rounded-3xl p-8 text-center border-2 border-brand"
                style={{
                  background: "#FFFFFF",
                  boxShadow: "0 8px 40px rgba(45,154,78,0.2)",
                }}
              >
                <div className="text-6xl mb-4">🔓</div>
                <h2
                  className="text-2xl font-black text-ink-900 mb-2"
                  style={{ fontFamily: "Nunito, sans-serif" }}
                >
                  {milestone.title}
                </h2>
                <p className="text-ink-500 text-sm mb-6 leading-relaxed">
                  {milestone.sub}
                </p>
                <div className="flex justify-center gap-2 mb-6">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div
                      key={i}
                      className="w-3 h-3 rounded-full"
                      style={{
                        background: i < milestone.level ? "#2D9A4E" : "#D6D3D1",
                        transform:
                          i < milestone.level ? "scale(1.15)" : "scale(1)",
                      }}
                    />
                  ))}
                </div>
                <button
                  onClick={() => setMilestone(null)}
                  className="btn-primary w-full text-base"
                >
                  I'm Ready →
                </button>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
