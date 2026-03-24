// /**
//  * Supabase Client — Modern SSR setup using @supabase/ssr
//  * No demo mode — all operations require real credentials.
//  *
//  * Column mapping (matches schema.sql exactly):
//  *   character_id   — 'chinedu' | 'omotola'
//  *   character_name — 'Chinedu' | 'Omotola'
//  *   business_type  — 'food_vendor' | 'sportswear' | 'palm_wine'
//  */

// import { createBrowserClient as _createBrowserClient } from "@supabase/ssr";

// const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
// const SUPABASE_ANON = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// if (!SUPABASE_URL || !SUPABASE_ANON) {
//   throw new Error(
//     "[NoBeScam] NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY " +
//       "must be set in .env.local",
//   );
// }

// // ─── Browser client singleton ─────────────────────────────────────
// export function createBrowserClient() {
//   return _createBrowserClient(SUPABASE_URL, SUPABASE_ANON);
// }

// export const supabase = createBrowserClient();

// // ─── Auth helpers ─────────────────────────────────────────────────

// export async function signInWithEmail(email, password) {
//   return supabase.auth.signInWithPassword({ email, password });
// }

// export async function signUpWithEmail(email, password) {
//   return supabase.auth.signUp({ email, password });
// }

// export async function signOut() {
//   return supabase.auth.signOut();
// }

// export async function getSession() {
//   const {
//     data: { session },
//   } = await supabase.auth.getSession();
//   return session;
// }

// // Server-validated — use for security-sensitive checks
// export async function getUser() {
//   const {
//     data: { user },
//   } = await supabase.auth.getUser();
//   return user;
// }

// // ─── User profile ─────────────────────────────────────────────────

// /**
//  * Write onboarding profile on first login.
//  * Plain upsert — onConflict:'id' updates in place on return visit.
//  */
// export async function createUserProfile(
//   userId,
//   character,
//   business,
//   email,
//   walletId = null,
// ) {
//   const { error } = await supabase.from("users").upsert(
//     {
//       id: userId,
//       email,
//       character_id: character.id,
//       character_name: character.name,
//       business_type: business.id,
//       ...(walletId ? { wallet_id: walletId } : {}),
//     },
//     { onConflict: "id" },
//   );
//   if (error) console.error("[createUserProfile]", error);
//   return { error };
// }

// export async function getUserProfile(userId) {
//   const { data, error } = await supabase
//     .from("users")
//     .select("*")
//     .eq("id", userId)
//     .single();
//   return { data, error };
// }

// /**
//  * Update aggregate user stats after a game session.
//  * Uses MAX logic for highest_score — never overwrites a better score.
//  * Accumulates total_correct and total_wrong across all sessions.
//  */
// export async function updateUserStats(
//   userId,
//   { score, level, totalCorrect, totalWrong },
// ) {
//   // 1. Fetch current stats first
//   const { data: current, error: fetchError } = await supabase
//     .from("users")
//     .select("highest_score, total_correct, total_wrong")
//     .eq("id", userId)
//     .single();

//   if (fetchError) {
//     console.error("[updateUserStats] fetch error:", fetchError);
//     return { error: fetchError };
//   }

//   // 2. Compute new values
//   const newHighest = Math.max(score, current?.highest_score ?? 0);
//   const newTotalCorrect = (current?.total_correct ?? 0) + totalCorrect;
//   const newTotalWrong = (current?.total_wrong ?? 0) + totalWrong;

//   // 3. Write
//   const { data, error } = await supabase
//     .from("users")
//     .update({
//       highest_score: newHighest,
//       current_level: level,
//       total_correct: newTotalCorrect,
//       total_wrong: newTotalWrong,
//       updated_at: new Date().toISOString(),
//     })
//     .eq("id", userId)
//     .select()
//     .single();

//   if (error) console.error("[updateUserStats] update error:", error);
//   return { data, error };
// }

// // ─── Game sessions ────────────────────────────────────────────────

// export async function saveGameSession(sessionData) {
//   const { data, error } = await supabase
//     .from("user_sessions")
//     .insert(sessionData)
//     .select()
//     .single();
//   if (error) console.error("[saveGameSession]", error);
//   return { data, error };
// }

// export async function getUserSessions(userId, limit = 10) {
//   const { data, error } = await supabase
//     .from("user_sessions")
//     .select("*")
//     .eq("user_id", userId)
//     .order("timestamp", { ascending: false })
//     .limit(limit);
//   return { data, error };
// }

// // ─── Answer tracking ─────────────────────────────────────────────

// /**
//  * Save a single answer immediately.
//  * Used only for the level-up answer (where we return early from handleAnswer).
//  */
// export async function saveUserAnswer(answerData) {
//   const { data, error } = await supabase
//     .from("user_answers")
//     .insert(answerData)
//     .select()
//     .single();
//   if (error) console.error("[saveUserAnswer]", error);
//   return { data, error };
// }

// /**
//  * Flush a batch of queued answers in a single INSERT.
//  * Called every 5 answers during play, and always on game over.
//  * Returns silently on empty queue.
//  *
//  * Each answer shape:
//  * {
//  *   user_id:         string,
//  *   scenario_id:     number,
//  *   selected_answer: 'scam' | 'safe',
//  *   correct:         boolean,
//  *   response_time:   number (ms),
//  *   level_at_answer: number,   ← new: level when answered
//  *   business_type:   string,   ← new: for analytics
//  * }
//  */
// export async function batchSaveAnswers(answers) {
//   if (!answers || answers.length === 0) return { error: null };

