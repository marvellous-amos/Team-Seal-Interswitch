"use client";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

const BUSINESSES = [
  {
    id: "food_vendor",
    name: "Food Vendor",
    emoji: "🍛",
    description: "Jollof rice, pepper soup & more",
    environment: "Street stall · Lagos market",
    threats: [
      "Fake catering contracts",
      "NAFDAC impersonation",
      "Bulk order scams",
    ],
    borderColor: "#F9C57A",
    bgColor: "#FEF3E2",
    textColor: "#92400E",
  },
  {
    id: "sportswear",
    name: "Sportswear Brand",
    emoji: "👟",
    description: "Custom jerseys & athletic gear",
    environment: "Workshop · Oshodi",
    threats: [
      "Fake distributor deals",
      "Counterfeit supplier scams",
      "Corporate impersonation",
    ],
    borderColor: "#F5AAAA",
    bgColor: "#FDEAEA",
    textColor: "#9B1C1C",
  },
  {
    id: "palm_wine",
    name: "Palm Wine Supply",
    emoji: "🍶",
    description: "Premium tapped palm wine",
    environment: "Tap site · City delivery",
    threats: [
      "Supplier account switching",
      "Fake wholesale orders",
      "Export fraud",
    ],
    borderColor: "#A3D9B1",
    bgColor: "#E8F5ED",
    textColor: "#1F6B36",
  },
];

export default function SelectBusinessPage() {
  const router = useRouter();

  function selectBusiness(business) {
    localStorage.setItem("nbs_business", JSON.stringify(business));
    router.push("/story");
  }

  return (
    <div className="min-h-screen bg-bg-base flex flex-col items-center justify-center px-4 py-12">
      <div className="fixed top-0 left-0 right-0 h-1.5 flex z-50">
        <div className="flex-1 bg-brand" />
        <div className="flex-1 bg-bg-base border-y border-ink-300" />
        <div className="flex-1 bg-brand" />
      </div>

      <div className="w-full max-w-sm">
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <p className="text-ink-500 text-xs font-bold uppercase tracking-widest mb-2">
            Step 2 of 3
          </p>
          <div className="flex justify-center gap-2 mb-4">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className={`h-2 rounded-full transition-all ${
                  i <= 1 ? "w-6 bg-brand" : "w-2 bg-ink-300"
                }`}
              />
            ))}
          </div>
          <h1
            className="text-3xl font-black text-ink-900"
            style={{ fontFamily: "Nunito, sans-serif" }}
          >
            Choose Your Business
          </h1>
          <p className="text-ink-500 text-sm mt-1">
            What will you build with your ₦5M grant?
          </p>
        </motion.div>

        <div className="space-y-4 mb-6">
          {BUSINESSES.map((biz, i) => (
            <motion.button
              key={biz.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 + i * 0.1 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => selectBusiness(biz)}
              className="w-full bg-bg-surface rounded-2xl p-4 text-left transition-all"
              style={{
                border: `2px solid ${biz.borderColor}`,
                boxShadow: `0 4px 0 0 ${biz.borderColor}`,
              }}
            >
              <div className="flex items-center gap-4">
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center text-3xl flex-shrink-0"
                  style={{
                    background: biz.bgColor,
                    border: `2px solid ${biz.borderColor}`,
                  }}
                >
                  {biz.emoji}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3
                      className="text-base font-black"
                      style={{
                        fontFamily: "Nunito, sans-serif",
                        color: biz.textColor,
                      }}
                    >
                      {biz.name}
                    </h3>
                    <span className="text-ink-300 text-lg">→</span>
                  </div>
                  <p className="text-ink-500 text-xs">{biz.description}</p>
                  <p className="text-ink-500 text-xs mt-0.5">
                    📍 {biz.environment}
                  </p>
                </div>
              </div>

              {/* Threat tags */}
              <div className="mt-3 flex flex-wrap gap-1.5">
                {biz.threats.map((t) => (
                  <span
                    key={t}
                    className="text-[10px] px-2 py-0.5 rounded-full font-semibold"
                    style={{
                      color: biz.textColor,
                      background: biz.bgColor,
                      border: `1px solid ${biz.borderColor}`,
                    }}
                  >
                    ⚠ {t}
                  </span>
                ))}
              </div>
            </motion.button>
          ))}
        </div>

        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          onClick={() => router.back()}
          className="w-full text-ink-500 hover:text-ink-700 text-sm transition-colors py-2 font-medium"
        >
          ← Back
        </motion.button>
      </div>
    </div>
  );
}
