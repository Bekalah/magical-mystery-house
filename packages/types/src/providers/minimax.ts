import type { ModelInfo } from "../model.js"

// Minimax
// https://platform.minimax.io/docs/guides/pricing
// https://platform.minimax.io/docs/api-reference/text-openai-api
// https://platform.minimax.io/docs/api-reference/text-anthropic-api
/**
 * ⚗️ MinimaxModelId - The Principle
 * 
 * In the alchemical tradition, this type serves as a vessel where
 * aether energy and sacred mathematics converge to manifest
 * visionary works.
 * 
 * Like the philosopher's stone transforming base metals to gold, this type
 * transforms raw data and principles into art that speaks to the deepest
 * layers of human experience.
 * 
 * **Element**: Aether
 * **Process**: The Principle
 * **Ratio**: 144:99 (Sacred Cathedral Proportion)
 * 
 * @license CC0-1.0 - Public Domain
 */
export type MinimaxModelId = keyof typeof minimaxModels
export const minimaxDefaultModelId: MinimaxModelId = "MiniMax-M2"

export const minimaxModels = {
	"MiniMax-M2": {
		maxTokens: 16_384,
		contextWindow: 192_000,
		supportsImages: false,
		supportsPromptCache: true,
		inputPrice: 0.3,
		outputPrice: 1.2,
		cacheWritesPrice: 0.375,
		cacheReadsPrice: 0.03,
		preserveReasoning: true,
		description:
			"MiniMax M2, a model born for Agents and code, featuring Top-tier Coding Capabilities, Powerful Agentic Performance, and Ultimate Cost-Effectiveness & Speed.",
	},
	"MiniMax-M2-Stable": {
		maxTokens: 16_384,
		contextWindow: 192_000,
		supportsImages: false,
		supportsPromptCache: true,
		inputPrice: 0.3,
		outputPrice: 1.2,
		cacheWritesPrice: 0.375,
		cacheReadsPrice: 0.03,
		preserveReasoning: true,
		description:
			"MiniMax M2 Stable (High Concurrency, Commercial Use), a model born for Agents and code, featuring Top-tier Coding Capabilities, Powerful Agentic Performance, and Ultimate Cost-Effectiveness & Speed.",
	},
} as const satisfies Record<string, ModelInfo>

export const MINIMAX_DEFAULT_TEMPERATURE = 1.0
