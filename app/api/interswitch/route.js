// /**
//  * app/api/interswitch/route.js
//  *
//  * Server-side proxy for all Interswitch API calls.
//  * Secret key never touches the client.
//  *
//  * Actions:
//  *   createWallet  — create a player wallet on first login
//  *   topupWallet   — credit wallet before a shop purchase (WalletPay)
//  *   debitWallet   — debit wallet for shop purchase (Merchant Wallet transact)
//  *   getBalance    — check wallet balance
//  *   token         — test QA credentials (dev only)
//  *   k8token       — test k8 credentials (dev only)
//  */

// import { NextResponse } from "next/server";

// const CLIENT_ID = process.env.INTERSWITCH_CLIENT_ID;
// const SECRET_KEY = process.env.INTERSWITCH_SECRET_KEY;
// const MERCHANT_CODE = process.env.INTERSWITCH_MERCHANT_CODE || "MX6072";
// const PAYABLE_CODE = process.env.INTERSWITCH_PAYABLE_CODE || "9405967";
// const WALLET_PIN = process.env.INTERSWITCH_WALLET_PIN || "1234";

// // Cluster URLs
// const QA_TOKEN_URL = "https://qa.interswitchng.com/passport/oauth/token";
// const K8_TOKEN_URL = "https://passport-v2.k8.isw.la/passport/oauth/token";
// const K8_WALLET_URL = "https://merchant-wallet.k8.isw.la/merchant-wallet";
// const QA_COLLECTIONS = "https://qa.interswitchng.com/collections";

// // ─── Token helpers ────────────────────────────────────────────────

// async function getQAToken() {
//   const encoded = Buffer.from(`${CLIENT_ID}:${SECRET_KEY}`).toString("base64");
//   const res = await fetch(`${QA_TOKEN_URL}?grant_type=client_credentials`, {
//     method: "POST",
//     headers: {
//       Authorization: `Basic ${encoded}`,
//       "Content-Type": "application/x-www-form-urlencoded",
//     },
//     body: "grant_type=client_credentials",
//   });
//   if (!res.ok) throw new Error(`QA token ${res.status}: ${await res.text()}`);
//   return res.json();
// }

// async function getK8Token() {
//   const encoded = Buffer.from(`${CLIENT_ID}:${SECRET_KEY}`).toString("base64");
//   const res = await fetch(`${K8_TOKEN_URL}?grant_type=client_credentials`, {
//     method: "POST",
//     headers: {
//       Authorization: `Basic ${encoded}`,
//       "Content-Type": "application/x-www-form-urlencoded",
//     },
//     body: "grant_type=client_credentials",
//   });
//   if (!res.ok) throw new Error(`k8 token ${res.status}: ${await res.text()}`);
//   return res.json();
// }

// // ─── Wallet operations ────────────────────────────────────────────

// /**
//  * Create a wallet for a new player.
//  * Called once on first login from welcome/page.js.
//  */
// async function createWallet({ playerId, playerName, playerEmail }) {
//   const { access_token } = await getK8Token();
//   const res = await fetch(`${K8_WALLET_URL}/api/v1/wallet`, {
//     method: "POST",
//     headers: {
//       Authorization: `Bearer ${access_token}`,
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       name: `NBS-${playerId.slice(0, 8)}`,
//       merchantCode: MERCHANT_CODE,
//       status: "ACTIVE",
//       mobileNo: "07065871087", // test phone — valid format for sandbox
//       provider: "PRIME",
//       firstName: playerName || "Player",
//       pin: WALLET_PIN,
//       email: playerEmail || `${playerId}@nobeascam.com`,
//     }),
//   });
//   const data = await res.json();
//   if (!data.walletId)
//     throw new Error(`Wallet creation failed: ${JSON.stringify(data)}`);
//   return { walletId: data.walletId, virtualAccount: data.virtualAccount };
// }

// /**
//  * Top up a player wallet using WalletPay initialize.
//  * Converts points to wallet balance (1pt = 1 unit in minor currency).
//  * Must be called BEFORE debitWallet.
//  */
// async function topupWallet({ walletId, amount, reference }) {
//   const { access_token } = await getQAToken();
//   const res = await fetch(`${QA_COLLECTIONS}/api/v2/wallet-pay/initialize`, {
//     method: "POST",
//     headers: {
//       Authorization: `Bearer ${access_token}`,
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       amount: amount, // in minor units e.g. 70
//       provider: "MWALLET",
//       walletId: walletId,
//       pin: WALLET_PIN,
//       merchantCode: MERCHANT_CODE,
//       payableCode: PAYABLE_CODE,
//       transactionReference: reference || `NBS-TOPUP-${Date.now()}`,
//       currencyCode: "566",
//     }),
//   });
//   const data = await res.json();
//   const success = data.responseCode === "00";
//   return {
//     success,
//     responseCode: data.responseCode,
//     reference: data.transactionReference,
//     data,
//   };
// }

