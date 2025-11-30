/**
 * 🏛️ Cathedral Hall of Ateliers - Core TypeScript Interfaces
 * Professional artistic creation and collaboration systems
 * Body component of Trinity Architecture
 */

/**
 * ⚗️ Persona - The Principle
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
export type Persona = 'professional' | 'atelier_master' | 'davinci_grade' | 'mystical' | 'trauma_safe';

// ============================================================================
// ENUMS AND CORE TYPES
// ============================================================================

export enum ArtisticMedium {
  PAINTING = 'painting',
  SCULPTURE = 'sculpture', 
  DRAWING = 'drawing',
  DIGITAL_ART = 'digital_art',
  PHOTOGRAPHY = 'photography',
  PRINTMAKING = 'printmaking',
  CERAMICS = 'ceramics',
  METALWORK = 'metalwork',
  TEXTILES = 'textiles',
  GLASSWORK = 'glasswork',
  WOODWORKING = 'woodworking',
  JEWELRY = 'jewelry',
  COLLAGE = 'collage',
  MIXED_MEDIA = 'mixed_media'
}

export enum CreativeStyle {
  REALISM = 'realism',
  IMPRESSIONISM = 'impressionism',
  EXPRESSIONISM = 'expressionism',
  ABSTRACT = 'abstract',
  SURREALISM = 'surrealism',
  CUBISM = 'cubism',
  BAROQUE = 'baroque',
  RENAISSANCE = 'renaissance',
  ART_NOUVEAU = 'art_nouveau',
  GOTHIC = 'gothic',
  CONTEMPORARY = 'contemporary',
  MINIMALIST = 'minimalist',
  MAXIMALIST = 'maximalist',
  STEAMPUNK = 'steampunk',
  CYBERPUNK = 'cyberpunk',
  MYSTICAL = 'mystical'
}

export enum SkillLevel {
  BEGINNER = 'beginner',
  NOVICE = 'novice',
  INTERMEDIATE = 'intermediate',
  ADVANCED = 'advanced',
  EXPERT = 'expert',
  MASTER = 'master'
}

export enum StudioType {
  PHYSICAL = 'physical',
  VIRTUAL = 'virtual',
  HYBRID = 'hybrid'
}

export enum ProjectStatus {
  PLANNING = 'planning',
  ACTIVE = 'active',
  COMPLETED = 'completed',
  ARCHIVED = 'archived'
}

export enum ProjectType {
  COMMISSION = 'commission',
  PERSONAL = 'personal',
  COLLABORATION = 'collaboration',
  EXHIBITION = 'exhibition'
}

export enum MaterialCategory {
  PIGMENT = 'pigment',
  SUPPORT = 'support',
  BRUSH = 'brush',
  TOOL = 'tool',
  MEDIUM = 'medium',
  METAL = 'metal',
  FABRIC = 'fabric',
  DIGITAL = 'digital'
}

export enum QualityGrade {
  STUDENT = 'student',
  ARTIST = 'artist',
  PROFESSIONAL = 'professional',
  ARCHIVAL = 'archival'
}

// ============================================================================
// CORE DATA STRUCTURES
// ============================================================================

/**
 * ⚗️ RGB - The Principle
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
export interface RGB {
  r: number; // 0-1
  g: number; // 0-1
  b: number; // 0-1
}

/**
 * ⚗️ ColorPalette - The Principle
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
export interface ColorPalette {
  primary: RGB;
  secondary: RGB;
  accent: RGB;
  neutral: RGB;
}

/**
 * ⚗️ SafetyProtocol - The Principle
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
export interface SafetyProtocol {
  name: string;
  description: string;
  requiredEquipment: string[];
  emergencyProcedures: string[];
}

/**
 * ⚗️ AccessibilityFeature - The Principle
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
export interface AccessibilityFeature {
  type: string;
  description: string;
  compliance: string[];
}

// ============================================================================
// ARTIST PROFILE SYSTEM
// ============================================================================

/**
 * ⚗️ ArtistProfile - The Principle
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
export interface ArtistProfile {
  id: string;
  name: string;
  primaryMedium: ArtisticMedium;
  secondaryMediums: ArtisticMedium[];
  preferredStyles: CreativeStyle[];
  skillLevel: SkillLevel;
  specializations: string[];
  portfolioPieces: number;
  collaborationHistory: string[];
  artisticInfluences: string[];
  currentProjects: string[];
  availableForCollaboration: boolean;
  studioSpaceRequirements: Record<string, any>;
  accessibilityNeeds: AccessibilityFeature[];
  createdAt: Date;
  updatedAt: Date;
}

/**
 * ⚗️ ArtistRegistrationData - The Principle
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
export interface ArtistRegistrationData {
  name: string;
  primaryMedium: string;
  secondaryMediums?: string[];
  preferredStyles?: string[];
  skillLevel: string;
  specializations?: string[];
  portfolioPieces?: number;
  influences?: string[];
  spaceRequirements?: Record<string, any>;
  accessibilityNeeds?: AccessibilityFeature[];
}

// ============================================================================
// STUDIO SPACE SYSTEM
// ============================================================================

/**
 * ⚗️ StudioSpace - The Principle
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
export interface StudioSpace {
  id: string;
  name: string;
  type: StudioType;
  primaryMedium: ArtisticMedium;
  capacity: number;
  equipmentAvailable: string[];
  lightingSetup: Record<string, any>;
  ventilation: Record<string, any>;
  storageCapacity: Record<string, number>;
  accessibilityFeatures: AccessibilityFeature[];
  currentOccupants: string[];
  reservationSchedule: Record<string, string>;
  safetyProtocols: SafetyProtocol[];
  rates: {
    hourly?: number;
    daily?: number;
    weekly?: number;
  };
}

/**
 * ⚗️ StudioAllocation - The Principle
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
export interface StudioAllocation {
  studioId: string;
  allocatedTimeSlots: TimeSlot[];
  allocatedCapacity: number;
  allocatedEquipment: string[];
  allocationNotes: string[];
  costEstimate: number;
}

/**
 * ⚗️ TimeSlot - The Principle
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
export interface TimeSlot {
  day: string;
  startTime: string;
  endTime: string;
  available: boolean;
  reservedBy?: string;
}

// ============================================================================
// MATERIAL LIBRARY SYSTEM
// ============================================================================

/**
 * ⚗️ MaterialItem - The Principle
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
export interface MaterialItem {
  id: string;
  name: string;
  category: MaterialCategory;
  mediumCompatibility: ArtisticMedium[];
  qualityGrade: QualityGrade;
  quantityAvailable: number;
  unitCost: number;
  supplier: string;
  storageRequirements: Record<string, string>;
  safetyNotes: string[];
  usageNotes: string[];
  batchInfo?: {
    batchNumber: string;
    expirationDate?: Date;
    qualityCertificate: string;
  };
}

/**
 * ⚗️ MaterialOrder - The Principle
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
export interface MaterialOrder {
  id: string;
  materials: Array<{
    materialId: string;
    quantity: number;
  }>;
  totalCost: number;
  supplier: string;
  orderDate: Date;
  expectedDelivery: Date;
  status: 'pending' | 'ordered' | 'shipped' | 'delivered';
}

// ============================================================================
// PROJECT MANAGEMENT SYSTEM
// ============================================================================

/**
 * ⚗️ CreativeProject - The Principle
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
export interface CreativeProject {
  id: string;
  title: string;
  description: string;
  primaryMedium: ArtisticMedium;
  style: CreativeStyle;
  projectType: ProjectType;
  leadArtist: string;
  collaborators: string[];
  timeline: Record<string, string>;
  budget?: number;
  materialsNeeded: string[];
  status: ProjectStatus;
  inspirationSources: string[];
  technicalRequirements: Record<string, any>;
  progressMilestones: ProjectMilestone[];
  createdAt: Date;
  updatedAt: Date;
}

/**
 * ⚗️ ProjectMilestone - The Principle
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
export interface ProjectMilestone {
  id: string;
  name: string;
  description: string;
  dueDate: Date;
  status: 'pending' | 'in_progress' | 'completed' | 'blocked';
  dependencies: string[];
  deliverables: string[];
}

/**
 * ⚗️ ProjectData - The Principle
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
export interface ProjectData {
  title: string;
  description: string;
  primaryMedium: string;
  style: string;
  projectType: string;
  leadArtist: string;
  collaborators?: string[];
  timeline?: Record<string, string>;
  budget?: number;
  materialsNeeded?: string[];
  inspirationSources?: string[];
  technicalRequirements?: Record<string, any>;
}

// ============================================================================
// TECHNIQUE DATABASE SYSTEM
// ============================================================================

/**
 * ⚗️ Technique - The Principle
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
export interface Technique {
  id: string;
  name: string;
  description: string;
  medium: ArtisticMedium;
  difficulty: SkillLevel;
  materialsNeeded: string[];
  timeRequired: string;
  keyPrinciples: string[];
  historicalMasters: string[];
  modernApplications: string[];
  tutorialSteps: TutorialStep[];
  safetyConsiderations: string[];
  relatedTechniques: string[];
}

/**
 * ⚗️ TutorialStep - The Principle
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
export interface TutorialStep {
  stepNumber: number;
  instruction: string;
  duration: string;
  materials: string[];
  tips: string[];
  commonMistakes: string[];
}

/**
 * ⚗️ LearningPath - The Principle
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
export interface LearningPath {
  id: string;
  name: string;
  targetSkill: string;
  currentLevel: SkillLevel;
  modules: LearningModule[];
  totalDuration: number;
  recommendedMentors: string[];
  studioRequirements: Record<string, any>;
  assessmentMilestones: AssessmentMilestone[];
  continuationPaths: string[];
}

/**
 * ⚗️ LearningModule - The Principle
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
export interface LearningModule {
  id: string;
  name: string;
  duration: string;
  techniques: string[];
  projects: string[];
  materials: string[];
  prerequisites?: string[];
}

/**
 * ⚗️ AssessmentMilestone - The Principle
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
export interface AssessmentMilestone {
  week: number;
  assessmentType: string;
  focus: string;
  evaluationMethod: string;
}

// ============================================================================
// COLLABORATION SYSTEM
// ============================================================================

/**
 * ⚗️ CollaborationRequest - The Principle
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
export interface CollaborationRequest {
  id: string;
  requestingArtist: string;
  targetArtist: string;
  projectTitle: string;
  projectDescription: string;
  proposedRoles: Record<string, string>;
  timeline: string;
  status: 'pending' | 'accepted' | 'decathedrald' | 'negotiating';
  createdAt: Date;
}

/**
 * ⚗️ CollaborationRecommendation - The Principle
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
export interface CollaborationRecommendation {
  artistName: string;
  compatibilityScore: number;
  collaborationType: 'cross_medium' | 'style_synergy' | 'mentorship_opportunity' | 'peer_collaboration' | 'general';
  suggestedProjects: string[];
  sharedInterests: string[];
  communicationStyle: 'direct' | 'collaborative' | 'mentor' | 'student';
}

/**
 * ⚗️ CritiqueSession - The Principle
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
export interface CritiqueSession {
  id: string;
  projectId: string;
  participants: string[];
  sessionType: 'group' | 'one_on_one' | 'virtual';
  scheduledTime: Date;
  status: 'scheduled' | 'in_progress' | 'completed' | 'cancelled';
  feedback: CritiqueFeedback[];
  actionItems: string[];
}

/**
 * ⚗️ CritiqueFeedback - The Principle
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
export interface CritiqueFeedback {
  id: string;
  artist: string;
  category: 'composition' | 'technique' | 'color' | 'concept' | 'execution';
  rating: number; // 1-10
  comments: string;
  suggestions: string[];
  actionItems: string[];
}

// ============================================================================
// EXHIBITION SYSTEM
// ============================================================================

/**
 * ⚗️ ExhibitionSpace - The Principle
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
export interface ExhibitionSpace {
  id: string;
  name: string;
  type: 'main_gallery' | 'project_gallery' | 'digital_gallery' | 'outdoor';
  dimensions: {
    length: number;
    width: number;
    height: number;
  };
  lighting: string;
  wallCapacity?: string;
  sculptureCapacity?: string;
  screenCapacity?: number;
  climateControl: string;
  security: string;
  accessibility: AccessibilityFeature[];
}

/**
 * ⚗️ Exhibition - The Principle
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
export interface Exhibition {
  id: string;
  title: string;
  curator: string;
  artists: string[];
  artworks: Artwork[];
  space: ExhibitionSpace;
  startDate: Date;
  endDate: Date;
  opening: {
    date: Date;
    invitations: string[];
    catering: boolean;
    catalog: boolean;
  };
  status: 'planning' | 'confirmed' | 'installed' | 'active' | 'closed';
  pricing: {
    admission: number;
    catalog: number;
    membersDiscount: number;
  };
}

/**
 * ⚗️ Artwork - The Principle
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
export interface Artwork {
  id: string;
  title: string;
  artist: string;
  medium: ArtisticMedium;
  dimensions: {
    height: number;
    width: number;
    depth?: number;
  };
  value: number;
  insurance: {
    provider: string;
    value: number;
    policyNumber: string;
  };
  positioning: {
    wallId?: number;
    pedestalId?: string;
    floorPlan: {
      x: number;
      y: number;
      z?: number;
    };
  };
  specialRequirements: string[];
}

// ============================================================================
// COMMISSION MARKETPLACE
// ============================================================================

/**
 * ⚗️ CommissionRequest - The Principle
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
export interface CommissionRequest {
  id: string;
  client: {
    name: string;
    contact: {
      email: string;
      phone: string;
      preferred: 'email' | 'phone' | 'text';
    };
  };
  projectDetails: {
    type: 'portrait' | 'landscape' | 'abstract' | 'sculpture' | 'digital' | 'mixed_media';
    description: string;
    style: CreativeStyle;
    medium: ArtisticMedium;
    dimensions: {
      height: number;
      width: number;
      depth?: number;
    };
    deadline: Date;
  };
  budget: {
    min: number;
    max: number;
    currency: string;
  };
  timeline: {
    concept: string;
    revision: string;
    completion: string;
  };
  status: 'open' | 'assigned' | 'in_progress' | 'completed' | 'cancelled';
  proposals: CommissionProposal[];
}

/**
 * ⚗️ CommissionProposal - The Principle
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
export interface CommissionProposal {
  id: string;
  artist: string;
  proposal: {
    concept: string;
    approach: string;
    timeline: string;
    price: number;
    portfolio: string[];
  };
  status: 'submitted' | 'under_review' | 'accepted' | 'rejected';
  submittedAt: Date;
}

// ============================================================================
// TRAUMA SAFETY AND ACCESSIBILITY
// ============================================================================

/**
 * ⚗️ TraumaSafeConfig - The Principle
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
export interface TraumaSafeConfig {
  emergencyExits: boolean;
  motionReduction: boolean;
  processingTime: number; // milliseconds
  gentleDefaults: boolean;
  sensoryControls: {
    sound: 'full' | 'reduced' | 'none';
    motion: 'full' | 'reduced' | 'none';
    colorIntensity: 'full' | 'dimmed' | 'monochrome';
  };
  accessibilityFeatures: {
    keyboardNavigation: boolean;
    screenReader: boolean;
    highContrast: boolean;
    fontScaling: boolean;
    voiceControl: boolean;
  };
}

// ============================================================================
// EXPORT AND API INTERFACES
// ============================================================================

/**
 * ⚗️ HallOfAteliersConfig - The Principle
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
export interface HallOfAteliersConfig {
  version: string;
  trinityComponent: 'body';
  traumaSafe: TraumaSafeConfig;
  studioSpaces: StudioSpace[];
  materialLibrary: MaterialItem[];
  techniques: Technique[];
  activeArtists: ArtistProfile[];
  activeProjects: CreativeProject[];
  exhibitions: Exhibition[];
  commissionRequests: CommissionRequest[];
}

/**
 * ⚗️ AtelierAPI - The Principle
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
export interface AtelierAPI {
  registerArtist(data: ArtistRegistrationData): Promise<ArtistProfile>;
  createProject(data: ProjectData): Promise<CreativeProject>;
  allocateStudioSpace(projectId: string, preferredSpaces?: string[]): Promise<StudioAllocation>;
  recommendCollaborations(artistId: string): Promise<CollaborationRecommendation[]>;
  generateLearningPath(artistId: string, targetSkill: string): Promise<LearningPath>;
  createCommissionRequest(data: any): Promise<CommissionRequest>;
  bookExhibitionSpace(spaceId: string, dates: { start: Date; end: Date }): Promise<boolean>;
  exportSystemData(): Promise<HallOfAteliersConfig>;
}

export default AtelierAPI;