/**
 * Artifact: lib/interswitchClient.js
 * FIXED: Updated to use getSupabaseClient() factory to resolve build error.
 */
import { getSupabaseClient } from "./supabaseClient";

export async function purchaseLife({ userId, walletId, costInPoints }) {
  try {
    const supabase = getSupabaseClient(); // ✅ Instantiate per call

    // 1. Manual Funding
    const { error: dbError } = await supabase
      .from("users")
      .update({ wallet_balance: costInPoints })
      .eq("id", userId);

    if (dbError) throw new Error(`Manual funding failed: ${dbError.message}`);

    // 2. Debit call via proxy
    const debitRes = await fetch("/api/interswitch", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
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

export async function createPlayerWallet({
  playerId,
  playerName,
  playerEmail,
}) {
  const res = await fetch("/api/interswitch", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      action: "createWallet",
      playerId,
      playerName,
      playerEmail,
    }),
  });
  return res.json();
}
