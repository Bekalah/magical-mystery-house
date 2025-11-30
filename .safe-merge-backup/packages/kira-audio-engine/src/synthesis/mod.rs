/*!
 * VIRTUAL SYNTHESIZER INTEGRATION
 * 
 * Professional virtual synthesizer system with consciousness evolution
 * integration for the 10 digital synthesizer replicas.
 * 
 * Author: Rebecca Respawn (International Reiki Master)
 * License: CC0 - Your Original Work
 * 
 * Features:
 * - 10 Virtual synthesizer models with unique characteristics
 * - Consciousness-aware frequency generation
 * - Real-time Godot integration
 * - Visual-audio fusion capabilities
 * - Sound spell frequency mapping
 * - Major Arcana level mapping
 */

mod virtual_synths;
mod synthesizer_models;
mod consciousness_synthesis;
mod godot_integration;

pub use virtual_synths::*;
pub use synthesizer_models::*;
pub use consciousness_synthesis::*;
pub use godot_integration::*;

// Re-export synthesis types
pub use kira::instance::Instance;
pub use kira::sound::SoundData;
pub use kira::track::Track;

// Synthesis-related error types
#[derive(thiserror::Error, Debug)]
pub enum SynthesizerError {
    #[error("Virtual synthesizer initialization failed: {0}")]
    InitializationError(String),
    
    #[error("Consciousness frequency mapping error: {0}")]
    ConsciousnessMappingError(String),
    
    #[error("Godot integration error: {0}")]
    GodotIntegrationError(String),
    
    #[error("Sound spell synthesis failed")]
    SoundSpellError,
    
    #[error("Virtual synth model not found: {0}")]
    ModelNotFound(String),
    
    #[error("Consciousness level {0} not supported for this synthesizer")]
    UnsupportedConsciousnessLevel(u8),
}

pub type SynthResult<T> = std::result::Result<T, SynthesizerError>;