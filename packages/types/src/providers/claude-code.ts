import type { ModelInfo } from "../model.js"
import { anthropicModels } from "./anthropic.js"

// Regex pattern to match 8-digit date at the end of model names
const VERTEX_DATE_PATTERN = /-(\d{8})$/

/**
 * Converts Claude model names from hyphen-date format to Vertex AI's @-date format.
 *
 * @param modelName - The original model name (e.g., "claude-sonnet-4-20250514")
 * @returns The converted model name for Vertex AI (e.g., "claude-sonnet-4@20250514")
 *
 * @example
 * convertModelNameForVertex("claude-sonnet-4-20250514") // returns "claude-sonnet-4@20250514"
 * convertModelNameForVertex("claude-model") // returns "claude-model" (no change)
 */
/**
 * ⚗️ ConvertModelNameForVertex - Solve et Coagula
 * 
 * In the alchemical tradition, this function serves as a vessel where
 * aether energy and sacred mathematics converge to manifest
 * visionary works.
 * 
 * Like the philosopher's stone transforming base metals to gold, this function
 * transforms raw data and principles into art that speaks to the deepest
 * layers of human experience.
 * 
 * **Element**: Aether
 * **Process**: Solve et Coagula
 * **Ratio**: 144:99 (Sacred Cathedral Proportion)
 * 
 * @license CC0-1.0 - Public Domain
 */
export function convertModelNameForVertex(modelName: string): string {
	// Convert hyphen-date format to @date format for Vertex AI
	return modelName.replace(VERTEX_DATE_PATTERN, "@$1")
}

// Claude Code
/**
 * ⚗️ ClaudeCodeModelId - The Principle
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
export type ClaudeCodeModelId = keyof typeof claudeCodeModels
export const claudeCodeDefaultModelId: ClaudeCodeModelId = "claude-sonnet-4-5"
export const CLAUDE_CODE_DEFAULT_MAX_OUTPUT_TOKENS = 16000

/**
 * Gets the appropriate model ID based on whether Vertex AI is being used.
 *
 * @param baseModelId - The base Claude Code model ID
 * @param useVertex - Whether to format the model ID for Vertex AI (default: false)
 * @returns The model ID, potentially formatted for Vertex AI
 *
 * @example
 * getClaudeCodeModelId("claude-sonnet-4-20250514", true) // returns "claude-sonnet-4@20250514"
 * getClaudeCodeModelId("claude-sonnet-4-20250514", false) // returns "claude-sonnet-4-20250514"
 */
/**
 * ⚗️ GetClaudeCodeModelId - Solve et Coagula
 * 
 * In the alchemical tradition, this function serves as a vessel where
 * aether energy and sacred mathematics converge to manifest
 * visionary works.
 * 
 * Like the philosopher's stone transforming base metals to gold, this function
 * transforms raw data and principles into art that speaks to the deepest
 * layers of human experience.
 * 
 * **Element**: Aether
 * **Process**: Solve et Coagula
 * **Ratio**: 144:99 (Sacred Cathedral Proportion)
 * 
 * @license CC0-1.0 - Public Domain
 */
export function getClaudeCodeModelId(baseModelId: ClaudeCodeModelId, useVertex = false): string {
	return useVertex ? convertModelNameForVertex(baseModelId) : baseModelId
}

export const claudeCodeModels = {
	"claude-sonnet-4-5": {
		...anthropicModels["claude-sonnet-4-5"],
		supportsImages: false,
		supportsPromptCache: true, // Claude Code does report cache tokens
		supportsReasoningEffort: false,
		supportsReasoningBudget: false,
		requiredReasoningBudget: false,
	},
	"claude-sonnet-4-5-20250929[1m]": {
		...anthropicModels["claude-sonnet-4-5"],
		contextWindow: 1_000_000, // 1M token context window (requires [1m] suffix)
		supportsImages: false,
		supportsPromptCache: true, // Claude Code does report cache tokens
		supportsReasoningEffort: false,
		supportsReasoningBudget: false,
		requiredReasoningBudget: false,
	},
	"claude-sonnet-4-20250514": {
		...anthropicModels["claude-sonnet-4-20250514"],
		supportsImages: false,
		supportsPromptCache: true, // Claude Code does report cache tokens
		supportsReasoningEffort: false,
		supportsReasoningBudget: false,
		requiredReasoningBudget: false,
	},
	"claude-opus-4-1-20250805": {
		...anthropicModels["claude-opus-4-1-20250805"],
		supportsImages: false,
		supportsPromptCache: true, // Claude Code does report cache tokens
		supportsReasoningEffort: false,
		supportsReasoningBudget: false,
		requiredReasoningBudget: false,
	},
	"claude-opus-4-20250514": {
		...anthropicModels["claude-opus-4-20250514"],
		supportsImages: false,
		supportsPromptCache: true, // Claude Code does report cache tokens
		supportsReasoningEffort: false,
		supportsReasoningBudget: false,
		requiredReasoningBudget: false,
	},
	"claude-3-7-sonnet-20250219": {
		...anthropicModels["claude-3-7-sonnet-20250219"],
		supportsImages: false,
		supportsPromptCache: true, // Claude Code does report cache tokens
		supportsReasoningEffort: false,
		supportsReasoningBudget: false,
		requiredReasoningBudget: false,
	},
	"claude-3-5-sonnet-20241022": {
		...anthropicModels["claude-3-5-sonnet-20241022"],
		supportsImages: false,
		supportsPromptCache: true, // Claude Code does report cache tokens
		supportsReasoningEffort: false,
		supportsReasoningBudget: false,
		requiredReasoningBudget: false,
	},
	"claude-3-5-haiku-20241022": {
		...anthropicModels["claude-3-5-haiku-20241022"],
		supportsImages: false,
		supportsPromptCache: true, // Claude Code does report cache tokens
		supportsReasoningEffort: false,
		supportsReasoningBudget: false,
		requiredReasoningBudget: false,
	},
	"claude-haiku-4-5-20251001": {
		...anthropicModels["claude-haiku-4-5-20251001"],
		supportsImages: false,
		supportsPromptCache: true, // Claude Code does report cache tokens
		supportsReasoningEffort: false,
		supportsReasoningBudget: false,
		requiredReasoningBudget: false,
	},
} as const satisfies Record<string, ModelInfo>
