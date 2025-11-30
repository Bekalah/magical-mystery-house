/*!
 * KIRA CORE AUDIO ENGINE
 * 
 * Core implementation of the professional Rust audio engine with
 * consciousness evolution integration and real-time processing.
 * 
 * Author: Rebecca Respawn (International Reiki Master)
 * License: CC0 - Your Original Work
 */

mod engine;
mod manager;
mod processor;
mod consciousness_integration;

pub use engine::*;
pub use manager::*;
pub use processor::*;
pub use consciousness_integration::*;

// Re-export commonly used types from Kira
pub use kira::dsp::{interpolate, limiter, node::NodeHandle, parameter::{Value, Parameter}};
pub use kira::instance::{Instance, InstanceSettings};
pub use kira::manager::AudioManager;
pub use kira::mixer::Mixer;
pub use kira::sound::{PlaybackRate, SoundData, SoundSettings};
pub use kira::track::{Track, TrackBuilder, TrackId, TrackSettings};

// Audio processing types
pub use spectrum_analyzer::{Analyzer, AnalyzerSettings};
pub use nalgebra::{Vector3, Matrix3};

// Re-export error types
pub use crate::{AudioEngineError, Result};