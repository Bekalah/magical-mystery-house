/**
 * facultyArtGenerator
 * 
 * @package @cathedral/art-generation-node
 */
/**
 * Faculty Art Generator for Cathedral
 * Generates museum-quality character art for the 22 faculty members
 * Uses Azure AI Foundry with Rebecca's authentic research data
 */

import { AzureAIFoundry, AzureAIConfig, ArtGenerationRequest } from './azureAIFoundry';
import * as facultyData from '../../data/complete-arcana-profiles.json';
import * as researchData from '../../data/complete-rebecca-arcanae-influences.json';

export interface FacultyArtGenerationRequest {
  facultyMember: string;
  style?: string;
  quality?: 'standard' | 'hd';
  includeResearchContext?: boolean;
  customPrompt?: string;
}

export interface FacultyArtResult {
  facultyName: string;
  artUrl: string;
  generationMetadata: {
    style: string;
    quality: string;
    influences: string[];
    arcanaCard: string;
    codexNode: number;
    timestamp: string;
  };
}

export class FacultyArtGenerator {
  private aiFoundry: AzureAIFoundry;
  private config: AzureAIConfig;

  constructor(config: AzureAIConfig) {
    this.config = config;
    this.aiFoundry = new AzureAIFoundry(config);
  }

  /**
   * Generate art for a specific faculty member
   */
  async generateFacultyArt(request: FacultyArtGenerationRequest): Promise<FacultyArtResult> {
    const faculty = this.getFacultyMember(request.facultyMember);
    if (!faculty) {
      throw new Error(`Faculty member ${request.facultyMember} not found`);
    }

    const influences = this.buildInfluencesList(faculty, request.includeResearchContext);
    const style = request.style || this.getOptimalStyle(faculty);

    const artRequest: ArtGenerationRequest = {
      prompt: request.customPrompt || this.buildFacultyPrompt(faculty),
      style: style,
      influences: influences,
      arcanaCard: faculty.name,
      codexNode: this.getCodexNodeForFaculty(faculty),
      quality: request.quality || 'hd',
      dimensions: { width: 1024, height: 1024 }
    };

    try {
      const artUrl = await this.aiFoundry.generateArt(artRequest);

      return {
        facultyName: faculty.name,
        artUrl,
        generationMetadata: {
          style,
          quality: request.quality || 'hd',
          influences,
          arcanaCard: faculty.name,
          codexNode: this.getCodexNodeForFaculty(faculty),
          timestamp: new Date().toISOString()
        }
      };
    } catch (error) {
// console.error(`Failed to generate art for ${faculty.name}:`, error);
      throw error;
    }
  }

