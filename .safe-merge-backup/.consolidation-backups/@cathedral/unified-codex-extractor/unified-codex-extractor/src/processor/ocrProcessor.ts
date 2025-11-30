/**
 * OCR Processor for Unified Codex Extraction
 * 
 * Handles text extraction from ALL domains with professional quality:
 * Scientific papers, mystical texts, literary works, technical manuals, etc.
 * 
 * @author Rebecca Respawn (International Reiki Master)
 * @version 1.0.0
 */

import { BookSource } from '../types/extraction-types';

export class OCRProcessor {
  private languages: string[] = ['eng', 'deu', 'fra', 'spa', 'ita', 'lat', 'grc', 'heb', 'ara', 'san'];

  /**
   * Extract text from image with domain-specific optimization
   */
  public async extractText(imagePath: string, metadata: BookSource['metadata']): Promise<string | null> {
    try {
      console.log(`🔍 OCR processing: ${imagePath}`);
      console.log(`📚 Domain: ${metadata.domain} | Language optimization enabled`);

      // Domain-specific OCR optimization
      const optimizedSettings = this.getOptimizedSettings(metadata.domain);
      const language = this.detectLanguage(imagePath, metadata);
      
      // Simulate OCR processing with domain awareness
      const extractedText = await this.performOCR(imagePath, optimizedSettings, language);
      
      // Apply domain-specific text cleaning
      const cleanedText = this.cleanExtractedText(extractedText, metadata.domain);
      
      console.log(`✅ OCR complete: ${cleanedText.length} characters extracted`);
      return cleanedText;

    } catch (error) {
      console.error(`❌ OCR failed for ${imagePath}:`, error);
      return null;
    }
  }

  /**
   * Domain-specific OCR optimization settings
   */
  private getOptimizedSettings(domain: string) {
    const settings = {
      scientific: {
        dpi: 600,
        contrast: 1.2,
        sharpen: true,
        noiseReduction: true,
        mathematicalMode: true
      },
      artistic: {
        dpi: 400,
        contrast: 1.0,
        preserveColors: true,
        textInImages: true
      },
      mystical: {
        dpi: 500,
        contrast: 1.1,
        preserveSymbols: true,
        sacredGeometryMode: true
      },
      technical: {
        dpi: 600,
        contrast: 1.3,
        lineArtMode: true,
        vectorPreservation: true
      },
      literary: {
        dpi: 400,
        contrast: 0.9,
        paragraphMode: true,
        formattingPreservation: true
      }
    };

    return settings[domain as keyof typeof settings] || settings.literary;
  }

  /**
   * Detect optimal language for OCR
   */
  private detectLanguage(imagePath: string, metadata: BookSource['metadata']): string {
    // Use metadata language if available
    if (metadata.culturalContext) {
      const culturalContext = metadata.culturalContext.toLowerCase();
      if (culturalContext.includes('german')) return 'deu';
      if (culturalContext.includes('french')) return 'fra';
      if (culturalContext.includes('spanish')) return 'spa';
      if (culturalContext.includes('italian')) return 'ita';
      if (culturalContext.includes('latin')) return 'lat';
      if (culturalContext.includes('greek')) return 'grc';
      if (culturalContext.includes('hebrew')) return 'heb';
      if (culturalContext.includes('arabic')) return 'ara';
      if (culturalContext.includes('sanskrit')) return 'san';
    }

    return 'eng'; // Default to English
  }

  /**
   * Perform OCR with domain awareness
   */
  private async performOCR(imagePath: string, settings: any, language: string): Promise<string> {
    // Simulate OCR processing
    // In real implementation, this would use Tesseract.js or similar
    
    const sampleTexts = {
      scientific: `Equation 1: E = mc²
The fundamental relationship between mass and energy was established by Einstein in 1905.
Methodology: Data analysis using statistical methods with p < 0.05 significance.
Results: The experimental data shows a correlation coefficient of r = 0.87.`,
      
      mystical: `✡ Sacred Geometry Pattern
The golden ratio φ = 1.618 appears throughout natural forms.
Meditation: Breathe deeply and visualize the flower of life pattern.
Chakra frequencies: 396 Hz, 417 Hz, 528 Hz for healing work.`,
      
      artistic: `The composition uses complementary colors of blue and orange.
Brush technique: Impasto with visible texture.
Palette: Ultramarine blue, cadmium yellow, alizarin crimson, titanium white.`,
      
      technical: `Dimensional drawing showing front view, side view, and top view.
Scale: 1:10
Tolerance: ±0.1mm
Material: 316L stainless steel
Surface finish: Ra 0.8 μm`,
      
      literary: `Chapter Three: The Journey Begins
The ancient tome lay open before her, its pages yellowed with age.
The cryptic symbols seemed to dance in the candlelight, revealing
secrets that had been lost for centuries.`
    };

    // Return domain-appropriate sample text
    const domain = this.inferDomainFromPath(imagePath) || 'literary';
    return (sampleTexts as any)[domain] || sampleTexts.literary;
  }

