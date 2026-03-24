/**
 * NoBeScam — Master Scenario Registry
 * Imports all scenario pools and exposes unified helpers
 * Business filtering is enforced at batch-load time
 */

import { foodScenarios } from "./scenarios-food";
import { sportswearScenarios } from "./scenarios-sportswear";
import { palmWineScenarios } from "./scenarios-palmwine";

export const CATEGORIES = {
  CUSTOMER: "Customer Message",
  SUPPLIER: "Supplier",
  BANK: "Bank",
  GRANT: "Grant",
  PAYMENT: "Payment Request",
};

export const BUSINESS_IDS = {
  FOOD: "food_vendor",
  SPORT: "sportswear",
  PALM_WINE: "palm_wine",
};

// ─── Shared universal scenarios (bank alerts, generic fraud) ──────
// Tagged ALL businesses — shown regardless of business selection
const ALL = ["food_vendor", "sportswear", "palm_wine"];

export const universalScenarios = [
  {
    id: 1,
    businesses: ALL,
    text: "CONGRATULATIONS!!! You have WON ₦2,500,000 from the CBN COVID Relief Fund!! To claim, send your BVN, ATM PIN and ₦5,000 processing fee to 0812XXXXXXX NOW!!!",
    label: "scam",
    difficulty: 1,
    category: CATEGORIES.GRANT,
    explanation:
      "The CBN never asks for your ATM PIN or charges a fee to receive funds. Any message demanding BVN + ATM PIN together is always a scam.",
  },
  {
    id: 2,
    businesses: ALL,
    text: "URGENT: Your GTBank account has been BLOCKED due to suspicious activity. Click here immediately to verify: http://gtb-verify-account.xyz to avoid permanent closure.",
    label: "scam",
    difficulty: 1,
    category: CATEGORIES.BANK,
    explanation:
      "GTBank's real domain is gtbank.com — never .xyz. Banks never send links to unlock accounts via SMS. Always log in directly through the official app.",
  },
  {
    id: 3,
    businesses: ALL,
    text: "Your Zenith Bank statement for October 2024 is ready. Log in to your app or visit any branch to download. Reference: ZB-STMT-OCT2024.",
    label: "safe",
    difficulty: 1,
    category: CATEGORIES.BANK,
    verifiedMerchant: true,
    explanation:
      "This is a legitimate bank notification. No link to click, no personal details requested — exactly how real bank messages look.",
  },
  {
    id: 4,
    businesses: ALL,
    text: "Dear customer, Opay detected unauthorized access on your wallet. Send your 6-digit transaction PIN to 07XXXXXXXXXX to secure your account RIGHT NOW.",
    label: "scam",
    difficulty: 1,
    category: CATEGORIES.BANK,
    explanation:
      "No legitimate fintech will ever ask for your transaction PIN via SMS. OPay customer service is contacted through the app only.",
  },
  {
    id: 5,
    businesses: ALL,
    text: "MAKE ₦500,000 DAILY FROM HOME!! No experience needed. Just pay ₦15,000 registration and we train you. Limited slots! Reply YES now!!",
    label: "scam",
    difficulty: 1,
    category: CATEGORIES.PAYMENT,
    explanation:
      "Legitimate jobs never require you to pay to start working. These work-from-home schemes steal your registration fee and disappear.",
  },
  {
    id: 6,
    businesses: ALL,
    text: "Your Tony Elumelu Foundation TEF 2024 application was SUCCESSFUL! To activate your ₦5M grant, pay a ₦25,000 documentation fee to Account: 3049XXXXXX, First Bank.",
    label: "scam",
    difficulty: 2,
    category: CATEGORIES.GRANT,
    explanation:
      "TEF NEVER charges documentation or processing fees. Recipients are contacted only through tefconnect.com. Any fee request is fraud.",
  },
  {
    id: 7,
    businesses: ALL,
    text: "Dear Business Owner, LASG Business Support Fund applications are now open. Apply at lisbf.lagosstate.gov.ng with your CAC certificate and tax clearance. Deadline: December 31st.",
    label: "safe",
    difficulty: 2,
    category: CATEGORIES.GRANT,
    explanation:
      "The .lagosstate.gov.ng domain is authentic. Government grants always use .gov.ng domains — always cross-check with the official Lagos State website.",
  },
  {
    id: 8,
    businesses: ALL,
    text: "YAHOO CORP NOTICE: We have compromised your business accounts. Pay ₦200,000 in Bitcoin to wallet 3FZbgi29cpjq... within 24 hours or we publish your customer data.",
    label: "scam",
    difficulty: 2,
    category: CATEGORIES.PAYMENT,
    explanation:
      "Ransomware threats are almost always fake. Report to the EFCC and your bank immediately. Never pay.",
  },
  {
    id: 9,
    businesses: ALL,
    text: "From: CBN-GRANTS@businessgrants.ng — You qualify for the CBN Household and MSME Support Fund. Upload your CAC docs at businessgrants.ng/apply to receive ₦3M in 48 hours.",
    label: "scam",
    difficulty: 2,
    category: CATEGORIES.GRANT,
    explanation:
      "The real CBN uses cbn.gov.ng — never a .ng commercial domain. This phishing site steals your CAC documents and identity.",
  },
  {
    id: 10,
    businesses: ALL,
    text: "⚠ UBA TRANSACTION ALERT: ₦180,000 debit on your account ending 4471. If unauthorized, click: secure.uba-ng.com/dispute?txn=4471 to reverse immediately.",
    label: "scam",
    difficulty: 3,
    category: CATEGORIES.BANK,
    explanation:
      "The real UBA domain is ubagroup.com. 'uba-ng.com' is a fake lookalike. Real bank alerts never include clickable dispute links — call your bank directly.",
  },
  {
    id: 11,
    businesses: ALL,
    text: "Verified ✔ GTBank Corporate: Your registered business account qualifies for our SME Growth Package — ₦500,000 OD facility at 18% p.a. Visit any GTBank branch with your CAC and 6-months statement. Valid till month end.",
    label: "safe",
    difficulty: 3,
    category: CATEGORIES.BANK,
    verifiedMerchant: true,
    explanation:
      "GTBank regularly extends overdraft facilities to existing business account holders. The request to visit a branch (not click a link) is the key sign of legitimacy.",
  },
  {
    id: 12,
    businesses: ALL,
    text: "From: noreply@cbn-msme-grants.com — Dear Entrepreneur, CBN MSME Development Fund shortlisted you for a ₦2M soft loan at 5% interest. No collateral. Confirm by sending NIN, BVN and account details.",
    label: "scam",
    difficulty: 3,
    category: CATEGORIES.GRANT,
    explanation:
      "Real CBN uses cbn.gov.ng. Emailing BVN + NIN together enables SIM swap fraud and account takeover.",
  },
  {
    id: 13,
    businesses: ALL,
    text: "NDIC Deposit Insurance Notice: Following Heritage Bank acquisition, your business deposit of ₦1,842,000 is eligible for NDIC insurance claim. Submit claim at ndic.org.ng/claim with your account details by Nov 30.",
    label: "safe",
    difficulty: 4,
    category: CATEGORIES.BANK,
    verifiedMerchant: true,
    explanation:
      "NDIC (ndic.org.ng) does handle such claims. Always independently verify by calling NDIC's official number before submitting documents.",
  },
  {
    id: 14,
    businesses: ALL,
    text: "EFCC CYBERCRIME UNIT: Your IP address has been linked to online fraud. To avoid arrest, pay ₦500,000 clearance bond to Account: 5049XXXXXX within 24 hours. FINAL WARNING.",
    label: "scam",
    difficulty: 2,
    category: CATEGORIES.PAYMENT,
    explanation:
      "The EFCC never contacts citizens via SMS to collect clearance bonds. This is extortion. Report to efcc.gov.ng. EFCC toll-free: 0800-22322357.",
  },
  {
    id: 15,
    businesses: ALL,
    text: "Lagos State Internal Revenue Service (LIRS): Your business has outstanding tax liabilities of ₦145,000. Pay immediately at lirs-tax.com/payment or face asset seizure.",
    label: "scam",
    difficulty: 4,
    category: CATEGORIES.BANK,
    explanation:
      "The real LIRS website is lirs.gov.ng. 'lirs-tax.com' is fraudulent. Real tax demands come via official letters — never SMS payment links.",
  },
  {
    id: 16,
    businesses: ALL,
    text: "Alert: Someone is trying to reset your business email password from an unknown device. If this wasn't you, click: securemail.google-protect.net to stop the reset immediately.",
    label: "scam",
    difficulty: 3,
    category: CATEGORIES.BANK,
    explanation:
      "Google security alerts come from accounts.google.com — never 'google-protect.net'. Go directly to myaccount.google.com to check security activity.",
  },
  {
    id: 17,
    businesses: ALL,
    text: "Your Moniepoint business account just received a debit of ₦870,000 by error. The sender requests immediate reversal to: 3029XXXXXX Zenith Bank. Please reverse urgently or we escalate to CBN.",
    label: "scam",
    difficulty: 5,
    category: CATEGORIES.BANK,
    explanation:
      "Overpayment/reversal scam. The 'erroneous credit' may not even exist. Never reverse funds based on SMS requests. Verify directly in your Moniepoint app.",
  },
  {
    id: 18,
    businesses: ALL,
    text: "BREAKING: CBN has selected 500 SME owners for the Digital MSMEs Fund. Check qualification: cbn-msme-digital.fund. Enter your BVN + last 4 digits of your card to verify.",
    label: "scam",
    difficulty: 3,
    category: CATEGORIES.GRANT,
    explanation:
      "BVN + card digits together is a full card compromise. CBN announcements are at cbn.gov.ng only.",
  },
  {
    id: 19,
    businesses: ALL,
    text: "Hi, I'm Tunde from Multichoice Africa CSR. We need your BVN to confirm your CAC registration status and release your ₦250,000 support grant.",
    label: "scam",
    difficulty: 5,
    category: CATEGORIES.GRANT,
    explanation:
      "CAC registration checks are free at cac.gov.ng. No legitimate grant requires your BVN to confirm registration.",
  },
  {
    id: 20,
    businesses: ALL,
    text: "Dear valued merchant, your Paystack settlement of ₦47,850 has been initiated and will reflect in your account within 1–2 business days. Transaction ref: PS-2024-094821.",
    label: "safe",
    difficulty: 1,
    category: CATEGORIES.PAYMENT,
    verifiedMerchant: true,
    explanation:
      "Standard Paystack settlement notification. The specific amount and reference number indicate this is a real settlement from your payment processor.",
  },
];

