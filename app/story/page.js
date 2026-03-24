"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

export default function StoryPage() {
  const router = useRouter();
  const [character, setCharacter] = useState(null);
  const [business, setBusiness] = useState(null);
  const [visible, setVisible] = useState(0);

  useEffect(() => {
    setCharacter(JSON.parse(localStorage.getItem("nbs_character") || "{}"));
    setBusiness(JSON.parse(localStorage.getItem("nbs_business") || "{}"));
  }, []);

  const lines =
    character && business
      ? [
          `🇳🇬  Somewhere in Nigeria, ${new Date().getFullYear()}...`,
          `${character.name} Otedola recently received a ₦5,000,000 grant from the Rony W. Aleumelu Foundation to start their dream: a ${business.name} business.`,
          `${character.traits?.[0] || "Sharp-witted"}, resourceful, and full of hustle — ${character.name} was ready to change their family's story forever.`,
          `But success breeds envy.`,
          `The village people couldn't stand to watch ${character.name} rise. So they made a call...`,
          `📞  "YAHOO Corp speaking. How may we destroy your target?"`,
          `YAHOO Corp — Africa's most sophisticated cybercrime syndicate — began flooding ${character.name}'s phone with fake messages. Some look completely real. Some have fake verified badges. All of them want to steal everything.`,
          `${character.name} must run the business AND protect it at the same time.`,
          `This one... NoBeScam! 🛡️`,
        ]
      : [];

  useEffect(() => {
    if (!lines.length) return;
    const t = setInterval(() => {
      setVisible((v) => {
        if (v < lines.length) return v + 1;
        clearInterval(t);
        return v;
      });
    }, 750);
    return () => clearInterval(t);
  }, [lines.length]);

  const done = visible >= lines.length;

  return (
    <div className="min-h-screen bg-bg-base flex flex-col items-center justify-center px-4 py-12">
      <div className="fixed top-0 left-0 right-0 h-1.5 flex z-50">
        <div className="flex-1 bg-brand" />
        <div className="flex-1 bg-bg-base border-y border-ink-300" />
        <div className="flex-1 bg-brand" />
      </div>

      <div className="w-full max-w-sm">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-ink-500 text-xs font-bold uppercase tracking-widest text-center mb-8"
        >
          📖 Your Story
        </motion.p>

        <div className="space-y-4 mb-10 min-h-[380px]">
          {lines.slice(0, visible).map((line, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
              className={`text-sm leading-relaxed ${
                line.includes("YAHOO Corp")
                  ? "text-danger font-bold text-base"
                  : line.includes("NoBeScam")
                    ? "text-brand font-black text-base"
                    : line.includes("₦5,000,000")
                      ? "text-gold font-semibold"
                      : line.includes("success breeds") ||
                          line.includes("But success")
                        ? "text-ink-500 italic text-center"
                        : "text-ink-700"
              }`}
            >
              {line}
            </motion.p>
          ))}

          {!done && (
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ repeat: Infinity, duration: 0.6 }}
              className="inline-block w-2 h-4 bg-brand ml-1 rounded-sm"
            />
          )}
        </div>

        <AnimatePresence>
          {done && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-3"
            >
              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={() => router.push("/rules")}
                className="btn-primary w-full text-base"
              >
                I'M READY — SHOW ME THE RULES →
              </motion.button>
              <p className="text-center text-ink-500 text-xs">
                {character?.name} is counting on you
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {!done && visible > 2 && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={() => setVisible(lines.length)}
            className="w-full text-ink-500 hover:text-ink-700 text-sm mt-4 transition-colors font-medium"
          >
            Skip story →
          </motion.button>
        )}
      </div>
    </div>
  );
}
