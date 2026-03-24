"use client";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

const CHARACTERS = [
  {
    id: "chinedu",
    name: "Chinedu",
    emoji: "👨🏿‍💼",
    description: "Sharp-witted entrepreneur from Anambra",
    traits: ["Quick thinker", "Tech-savvy", "Market hustler"],
    accent: "brand",
    borderColor: "#A3D9B1",
    bgColor: "#E8F5ED",
    textColor: "#1F6B36",
  },
  {
    id: "omotola",
    name: "Omotola",
    emoji: "👩🏿‍💼",
    description: "Resilient businesswoman from Lagos",
    traits: ["Street smart", "People reader", "Fearless boss"],
    accent: "danger",
    borderColor: "#F5AAAA",
    bgColor: "#FDEAEA",
    textColor: "#9B1C1C",
  },
];

export default function SelectGenderPage() {
  const router = useRouter();

  function selectCharacter(character) {
    localStorage.setItem("nbs_character", JSON.stringify(character));
    router.push("/select-business");
  }

  return (
    <div className="min-h-screen bg-bg-base flex flex-col items-center justify-center px-4">
      <div className="fixed top-0 left-0 right-0 h-1.5 flex z-50">
        <div className="flex-1 bg-brand" />
        <div className="flex-1 bg-bg-base border-y border-ink-300" />
        <div className="flex-1 bg-brand" />
      </div>

      <div className="w-full max-w-sm">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <p className="text-ink-500 text-xs font-bold uppercase tracking-widest mb-2">
            Step 1 of 3
          </p>
          {/* Progress dots */}
          <div className="flex justify-center gap-2 mb-4">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className={`h-2 rounded-full transition-all ${
                  i === 0 ? "w-6 bg-brand" : "w-2 bg-ink-300"
                }`}
              />
            ))}
          </div>
          <h1
            className="text-3xl font-black text-ink-900"
            style={{ fontFamily: "Nunito, sans-serif" }}
          >
            Choose Your Character
          </h1>
          <p className="text-ink-500 text-sm mt-1">
            Who will protect their business today?
          </p>
        </motion.div>

        {/* Character cards */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          {CHARACTERS.map((char, i) => (
            <motion.button
              key={char.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.1 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => selectCharacter(char)}
              className="relative bg-bg-surface rounded-2xl p-5 text-left overflow-hidden transition-all"
              style={{
                border: `2px solid ${char.borderColor}`,
                boxShadow: `0 4px 0 0 ${char.borderColor}`,
              }}
            >
              <div className="text-5xl mb-3">{char.emoji}</div>
              <h3
                className="text-lg font-black mb-1"
                style={{
                  fontFamily: "Nunito, sans-serif",
                  color: char.textColor,
                }}
              >
                {char.name}
              </h3>
              <p className="text-ink-500 text-xs mb-3">{char.description}</p>
              <div className="space-y-1">
                {char.traits.map((t) => (
                  <div
                    key={t}
                    className="flex items-center gap-1 text-xs text-ink-700"
                  >
                    <span style={{ color: char.textColor }}>✦</span> {t}
                  </div>
                ))}
              </div>
            </motion.button>
          ))}
        </div>

        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          onClick={() => router.back()}
          className="w-full text-ink-500 hover:text-ink-700 text-sm transition-colors py-2 font-medium"
        >
          ← Back
        </motion.button>
      </div>
    </div>
  );
}
