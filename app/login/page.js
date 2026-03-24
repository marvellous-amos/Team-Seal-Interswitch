// "use client";
// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import { motion } from "framer-motion";
// import { supabase } from "../../lib/supabaseClient";

// const isSupabaseConfigured =
//   process.env.NEXT_PUBLIC_SUPABASE_URL &&
//   process.env.NEXT_PUBLIC_SUPABASE_URL !== "https://placeholder.supabase.co";

// export default function LoginPage() {
//   const router = useRouter();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [isSignUp, setIsSignUp] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [message, setMessage] = useState(null);

//   async function handleAuth(e) {
//     e.preventDefault();
//     setLoading(true);
//     setError(null);
//     setMessage(null);

//     if (!isSupabaseConfigured) {
//       localStorage.setItem(
//         "nbs_demo_user",
//         JSON.stringify({ email, id: "demo-user-001" }),
//       );
//       router.push("/welcome");
//       return;
//     }

//     try {
//       if (isSignUp) {
//         const { error } = await supabase.auth.signUp({ email, password });
//         if (error) throw error;
//         setMessage("Check your email for the confirmation link!");
//       } else {
//         const { error } = await supabase.auth.signInWithPassword({
//           email,
//           password,
//         });
//         if (error) throw error;
//         router.push("/welcome");
//       }
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   }

//   function handleDemoPlay() {
//     localStorage.setItem(
//       "nbs_demo_user",
//       JSON.stringify({ email: "demo@nobe.scam", id: "demo-user-001" }),
//     );
//     router.push("/welcome");
//   }

//   return (
//     <div className="min-h-screen bg-bg-base flex flex-col items-center justify-center px-4">
//       {/* Nigerian flag top stripe */}
//       <div className="fixed top-0 left-0 right-0 h-1.5 flex z-50">
//         <div className="flex-1 bg-brand" />
//         <div className="flex-1 bg-bg-base border-y border-ink-300" />
//         <div className="flex-1 bg-brand" />
//       </div>

//       <motion.div
//         initial={{ opacity: 0, y: 24 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5 }}
//         className="w-full max-w-sm"
//       >
//         {/* Logo */}
//         <div className="text-center mb-8">
//           <motion.div
//             initial={{ scale: 0.5, rotate: -20 }}
//             animate={{ scale: 1, rotate: 0 }}
//             transition={{
//               type: "spring",
//               stiffness: 200,
//               damping: 14,
//               delay: 0.1,
//             }}
//             className="text-6xl mb-3 inline-block"
//           >
//             🛡️
//           </motion.div>
//           <h1
//             className="text-4xl font-black text-ink-900 tracking-tight"
//             style={{ fontFamily: "Nunito, sans-serif" }}
//           >
//             NoBeScam
//           </h1>
//           <p className="text-ink-500 text-sm mt-1">
//             Protect Your Business · Outsmart The Fraudsters
//           </p>
//         </div>

//         {/* Card */}
//         <div className="card p-6">
//           <h2
//             className="text-lg font-black text-ink-900 mb-5"
//             style={{ fontFamily: "Nunito, sans-serif" }}
//           >
//             {isSignUp ? "Create Account" : "Welcome Back"}
//           </h2>

//           {/* Demo mode notice */}
//           {!isSupabaseConfigured && (
//             <div className="mb-4 p-3 bg-gold-light border border-gold-border rounded-lg">
//               <p className="text-gold-text text-xs font-semibold">
//                 ⚡ Demo Mode — Supabase not configured. Progress won't be saved.
//               </p>
//             </div>
//           )}

//           <form onSubmit={handleAuth} className="space-y-4">
//             <div>
//               <label className="block text-ink-700 text-xs font-bold mb-1.5 uppercase tracking-wider">
//                 Email
//               </label>
//               <input
//                 type="email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 required
//                 placeholder="you@example.com"
//                 className="w-full bg-bg-sunken border-2 border-ink-300 rounded-lg px-4 py-3 text-ink-900 placeholder-ink-500 focus:outline-none focus:border-brand transition-colors text-sm font-medium"
//               />
//             </div>
//             <div>
//               <label className="block text-ink-700 text-xs font-bold mb-1.5 uppercase tracking-wider">
//                 Password
//               </label>
//               <input
//                 type="password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 required
//                 placeholder="••••••••"
//                 className="w-full bg-bg-sunken border-2 border-ink-300 rounded-lg px-4 py-3 text-ink-900 placeholder-ink-500 focus:outline-none focus:border-brand transition-colors text-sm font-medium"
//               />
//             </div>

//             {error && (
//               <motion.div
//                 initial={{ opacity: 0, y: -8 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 className="p-3 bg-danger-bg border-2 border-danger-border rounded-lg"
//               >
//                 <p className="text-danger-text text-sm font-semibold">
//                   {error}
//                 </p>
//               </motion.div>
//             )}
//             {message && (
//               <motion.div
//                 initial={{ opacity: 0, y: -8 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 className="p-3 bg-safe-bg border-2 border-safe-border rounded-lg"
//               >
//                 <p className="text-safe-text text-sm font-semibold">
//                   {message}
//                 </p>
//               </motion.div>
//             )}

