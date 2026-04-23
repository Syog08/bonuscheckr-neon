"use client";

import { useState } from "react";
import LiveVerdictCard from "./LiveVerdictCard";

interface AnalysisResult {
  verdictTitle: string;
  verdictType: "good" | "fair" | "risky" | "avoid";
  score: number;
  summary: string;
  stats: {
    wagering: { value: string; label: string; severity: "low" | "medium" | "high" };
    maxCashout: { value: string; label: string; severity: "low" | "medium" | "high" };
    maxBet: { value: string; label: string; severity: "low" | "medium" | "high" };
    ev: { value: string; label: string; severity: "low" | "medium" | "high" };
  };
  traps: { severity: "low" | "medium" | "high"; title: string; detail: string }[];
  positives: string[];
}

export default function BonusAnalyser() {
  const [terms, setTerms] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<AnalysisResult | null>(null);

  async function handleAnalyse() {
    if (terms.trim().length < 10) return;
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const res = await fetch("/api/analyse", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ terms }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Something went wrong. Please try again.");
        return;
      }
      setResult(data);
    } catch {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  }

  function handleReset() {
    setTerms("");
    setResult(null);
    setError(null);
  }

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
      <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-6 space-y-4">
        <div>
          <label className="text-white font-semibold text-sm block mb-1">
            Paste Bonus Terms
          </label>
          <p className="text-white/40 text-xs mb-3">
            Copy the T&Cs from any casino bonus page and paste them below.
          </p>
          <textarea
            value={terms}
            onChange={(e) => setTerms(e.target.value)}
            placeholder="e.g. 100% match up to 200. 35x wagering on bonus. Max bet 5. Games excluded: live casino, jackpots..."
            rows={7}
            className="w-full rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/20 text-sm p-4 resize-none focus:outline-none focus:border-white/30 transition-colors"
          />
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handleAnalyse}
            disabled={loading || terms.trim().length < 10}
            className="flex-1 rounded-xl bg-violet-600 hover:bg-violet-500 disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold text-sm py-3 transition-colors"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                </svg>
                Analysing…
              </span>
            ) : (
              "Analyse Bonus"
            )}
          </button>
          {(result || error) && (
            <button
              onClick={handleReset}
              className="px-4 py-3 rounded-xl border border-white/10 text-white/50 hover:text-white hover:border-white/30 text-sm font-medium transition-colors"
            >
              Reset
            </button>
          )}
        </div>
      </div>
      {error && (
        <div className="rounded-xl border border-red-400/30 bg-red-400/10 p-4 text-red-400 text-sm">
          {error}
        </div>
      )}
      {result && <LiveVerdictCard result={result} />}
    </div>
  );
}
