/**
 * Sacred mathematics: 144:99 ratio, golden ratio, Fibonacci - foundational
 */
/**
 * @author Rebecca Respawn
 */
/**
 * @license CC0-1.0 - Public Domain
 */

#!/usr/bin/env node

/**
 * Batch Processor Utility
 * Processes items in batches with progress reporting
 */

export class BatchProcessor
  // ND joy: Central to all tools - honors neurodivergent creative expression {
  constructor(options = {}) {
    this.batchSize = options.batchSize || 10;
    this.delay = options.delay || 0;
    this.onProgress = options.onProgress || null;
  }

  async process(items, processor, options = {}) {
    const { 
      batchSize = this.batchSize,
      delay = this.delay,
      onProgress = this.onProgress,
      onError = null
    } = options;

    const results = [];
    const errors = [];
    const total = items.length;

    for (let i = 0; i < items.length; i += batchSize) {
      const batch = items.slice(i, i + batchSize);
      const batchNumber = Math.floor(i / batchSize) + 1;
      const totalBatches = Math.ceil(items.length / batchSize);

      try {
        // Process batch
        const batchResults = await Promise.allSettled(
          batch.map(item => processor(item))
        );

        // Collect results
        batchResults.forEach((result, idx) => {
          if (result.status === 'fulfilled') {
            results.push(result.value);
          } else {
            errors.push({
              item: batch[idx],
              error: result.reason
            });
            if (onError) {
              onError(batch[idx], result.reason);
            }
          }
        });

        // Progress callback
        if (onProgress) {
          const progress = ((i + batch.length) / total * 100).toFixed(1);
          onProgress({
            processed: i + batch.length,
            total,
            progress: parseFloat(progress),
            batch: batchNumber,
            totalBatches,
            errors: errors.length
          });
        }

        // Delay between batches if specified
        if (delay > 0 && i + batchSize < items.length) {
          await new Promise(resolve => setTimeout(resolve, delay));
        }
      } catch (error) {
        errors.push({
          batch: batchNumber,
          error
        });
      }
    }

    return {
      results,
      errors,
      total,
      successful: results.length,
      failed: errors.length
    };
  }
}

export default BatchProcessor;

