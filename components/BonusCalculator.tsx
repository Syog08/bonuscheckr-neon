"use client";

import { useMemo, useRef, useState } from "react";
import { track } from "@vercel/analytics";

type WagerBase = "bonus" | "deposit_bonus";
type BonusType = "non_sticky" | "sticky";

function money(n: number): string {
  const sign = n < 0 ? "-" : "";
  const abs = Math.abs(n);
  const small = abs < 100 && !Number.isInteger(abs);
  return `${sign}$${abs.toLocaleString("en-US", {
    minimumFractionDigits: small ? 2 : 0,
    maximumFractionDigits: small ? 2 : 0,
  })}`;
}

function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-[6px] block text-[12px] font-medium text-fg-muted">{label}</span>
      {children}
      {hint && <span className="mt-1 block text-[11px] text-fg-faint">{hint}</span>}
    </label>
  );
}

const inputCls =
  "w-full rounded-md border border-line bg-bg-subtle px-3 py-[9px] font-mono text-[14px] text-fg focus:border-accent-ring focus:outline-none";

export default function BonusCalculator({ embedded = false }: { embedded?: boolean }) {
  const [deposit, setDeposit] = useState(100);
  const [matchPct, setMatchPct] = useState(100);
  const [maxBonus, setMaxBonus] = useState(500);
  const [wagering, setWagering] = useState(35);
  const [base, setBase] = useState<WagerBase>("bonus");
  const [type, setType] = useState<BonusType>("non_sticky");
  const [rtp, setRtp] = useState(96.5);
  const [contribution, setContribution] = useState(100);
  const [maxCashout, setMaxCashout] = useState(0);
  const tracked = useRef(false);

  function touch() {
    if (tracked.current) return;
    tracked.current = true;
    track("calculator_used", { embedded: embedded ? "yes" : "no" });
  }

  const r = useMemo(() => {
    const bonus = Math.max(0, Math.min((deposit * matchPct) / 100, maxBonus || Infinity));
    const wagerBase = base === "bonus" ? bonus : deposit + bonus;
    const contrib = Math.max(1, contribution) / 100;
    const turnover = (wagering * wagerBase) / contrib;
    const edge = Math.max(0, 100 - rtp) / 100;
    const expectedLoss = turnover * edge;
    // Simple model: value = bonus minus expected loss from wagering.
    // Sticky bonuses are removed at cashout, so the bonus itself is never withdrawable.
    let ev = type === "non_sticky" ? bonus - expectedLoss : -expectedLoss;
    // Max cashout caps the upside.
    let capped = false;
    if (maxCashout > 0) {
      const expectedEnd = deposit + ev;
      if (expectedEnd > maxCashout) {
        ev = maxCashout - deposit;
        capped = true;
      }
    }
    const evPer100 = deposit > 0 ? (ev / deposit) * 100 : 0;
    let verdict: "good" | "fair" | "poor" = "poor";
    if (bonus > 0 && ev >= bonus * 0.3) verdict = "good";
    else if (ev > 0) verdict = "fair";
    return { bonus, turnover, expectedLoss, ev, evPer100, verdict, capped };
  }, [deposit, matchPct, maxBonus, wagering, base, type, rtp, contribution, maxCashout]);

  const verdictStyle = {
    good: { text: "text-accent", border: "border-accent-ring", bg: "bg-accent-tint", label: "Worth claiming" },
    fair: { text: "text-warning", border: "border-[#5a4a1f]", bg: "bg-warning-dim", label: "Marginal" },
    poor: { text: "text-danger", border: "border-danger", bg: "bg-danger-dim", label: "Skip it" },
  }[r.verdict];

  const num = (set: (n: number) => void) => (e: React.ChangeEvent<HTMLInputElement>) => {
    touch();
    set(Number(e.target.value) || 0);
  };

  return (
    <div className={`rounded-lg border border-line bg-bg-surface ${embedded ? "p-4" : "p-5 sm:p-6"}`}>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        <Field label="Deposit ($)">
          <input type="number" min={0} value={deposit} onChange={num(setDeposit)} className={inputCls} />
        </Field>
        <Field label="Match (%)">
          <input type="number" min={0} value={matchPct} onChange={num(setMatchPct)} className={inputCls} />
        </Field>
        <Field label="Max bonus ($)" hint="0 = no cap">
          <input type="number" min={0} value={maxBonus} onChange={num(setMaxBonus)} className={inputCls} />
        </Field>
        <Field label="Wagering (x)">
          <input type="number" min={0} value={wagering} onChange={num(setWagering)} className={inputCls} />
        </Field>
        <Field label="Wagering applies to">
          <select
            value={base}
            onChange={(e) => {
              touch();
              setBase(e.target.value as WagerBase);
            }}
            className={inputCls}
          >
            <option value="bonus">Bonus only</option>
            <option value="deposit_bonus">Deposit + bonus</option>
          </select>
        </Field>
        <Field label="Bonus type">
          <select
            value={type}
            onChange={(e) => {
              touch();
              setType(e.target.value as BonusType);
            }}
            className={inputCls}
          >
            <option value="non_sticky">Non-sticky</option>
            <option value="sticky">Sticky</option>
          </select>
        </Field>
        <Field label="Game RTP (%)" hint="Slots ~96 to 97%">
          <input type="number" step="0.1" min={0} max={100} value={rtp} onChange={num(setRtp)} className={inputCls} />
        </Field>
        <Field label="Game contribution (%)" hint="Slots usually 100%">
          <input type="number" min={1} max={100} value={contribution} onChange={num(setContribution)} className={inputCls} />
        </Field>
        <Field label="Max cashout ($)" hint="0 = none">
          <input type="number" min={0} value={maxCashout} onChange={num(setMaxCashout)} className={inputCls} />
        </Field>
      </div>

      <div className={`mt-5 rounded-md border ${verdictStyle.border} ${verdictStyle.bg} p-4`}>
        <div className={`mb-3 font-mono text-[11px] font-semibold uppercase tracking-[0.1em] ${verdictStyle.text}`}>
          {verdictStyle.label}
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[
            ["Bonus", money(r.bonus)],
            ["Total wagering", money(r.turnover)],
            ["Expected loss", money(r.expectedLoss)],
            ["Expected value", money(r.ev)],
          ].map(([k, v]) => (
            <div key={k}>
              <div className="text-[11px] text-fg-dim">{k}</div>
              <div className="font-mono text-[17px] font-semibold text-fg">{v}</div>
            </div>
          ))}
        </div>
        <p className="mt-3 text-[12px] leading-[1.5] text-fg-muted">
          EV per $100 deposited: <span className="font-mono text-fg">{money(r.evPer100)}</span>.
          {type === "sticky" && " Sticky bonuses are removed when you cash out, so only your deposit can be won back."}
          {r.capped && " Max cashout caps your upside."}
        </p>
      </div>

      <p className="mt-3 text-[11px] leading-[1.5] text-fg-faint">
        Simple model: value = bonus minus (total wagering x house edge). It ignores variance and the chance of busting early.
        18+. Gamble responsibly.
      </p>

      {embedded && (
        <a
          href="https://bonuscheckr.com/tools/bonus-calculator"
          target="_blank"
          rel="noopener"
          className="mt-3 block text-right text-[11px] text-fg-dim hover:text-fg-muted"
        >
          Casino bonus calculator by <span className="font-semibold text-fg">BonusCheckr</span>
        </a>
      )}
    </div>
  );
}
