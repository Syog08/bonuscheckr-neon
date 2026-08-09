"use client";

/**
 * LiveVerdictCard v2
 * Adds two things the v2 analyser now returns:
 *  - confidence badge (AI-uncertainty UX: LOW is shown as a caution, not hidden)
 *  - an EV "hero" band — Expected Value is the number that makes BonusCheckr different
 *    from every listicle competitor, so it gets promoted out of the KPI grid.
 * Fully backward-compatible: if confidence / evPercent are missing (old API), it
 * degrades to the previous layout.
 */

interface Stat {
  value: string;
  label: string;
  severity: "low" | "medium" | "high";
}

interface Trap {
  severity: "low" | "medium" | "high";
  title: string;
  detail: string;
}

interface AnalysisResult {
  verdictTitle: string;
  verdictType: "good" | "fair" | "risky" | "avoid";
  score: number;
  summary: string;
  confidence?: "low" | "medium" | "high";
  evPercent?: number | null;
  stats: {
    wagering?: Stat;
    maxCashout?: Stat;
    maxBet?: Stat;
    ev?: Stat;
  };
  traps: Trap[];
  positives: string[];
}

interface LiveVerdictCardProps {
  result: AnalysisResult;
}

const VERDICT_CONFIG = {
  good: { label: "GOOD BONUS", color: "text-emerald-400", bg: "bg-emerald-400/10", border: "border-emerald-400/30" },
  fair: { label: "FAIR BONUS", color: "text-yellow-400", bg: "bg-yellow-400/10", border: "border-yellow-400/30" },
  risky: { label: "RISKY BONUS", color: "text-orange-400", bg: "bg-orange-400/10", border: "border-orange-400/30" },
  avoid: { label: "AVOID", color: "text-red-400", bg: "bg-red-400/10", border: "border-red-400/30" },
};

const SEVERITY_COLORS = {
  low: { text: "text-emerald-400", dot: "bg-emerald-400" },
  medium: { text: "text-yellow-400", dot: "bg-yellow-400" },
  high: { text: "text-red-400", dot: "bg-red-400" },
};

const CONFIDENCE_CONFIG = {
  high: { label: "HIGH CONFIDENCE", color: "text-emerald-400/80", note: "" },
  medium: { label: "MEDIUM CONFIDENCE", color: "text-yellow-400/80", note: "" },
  low: { label: "LOW CONFIDENCE", color: "text-orange-400/90", note: "Some key terms were missing — double-check the full T&Cs." },
};

// Colour the EV number by how bad it is.
function evColor(ev: number): string {
  if (ev >= -5) return "text-emerald-400";
  if (ev >= -15) return "text-yellow-400";
  if (ev >= -30) return "text-orange-400";
  return "text-red-400";
}

export default function LiveVerdictCard({ result }: LiveVerdictCardProps) {
  const verdict = VERDICT_CONFIG[result.verdictType] ?? VERDICT_CONFIG.fair;
  const confidence = result.confidence ? CONFIDENCE_CONFIG[result.confidence] : null;
  const hasEV = typeof result.evPercent === "number";

  // EV is now the hero, so keep it out of the KPI grid to avoid duplication.
  const stats = [result.stats?.wagering, result.stats?.maxCashout, result.stats?.maxBet].filter(
    (s): s is Stat => !!s
  );

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-white/10">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span
                className={`inline-block text-xs font-bold tracking-widest px-2 py-1 rounded-full ${verdict.bg} ${verdict.color} ${verdict.border} border`}
              >
                {verdict.label}
              </span>
              {confidence && (
                <span className={`text-[10px] font-bold tracking-widest ${confidence.color}`}>
                  {confidence.label}
                </span>
              )}
            </div>
            <h3 className="text-xl font-bold text-white">{result.verdictTitle}</h3>
            <p className="text-white/60 text-sm mt-2 leading-relaxed">{result.summary}</p>
            {confidence?.note && (
              <p className="text-orange-400/70 text-xs mt-2">{confidence.note}</p>
            )}
          </div>
          <div className="shrink-0 text-center">
            <div className={`text-4xl font-black ${verdict.color}`}>
              {typeof result.score === "number" ? result.score.toFixed(1) : result.score}
            </div>
            <div className="text-white/40 text-xs">/ 10</div>
          </div>
        </div>
      </div>

      {/* EV hero band */}
      {hasEV && (
        <div className="px-6 py-5 border-b border-white/10 bg-[#0f0f1a]/60">
          <div className="flex items-baseline justify-between gap-4">
            <div>
              <div className="text-white/40 text-xs uppercase tracking-widest mb-1">
                Real Expected Value
              </div>
              <div className="text-white/50 text-xs max-w-md leading-relaxed">
                What you would statistically expect to keep (or lose) clearing this bonus. Computed, not guessed.
              </div>
            </div>
            <div className={`text-4xl font-black tabular-nums ${evColor(result.evPercent as number)}`}>
              {(result.evPercent as number) > 0 ? "+" : ""}
              {(result.evPercent as number).toFixed(0)}%
            </div>
          </div>
        </div>
      )}

      {/* KPI Grid */}
      {stats.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-px bg-white/10">
          {stats.map((stat) => {
            const colors = SEVERITY_COLORS[stat.severity] ?? SEVERITY_COLORS.medium;
            return (
              <div key={stat.label} className="bg-[#0f0f1a] p-4">
                <div className="text-white/40 text-xs mb-1">{stat.label}</div>
                <div className={`text-lg font-bold ${colors.text}`}>{stat.value}</div>
              </div>
            );
          })}
        </div>
      )}

      {/* Traps */}
      {Array.isArray(result.traps) && result.traps.length > 0 && (
        <div className="p-6 border-t border-white/10">
          <h4 className="text-white/50 text-xs font-bold tracking-widest uppercase mb-4">Watch Out For</h4>
          <div className="space-y-3">
            {result.traps.map((trap, i) => {
              const colors = SEVERITY_COLORS[trap.severity] ?? SEVERITY_COLORS.medium;
              return (
                <div key={i} className="flex gap-3">
                  <div className={`mt-1.5 shrink-0 w-2 h-2 rounded-full ${colors.dot}`} />
                  <div>
                    <span className="text-white font-semibold text-sm">{trap.title}</span>
                    <span className="text-white/50 text-sm"> — {trap.detail}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Positives */}
      {Array.isArray(result.positives) && result.positives.length > 0 && (
        <div className="p-6 border-t border-white/10">
          <h4 className="text-white/50 text-xs font-bold tracking-widest uppercase mb-4">What Works</h4>
          <div className="space-y-2">
            {result.positives.map((positive, i) => (
              <div key={i} className="flex gap-3">
                <div className="mt-1.5 shrink-0 w-2 h-2 rounded-full bg-emerald-400" />
                <span className="text-white/70 text-sm">{positive}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
