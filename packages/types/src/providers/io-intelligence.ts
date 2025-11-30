import type { ModelInfo } from "../model.js"

/**
 * ⚗️ IOIntelligenceModelId - The Principle
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
export type IOIntelligenceModelId =
	| "deepseek-ai/DeepSeek-R1-0528"
	| "meta-llama/Llama-4-Maverick-17B-128E-Instruct-FP8"
	| "Intel/Qwen3-Coder-480B-A35B-Instruct-int4-mixed-ar"
	| "openai/gpt-oss-120b"

export const ioIntelligenceDefaultModelId: IOIntelligenceModelId = "meta-llama/Llama-4-Maverick-17B-128E-Instruct-FP8"

export const ioIntelligenceDefaultBaseUrl = "https://api.intelligence.io.solutions/api/v1"

export const IO_INTELLIGENCE_CACHE_DURATION = 1000 * 60 * 60 // 1 hour

export const ioIntelligenceModels = {
	"deepseek-ai/DeepSeek-R1-0528": {
		maxTokens: 8192,
		contextWindow: 128000,
		supportsImages: false,
		supportsPromptCache: false,
		description: "DeepSeek R1 reasoning model",
	},
	"meta-llama/Llama-4-Maverick-17B-128E-Instruct-FP8": {
		maxTokens: 8192,
		contextWindow: 430000,
		supportsImages: true,
		supportsPromptCache: false,
		description: "Llama 4 Maverick 17B model",
	},
	"Intel/Qwen3-Coder-480B-A35B-Instruct-int4-mixed-ar": {
		maxTokens: 8192,
		contextWindow: 106000,
		supportsImages: false,
		supportsPromptCache: false,
		description: "Qwen3 Coder 480B specialized for coding",
	},
	"openai/gpt-oss-120b": {
		maxTokens: 8192,
		contextWindow: 131072,
		supportsImages: false,
		supportsPromptCache: false,
		description: "OpenAI GPT-OSS 120B model",
	},
} as const satisfies Record<string, ModelInfo>