//   const { error } = await supabase.from("user_answers").insert(answers);

//   if (error) console.error("[batchSaveAnswers]", error);
//   return { error };
// }

// // ─── Leaderboard ─────────────────────────────────────────────────

// export async function getLeaderboard(limit = 10) {
//   const { data, error } = await supabase
//     .from("users")
//     .select("character_name, business_type, highest_score, current_level")
//     .order("highest_score", { ascending: false })
//     .limit(limit);
//   return { data, error };
// }

/**
 * Supabase Client — Client-safe (no singleton, SSR-safe usage)
 */

import { createBrowserClient } from "@supabase/ssr";

// ─── Env ──────────────────────────────────────────────────────────

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !SUPABASE_ANON) {
  console.warn(
    "[NoBeScam] Missing Supabase env vars. Check NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY",
  );
}

// ─── Factory (NO SINGLETON) ────────────────────────────────────────

export function getSupabaseClient() {
  return createBrowserClient(SUPABASE_URL, SUPABASE_ANON);
}

// ─── Auth helpers ─────────────────────────────────────────────────

export async function signInWithEmail(email, password) {
  const supabase = getSupabaseClient();
  return supabase.auth.signInWithPassword({ email, password });
}

export async function signUpWithEmail(email, password) {
  const supabase = getSupabaseClient();
  return supabase.auth.signUp({ email, password });
}

export async function signOut() {
  const supabase = getSupabaseClient();
  return supabase.auth.signOut();
}

export async function getSession() {
  const supabase = getSupabaseClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();
  return session;
}

export async function getUser() {
  const supabase = getSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
}

// ─── User profile ─────────────────────────────────────────────────

export async function createUserProfile(
  userId,
  character,
  business,
  email,
  walletId = null,
) {
  const supabase = getSupabaseClient();

  const { error } = await supabase.from("users").upsert(
    {
      id: userId,
      email,
      character_id: character.id,
      character_name: character.name,
      business_type: business.id,
      ...(walletId ? { wallet_id: walletId } : {}),
    },
    { onConflict: "id" },
  );

  if (error) console.error("[createUserProfile]", error);
  return { error };
}

export async function getUserProfile(userId) {
  const supabase = getSupabaseClient();

  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("id", userId)
    .single();

  return { data, error };
}

// ─── Stats ────────────────────────────────────────────────────────

export async function updateUserStats(
  userId,
  { score, level, totalCorrect, totalWrong },
) {
  const supabase = getSupabaseClient();

  const { data: current, error: fetchError } = await supabase
    .from("users")
    .select("highest_score, total_correct, total_wrong")
    .eq("id", userId)
    .single();

  if (fetchError) {
    console.error("[updateUserStats] fetch error:", fetchError);
    return { error: fetchError };
  }

  const newHighest = Math.max(score, current?.highest_score ?? 0);
  const newTotalCorrect = (current?.total_correct ?? 0) + totalCorrect;
  const newTotalWrong = (current?.total_wrong ?? 0) + totalWrong;

  const { data, error } = await supabase
    .from("users")
    .update({
      highest_score: newHighest,
      current_level: level,
      total_correct: newTotalCorrect,
      total_wrong: newTotalWrong,
      updated_at: new Date().toISOString(),
    })
    .eq("id", userId)
    .select()
    .single();

  if (error) console.error("[updateUserStats] update error:", error);
  return { data, error };
}

// ─── Sessions ─────────────────────────────────────────────────────

export async function saveGameSession(sessionData) {
  const supabase = getSupabaseClient();

  const { data, error } = await supabase
    .from("user_sessions")
    .insert(sessionData)
    .select()
    .single();

  if (error) console.error("[saveGameSession]", error);
  return { data, error };
}

export async function getUserSessions(userId, limit = 10) {
  const supabase = getSupabaseClient();

  const { data, error } = await supabase
    .from("user_sessions")
    .select("*")
    .eq("user_id", userId)
    .order("timestamp", { ascending: false })
    .limit(limit);

  return { data, error };
}

// ─── Answers ──────────────────────────────────────────────────────

export async function saveUserAnswer(answerData) {
  const supabase = getSupabaseClient();

  const { data, error } = await supabase
    .from("user_answers")
    .insert(answerData)
    .select()
    .single();

  if (error) console.error("[saveUserAnswer]", error);
  return { data, error };
}

export async function batchSaveAnswers(answers) {
  if (!answers || answers.length === 0) return { error: null };

  const supabase = getSupabaseClient();

  const { error } = await supabase.from("user_answers").insert(answers);

  if (error) console.error("[batchSaveAnswers]", error);
  return { error };
}

// ─── Leaderboard ─────────────────────────────────────────────────

export async function getLeaderboard(limit = 10) {
  const supabase = getSupabaseClient();

  const { data, error } = await supabase
    .from("users")
    .select("character_name, business_type, highest_score, current_level")
    .order("highest_score", { ascending: false })
    .limit(limit);

  return { data, error };
}
