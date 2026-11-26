-- New bonus-mechanics guides. Generated from content/new-guides/*.md
-- Safe to run more than once: each insert skips if the slug already exists.
-- author_id and primary_topic are copied from the sticky vs non-sticky guide.

INSERT INTO guides (slug, title, meta_title, meta_description, description, content, author_id, publish_date, last_updated, primary_topic, target_keywords, status, noindex)
SELECT 'deposit-match-bonus-explained', 'Deposit Match Bonus Explained: What 100% up to $500 Really Means', 'Deposit Match Bonus Explained: Real Value of 100% up to $500', 'How deposit match bonuses work, why a bigger match is not always better, and how to calculate the real value with wagering and house edge. Worked examples.', 'A deposit match looks like free money. The real value depends on the cap, the wagering and what the wagering applies to. Here is the maths.',
$md$> **TL;DR:** A deposit match adds a percentage of your deposit as bonus, up to a cap. "100% up to $500" on a $200 deposit gives $200 bonus, not $500. The real value is the bonus minus the expected loss from wagering. A 100% match with 35x on the bonus only is often worth more than a 300% match with 40x on deposit plus bonus. Always check the cap, what the wagering applies to, and whether the bonus is sticky.

## How a deposit match works

The casino matches a percentage of your deposit, up to a maximum.

**Bonus = min(deposit x match %, max bonus)**

| Offer | Deposit | Bonus you get |
|---|---|---|
| 100% up to $500 | $200 | $200 |
| 100% up to $500 | $1,000 | $500 (cap reached) |
| 200% up to $300 | $100 | $200 |
| 350% up to $1,000 | $100 | $350 |

The headline number ("up to $500") only matters if you deposit enough to reach the cap.

## The three numbers that decide real value

1. **Wagering multiplier** (for example 35x)
2. **What it applies to:** bonus only, or deposit + bonus
3. **House edge** of the games you play (slots are usually 3% to 4%)

**Total wagering = multiplier x (bonus or deposit + bonus)**

**Expected loss = total wagering x house edge**

**Expected value = bonus minus expected loss** (for non-sticky bonuses)

## Worked example: small match vs big match

Both on slots at 96.5% RTP (3.5% house edge), $100 deposit.

| | Offer A | Offer B |
|---|---|---|
| Match | 100% up to $500 | 300% up to $1,500 |
| Bonus | $100 | $300 |
| Wagering | 35x bonus | 40x deposit + bonus |
| Total wagering | $3,500 | $16,000 |
| Expected loss | $122.50 | $560 |
| Expected value | **-$22.50** | **-$260** |

The bigger match is much worse. The 300% bonus looks like $300 free, but the wagering on deposit plus bonus costs almost twice the bonus on average.

Check any offer yourself with the [casino bonus calculator](/tools/bonus-calculator).

## When a deposit match is actually good

A match bonus tends to have positive or near-zero expected value when:

- Wagering is **20x or lower on the bonus only**
- The bonus is **non-sticky** (real money played first)
- Slots count 100% and there is **no tight max cashout**
- The time limit is long enough to finish (at least 14 days)

Under these conditions, the bonus mostly works as a second chance if your real money runs out. See [low vs high wagering](/guides/low-vs-high-wagering) for where the break-even sits.

## Red flags in match bonus terms

| Term | Why it hurts |
|---|---|
| Wagering on deposit + bonus | Doubles or triples the turnover |
| Max cashout (for example 10x bonus) | Caps your upside |
| Max bet $5 or lower | Slows clearing and risks voided winnings |
| 7-day expiry | Many players cannot finish in time |
| Excluded games list | Low-edge games often do not count |

More in our [top red flags in bonus terms](/guides/red-flags-bonus-terms).

## Should you take the bonus at all?

If the expected value is negative and the bonus is sticky, skipping it is often the best choice. You keep full control of your deposit and can withdraw any time.

If it is non-sticky, taking it rarely hurts: you play your own money first and only touch the bonus if you lose. Learn [which balance is used first](/guides/real-money-vs-bonus-money-order).

## FAQ

### What does 100% deposit match mean?
The casino adds bonus money equal to 100% of your deposit, up to the stated maximum. Deposit $100 and you get $100 bonus.

### Is a bigger deposit match always better?
No. Bigger matches usually come with higher wagering or wagering on deposit plus bonus, which can make them worth less.

### Can I withdraw a deposit match bonus?
Only after completing the wagering, and only if it is non-sticky. Sticky bonuses are removed at withdrawal.

### How do I calculate if a match bonus is worth it?
Take the bonus amount and subtract total wagering multiplied by the house edge. If the result is positive or close to zero and the bonus is non-sticky, it is usually worth taking.$md$,
g.author_id, now(), now(), g.primary_topic, ARRAY['deposit match bonus','100 deposit match bonus','how does a deposit match bonus work','match bonus casino'], 'published', false
FROM guides g
WHERE g.slug = 'sticky-vs-non-sticky-bonuses'
  AND NOT EXISTS (SELECT 1 FROM guides WHERE slug = 'deposit-match-bonus-explained');

INSERT INTO guides (slug, title, meta_title, meta_description, description, content, author_id, publish_date, last_updated, primary_topic, target_keywords, status, noindex)
SELECT 'rakeback-vs-cashback', 'Rakeback vs Cashback: Which Crypto Casino Reward Is Worth More?', 'Rakeback vs Cashback: Which Is Worth More? (2026 Maths)', 'Rakeback pays on every bet, cashback only on losses. See the maths, worked examples, and which one gives crypto casino players more real value.', 'Rakeback pays a slice of the house edge on every bet. Cashback refunds part of your net losses. Here is how to compare them with real numbers.',
$md$> **TL;DR:** Rakeback returns a share of the house edge on every bet, win or lose. Cashback refunds a percentage of your net losses over a period. For most slot players, 10% rakeback and 10% cashback pay almost the same over time, but rakeback is paid more often, has no wagering in most crypto casinos, and is not wiped out by a lucky session. Always check whether cashback carries wagering. If it does, it is worth far less than the headline number.

## What rakeback actually is

Rakeback comes from poker, where the house takes a "rake" from every pot. Crypto casinos borrowed the idea: they give you back a percentage of the **house edge** on every bet you place.

The formula most casinos use:

**Rakeback = total wagered x house edge x rakeback %**

Example: you wager $10,000 on slots with a 3.5% house edge, and your rakeback rate is 10%.

- Expected house profit: $10,000 x 3.5% = $350
- Your rakeback: $350 x 10% = **$35**

You get the $35 whether you ended the session up or down. That is the key point.

## What cashback actually is

Cashback refunds a percentage of your **net losses** over a fixed period, usually daily or weekly.

**Cashback = (deposits minus withdrawals minus current balance) x cashback %**

Same player, $10,000 wagered at 3.5% edge. On average they lose $350. With 10% cashback they get **$35** back. Same as rakeback, on average.

But "on average" hides the real difference.

## Where the two split apart

| Situation | 10% rakeback | 10% cashback |
|---|---|---|
| You lose $350 (average week) | $35 | $35 |
| You lose $1,000 (bad week) | $35 | $100 |
| You win $500 (lucky week) | $35 | $0 |
| Paid | Instantly or daily | Weekly, sometimes monthly |
| Wagering on the reward | Usually none | Often 1x to 10x |

So:

- **Rakeback** is stable. It pays in every session and rewards volume.
- **Cashback** is insurance. It pays more when you lose big and nothing when you win.

Over a long run with the same house edge, both converge to the same expected value. The difference is variance and conditions.

## The catch: wagering on cashback

Many casinos attach wagering to cashback. That changes the maths badly.

Example: $100 cashback with 10x wagering at 3.5% house edge.

- Turnover needed: $100 x 10 = $1,000
- Expected loss while clearing it: $1,000 x 3.5% = $35
- Real value: $100 minus $35 = **$65**

So "10% cashback with 10x wagering" is really closer to 6.5% cashback. Run your own numbers with the [casino bonus calculator](/tools/bonus-calculator).

Rakeback in crypto casinos is almost always paid as withdrawable balance. That is why serious players value it higher than the same percentage of cashback.

## Rakeback on low-edge games

Because rakeback is tied to house edge, it pays less on games with a low edge.

| Game | Typical house edge | Rakeback on $10,000 wagered at 10% |
|---|---|---|
| Slots (96.5% RTP) | 3.5% | $35 |
| Blackjack (basic strategy) | 0.5% | $5 |
| Dice / crash (1% edge) | 1% | $10 |

Some casinos calculate rakeback on a fixed "effective edge" for every game. If you find one that pays a flat rate regardless of game, low-edge games become much better value. Read the terms carefully.

## Which should you choose?

| If you... | Pick |
|---|---|
| Play often with steady stakes | Rakeback |
| Play rarely but with big swings | Cashback (without wagering) |
| Are clearing a bonus with heavy wagering | Rakeback, it pays on the bonus turnover too |
| See cashback with wagering above 5x | Treat it as half its headline value |

The honest answer: neither turns gambling into a profit. Both only reduce the house edge. 10% rakeback on a 3.5% edge game lowers your effective edge to about 3.15%. You still lose over time, just slower.

## How rakeback and VIP levels interact

Most crypto casinos tie rakeback to VIP levels. Entry levels often pay 5%, higher tiers 10% to 25%. Before chasing a higher tier, calculate how much extra you must wager to reach it, and the expected loss on that extra volume. Wagering $50,000 more to go from 10% to 15% rakeback costs you around $1,750 in expected loss on slots, and earns you an extra $87.50 in rakeback on that volume. Volume is not free.

## FAQ

### Is rakeback the same as cashback?
No. Rakeback is paid on every bet based on the house edge. Cashback is paid only on net losses over a period.

### Is rakeback withdrawable?
In most crypto casinos, yes, rakeback is credited as real balance with no wagering. Always check the terms of your casino.

### Which is better, 10% rakeback or 10% cashback?
Over a long time they are worth about the same on average. Rakeback is more reliable and usually has no wagering, so for regular players it is normally the better deal.

### Does rakeback make gambling profitable?
No. It only reduces the house edge. With a 3.5% edge and 10% rakeback you still face roughly a 3.15% edge.$md$,
g.author_id, now(), now(), g.primary_topic, ARRAY['rakeback vs cashback','what is rakeback casino','casino cashback explained','crypto casino rakeback'], 'published', false
FROM guides g
WHERE g.slug = 'sticky-vs-non-sticky-bonuses'
  AND NOT EXISTS (SELECT 1 FROM guides WHERE slug = 'rakeback-vs-cashback');

INSERT INTO guides (slug, title, meta_title, meta_description, description, content, author_id, publish_date, last_updated, primary_topic, target_keywords, status, noindex)
SELECT 'real-money-vs-bonus-money-order', 'Real Money vs Bonus Money: Which Balance Do You Play First?', 'Real Money vs Bonus Money: Which Is Used First? (2026)', 'Casinos use your balances in a set order. Learn how real money and bonus money are played, why the order changes bonus value, and how to check it.', 'The order in which a casino uses your real and bonus balance decides whether you can walk away with a win. Here is how it works.',
$md$> **TL;DR:** Every casino plays your two balances in a fixed order. If your **real money is used first** (non-sticky bonus), you can cash out any early win and drop the bonus. If **bonus money is used first**, or both are mixed (sticky bonus), your whole balance is locked until wagering is done. The order matters more than the bonus size. Check it in the terms before you deposit.

## Your casino balance is actually two balances

When you claim a deposit bonus, the casino splits your account:

- **Real balance:** your deposit and anything you can withdraw.
- **Bonus balance:** the bonus amount, plus winnings made with it, locked until wagering is met.

What decides the bonus value is simple: **which of these two does each bet use first?**

## The three orders casinos use

| Order | Also called | What it means for you |
|---|---|---|
| Real money first | Non-sticky, "parachute" bonus | Win early and you can withdraw. Bonus only activates if real balance hits zero |
| Bonus money first | Rare, mostly old casinos | Your deposit stays locked behind bonus play |
| Combined balance | Sticky bonus | Deposit and bonus are one locked pot until wagering is done |

## Why real money first is worth so much

Example: deposit $100, get a $100 non-sticky bonus with 35x wagering.

1. You play your $100 real money first.
2. You hit a $600 win while still on real money.
3. You can withdraw $600 and forfeit the bonus. No wagering needed.

If instead you lose your $100, the $100 bonus kicks in and you get a second chance.

With a sticky bonus, the same $600 win is locked. You must still complete $3,500 of wagering (35x the $100 bonus), and the expected loss on that turnover at a 3.5% house edge is about $122. Most of that win can disappear before you are allowed to cash out.

This is why non-sticky bonuses are worth more even with the same headline number. See the full comparison in [sticky vs non-sticky bonuses](/guides/sticky-vs-non-sticky-bonuses).

## How to find the balance order in the terms

Search the bonus terms (Ctrl+F) for these phrases:

| Phrase in terms | Means |
|---|---|
| "Real money will be wagered first" | Non-sticky, good |
| "Bonus funds become active once your cash balance is depleted" | Non-sticky, good |
| "Bonus is non-withdrawable" or "bonus will be removed upon withdrawal" | Sticky |
| "Deposit and bonus must be wagered" | Usually combined balance |
| "Any withdrawal will forfeit the bonus and associated winnings" | Check carefully. Fine if real money is used first, bad if balances are combined |

If you cannot find the order, ask support and save the chat. If they will not answer clearly, assume it is sticky.

## The trap: forfeiting by withdrawing too early

With a non-sticky bonus, there is a moment when the bonus becomes active. After that, any withdrawal request usually **cancels the bonus and all winnings made with it**.

Rule of thumb:

- Real balance still above zero and you are up? Withdraw now if you want to lock the win.
- Already playing on bonus money? Finish wagering, or accept that withdrawing forfeits what is in the bonus balance.

Our guide on [how to cancel or forfeit a casino bonus](/guides/how-to-cancel-casino-bonus) explains each step.

## Max bet still applies on real money

Many casinos apply the bonus **max bet rule** from the moment you claim, even while you play with real money. Bet above it and they can void your winnings. Check the [max bet restrictions guide](/guides/max-bet-restrictions) before you raise stakes.

## Quick checklist before you claim

- Is real money used first? If no, value drops a lot.
- Is the bonus removed at cashout? That means sticky.
- Does max bet apply to real money play too?
- What happens to winnings if you withdraw during bonus play?

Put the numbers into the [casino bonus calculator](/tools/bonus-calculator) to see the expected value for both the sticky and non-sticky case.

## FAQ

### Which is used first, real money or bonus money?
It depends on the casino. With non-sticky bonuses, real money is used first. With sticky bonuses, deposit and bonus are combined and both are locked until wagering is done.

### Can I withdraw my deposit if I have an active bonus?
With a non-sticky bonus, usually yes, as long as you have not started playing with bonus money, but the bonus is forfeited. With a sticky bonus, usually no, until wagering is complete.

### Why did my winnings disappear when I withdrew?
You most likely requested a withdrawal while the bonus was active, which forfeits the bonus and any winnings made with it.

### Is a bonus with real money first always better?
For almost every player, yes. It gives you the option to keep early wins, which has real value.$md$,
g.author_id, now(), now(), g.primary_topic, ARRAY['real money vs bonus money','which balance is used first casino','bonus balance explained','casino balance order'], 'published', false
FROM guides g
WHERE g.slug = 'sticky-vs-non-sticky-bonuses'
  AND NOT EXISTS (SELECT 1 FROM guides WHERE slug = 'real-money-vs-bonus-money-order');

INSERT INTO guides (slug, title, meta_title, meta_description, description, content, author_id, publish_date, last_updated, primary_topic, target_keywords, status, noindex)
SELECT 'reload-bonus-explained', 'Reload Bonus Explained: Are Weekly Reloads Worth Claiming?', 'Reload Bonus Explained: Are Casino Reloads Worth It? (2026)', 'What a casino reload bonus is, how it differs from a welcome bonus, and how to tell if a weekly or monthly reload has positive value. Simple maths inside.', 'Reload bonuses reward existing players for depositing again. Some are better than the welcome offer. Here is how to judge them.',
$md$> **TL;DR:** A reload bonus is a deposit match for players who already have an account. It is usually smaller than a welcome bonus (25% to 100%) but often has lower wagering, which can make it worth more. Judge it the same way: bonus minus total wagering times house edge. Crypto casinos also use "reloads" for scheduled free balance drops, which have no deposit and are almost always worth taking.

## What a reload bonus is

After your welcome bonus, casinos want you to deposit again. A reload bonus matches part of your next deposit.

Typical forms:

| Type | Example | Common wagering |
|---|---|---|
| Weekly reload | 50% up to $200 every Monday | 20x to 35x bonus |
| Monthly reload | 100% up to $500 once a month | 30x to 40x |
| VIP reload | Scheduled balance drop, no deposit needed | 0x to 5x |
| Weekend reload | 25% up to $100 Friday to Sunday | 15x to 25x |

## Reload vs welcome bonus

Welcome bonuses are built to look big. Reloads are built to keep you. That often makes them better per dollar.

Example, $200 deposit, slots at 3.5% house edge:

| | Welcome bonus | Weekly reload |
|---|---|---|
| Match | 200% up to $1,000 | 50% up to $200 |
| Bonus | $400 | $100 |
| Wagering | 40x bonus | 15x bonus |
| Total wagering | $16,000 | $1,500 |
| Expected loss | $560 | $52.50 |
| Expected value | **-$160** | **+$47.50** |

The smaller reload is worth more because the wagering is low. Try your own numbers in the [casino bonus calculator](/tools/bonus-calculator).

## "Reloads" in crypto casinos are different

On many crypto casinos, a "reload" is not a deposit match. It is a **scheduled amount of free balance** for VIP players, paid daily or weekly, based on past wagering.

- No deposit required
- Little or no wagering
- Size depends on your recent volume

These are close to pure value. The only cost is the volume you already played to qualify. Do not chase a higher VIP level just to unlock bigger reloads. Compare the extra expected loss with the extra reward first, the same way as with [rakeback vs cashback](/guides/rakeback-vs-cashback).

## How to judge any reload in 30 seconds

1. Work out the bonus: deposit x match %, up to the cap.
2. Total wagering = multiplier x bonus (or x deposit + bonus).
3. Expected loss = total wagering x house edge.
4. If bonus minus expected loss is positive, and the bonus is non-sticky, take it.

Watch for the same traps as welcome offers: max bet, max cashout, short expiry, and game exclusions. See [bonus time limits](/guides/bonus-time-limits) and [max bet restrictions](/guides/max-bet-restrictions).

## When to skip a reload

- Wagering above 35x on deposit plus bonus
- Sticky bonus with negative expected value
- You were not planning to deposit anyway. A reload that makes you deposit more than you meant to is not value.

## FAQ

### What is a reload bonus in a casino?
It is a bonus for existing players when they deposit again, usually a percentage match with its own wagering.

### Are reload bonuses better than welcome bonuses?
Often, yes, per dollar. They are smaller but usually have lower wagering, which can give them a better expected value.

### Do reload bonuses have wagering requirements?
Most deposit-match reloads do, often 15x to 35x. Crypto casino VIP reloads often have little or none.

### How often can I claim a reload bonus?
It depends on the casino. Weekly and monthly are common. Some VIP reloads are paid daily.$md$,
g.author_id, now(), now(), g.primary_topic, ARRAY['reload bonus','what is a reload bonus','casino reload bonus','weekly reload bonus'], 'published', false
FROM guides g
WHERE g.slug = 'sticky-vs-non-sticky-bonuses'
  AND NOT EXISTS (SELECT 1 FROM guides WHERE slug = 'reload-bonus-explained');