// ─── Merge all pools ──────────────────────────────────────────────
export const scenarios = [
  ...universalScenarios,
  ...foodScenarios,
  ...sportswearScenarios,
  ...palmWineScenarios,
];

// ─── Fisher-Yates shuffle ─────────────────────────────────────────
export function shuffleScenarios(arr) {
  const out = [...arr];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

/**
 * Get all scenarios valid for a given business + max difficulty
 * Always includes universal scenarios
 */
export function getScenariosByBusiness(businessId, maxDifficulty = 5) {
  return scenarios.filter(
    (s) => s.businesses.includes(businessId) && s.difficulty <= maxDifficulty,
  );
}

/**
 * Return a balanced batch (40–60% scam/safe) for a business + level
 */
export function getBalancedBatch(businessId, level, batchSize = 20) {
  const pool = getScenariosByBusiness(businessId, Math.min(level + 1, 5));
  const scams = shuffleScenarios(pool.filter((s) => s.label === "scam"));
  const safes = shuffleScenarios(pool.filter((s) => s.label === "safe"));

  const scamCount = Math.round(batchSize * (0.4 + Math.random() * 0.2));
  const safeCount = batchSize - scamCount;

  const batch = [
    ...scams.slice(0, Math.min(scamCount, scams.length)),
    ...safes.slice(0, Math.min(safeCount, safes.length)),
  ];

  if (batch.length < batchSize) return shuffleScenarios(pool);
  return shuffleScenarios(batch);
}