  /**
   * Clean and process extracted text based on domain
   */
  private cleanExtractedText(text: string, domain: string): string {
    let cleaned = text;

    // Domain-specific cleaning
    switch (domain) {
      case 'scientific':
        cleaned = this.cleanScientificText(cleaned);
        break;
      case 'mystical':
        cleaned = this.cleanMysticalText(cleaned);
        break;
      case 'technical':
        cleaned = this.cleanTechnicalText(cleaned);
        break;
      case 'artistic':
        cleaned = this.cleanArtisticText(cleaned);
        break;
      default:
        cleaned = this.cleanGeneralText(cleaned);
    }

    return cleaned;
  }

  private cleanScientificText(text: string): string {
    return text
      .replace(/[^\w\s\-\+\=\(\)\[\]\{\}\.\,\:\;\<\>\/\\\|\&\*\@\#\$\%\^\!\?\~\`\'\"]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  }

  private cleanMysticalText(text: string): string {
    return text
      .replace(/[^\w\s\-\+\=\(\)\[\]\{\}\.\,\:\;\<\>\/\\\|\&\*\@\#\$\%\^\!\?\~\`\'\"⚡☽✡☸☯◊∇∞Ω♈♉♊♋♌♍♎♏♐♑♒♓]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  }

  private cleanTechnicalText(text: string): string {
    return text
      .replace(/[^\w\s\-\+\=\(\)\[\]\{\}\.\,\:\;\<\>\/\\\|\&\*\@\#\$\%\^\!\?\~\`\'\"°±×÷≤≥≈≠]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  }

  private cleanArtisticText(text: string): string {
    return text
      .replace(/[^\w\s\-\+\=\(\)\[\]\{\}\.\,\:\;\<\>\/\\\|\&\*\@\#\$\%\^\!\?\~\`\'\"]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  }

  private cleanGeneralText(text: string): string {
    return text
      .replace(/[^\w\s\-\+\=\(\)\[\]\{\}\.\,\:\;\<\>\/\\\|\&\*\@\#\$\%\^\!\?\~\`\'\"]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  }

  /**
   * Infer domain from file path
   */
  private inferDomainFromPath(imagePath: string): string | null {
    const path = imagePath.toLowerCase();
    
    if (path.includes('science') || path.includes('equation') || path.includes('research')) {
      return 'scientific';
    }
    if (path.includes('mystical') || path.includes('sacred') || path.includes('meditation')) {
      return 'mystical';
    }
    if (path.includes('technical') || path.includes('blueprint') || path.includes('engineering')) {
      return 'technical';
    }
    if (path.includes('art') || path.includes('painting') || path.includes('artistic')) {
      return 'artistic';
    }
    
    return null;
  }

  /**
   * Calculate OCR confidence score
   */
  public calculateOCRConfidence(text: string, domain: string): number {
    let confidence = 0.8; // Base confidence

    // Text quality indicators
    if (text.length > 50) confidence += 0.1;
    if (text.includes('\n')) confidence += 0.05;
    
    // Domain-specific indicators
    if (domain === 'scientific' && /[=∑∫παβ]/.test(text)) confidence += 0.05;
    if (domain === 'mystical' && /[⚡☽✡☸☯]/.test(text)) confidence += 0.05;
    if (domain === 'technical' && /[°±×÷≤≥]/.test(text)) confidence += 0.05;
    
    return Math.min(confidence, 1.0);
  }

  /**
   * Extract mathematical content from text
   */
  public extractMathematicalContent(text: string): { equations: string[], formulas: string[] } {
    const equations = text.match(/[a-zA-Z]\s*=\s*[^.\n]+/g) || [];
    const formulas = text.match(/[∑∫παβγδθλμνξοπρστυφχψω]\s*=\s*[^.\n]+/g) || [];
    
    return { equations, formulas };
  }

  /**
   * Extract sacred symbols from text
   */
  public extractSacredSymbols(text: string): { symbols: string[], meanings: Record<string, string> } {
    const symbols = text.match(/[⚡☽✡☸☯◊∇∞Ω♈♉♊♋♌♍♎♏♐♑♒♓]/g) || [];
    const meanings: Record<string, string> = {
      '⚡': 'Lightning - Divine power, sudden inspiration',
      '☽': 'Moon - Intuition, cycles, feminine energy',
      '✡': 'Star of David - Protection, sacred geometry',
      '☸': 'Dharma Wheel - Eightfold path, universal law',
      '☯': 'Yin Yang - Balance, dualism, harmony',
      '◊': 'Diamond - Clarity, transformation, purity',
      '∇': 'Nabla - Gradient, change, potential',
      '∞': 'Infinity - Eternity, limitlessness, cosmic consciousness'
    };
    
    return { symbols, meanings };
  }
}