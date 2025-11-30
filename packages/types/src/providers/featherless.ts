import type { ModelInfo } from "../model.js"

/**
 * ⚗️ FeatherlessModelId - The Principle
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
export type FeatherlessModelId =
	| "deepseek-ai/DeepSeek-V3-0324"
	| "deepseek-ai/DeepSeek-R1-0528"
	| "moonshotai/Kimi-K2-Instruct"
	| "openai/gpt-oss-120b"
	| "Qwen/Qwen3-Coder-480B-A35B-Instruct"

export const featherlessModels = {
	"deepseek-ai/DeepSeek-V3-0324": {
		maxTokens: 4096,
		contextWindow: 32678,
		supportsImages: false,
		supportsPromptCache: false,
		inputPrice: 0,
		outputPrice: 0,
		description: "DeepSeek V3 0324 model.",
	},
	"deepseek-ai/DeepSeek-R1-0528": {
		maxTokens: 4096,
		contextWindow: 32678,
		supportsImages: false,
		supportsPromptCache: false,
		inputPrice: 0,
		outputPrice: 0,
		description: "DeepSeek R1 0528 model.",
	},
	"moonshotai/Kimi-K2-Instruct": {
		maxTokens: 4096,
		contextWindow: 32678,
		supportsImages: false,
		supportsPromptCache: false,
		inputPrice: 0,
		outputPrice: 0,
		description: "Kimi K2 Instruct model.",
	},
	"openai/gpt-oss-120b": {
		maxTokens: 4096,
		contextWindow: 32678,
		supportsImages: false,
		supportsPromptCache: false,
		inputPrice: 0,
		outputPrice: 0,
		description: "GPT-OSS 120B model.",
	},
	"Qwen/Qwen3-Coder-480B-A35B-Instruct": {
		maxTokens: 4096,
		contextWindow: 32678,
		supportsImages: false,
		supportsPromptCache: false,
		inputPrice: 0,
		outputPrice: 0,
		description: "Qwen3 Coder 480B A35B Instruct model.",
	},
} as const satisfies Record<string, ModelInfo>

export const featherlessDefaultModelId: FeatherlessModelId = "deepseek-ai/DeepSeek-R1-0528"
