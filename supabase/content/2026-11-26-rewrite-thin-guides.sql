-- Rewrites of thin guides Google marked 'crawled, not indexed'.
-- Generated from content/rewrites/*.md. Updates in place; slug and URL do not change.

UPDATE guides SET
  title = 'Low vs High Wagering Bonuses: Where a Bonus Stops Being Worth It',
  meta_title = 'Low vs High Wagering Bonuses: The 28x Line (2026 Maths)',
  meta_description = 'What counts as low wagering, and the exact multiplier where a casino bonus turns negative. Worked examples at 10x to 60x, with RTP and game weighting.',
  description = 'Low wagering is not a feeling, it is a number. Here is the exact point where a bonus starts costing you more than it gives, and how to work it out for any offer.',
  tldr = 'A bonus costs you, on average, its total wagering times the house edge. On slots at 96.5% RTP the edge is 3.5%, so the break-even point is about 28x the bonus. Below that, the bonus is worth something on average. Above it, the average player loses more than the bonus gives. Wagering on deposit plus bonus, low RTP and low game contribution all push the real multiplier up fast.',
  target_keywords = ARRAY['low wagering bonus','high wagering bonus','what is low wagering','wagering requirement too high','low wagering casino'],
  content = $md$> **TL;DR:** A bonus costs you, on average, its total wagering times the house edge. On slots at 96.5% RTP the edge is 3.5%, so the break-even point is about **28x the bonus**. Below that, the bonus is worth something on average. Above it, the average player loses more than the bonus gives. Wagering on deposit plus bonus, low RTP and low game contribution all push the real multiplier up fast.

## Low or high is a number, not a label

Casinos call almost anything "low wagering". The useful question is simpler: **does the bonus give you more than the wagering takes away?**

Every bet you place has a small expected loss, the house edge. Wagering requirements force you to place a lot of bets. So the cost of a bonus is:

**Expected loss = total wagering × house edge**

And the average value of the bonus is roughly:

**Bonus value = bonus amount − expected loss**

This is the standard first check. It ignores variance (some players win big, many bust), so treat it as the average result, not your result.

## The break-even multiplier

Put the two formulas together and the bonus amount cancels out. For wagering on the bonus only, the break-even point is:

**Break-even multiplier = 1 ÷ house edge**

| Game RTP | House edge | Break-even wagering (bonus only) |
|---|---|---|
| 94% | 6% | about 17x |
| 95% | 5% | 20x |
| 96% | 4% | 25x |
| 96.5% | 3.5% | about 28.5x |
| 97% | 3% | about 33x |
| 98% | 2% | 50x |

Most slots sit between 94% and 97% RTP, and many casinos run lower RTP versions of popular games. That is why we use **about 28x on the bonus** as the line for a typical slot at 96.5%. Anything clearly under it is low wagering. Anything clearly over it is high.

## Worked examples: $100 bonus, 96.5% RTP slots

Wagering applies to the bonus only, slots count 100%.

| Wagering | Total bets | Expected loss | Average value |
|---|---|---|---|
| 10x | $1,000 | $35 | **+$65** |
| 20x | $2,000 | $70 | **+$30** |
| 25x | $2,500 | $87.50 | **+$12.50** |
| 30x | $3,000 | $105 | **−$5** |
| 35x | $3,500 | $122.50 | **−$22.50** |
| 40x | $4,000 | $140 | **−$40** |
| 50x | $5,000 | $175 | **−$75** |
| 60x | $6,000 | $210 | **−$110** |

Two things stand out. First, 35x, the most common multiplier in the industry, is already below zero on average. Second, every extra 10x costs another $35 per $100 of bonus. High wagering is not slightly worse, it is a lot worse.

A negative number does not mean you lose that exact amount. It means the bonus takes more from the average player than it gives. With a [non-sticky bonus](/guides/sticky-vs-non-sticky-bonuses) you can limit the damage by playing your own money first and cashing out if you win before the bonus kicks in.

## Three things that secretly raise the multiplier

The headline number is rarely the real number. Always convert the offer into **wagering on the bonus, at 100% contribution**.

### 1. Deposit plus bonus wagering

"35x deposit plus bonus" on a 100% match is the same as **70x on the bonus**. On a $100 deposit and $100 bonus that is $7,000 of bets, an expected loss of $245 and an average value of −$145. We explain this trap in full in [bonus only vs deposit + bonus wagering](/guides/bonus-only-vs-deposit-bonus-wagering).

### 2. Game contribution

If table games count 10%, every $1 you bet on blackjack only clears $0.10 of wagering. A 20x bonus played on blackjack becomes 200x in real betting. Blackjack has a much lower edge, but not ten times lower, so it rarely helps. See [game contribution](/guides/game-contribution-wagering).

### 3. Low RTP slots

The same 35x on a 94% RTP slot costs $210 per $100 of bonus, not $122.50. Check the RTP in the game's info screen. If the casino shows a lower version than the provider's default, that is a sign to pick another game. Our list of [slots for bonus wagering](/guides/best-slots-for-bonus-wagering) helps here.

## Time is a cost too

Wagering is also hours of play. At $1 per spin and roughly 600 spins an hour:

| Wagering on $100 bonus | Spins at $1 | Rough time |
|---|---|---|
| 20x | 2,000 | about 3.5 hours |
| 35x | 3,500 | about 6 hours |
| 60x | 6,000 | about 10 hours |

Most bonuses also have a [time limit](/guides/bonus-time-limits), often 7 to 30 days, and a [maximum bet rule](/guides/max-bet-restrictions), often $5 per spin. High wagering plus a short deadline pushes players to bet bigger, which breaks the max bet rule and voids the bonus.

## When high wagering can still be fine

- **The bonus is non-sticky and you treat it as a free second chance.** Your real money is played first. If you win early, you cash out and forfeit the bonus.
- **The wagering is low on a no-deposit offer** and you would not have deposited anyway. You risk nothing, so a small negative average is only lost time.
- **You get rakeback or cashback on wagered money.** On crypto casinos, rakeback on $3,500 of bets can add back part of the expected loss. Check [rakeback vs cashback](/guides/rakeback-vs-cashback).

When none of these apply, skip it. Or look for [no wagering bonuses](/guides/no-wagering-bonuses), where the break-even question disappears.

## How to check any offer in 30 seconds

1. Find the multiplier and what it applies to (bonus only, or deposit plus bonus).
2. Convert to bonus only: if it is deposit plus bonus on a 100% match, double it.
3. Divide by the contribution of the game you will play (100% slots = no change).
4. Compare with the break-even line for that game's RTP: about 28x at 96.5%.

Or enter the numbers in our free [bonus calculator](/tools/bonus-calculator). It shows the total wagering, expected loss and average value for any offer, including sticky bonuses and max cashout caps.

## FAQ

### What is considered low wagering for a casino bonus?
For slots at around 96.5% RTP, anything under about 25x the bonus is low and has positive average value. 30x to 35x is average and slightly negative. 40x and above is high.

### Is 35x wagering good?
Not on its own. 35x on the bonus at 96.5% RTP has an expected loss of $122.50 per $100 of bonus, so the average value is about −$22.50. It can still be worth it if the bonus is non-sticky and you play your own money first.

### Is 35x on deposit plus bonus the same as 35x?
No. On a 100% match it is the same as 70x on the bonus alone, which doubles the total bets and the expected loss.

### What is the best wagering requirement?
0x, a no wagering bonus. After that, the lower the better. 10x to 20x on the bonus only is excellent and rare.

### Does RTP change whether a bonus is worth it?
Yes, a lot. The break-even multiplier is 1 divided by the house edge: about 17x at 94% RTP, 28x at 96.5%, and 33x at 97%.
$md$,
  last_updated = now()
WHERE slug = 'low-vs-high-wagering';

UPDATE guides SET
  title = 'No Max Cashout Bonuses: How Cashout Caps Work and How to Find Real Uncapped Offers',
  meta_title = 'No Max Cashout Casino Bonuses: How Caps Work (2026)',
  meta_description = 'What max cashout means, how a 5x or 10x cap cuts your winnings, the T&C phrases that hide a cap, and when a no max cashout bonus is worth it. Examples inside.',
  description = 'A max cashout cap decides how much of a bonus win you can keep. Here is how caps work, where they hide in the terms, and when an uncapped bonus is worth the trade-offs.',
  tldr = 'Max cashout is the most you can withdraw from bonus winnings, often 5x to 10x the bonus, or a flat $50 to $100 on free spins and no-deposit offers. Anything you win above it is removed when you cash out. Caps barely change the average value of a bonus, but they remove the big wins that make a bonus worth the risk. Check for a cap before you claim, look for the other names it hides under, and put it in a calculator.',
  target_keywords = ARRAY['no max cashout bonus','max cashout casino','maximum cashout bonus','max conversion bonus','bonus winnings cap'],
  content = $md$> **TL;DR:** Max cashout is the most you can withdraw from bonus winnings, often 5x to 10x the bonus, or a flat $50 to $100 on free spins and no-deposit offers. Anything you win above it is removed when you cash out. Caps barely change the average value of a bonus, but they remove the big wins that make a bonus worth the risk. Check for a cap before you claim, look for the other names it hides under, and put it in a calculator.

## What max cashout means

A max cashout (also called max conversion or max win from bonus) is a ceiling on how much bonus winnings you can turn into real, withdrawable money.

You can still win more than the cap while you play. The cap applies at the end, when the bonus is converted. Anything above it is removed from your balance.

| | With a 5x cap | No cap |
|---|---|---|
| Bonus | $50 | $50 |
| Cap | $250 | none |
| Balance after wagering | $3,000 | $3,000 |
| **You can withdraw** | **$250** | **$3,000** |
| Removed by the casino | $2,750 | $0 |

Same bonus, same luck, very different result.

## Where caps are most common

| Offer type | Typical cap |
|---|---|
| No-deposit bonus | $50 to $200 flat |
| Free spins winnings | $50 to $100 flat, or 5x to 10x the spin winnings |
| Deposit match (sticky) | 5x to 10x the bonus, sometimes deposit plus bonus |
| Deposit match (non-sticky) | Often applies only to winnings made with bonus money |
| Cashback and rakeback | Usually no cap, often no wagering either |

No-deposit and free spins offers almost always have a cap, because the casino takes all the risk. On deposit bonuses, a cap is a choice, and a good sign is when there is none.

## How much does a cap really cost you?

Here is the part most guides miss. **On average, a cap changes the value of a bonus very little.** Most bonus sessions end below the cap, or at zero. A cap only touches the rare sessions where you hit a big win.

But those rare big wins are the reason high-wagering bonuses can be worth playing at all. Take a $100 bonus with 35x wagering at 96.5% RTP. The expected loss on $3,500 of bets is $122.50, so the average value is already about −$22.50 (see [low vs high wagering](/guides/low-vs-high-wagering)). The only way that bonus pays off is a big hit. A 5x cap ($500) takes away exactly that possibility.

So think of it this way:

- **Low wagering + cap:** the bonus can still be fine. You will usually finish below the cap anyway.
- **High wagering + cap:** the worst combination. The average is negative and the upside is capped.
- **High wagering + no cap:** a long shot, but a real one.
- **Low wagering + no cap:** rare. Claim it.

Our free [bonus calculator](/tools/bonus-calculator) has a max cashout field. Enter the cap and it shows how much it reduces the value of the offer.

## Sticky vs non-sticky: where the cap applies

The bonus type changes how much the cap matters.

- **Sticky bonus:** the bonus itself can never be withdrawn, and the cap applies to everything you win from it. The cap is always in play.
- **Non-sticky bonus:** you play your own deposit first. If you win big before touching the bonus, many casinos let you withdraw that win in full, because the cap only applies once you are playing with bonus money. Check the terms, because some casinos cap the whole session once a bonus is active.

This is one more reason to prefer [non-sticky bonuses](/guides/sticky-vs-non-sticky-bonuses). Our [non-sticky withdrawal guide](/guides/non-sticky-withdrawal-guide) walks through the exact order.

## The phrases that hide a cap

Casinos rarely write "max cashout" in big letters. Search the bonus terms (Ctrl+F) for these:

- "maximum cashout" or "max cashout"
- "maximum conversion" or "max conversion"
- "maximum withdrawal from bonus"
- "winnings are capped at" or "limited to"
- "maximum win" (common on free spins)
- "any winnings in excess of … will be removed"
- "x times the bonus amount" next to the word withdraw

If none of these appear in the bonus terms **and** the general terms, the bonus is probably uncapped. Ask support in live chat and save the reply.

## Max cashout is not the same as a withdrawal limit

These two are often confused:

| | Max cashout | Withdrawal limit |
|---|---|---|
| What it is | A cap on bonus winnings | A cap on how fast you get paid |
| Example | "Max $500 from this bonus" | "Max $5,000 per week" |
| Money above it | **Removed** | Paid later in instalments |
| How bad | Can cost you most of a big win | Slow, but you get it all |

A "no max cashout" bonus at a casino with a $2,000 weekly withdrawal limit still pays out a $20,000 win, just over 10 weeks. That is annoying, not a loss. Watch for terms that let the casino change the limit or pay in instalments "at its discretion". Those are covered in our [red flags in bonus terms](/guides/red-flags-bonus-terms).

## Red flags on "no max cashout" offers

- "No max cashout" in the advert, but a cap in the general terms
- "Unlimited winnings" except on jackpots or certain games
- Caps that apply only to "players from some countries"
- Bonus abuse terms so wide that any big win can be voided. See [what gets winnings voided](/guides/bonus-abuse-voided-winnings).
- A brand new casino with no payout record. An uncapped bonus is only worth something if the casino actually pays big wins.

## Is a no max cashout bonus worth it?

Use this order:

1. **Check the wagering first.** Uncapped with 60x wagering is still a bad bonus for most players.
2. **Then the cap.** If wagering is fair (under about 28x on the bonus at 96.5% RTP), a cap matters less. If wagering is high, only consider uncapped offers.
3. **Then the game you play.** Caps hurt most on high-volatility slots, where single wins of 1,000x or more are possible. On low-volatility games you rarely reach a cap.
4. **Then the casino.** Check reviews for paid big wins and how fast payouts arrive.

## FAQ

### What does no max cashout mean?
It means there is no limit on how much you can withdraw from bonus winnings once you meet the wagering. Every dollar you win can be cashed out, subject to normal withdrawal limits.

### What is a typical max cashout on a casino bonus?
On deposit bonuses, 5x to 10x the bonus amount. On free spins and no-deposit bonuses, a flat $50 to $200 is common.

### Is max conversion the same as max cashout?
Yes. Both mean the maximum bonus winnings that can be converted into real money.

### Do non-sticky bonuses have a max cashout?
Some do, but often it only applies to winnings made after your real money is used up. If you win with your own deposit first, you can usually withdraw it all.

### Does a max cashout cap change a bonus's expected value?
Only a little, because most sessions end below the cap. Its real cost is that it removes the big wins, which are the only way high-wagering bonuses pay off.
$md$,
  last_updated = now()
WHERE slug = 'no-max-cashout-bonuses';
