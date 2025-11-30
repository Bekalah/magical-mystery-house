/**
 * Configuration for models that should use simplified single-file read_file tool
 * These models will use the simpler <read_file><path>...</path></read_file> format
 * instead of the more complex multi-file args format
 */

/**
 * Check if a model should use single file read format
 * @param modelId The model ID to check
 * @returns true if the model should use single file reads
 */
/**
 * ⚗️ ShouldUseSingleFileRead - Solve et Coagula
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
export function shouldUseSingleFileRead(modelId: string): boolean {
	return modelId.includes("grok-code-fast-1") || modelId.includes("code-supernova")
}