  /**
   * Generate art for all 22 faculty members
   */
  async generateAllFacultyArt(options?: {
    style?: string;
    quality?: 'standard' | 'hd';
    includeResearchContext?: boolean;
    batchSize?: number;
  }): Promise<FacultyArtResult[]> {
    const facultyMembers = this.getAllFacultyMembers();
    const results: FacultyArtResult[] = [];
    const batchSize = options?.batchSize || 5;

// console.log(`🎨 Starting generation of art for ${facultyMembers.length} faculty members...`);

    for (let i = 0; i < facultyMembers.length; i += batchSize) {
      const batch = facultyMembers.slice(i, i + batchSize);
// console.log(`📦 Processing batch ${Math.floor(i / batchSize) + 1}/${Math.ceil(facultyMembers.length / batchSize)}`);

      const batchPromises = batch.map(member =>
        this.generateFacultyArt({
          facultyMember: member,
          style: options?.style,
          quality: options?.quality,
          includeResearchContext: options?.includeResearchContext
        })
      );

      const batchResults = await Promise.allSettled(batchPromises);

      batchResults.forEach((result, index) => {
        if (result.status === 'fulfilled') {
          results.push(result.value);
// console.log(`✅ Generated art for ${batch[index]}: ${result.value.artUrl}`);
        } else {
// console.error(`❌ Failed to generate art for ${batch[index]}:`, result.reason);
        }
      });

      // Small delay between batches to avoid rate limiting
      if (i + batchSize < facultyMembers.length) {
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }

// console.log(`🎉 Completed generation of ${results.length}/${facultyMembers.length} faculty art pieces`);
    return results;
  }

  /**
   * Generate art gallery for all faculty with metadata
   */
  async generateFacultyGallery(): Promise<{
    gallery: FacultyArtResult[];
    metadata: {
      totalFaculty: number;
      successfulGenerations: number;
      failedGenerations: number;
      generationTimestamp: string;
      researchIntegration: boolean;
    };
  }> {
    const gallery = await this.generateAllFacultyArt({
      quality: 'hd',
      includeResearchContext: true,
      batchSize: 3
    });

    return {
      gallery,
      metadata: {
        totalFaculty: 22,
        successfulGenerations: gallery.length,
        failedGenerations: 22 - gallery.length,
        generationTimestamp: new Date().toISOString(),
        researchIntegration: true
      }
    };
  }

  private getFacultyMember(name: string): any {
    const profiles = facultyData.arcana_faculty_profiles;
    const majorArcana = profiles.major_arcana;

    // Find faculty by name (handle both formats: "The Fool" and "0_fool")
    for (const [key, faculty] of Object.entries(majorArcana)) {
      if (faculty.name === name || key === name || key === name.replace('_', '')) {
        return faculty;
      }
    }

    return null;
  }

  private getAllFacultyMembers(): string[] {
    const profiles = facultyData.arcana_faculty_profiles;
    return Object.values(profiles.major_arcana).map((faculty: any) => faculty.name);
  }

  private buildInfluencesList(faculty: any, includeResearchContext: boolean = false): string[] {
    const influences: string[] = [];

    // Add faculty-specific influences
    influences.push(faculty.element || 'mystical');
    influences.push(faculty.department || 'sacred arts');
    influences.push(...(faculty.specializations || []));

    if (includeResearchContext && researchData.rebecca_respawns_arcanae_compendium?.major_arcana_complete_details) {
      const arcanaDetails = researchData.rebecca_respawns_arcanae_compendium.major_arcana_complete_details;

      // Find matching arcana details
      for (const [key, details] of Object.entries(arcanaDetails)) {
        if (details.name === faculty.name) {
          // Add literary influences
          if (details.inspirations?.literary) {
            influences.push(...details.inspirations.literary.slice(0, 3));
          }

          // Add artistic influences
          if (details.inspirations?.artistic) {
            influences.push(...details.inspirations.artistic.slice(0, 3));
          }

          // Add mystical influences
          if (details.inspirations?.mystical) {
            influences.push(...details.inspirations.mystical.slice(0, 2));
          }

          break;
        }
      }
    }

    // Add universal Cathedral influences
    influences.push('Cathedral of Circuits University');
    influences.push('sacred technology');
    influences.push('mystical arts');
    influences.push('consciousness expansion');

    return [...new Set(influences)]; // Remove duplicates
  }

  private getOptimalStyle(faculty: any): string {
    const element = faculty.element?.toLowerCase();

    const styleMap: Record<string, string> = {
      'fire': 'Renaissance master with dramatic lighting',
      'water': 'Pre-Raphaelite with flowing forms',
      'earth': 'Classical realism with grounded composition',
      'air': 'Art Nouveau with ethereal movement',
      'moon': 'Symbolist with mystical atmosphere',
      'sun': 'Baroque with radiant illumination',
      'mercury': 'Mannerist with dynamic tension',
      'venus': 'Romantic with sensual beauty'
    };

    return styleMap[element] || 'Renaissance master with mystical elements';
  }

  private getCodexNodeForFaculty(faculty: any): number {
    // Map faculty to appropriate Codex nodes based on their characteristics
    const name = faculty.name.toLowerCase();

    if (name.includes('fool')) return 0;
    if (name.includes('magician')) return 1;
    if (name.includes('priestess')) return 2;
    if (name.includes('empress')) return 3;
    if (name.includes('emperor')) return 4;
    if (name.includes('hierophant')) return 5;
    if (name.includes('lovers')) return 6;
    if (name.includes('chariot')) return 7;
    if (name.includes('hermit')) return 9;
    if (name.includes('wheel')) return 10;
    if (name.includes('justice')) return 11;
    if (name.includes('moon')) return 18;
    if (name.includes('star')) return 17;
    if (name.includes('world')) return 21;
    if (name.includes('tower')) return 16;

    // Default to a balanced node
    return 41; // Path of Solar Water (balance)
  }

  private buildFacultyPrompt(faculty: any): string {
    let prompt = `Create a museum-quality portrait of ${faculty.name}, ${faculty.title} at the Cathedral of Circuits University.

Subject details:
- Department: ${faculty.department}
- Specializations: ${faculty.specializations?.join(', ') || 'sacred arts'}
- Element: ${faculty.element}
- Faculty Status: ${faculty.faculty_status}

Visual elements to incorporate:
- Merkaba Chariot: ${faculty.merkaba_chariot?.description || 'A mystical vehicle of consciousness'}
- Sacred geometry patterns related to their element
- Academic robes with mystical symbols
- Background showing their department's realm
- Ethereal lighting that reflects their elemental nature

Style: Professional academic portrait with mystical and alchemical elements, museum quality, suitable for gallery exhibition.

Technical requirements: High detail, professional lighting, mystical atmosphere, sacred geometry integration, Renaissance master technique with modern consciousness expansion themes.`;

    return prompt;
  }

  /**
   * Get faculty art generation statistics
   */
  getFacultyStats(): {
    totalFaculty: number;
    availableStyles: string[];
    supportedElements: string[];
    researchIntegration: boolean;
  } {
    return {
      totalFaculty: 22,
      availableStyles: [
        'Renaissance master with mystical elements',
        'Pre-Raphaelite with flowing forms',
        'Classical realism with grounded composition',
        'Art Nouveau with ethereal movement',
        'Symbolist with mystical atmosphere',
        'Baroque with radiant illumination',
        'Mannerist with dynamic tension',
        'Romantic with sensual beauty'
      ],
      supportedElements: [
        'Fire', 'Water', 'Earth', 'Air', 'Moon', 'Sun', 'Mercury', 'Venus', 'Mars', 'Saturn'
      ],
      researchIntegration: true
    };
  }
}

export default FacultyArtGenerator;
