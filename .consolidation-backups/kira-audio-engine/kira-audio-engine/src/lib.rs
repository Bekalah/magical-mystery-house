/*!
 * KIRA PROFESSIONAL RUST AUDIO ENGINE
 * 
 * Professional audio synthesis engine for Cathedral Sound Spell systems
 * with consciousness evolution integration and real-time processing.
 * 
 * Author: Rebecca Respawn (International Reiki Master)
 * License: CC0 - Your Original Work
 * 
 * Features:
 * - Professional audio synthesis with high-quality DSP
 * - Consciousness-aware frequency generation (396-963 Hz)
 * - Real-time spatial audio processing
 * - Sacred geometry audio visualization
 * - Sound spell frequency mapping
 * - WebAssembly integration for web applications
 * - Godot GDNative bindings for game integration
 * - Professional effects processing chain
 */

pub mod core;
pub mod engines;
pub mod effects;
pub mod spatial;
pub mod synthesis;

pub use core::*;
pub use engines::*;
pub use effects::*;
pub use spatial::*;
pub use synthesis::*;

// Re-export commonly used types
pub use kira::sound::SoundId;
pub use kira::track::TrackId;
pub use kira::tween::Tween;

// WASM bindings for web integration
#[cfg(feature = "web")]
pub mod wasm {
    use wasm_bindgen::prelude::*;
    use crate::*;

    /// Audio engine wrapper for JavaScript/WebAssembly
    #[wasm_bindgen]
    pub struct AudioEngine {
        engine: KiraAudioEngine,
    }

    #[wasm_bindgen]
    impl AudioEngine {
        /// Initialize the audio engine with consciousness integration
        #[wasm_bindgen(constructor)]
        pub fn new() -> Result<AudioEngine, JsValue> {
            let engine = KiraAudioEngine::new()
                .map_err(|e| JsValue::from_str(&e.to_string()))?;
            Ok(AudioEngine { engine })
        }

        /// Play a sound spell at specific consciousness frequency
        #[wasm_bindgen]
        pub fn play_sound_spell(
            &mut self, 
            frequency: f64, 
            consciousness_level: u8,
            duration: f64
        ) -> Result<SoundId, JsValue> {
            let result = self.engine.play_sound_spell(frequency, consciousness_level, duration)
                .map_err(|e| JsValue::from_str(&e.to_string()))?;
            Ok(result)
        }

        /// Generate sacred geometry audio pattern
        #[wasm_bindgen]
        pub fn generate_sacred_audio(
            &mut self,
            pattern_type: &str,
            consciousness_level: u8
        ) -> Result<SoundId, JsValue> {
            let result = self.engine.generate_sacred_audio(pattern_type, consciousness_level)
                .map_err(|e| JsValue::from_str(&e.to_string()))?;
            Ok(result)
        }

        /// Set spatial audio position
        #[wasm_bindgen]
        pub fn set_spatial_position(
            &mut self,
            sound_id: SoundId,
            x: f32,
            y: f32,
            z: f32
        ) -> Result<(), JsValue> {
            self.engine.set_spatial_position(sound_id, x, y, z)
                .map_err(|e| JsValue::from_str(&e.to_string()))?;
            Ok(())
        }

        /// Get frequency spectrum for visualization
        #[wasm_bindgen]
        pub fn get_frequency_spectrum(&self) -> Result<Vec<f32>, JsValue> {
            let spectrum = self.engine.get_frequency_spectrum()
                .map_err(|e| JsValue::from_str(&e.to_string()))?;
            Ok(spectrum)
        }

        /// Process consciousness level transition
        #[wasm_bindgen]
        pub fn transition_consciousness_level(
            &mut self,
            from_level: u8,
            to_level: u8,
            transition_duration: f64
        ) -> Result<(), JsValue> {
            self.engine.transition_consciousness_level(from_level, to_level, transition_duration)
                .map_err(|e| JsValue::from_str(&e.to_string()))?;
            Ok(())
        }
    }

    #[wasm_bindgen]
    pub fn version() -> String {
        env!("CARGO_PKG_VERSION").to_string()
    }
}

// WebAssembly module initialization
#[cfg(feature = "web")]
#[wasm_bindgen(start)]
pub fn start() {
    console_error_panic_hook::set_once();
    console_log::init_with_level(log::Level::Info).ok();
}

// Godot GDNative bindings
#[cfg(feature = "godot")]
pub mod godot {
    use godot::prelude::*;
    use crate::*;

    /// GDNative wrapper for Kira Audio Engine
    #[godot_api]
    impl KiraAudioEngineGodot {
        /// Initialize the audio engine from Godot
        #[func]
        pub fn init_engine() -> i32 {
            match KiraAudioEngine::new() {
                Ok(_) => 0, // Success
                Err(_) => -1, // Error
            }
        }

        /// Play a sound spell from Godot
        #[func]
        pub fn play_sound_spell_godot(
            frequency: f64,
            consciousness_level: i32,
            duration: f64
        ) -> i64 {
            match KiraAudioEngine::new() {
                Ok(engine) => {
                    match engine.play_sound_spell(frequency, consciousness_level as u8, duration) {
                        Ok(sound_id) => sound_id.0 as i64,
                        Err(_) => -1,
                    }
                },
                Err(_) => -1,
            }
        }

