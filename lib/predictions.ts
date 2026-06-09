// Configuration for The Gap — /predictions section.
// Adding an operator later = add one entry to BOOKS (slug must match OddsPapi's bookmaker slug).

export const BOOKS: Record<string, { name: string; affiliateUrl: string }> = {
  stake: { name: 'Stake', affiliateUrl: 'https://stake.com/?c=J7JXsz6z' },
  bcgame: { name: 'BC.Game', affiliateUrl: 'https://bc.game/i-4drv0s6jf-n/' },
  roobet: { name: 'Roobet', affiliateUrl: 'https://go.roobet.com/visit/?bta=45633&brand=roobet' },
  cloudbet: { name: 'Cloudbet', affiliateUrl: 'https://cldbt.cloud/go/en/landing/bitcoin-casino?af_token=d9f3c17b26418a178f87530592edc874&aftm_campaign=Bonus+Review&aftm_source=Website&aftm_medium=SEO&aftm_content=Review+Page' },
  duelbits: { name: 'Duelbits', affiliateUrl: 'https://go.duelbits.io/visit/?bta=37923&nci=5908' },
  rollbit: { name: 'Rollbit', affiliateUrl: 'https://rollbit.com' }, // TODO: no affiliate link yet — add a Rollbit review to source one
};

export const POLYMARKET_URL = 'https://polymarket.com'; // Prediction market (not an affiliate operator)

// Static scan groups. marketId: 101 = 3-way moneyline (soccer), 201 = 2-way moneyline (MMA etc.)
export const SCAN_GROUPS: {
  category: string;
  tournamentIds: string;
  marketId: string;
  outcomes: Record<string, 'p1' | 'draw' | 'p2'>;
}[] = [
  {
    category: 'World Cup',
    tournamentIds: '16',
    marketId: '101',
    outcomes: { '101': 'p1', '102': 'draw', '103': 'p2' },
  },
];

// MMA tournaments rotate per event, so they are discovered at scan time.
export const MMA_SPORT_ID = 20;
export const MMA_MARKET_ID = '201';
export const MMA_OUTCOMES: Record<string, 'p1' | 'draw' | 'p2'> = {
  '201': 'p1',
  '202': 'p2',
  '203': 'p2',
};

// Gaps above this are almost always a stale line at one book, not a real edge. Skip them.
export const SUSPECT_GAP_PP = 25;

// Rows with |gap| below this render grey with "No edge — skip".
export const NOISE_THRESHOLD_PP = 2;

// Max rows stored per scan (names cost 1 API request each).
export const MAX_ROWS = 12;

// Skip the scan if fewer requests than this remain in the monthly quota.
export const QUOTA_RESERVE = 40;
