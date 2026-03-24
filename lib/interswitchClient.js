/**
 * lib/interswitchClient.js
 *
 * Client-side helpers — all calls go through /api/interswitch.
 * Uses dynamic Supabase client (NO singleton).
 */

import { getSupabaseClient } from "./supabaseClient";

/**
 * Orchestrates the "Manual Fund then Debit" flow.
 */
export async function purchaseLife({ userId, walletId, costInPoints }) {
  try {
    const supabase = getSupabaseClient(); // ✅ instantiate per call

    // 1. Manual Funding: Update wallet balance
    const { error: dbError } = await supabase
      .from("users")
      .update({ wallet_balance: costInPoints })
      .eq("id", userId);

    if (dbError) {
      throw new Error(`Manual funding failed: ${dbError.message}`);
    }

    // 2. Debit via API proxy
    const debitRes = await fetch("/api/interswitch", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        action: "debitWallet",
        walletId: walletId || "MOCK_WALLET",
        amount: costInPoints,
      }),
    });

    return await debitRes.json();
  } catch (err) {
    console.error("[interswitchClient] Purchase Flow Error:", err);
    return { success: false, error: err.message };
  }
}

/**
 * Standard wallet creation proxy
 */
export async function createPlayerWallet({
  playerId,
  playerName,
  playerEmail,
}) {
  try {
    const res = await fetch("/api/interswitch", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        action: "createWallet",
        playerId,
        playerName,
        playerEmail,
      }),
    });

    return await res.json();
  } catch (err) {
    console.error("[interswitchClient] Wallet creation error:", err);
    return { success: false, error: err.message };
  }
}
