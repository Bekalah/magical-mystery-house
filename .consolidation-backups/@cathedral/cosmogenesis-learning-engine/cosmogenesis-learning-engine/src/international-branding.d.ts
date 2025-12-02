/**
 * 🌍 INTERNATIONAL BRANDING & RECOGNITION
 *
 * Making Cathedral stand out internationally as the premier
 * Spiral Dynamics creative learning platform
 *
 * @package @cathedral/cosmogenesis-learning-engine
 */
export declare const CATHEDRAL_BRAND: {
    name: string;
    tagline: string;
    mission: string;
    taglines: {
        en: string;
        es: string;
        fr: string;
        de: string;
        it: string;
        pt: string;
        ja: string;
        zh: string;
        ko: string;
        ar: string;
        hi: string;
        ru: string;
    };
    valuePropositions: string[];
    differentiators: {
        codex144: string;
        spiralIntegration: string;
        multiModal: string;
        sacredGeometry: string;
        solfeggioFrequencies: string;
        traumaInformed: string;
        freeForever: string;
    };
};
export declare const RECOGNITION_BADGES: {
    spiralDynamicsCertified: {
        name: string;
        description: string;
        icon: string;
        color: string;
    };
    codex144Certified: {
        name: string;
        description: string;
        icon: string;
        color: string;
    };
    multiModalLearning: {
        name: string;
        description: string;
        icon: string;
        color: string;
    };
    traumaInformed: {
        name: string;
        description: string;
        icon: string;
        color: string;
    };
    sacredGeometry: {
        name: string;
        description: string;
        icon: string;
        color: string;
    };
    openSource: {
        name: string;
        description: string;
        icon: string;
        color: string;
    };
};
export declare const SPIRAL_CURRICULUM: {
    name: string;
    version: string;
    levels: {
        level: string;
        name: string;
        subtitle: string;
        duration: string;
        outcomes: string[];
        creativeModes: string[];
        certification: string;
    }[];
    totalDuration: string;
    certificationPath: string[];
};
export declare const ACCESSIBILITY_FEATURES: {
    languages: {
        code: string;
        name: string;
        direction: string;
        complete: boolean;
    }[];
    neurodivergentSupport: {
        adhd: {
            features: string[];
            colorScheme: string;
            pacing: string;
        };
        autism: {
            features: string[];
            colorScheme: string;
            pacing: string;
        };
        dyslexia: {
            features: string[];
            colorScheme: string;
            pacing: string;
        };
        anxiety: {
            features: string[];
            colorScheme: string;
            pacing: string;
        };
    };
    physicalAccessibility: {
        screenReader: boolean;
        keyboardNavigation: boolean;
        highContrast: boolean;
        reducedMotion: boolean;
        captionsSubtitles: boolean;
        signLanguage: string[];
    };
};
/**
 * Get brand information
 */
export declare function getBrandInfo(language?: string): {
    tagline: string;
    name: string;
    mission: string;
    taglines: {
        en: string;
        es: string;
        fr: string;
        de: string;
        it: string;
        pt: string;
        ja: string;
        zh: string;
        ko: string;
        ar: string;
        hi: string;
        ru: string;
    };
    valuePropositions: string[];
    differentiators: {
        codex144: string;
        spiralIntegration: string;
        multiModal: string;
        sacredGeometry: string;
        solfeggioFrequencies: string;
        traumaInformed: string;
        freeForever: string;
    };
};
/**
 * Get recognition badges
 */
export declare function getRecognitionBadges(): {
    spiralDynamicsCertified: {
        name: string;
        description: string;
        icon: string;
        color: string;
    };
    codex144Certified: {
        name: string;
        description: string;
        icon: string;
        color: string;
    };
    multiModalLearning: {
        name: string;
        description: string;
        icon: string;
        color: string;
    };
    traumaInformed: {
        name: string;
        description: string;
        icon: string;
        color: string;
    };
    sacredGeometry: {
        name: string;
        description: string;
        icon: string;
        color: string;
    };
    openSource: {
        name: string;
        description: string;
        icon: string;
        color: string;
    };
};
/**
 * Get curriculum overview
 */
