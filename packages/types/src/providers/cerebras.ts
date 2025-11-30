import type { ModelInfo } from "../model.js"

// https://inference-docs.cerebras.ai/api-reference/chat-completions
/**
 * ⚗️ CerebrasModelId - The Principle
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
export type CerebrasModelId = keyof typeof cerebrasModels

export const cerebrasDefaultModelId: CerebrasModelId = "gpt-oss-120b"

export const cerebrasModels = {
	"zai-glm-4.6": {
		maxTokens: 16384, // consistent with their other models
		contextWindow: 131072,
		supportsImages: false,
		supportsPromptCache: false,
		inputPrice: 0,
		outputPrice: 0,
		description: "Highly intelligent general purpose model with up to 1,000 tokens/s",
	},
	"qwen-3-coder-480b-free": {
		maxTokens: 40000,
		contextWindow: 64000,
		supportsImages: false,
		supportsPromptCache: false,
		inputPrice: 0,
		outputPrice: 0,
		description:
			"[SOON TO BE DEPRECATED] SOTA coding model with ~2000 tokens/s ($0 free tier)\n\n• Use this if you don't have a Cerebras subscription\n• 64K context window\n• Rate limits: 150K TPM, 1M TPH/TPD, 10 RPM, 100 RPH/RPD\n\nUpgrade for higher limits: [https://cloud.cerebras.ai/?utm=Cathedral](https://cloud.cerebras.ai/?utm=Cathedral)",
	},
	"qwen-3-coder-480b": {
		maxTokens: 40000,
		contextWindow: 128000,
		supportsImages: false,
		supportsPromptCache: false,
		inputPrice: 0,
		outputPrice: 0,
		description:
			"[SOON TO BE DEPRECATED] SOTA coding model with ~2000 tokens/s ($50/$250 paid tiers)\n\n• Use this if you have a Cerebras subscription\n• 131K context window with higher rate limits",
	},
	"qwen-3-235b-a22b-instruct-2507": {
		maxTokens: 64000,
		contextWindow: 64000,
		supportsImages: false,
		supportsPromptCache: false,
		inputPrice: 0,
		outputPrice: 0,
		description: "Intelligent model with ~1400 tokens/s",
	},
	"llama-3.3-70b": {
		maxTokens: 64000,
		contextWindow: 64000,
		supportsImages: false,
		supportsPromptCache: false,
		inputPrice: 0,
		outputPrice: 0,
		description: "Powerful model with ~2600 tokens/s",
	},
	"qwen-3-32b": {
		maxTokens: 64000,
		contextWindow: 64000,
		supportsImages: false,
		supportsPromptCache: false,
		inputPrice: 0,
		outputPrice: 0,
		description: "SOTA coding performance with ~2500 tokens/s",
	},
	"qwen-3-235b-a22b-thinking-2507": {
		maxTokens: 40000,
		contextWindow: 65000,
		supportsImages: false,
		supportsPromptCache: false,
		inputPrice: 0,
		outputPrice: 0,
		description: "SOTA performance with ~1500 tokens/s",
		supportsReasoningEffort: true,
	},
	"gpt-oss-120b": {
		maxTokens: 8000,
		contextWindow: 64000,
		supportsImages: false,
		supportsPromptCache: false,
		inputPrice: 0,
		outputPrice: 0,
		description:
			"OpenAI GPT OSS model with ~2800 tokens/s\n\n• 64K context window\n• Excels at efficient reasoning across science, math, and coding",
	},
} as const satisfies Record<string, ModelInfo>
