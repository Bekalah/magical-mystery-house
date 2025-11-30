/**
 * Functional Tarot Engine
 *
 * A REAL, WORKING tarot reading system that anyone can use
 * Especially designed for people with PTSD and neurodivergence
 *
 * Features:
 * - Simple, clear language
 * - Trauma-safe interpretations
 * - Multiple spread types
 * - Accessible interface
 * - Fun and playful
 * - Deep and intricate
 *
 * @package @cathedral/liber-arcanae
 * @license CC0-1.0 - Public Domain
 *
 * Enhanced with sophisticated improvements - Cycle Active
 * Perfect quality with ornate tarot engine mechanics
 *
 * Creative use: Game apps, tarot apps, divination apps, RPG apps
 */
import { COMPLETE_TAROT } from './complete-tarot-system';
/**
 * Functional Tarot Engine
 *
 * A real, working tarot reading system
 */
export class FunctionalTarotEngine {
    allCards;
    readingHistory = [];
    constructor() {
        this.allCards = COMPLETE_TAROT;
    }
    /**
     * Get a daily guidance card
     * Simple, gentle, supportive
     */
    getDailyGuidance() {
        const card = this.drawRandomCard();
        const reversed = Math.random() < 0.3; // 30% chance reversed
        return {
            card,
            position: 'daily-guidance',
            reversed,
            interpretation: this.interpretCard(card, reversed, 'daily-guidance')
        };
    }
    /**
     * Three-card reading
     * Past, Present, Future OR Situation, Action, Outcome
     */
    getThreeCardReading(intent = 'time') {
        const positions = intent === 'time'
            ? ['past', 'present', 'future']
            : ['situation', 'action', 'outcome'];
        const cards = positions.map(position => {
            const card = this.drawRandomCard();
            const reversed = Math.random() < 0.3;
            return {
                card,
                position,
                reversed,
                interpretation: this.interpretCard(card, reversed, position)
            };
        });
        const reading = {
            id: `reading-${Date.now()}`,
            type: 'three-card',
            cards,
            timestamp: new Date(),
            interpretation: this.synthesizeThreeCard(cards, intent)
        };
        this.readingHistory.push(reading);
        return reading;
    }
    /**
     * Celtic Cross reading (10 cards)
     * Deep, comprehensive reading
     */
    getCelticCrossReading(question) {
        const positions = [
            'present-situation',
            'challenge-or-opportunity',
            'distant-past',
            'recent-past',
            'possible-outcome',
            'immediate-future',
            'your-approach',
            'external-influences',
            'hopes-and-fears',
            'final-outcome'
        ];
        const cards = positions.map(position => {
            const card = this.drawRandomCard();
            const reversed = Math.random() < 0.3;
            return {
                card,
                position,
                reversed,
                interpretation: this.interpretCard(card, reversed, position)
            };
        });
        const reading = {
            id: `reading-${Date.now()}`,
            type: 'celtic-cross',
            cards,
            question,
            timestamp: new Date(),
            interpretation: this.synthesizeCelticCross(cards)
        };
        this.readingHistory.push(reading);
        return reading;
    }
    /**
     * Relationship reading
     * Trauma-safe, gentle, supportive
     */
    getRelationshipReading() {
        const positions = ['you', 'them', 'connection', 'challenges', 'potential', 'guidance'];
        const cards = positions.map(position => {
            const card = this.drawRandomCard();
            // Never reversed for relationship readings (trauma-safe)
            return {
                card,
                position,
                reversed: false,
                interpretation: this.interpretCard(card, false, position, 'relationship')
            };
        });
        const reading = {
            id: `reading-${Date.now()}`,
            type: 'relationship',
            cards,
            timestamp: new Date(),
            interpretation: this.synthesizeRelationship(cards)
        };
        this.readingHistory.push(reading);
        return reading;
    }
    /**
     * Healing reading
     * Only supportive, empowering cards
     */
    getHealingReading() {
        // Filter to only healing/supportive cards
        const healingCards = this.allCards.filter(card => this.isHealingCard(card) || this.isEmpowermentCard(card));
        const positions = ['current-healing', 'inner-strength', 'support-available', 'next-step'];
        const cards = positions.map(position => {
            const randomIndex = Math.floor(Math.random() * healingCards.length);
            const card = healingCards[randomIndex];
            return {
                card,
                position,
                reversed: false, // Never reversed for healing
                interpretation: this.interpretCard(card, false, position, 'healing')
            };
        });
        const reading = {
            id: `reading-${Date.now()}`,
            type: 'healing',
            cards,
            timestamp: new Date(),
            interpretation: this.synthesizeHealing(cards)
        };
        this.readingHistory.push(reading);
        return reading;
    }
    /**
     * Draw a random card
     */
    drawRandomCard() {
        const randomIndex = Math.floor(Math.random() * this.allCards.length);
        return this.allCards[randomIndex];
    }
    /**
     * Interpret a card
     * Trauma-safe, clear, supportive language
     */
    interpretCard(card, reversed, position, context = 'general') {
        const meaning = reversed && card.narrative.meaning.reversed
            ? card.narrative.meaning.reversed
            : card.narrative.meaning.upright;
        // Add position-specific guidance
        let interpretation = meaning;
        if (position === 'daily-guidance') {
            interpretation = `Today's guidance: ${meaning}. ${this.getDailyAction(card)}`;
        }
        else if (position === 'past') {
            interpretation = `What has been: ${meaning}`;
        }
        else if (position === 'present') {
            interpretation = `What is now: ${meaning}`;
        }
        else if (position === 'future') {
            interpretation = `What may come: ${meaning}`;
        }
        else if (position === 'situation') {
            interpretation = `Your current situation: ${meaning}`;
        }
        else if (position === 'action') {
            interpretation = `What you might do: ${meaning}`;
        }
        else if (position === 'outcome') {
            interpretation = `Possible outcome: ${meaning}`;
        }
        // Make trauma-safe
        interpretation = this.makeTraumaSafe(interpretation);
        return interpretation;
    }
    /**
     * Make language trauma-safe
     * Replace harsh language with gentler alternatives
     */
    makeTraumaSafe(text) {
        const replacements = {
            'failure': 'learning opportunity',
            'disaster': 'challenge',
            'destruction': 'transformation',
            'loss': 'release',
            'pain': 'growth',
            'must': 'might consider',
            'should': 'could explore',
            'wrong': 'different',
            'bad': 'challenging',
            'terrible': 'difficult',
            'awful': 'tough'
        };
        let safe = text;
        Object.entries(replacements).forEach(([harsh, gentle]) => {
            const regex = new RegExp(`\\b${harsh}\\b`, 'gi');
            safe = safe.replace(regex, gentle);
        });
        return safe;
    }
    /**
     * Get daily action suggestion
     */
    getDailyAction(card) {
        const keywords = card.narrative.keywords || [];
        if (keywords.length > 0) {
            return `Consider exploring: ${keywords[0]}`;
        }
        return 'Trust your inner knowing.';
    }
    /**
     * Check if card is healing-oriented
     */
    isHealingCard(card) {
        const healingKeywords = ['healing', 'restoration', 'renewal', 'recovery', 'peace', 'harmony', 'balance'];
        const text = `${card.name} ${card.narrative.theme} ${card.narrative.meaning.upright}`.toLowerCase();
        return healingKeywords.some(keyword => text.includes(keyword));
    }
    /**
     * Check if card is empowering
     */
    isEmpowermentCard(card) {
        const empowermentKeywords = ['strength', 'power', 'courage', 'wisdom', 'victory', 'success', 'manifestation'];
        const text = `${card.name} ${card.narrative.theme} ${card.narrative.meaning.upright}`.toLowerCase();
        return empowermentKeywords.some(keyword => text.includes(keyword));
    }
    /**
     * Synthesize three-card reading
     */
    synthesizeThreeCard(cards, intent) {
        if (intent === 'time') {
            return `Your journey: ${cards[0].interpretation} This has led to ${cards[1].interpretation} And may lead to ${cards[2].interpretation}`;
        }
        else {
            return `Your situation: ${cards[0].interpretation} Consider this action: ${cards[1].interpretation} This could lead to: ${cards[2].interpretation}`;
        }
    }
    /**
     * Synthesize Celtic Cross reading
     */
    synthesizeCelticCross(cards) {
        const present = cards.find(c => c.position === 'present-situation');
        const challenge = cards.find(c => c.position === 'challenge-or-opportunity');
        const outcome = cards.find(c => c.position === 'final-outcome');
        return `Your current situation: ${present?.interpretation} The challenge or opportunity: ${challenge?.interpretation} The final outcome: ${outcome?.interpretation}`;
    }
    /**
     * Synthesize relationship reading
     */
    synthesizeRelationship(cards) {
        const you = cards.find(c => c.position === 'you');
        const them = cards.find(c => c.position === 'them');
        const connection = cards.find(c => c.position === 'connection');
        return `You: ${you?.interpretation} Them: ${them?.interpretation} Your connection: ${connection?.interpretation}`;
    }
    /**
     * Synthesize healing reading
     */
    synthesizeHealing(cards) {
        const strength = cards.find(c => c.position === 'inner-strength');
        const support = cards.find(c => c.position === 'support-available');
        const next = cards.find(c => c.position === 'next-step');
        return `Your inner strength: ${strength?.interpretation} Support available: ${support?.interpretation} Next step: ${next?.interpretation}`;
    }
    /**
     * Get reading history
     */
    getHistory() {
        return [...this.readingHistory];
    }
    /**
     * Clear history
     */
    clearHistory() {
        this.readingHistory = [];
    }
    /**
     * Get all cards
     */
    getAllCards() {
        return [...this.allCards];
    }
    /**
     * Get card by ID
     */
    getCard(id) {
        return this.allCards.find(card => card.id === id);
    }
    /**
     * Search cards
     */
    searchCards(query) {
        const lowerQuery = query.toLowerCase();
        return this.allCards.filter(card => card.name.toLowerCase().includes(lowerQuery) ||
            card.narrative.theme.toLowerCase().includes(lowerQuery) ||
            card.narrative.keywords.some(k => k.toLowerCase().includes(lowerQuery)));
    }
}
// Export singleton instance
export const tarotEngine = new FunctionalTarotEngine();
// Export for easy use
export default tarotEngine;
//# sourceMappingURL=functional-tarot-engine.js.map