export declare function getCurriculumOverview(): {
    name: string;
    version: string;
    levels: {
        level: string;
        name: string;
        subtitle: string;
        duration: string;
        outcomes: string[];
        creativeModes: string[];
        certification: string;
    }[];
    totalDuration: string;
    certificationPath: string[];
};
/**
 * Get accessibility features
 */
export declare function getAccessibilityFeatures(): {
    languages: {
        code: string;
        name: string;
        direction: string;
        complete: boolean;
    }[];
    neurodivergentSupport: {
        adhd: {
            features: string[];
            colorScheme: string;
            pacing: string;
        };
        autism: {
            features: string[];
            colorScheme: string;
            pacing: string;
        };
        dyslexia: {
            features: string[];
            colorScheme: string;
            pacing: string;
        };
        anxiety: {
            features: string[];
            colorScheme: string;
            pacing: string;
        };
    };
    physicalAccessibility: {
        screenReader: boolean;
        keyboardNavigation: boolean;
        highContrast: boolean;
        reducedMotion: boolean;
        captionsSubtitles: boolean;
        signLanguage: string[];
    };
};
/**
 * Get supported languages
 */
export declare function getSupportedLanguages(): {
    code: string;
    name: string;
    direction: string;
    complete: boolean;
}[];
declare const _default: {
    brand: {
        name: string;
        tagline: string;
        mission: string;
        taglines: {
            en: string;
            es: string;
            fr: string;
            de: string;
            it: string;
            pt: string;
            ja: string;
            zh: string;
            ko: string;
            ar: string;
            hi: string;
            ru: string;
        };
        valuePropositions: string[];
        differentiators: {
            codex144: string;
            spiralIntegration: string;
            multiModal: string;
            sacredGeometry: string;
            solfeggioFrequencies: string;
            traumaInformed: string;
            freeForever: string;
        };
    };
    badges: {
        spiralDynamicsCertified: {
            name: string;
            description: string;
            icon: string;
            color: string;
        };
        codex144Certified: {
            name: string;
            description: string;
            icon: string;
            color: string;
        };
        multiModalLearning: {
            name: string;
            description: string;
            icon: string;
            color: string;
        };
        traumaInformed: {
            name: string;
            description: string;
            icon: string;
            color: string;
        };
        sacredGeometry: {
            name: string;
            description: string;
            icon: string;
            color: string;
        };
        openSource: {
            name: string;
            description: string;
            icon: string;
            color: string;
        };
    };
    curriculum: {
        name: string;
        version: string;
        levels: {
            level: string;
            name: string;
            subtitle: string;
            duration: string;
            outcomes: string[];
            creativeModes: string[];
            certification: string;
        }[];
        totalDuration: string;
        certificationPath: string[];
    };
    accessibility: {
        languages: {
            code: string;
            name: string;
            direction: string;
            complete: boolean;
        }[];
        neurodivergentSupport: {
            adhd: {
                features: string[];
                colorScheme: string;
                pacing: string;
            };
            autism: {
                features: string[];
                colorScheme: string;
                pacing: string;
            };
            dyslexia: {
                features: string[];
                colorScheme: string;
                pacing: string;
            };
            anxiety: {
                features: string[];
                colorScheme: string;
                pacing: string;
            };
        };
        physicalAccessibility: {
            screenReader: boolean;
            keyboardNavigation: boolean;
            highContrast: boolean;
            reducedMotion: boolean;
            captionsSubtitles: boolean;
            signLanguage: string[];
        };
    };
    getBrandInfo: typeof getBrandInfo;
    getRecognitionBadges: typeof getRecognitionBadges;
    getCurriculumOverview: typeof getCurriculumOverview;
    getAccessibilityFeatures: typeof getAccessibilityFeatures;
    getSupportedLanguages: typeof getSupportedLanguages;
};
export default _default;
//# sourceMappingURL=international-branding.d.ts.map