// /**
//  * Debit a player wallet for a shop purchase.
//  * Called after topupWallet succeeds.
//  */
// async function debitWallet({ walletId, amount, reference, narration }) {
//   const { access_token } = await getK8Token();
//   const res = await fetch(`${K8_WALLET_URL}/api/v1/transaction/transact`, {
//     method: "POST",
//     headers: {
//       Authorization: `Bearer ${access_token}`,
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       walletId,
//       amount: String(amount),
//       pin: WALLET_PIN,
//       reference: reference || `NBS-DEBIT-${Date.now()}`,
//       transactionCode: "api-charge",
//       narration: narration || "NoBeScam shop purchase",
//     }),
//   });
//   const data = await res.json();
//   const success = data.responseCode === "00";
//   return {
//     success,
//     responseCode: data.responseCode,
//     reference: data.reference,
//     data,
//   };
// }

// /**
//  * Get wallet balance.
//  */
// async function getBalance({ walletId }) {
//   const { access_token } = await getK8Token();
//   const res = await fetch(
//     `${K8_WALLET_URL}/api/v1/wallet/balance/${MERCHANT_CODE}?walletId=${walletId}`,
//     { headers: { Authorization: `Bearer ${access_token}` } },
//   );
//   return res.json();
// }

// // ─── Route handler ────────────────────────────────────────────────
// export async function POST(request) {
//   if (!CLIENT_ID || !SECRET_KEY) {
//     return NextResponse.json(
//       { success: false, error: "Interswitch credentials not configured" },
//       { status: 500 },
//     );
//   }

//   try {
//     const body = await request.json();
//     const { action } = body;

//     if (action === "token") {
//       const data = await getQAToken();
//       console.log("[DEV] QA TOKEN:", data.access_token);
//       return NextResponse.json({
//         success: true,
//         expires_in: data.expires_in,
//         merchant_code: data.merchant_code,
//       });
//     }

//     if (action === "k8token") {
//       const data = await getK8Token();
//       console.log("[DEV] K8 TOKEN:", data.access_token);
//       return NextResponse.json({
//         success: true,
//         expires_in: data.expires_in,
//         merchant_code: data.merchant_code,
//       });
//     }

//     if (action === "createWallet") {
//       const data = await createWallet(body);
//       return NextResponse.json({ success: true, ...data });
//     }

//     if (action === "topupWallet") {
//       const data = await topupWallet(body);
//       return NextResponse.json(data);
//     }

//     if (action === "debitWallet") {
//       const data = await debitWallet(body);
//       return NextResponse.json(data);
//     }

//     if (action === "getBalance") {
//       const data = await getBalance(body);
//       return NextResponse.json(data);
//     }

//     return NextResponse.json(
//       { success: false, error: "Unknown action" },
//       { status: 400 },
//     );
//   } catch (err) {
//     console.error("[/api/interswitch]", err.message);
//     return NextResponse.json(
//       { success: false, error: err.message },
//       { status: 500 },
//     );
//   }
// }

/**
 * app/api/interswitch/route.js
 * Proxy for Interswitch calls. Uses active merchant code MX275862.
 */
import { NextResponse } from "next/server";

const CLIENT_ID = process.env.INTERSWITCH_CLIENT_ID;
const SECRET_KEY = process.env.INTERSWITCH_SECRET_KEY;
const MERCHANT_CODE = process.env.INTERSWITCH_MERCHANT_CODE || "MX275862";
const WALLET_PIN = process.env.INTERSWITCH_WALLET_PIN || "1234";
const IS_MOCK = process.env.NEXT_PUBLIC_INTERSWITCH_ENABLED !== "true";

const K8_TOKEN_URL = "https://passport-v2.k8.isw.la/passport/oauth/token";
const K8_WALLET_URL = "https://merchant-wallet.k8.isw.la/merchant-wallet";

async function getK8Token() {
  const encoded = Buffer.from(`${CLIENT_ID}:${SECRET_KEY}`).toString("base64");
  const res = await fetch(`${K8_TOKEN_URL}?grant_type=client_credentials`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${encoded}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
  });
  return res.json();
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { action, walletId, amount } = body;

    // --- MOCK MODE HANDLING ---
    if (IS_MOCK) {
      return NextResponse.json({
        success: true,
        reference: `MOCK-TXN-${Date.now()}`,
        message: "Successful (Mock Mode enabled)",
      });
    }

    // --- REAL INTERSWITCH DEBIT ---
    if (action === "debitWallet") {
      const { access_token } = await getK8Token();
      const res = await fetch(`${K8_WALLET_URL}/api/v1/transaction/transact`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${access_token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          walletId,
          amount: String(amount * 100),
          pin: WALLET_PIN,
          reference: `NBS-DEBIT-${Date.now()}`,
          transactionCode: "api-charge",
          narration: "NoBeScam Life Purchase",
        }),
      });
      const data = await res.json();
      return NextResponse.json({
        success: data.responseCode === "00",
        ...data,
      });
    }

    // --- CREATE WALLET ---
    if (action === "createWallet") {
      const { access_token } = await getK8Token();
      const res = await fetch(`${K8_WALLET_URL}/api/v1/wallet`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${access_token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: `NBS-${body.playerId.slice(0, 8)}`,
          merchantCode: MERCHANT_CODE,
          status: "ACTIVE",
          mobileNo: "07065871087",
          provider: "PRIME",
          firstName: body.playerName || "Player",
          pin: WALLET_PIN,
          email: body.playerEmail,
        }),
      });
      const data = await res.json();
      return NextResponse.json({ success: !!data.walletId, ...data });
    }

    return NextResponse.json(
      { success: false, error: "Action not handled" },
      { status: 400 },
    );
  } catch (err) {
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 },
    );
  }
}
