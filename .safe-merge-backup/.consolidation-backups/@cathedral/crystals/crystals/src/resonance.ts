/**
 * resonance
 * 
 * @package @cathedral/crystals
 */
// resonance.ts - computation utilities
import { baseCrystals } from './data/baseCrystals';
import { fusionSets } from './data/fusionSets';
import { ResonanceComputationResult, Crystal, CrystalFusionSet } from './types';
import * as dotenv from 'dotenv';

dotenv.config();

function mean(nums: number[]) { return nums.reduce((a,b)=>a+b,0)/Math.max(1,nums.length); }

export async function computeFusionResonance(fusionId: string): Promise<ResonanceComputationResult | null> {
  const fusion = fusionSets.find((f: CrystalFusionSet) => f.id === fusionId);
  if (!fusion) return null;
  const members: Crystal[] = fusion.members
    .map((id: string) => baseCrystals.find((c: Crystal) => c.id === id))
  .filter((c: Crystal | undefined): c is Crystal => Boolean(c));

  const freqStack: number[] = [];
  members.forEach((c: Crystal) => c.baseFrequenciesHz?.forEach((f: number) => freqStack.push(f)));

  const colorField: string[] = [];
  members.forEach((c: Crystal) => c.colorSpectrum.forEach((col: string) => { if(!colorField.includes(col)) colorField.push(col); }));

  // crude phi score: how many ratios approximate phi within tolerance
  let phiHits = 0; let comparisons = 0;
  for (let i=0;i<freqStack.length;i++) {
    for (let j=i+1;j<freqStack.length;j++) {
      const ratio = freqStack[j] > freqStack[i] ? freqStack[j]/freqStack[i] : freqStack[i]/freqStack[j];
      comparisons++;
      if (Math.abs(ratio - 1.618) < 0.05) phiHits++;
    }
  }
  const phiScore = comparisons ? phiHits / comparisons : 0;

  // stability heuristic: coherence * frequency regularity factor
  const intervals: number[] = [];
  const sorted = [...freqStack].sort((a,b)=>a-b);
  for (let i=0;i<sorted.length-1;i++) intervals.push(sorted[i+1]-sorted[i]);
  const avg = mean(intervals);
  const variance = mean(intervals.map(v => Math.pow(v-avg,2)));
  const regularity = 1 / (1 + variance / 10000);

  const baseResult = {
    compositeFrequency: freqStack,
    colorField,
    phiScore: Number(phiScore.toFixed(3)),
    stability: Number((fusion.synergyModel.coherence * regularity).toFixed(3))
  };

  return {
    ...baseResult,
    aiLore: 'Pure algorithmic resonance computation - no AI involvement.'
  };
}


export function listCrystalIds() { return baseCrystals.map(c => c.id); }
export function listFusionSets() { return fusionSets.map(f => ({ id: f.id, name: f.name })); }
