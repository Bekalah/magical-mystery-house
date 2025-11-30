/**
 * arcana
 * 
 * @package @cathedral/types
 */
/**
 * Living Arcana Types
 */

export type ArcanaNumber = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21;

export interface LivingArcana {
  number: ArcanaNumber;
  name: string;
  characterName?: string;
  divineForm: ArcanaAspect;
  shadowForm: ArcanaAspect;
  harmonyForm: ArcanaAspect;
  keywords: string[];
  element?: 'fire' | 'water' | 'air' | 'earth' | 'spirit';
  planet?: string;
  zodiac?: string;
}

export interface ArcanaAspect {
  description: string;
  imagePrompt?: string;
  colors: string[];
  symbols: string[];
  energy: 'active' | 'passive' | 'balanced';
}

export interface TarotReading {
  id: string;
  timestamp: Date;
  spread: SpreadType;
  cards: ReadingCard[];
  interpretation?: string;
}

export interface ReadingCard {
  position: number;
  positionMeaning: string;
  card: LivingArcana;
  orientation: 'upright' | 'reversed';
}

export type SpreadType = 'single' | 'three-card' | 'celtic-cross' | 'custom';
