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

// Rows with |gap| below this render grey with "No edge — skip".
export const NOISE_THRESHOLD_PP = 2;