//             <motion.button
//               type="submit"
//               disabled={loading}
//               whileTap={{ scale: 0.97 }}
//               className="btn-primary w-full text-base disabled:opacity-50 disabled:cursor-not-allowed"
//             >
//               {loading
//                 ? "Loading..."
//                 : isSignUp
//                   ? "Create Account"
//                   : "Sign In & Play"}
//             </motion.button>
//           </form>

//           <div className="mt-4 text-center">
//             <button
//               onClick={() => {
//                 setIsSignUp(!isSignUp);
//                 setError(null);
//                 setMessage(null);
//               }}
//               className="text-ink-500 text-sm hover:text-brand transition-colors font-medium"
//             >
//               {isSignUp
//                 ? "Already have an account? Sign in"
//                 : "Don't have an account? Sign up"}
//             </button>
//           </div>

//           <div className="duo-divider my-5" />

//           <motion.button
//             onClick={handleDemoPlay}
//             whileTap={{ scale: 0.97 }}
//             className="btn-neutral w-full text-sm"
//           >
//             🎮 Play Without Account
//           </motion.button>
//         </div>

//         <p className="text-center text-ink-500 text-xs mt-5">
//           No real money. No real transactions. Educational only.
//         </p>
//       </motion.div>
//     </div>
//   );
// }

"use client";
/**
 * Login page — strict auth only.
 * Handles sign-in, sign-up, email confirmation messaging,
 * and post-login redirect (passed as ?redirect= query param by middleware).
 */
export const dynamic = "force-dynamic";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { signInWithEmail, signUpWithEmail } from "../../lib/supabaseClient";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirect") || "/welcome";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  async function handleAuth(e) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);

    try {
      if (isSignUp) {
        const { error } = await signUpWithEmail(email, password);
        if (error) throw error;
        setMessage(
          "Account created! Check your email for a confirmation link, then sign in.",
        );
      } else {
        const { error } = await signInWithEmail(email, password);
        if (error) throw error;
        router.push(redirectTo);
      }
    } catch (err) {
      // Surface friendly messages for common Supabase error codes
      const msg = err.message || "Something went wrong. Please try again.";
      setError(
        msg.includes("Invalid login credentials")
          ? "Incorrect email or password."
          : msg.includes("Email not confirmed")
            ? "Please confirm your email address before signing in."
            : msg,
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-bg-base flex flex-col items-center justify-center px-4">
      {/* Nigerian flag stripe */}
      <div className="fixed top-0 left-0 right-0 h-1.5 flex z-50">
        <div className="flex-1 bg-brand" />
        <div className="flex-1 bg-bg-base border-y border-ink-300" />
        <div className="flex-1 bg-brand" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="w-full max-w-sm"
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0.5, rotate: -20 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 14,
              delay: 0.1,
            }}
            className="text-6xl mb-3 inline-block"
          >
            🛡️
          </motion.div>
          <h1
            className="text-4xl font-black text-ink-900 tracking-tight"
            style={{ fontFamily: "Nunito, sans-serif" }}
          >
            NoBeScam
          </h1>
          <p className="text-ink-500 text-sm mt-1">
            Protect Your Business · Outsmart The Fraudsters
          </p>
        </div>

        {/* Card */}
        <div className="card p-6">
          <h2
            className="text-lg font-black text-ink-900 mb-5"
            style={{ fontFamily: "Nunito, sans-serif" }}
          >
            {isSignUp ? "Create Account" : "Welcome Back"}
          </h2>

          <form onSubmit={handleAuth} className="space-y-4">
            <div>
              <label className="block text-ink-700 text-xs font-bold mb-1.5 uppercase tracking-wider">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="you@example.com"
                className="w-full bg-bg-sunken border-2 border-ink-300 rounded-lg px-4 py-3 text-ink-900 placeholder-ink-500 focus:outline-none focus:border-brand transition-colors text-sm font-medium"
              />
            </div>

            <div>
              <label className="block text-ink-700 text-xs font-bold mb-1.5 uppercase tracking-wider">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                placeholder="••••••••"
                className="w-full bg-bg-sunken border-2 border-ink-300 rounded-lg px-4 py-3 text-ink-900 placeholder-ink-500 focus:outline-none focus:border-brand transition-colors text-sm font-medium"
              />
            </div>

            {/* Error */}
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="p-3 bg-danger-bg border-2 border-danger-border rounded-lg"
                >
                  <p className="text-danger-text text-sm font-semibold">
                    {error}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Success */}
            <AnimatePresence>
              {message && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="p-3 bg-safe-bg border-2 border-safe-border rounded-lg"
                >
                  <p className="text-safe-text text-sm font-semibold">
                    {message}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            <motion.button
              type="submit"
              disabled={loading}
              whileTap={{ scale: 0.97 }}
              className="btn-primary w-full text-base disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading
                ? "Please wait..."
                : isSignUp
                  ? "Create Account"
                  : "Sign In & Play"}
            </motion.button>
          </form>

          <div className="mt-4 text-center">
            <button
              onClick={() => {
                setIsSignUp(!isSignUp);
                setError(null);
                setMessage(null);
              }}
              className="text-ink-500 text-sm hover:text-brand transition-colors font-medium"
            >
              {isSignUp
                ? "Already have an account? Sign in"
                : "Don't have an account? Sign up"}
            </button>
          </div>
        </div>

        <p className="text-center text-ink-500 text-xs mt-5">
          No real money. No real transactions. Educational only.
        </p>
      </motion.div>
    </div>
  );
}