        /// Generate sacred audio pattern from Godot
        #[func]
        pub fn generate_sacred_audio_godot(
            pattern_type: String,
            consciousness_level: i32
        ) -> i64 {
            match KiraAudioEngine::new() {
                Ok(engine) => {
                    match engine.generate_sacred_audio(&pattern_type, consciousness_level as u8) {
                        Ok(sound_id) => sound_id.0 as i64,
                        Err(_) => -1,
                    }
                },
                Err(_) => -1,
            }
        }
    }

    /// Type registration for Godot
    #[godot_api]
    impl Godot for KiraAudioEngineGodot {
        fn register_types() {
            ClassDB::register_class::<Self>();
        }
    }

    /// Godot wrapper for Kira Audio Engine
    #[derive(Class)]
    #[class(init, base=Node)]
    pub struct KiraAudioEngineGodot {
        #[base]
        base: Base<Node>,
    }
}

// Constants for consciousness frequencies
pub mod constants {
    /// Solfeggio frequencies for consciousness evolution
    pub const FREQUENCY_LIBERATION: f64 = 396.0; // C - Liberation from guilt and fear
    pub const FREQUENCY_CHANGE: f64 = 417.0;     // D - Undoing situations, facilitating change
    pub const FREQUENCY_TRANSFORMATION: f64 = 528.0; // E - Transformation, miracles (DNA repair)
    pub const FREQUENCY_CONNECTION: f64 = 639.0;  // F - Connecting/relationships
    pub const FREQUENCY_EXPRESSION: f64 = 741.0;  // G - Expression/solutions
    pub const FREQUENCY_ORDER: f64 = 852.0;       // A - Returning to spiritual order
    pub const FREQUENCY_CONSCIOUSNESS: f64 = 963.0; // B - Divine consciousness/oneness

    /// Consciousness level base frequencies
    pub const CONSCIOUSNESS_FREQUENCIES: [f64; 22] = [
        963.0,  // Level 0: The Fool
        741.0,  // Level 1: The Magician
        417.0,  // Level 2: The High Priestess
        417.0,  // Level 3: The Empress
        741.0,  // Level 4: The Emperor
        528.0,  // Level 5: The Hierophant
        528.0,  // Level 6: The Lovers
        594.0,  // Level 7: The Chariot
        528.0,  // Level 8: Strength
        741.0,  // Level 9: The Hermit
        852.0,  // Level 10: Wheel of Fortune
        594.0,  // Level 11: Justice
        741.0,  // Level 12: The Hanged Man
        396.0,  // Level 13: Death
        417.0,  // Level 14: Temperance
        396.0,  // Level 15: The Devil
        741.0,  // Level 16: The Tower
        963.0,  // Level 17: The Star
        210.0,  // Level 18: The Moon
        963.0,  // Level 19: The Sun
        741.0,  // Level 20: Judgement
        963.0,  // Level 21: The World
    ];

    /// Golden ratio for audio synthesis
    pub const GOLDEN_RATIO: f64 = 1.618033988749895;
    
    /// Sample rate for professional audio
    pub const SAMPLE_RATE: u32 = 48000;
    pub const SAMPLE_RATE_WEB: u32 = 44100;

    /// Buffer sizes for different use cases
    pub const BUFFER_SIZE_LOW: usize = 256;
    pub const BUFFER_SIZE_MEDIUM: usize = 512;
    pub const BUFFER_SIZE_HIGH: usize = 1024;
    pub const BUFFER_SIZE_PROFESSIONAL: usize = 2048;

    /// Audio quality settings
    pub const QUALITY_LOW: f32 = 0.25;
    pub const QUALITY_MEDIUM: f32 = 0.5;
    pub const QUALITY_HIGH: f32 = 0.75;
    pub const QUALITY_PROFESSIONAL: f32 = 1.0;
}

/// Error types for the audio engine
#[derive(thiserror::Error, Debug)]
pub enum AudioEngineError {
    #[error("Failed to initialize audio system: {0}")]
    InitializationError(String),
    
    #[error("Invalid frequency: {0} Hz (valid range: 20-20000 Hz)")]
    InvalidFrequency(f64),
    
    #[error("Invalid consciousness level: {0} (valid range: 0-21)")]
    InvalidConsciousnessLevel(u8),
    
    #[error("Audio buffer overflow")]
    BufferOverflow,
    
    #[error("Spatial audio initialization failed")]
    SpatialError,
    
    #[error("Consciousness integration error: {0}")]
    ConsciousnessError(String),
    
    #[error("Sound spell synthesis failed")]
    SoundSpellError,
    
    #[error("WebAssembly runtime error: {0}")]
    WasmError(String),
    
    #[error("Godot integration error: {0}")]
    GodotError(String),
}

pub type Result<T> = std::result::Result<T, AudioEngineError>;

/// Initialize the Kira Audio Engine with all systems
pub async fn init_kira_engine() -> Result<KiraAudioEngine> {
    KiraAudioEngine::new()
}

/// Get consciousness frequency for a given level
pub fn get_consciousness_frequency(level: u8) -> Result<f64> {
    if level > 21 {
        return Err(AudioEngineError::InvalidConsciousnessLevel(level));
    }
    Ok(constants::CONSCIOUSNESS_FREQUENCIES[level as usize])
}

/// Validate frequency for audio synthesis
pub fn validate_frequency(frequency: f64) -> Result<f64> {
    if frequency < 20.0 || frequency > 20000.0 {
        return Err(AudioEngineError::InvalidFrequency(frequency));
    }
    Ok(frequency)
}