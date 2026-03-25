/**
 * app/api/interswitch/route.js
 * Proxy for Interswitch calls. Uses active merchant code MX275862.
 */
import { error } from "console";
import { NextResponse } from "next/server";

const CLIENT_ID = process.env.INTERSWITCH_CLIENT_ID;
const SECRET_KEY = process.env.INTERSWITCH_SECRET_KEY;
const MERCHANT_CODE = process.env.INTERSWITCH_MERCHANT_CODE || "MX275862";
const WALLET_PIN = process.env.INTERSWITCH_WALLET_PIN || "1234";
const IS_MOCK = process.env.NEXT_PUBLIC_INTERSWITCH_ENABLED !== "true";

const K8_TOKEN_URL = "https://passport-v2.k8.isw.la/passport/oauth/token";
const K8_WALLET_URL = "https://merchant-wallet.k8.isw.la/merchant-wallet";

// Marketplace/CAC typically uses the QA or Production Passport URL
const QA_TOKEN_URL = "https://qa.interswitchng.com/passport/oauth/token";
const CAC_API_URL = "https://qa.interswitchng.com/api/v1/cac/companies"; // Standard Marketplace Path

// Marketplace K8 Sandbox URL from your documentation
const MARKETPLACE_URL =
  "https://api-marketplace-routing.k8.isw.la/marketplace-routing";

async function getMarketplaceToken() {
  const encoded = Buffer.from(`${CLIENT_ID}:${SECRET_KEY}`).toString("base64");
  const res = await fetch(`${QA_TOKEN_URL}?grant_type=client_credentials`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${encoded}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
  });
  return res.json();
}

async function verifyCAC(searchTerm) {
  try {
    // Sandbox Marketplace uses the K8 Passport token
    const { access_token } = await getK8Token();

    // Construct URL with query parameter as shown in image_968b89.png
    const url = `${MARKETPLACE_URL}/api/v1/verify/identity/cac-lookup?companyName=${encodeURIComponent(searchTerm)}`;

    const res = await fetch(url, {
      method: "GET", // Documentation specifies GET
      headers: {
        Authorization: `Bearer ${access_token}`,
        "Content-Type": "application/json",
      },
    });

    const result = await res.json();

    if (!res.ok) {
      return {
        success: false,
        status: res.status,
        error: errorText,
        message: result.message || "Verification failed",
        isSandboxError: res.status === 409, // Identifies sandbox credential issues
      };
    }

    return { success: true, companies: result.data || [] };
  } catch (err) {
    return { success: false, error: err.message };
  }
}

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
    const { action, searchTerm, walletId, amount } = body;

    // --- NEW: CAC VERIFICATION ---
    if (action === "verifyMerchant") {
      const result = await verifyCAC(searchTerm);
      return NextResponse.json(result);
    }

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
