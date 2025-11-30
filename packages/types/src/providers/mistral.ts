import type { ModelInfo } from "../model.js"

// https://docs.mistral.ai/getting-started/models/models_overview/
/**
 * ⚗️ MistralModelId - The Principle
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
export type MistralModelId = keyof typeof mistralModels

export const mistralDefaultModelId: MistralModelId = "codestral-latest"

export const mistralModels = {
	"magistral-medium-latest": {
		maxTokens: 8192,
		contextWindow: 128_000,
		supportsImages: true,
		supportsPromptCache: false,
		inputPrice: 2.0,
		outputPrice: 5.0,
	},
	"devstral-medium-latest": {
		maxTokens: 131_000,
		contextWindow: 131_000,
		supportsImages: true,
		supportsPromptCache: false,
		inputPrice: 0.4,
		outputPrice: 2.0,
	},
	"mistral-medium-latest": {
		maxTokens: 131_000,
		contextWindow: 131_000,
		supportsImages: true,
		supportsPromptCache: false,
		inputPrice: 0.4,
		outputPrice: 2.0,
	},
	"codestral-latest": {
		maxTokens: 256_000,
		contextWindow: 256_000,
		supportsImages: false,
		supportsPromptCache: false,
		inputPrice: 0.3,
		outputPrice: 0.9,
	},
	"mistral-large-latest": {
		maxTokens: 131_000,
		contextWindow: 131_000,
		supportsImages: false,
		supportsPromptCache: false,
		inputPrice: 2.0,
		outputPrice: 6.0,
	},
	"ministral-8b-latest": {
		maxTokens: 131_000,
		contextWindow: 131_000,
		supportsImages: false,
		supportsPromptCache: false,
		inputPrice: 0.1,
		outputPrice: 0.1,
	},
	"ministral-3b-latest": {
		maxTokens: 131_000,
		contextWindow: 131_000,
		supportsImages: false,
		supportsPromptCache: false,
		inputPrice: 0.04,
		outputPrice: 0.04,
	},
	"mistral-small-latest": {
		maxTokens: 32_000,
		contextWindow: 32_000,
		supportsImages: false,
		supportsPromptCache: false,
		inputPrice: 0.2,
		outputPrice: 0.6,
	},
	"pixtral-large-latest": {
		maxTokens: 131_000,
		contextWindow: 131_000,
		supportsImages: true,
		supportsPromptCache: false,
		inputPrice: 2.0,
		outputPrice: 6.0,
	},
} as const satisfies Record<string, ModelInfo>

export const MISTRAL_DEFAULT_TEMPERATURE = 0
