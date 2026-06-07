// Configuration for The Gap — /predictions section.
// Adding an operator later = add one entry to BOOKS (slug must match OddsPapi's bookmaker slug).

export const BOOKS: Record<string, { name: string; affiliateUrl: string }> = {
  stake: { name: 'Stake', affiliateUrl: 'https://stake.com' }, // TODO: replace with affiliate link
  bcgame: { name: 'BC.Game', affiliateUrl: 'https://bc.game' }, // TODO: replace with affiliate link
  roobet: { name: 'Roobet', affiliateUrl: 'https://roobet.com' }, // TODO: replace with affiliate link
  cloudbet: { name: 'Cloudbet', affiliateUrl: 'https://cloudbet.com' }, // TODO: replace with affiliate link
  duelbits: { name: 'Duelbits', affiliateUrl: 'https://duelbits.com' }, // TODO: replace with affiliate link
  rollbit: { name: 'Rollbit', affiliateUrl: 'https://rollbit.com' }, // TODO: replace with affiliate link
};

export const POLYMARKET_URL = 'https://polymarket.com'; // TODO: replace with affiliate link

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
  '203': 'p2',
};

// Rows with |gap| below this render grey with "No edge — skip".
export const NOISE_THRESHOLD_PP = 2;

// Max rows stored per scan (names cost 1 API request each).
export const MAX_ROWS = 12;

// Skip the scan if fewer requests than this remain in the monthly quota.
export const QUOTA_RESERVE = 40;

