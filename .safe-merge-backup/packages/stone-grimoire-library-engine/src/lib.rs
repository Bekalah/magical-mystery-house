//! Stone Grimoire Library Engine
//!
//! Offline-first library generator for sacred/occult datasets feeding the Stone Grimoire,
//! sound chapels, and art chapels in your Cathedral ecosystem.
//!
//! Hybrid strategy (per user selection: Hybrid C):
//! - Phase 1 (now): Offline deterministic generator
//!     - Scans `/data-libraries/**/metadata.json`
//!     - Builds a unified registry JSON used by Godot + web + tools
//!     - (Optionally) emits simple `.tscn` scene blueprints for chapels/rooms
//! - Phase 2 (later): Runtime gdextension
//!     - Loads the registry in Godot 4.x
//!     - Spawns 3D library rooms, soundscapes, and art chapels dynamically
//!
//! Design goals:
//! - Pure data-driven, no hallucinated content
//! - Respect provenance and licenses
//! - Stable schema so other engines (web, Rust, Godot) can consume the same registry
//! - Safe to run repeatedly (idempotent) and integrate into your build system

use serde::{de::DeserializeOwned, Deserialize, Serialize};
use std::fs;
use std::io::{self, Read};
use std::path::{Path, PathBuf};
use std::sync::Arc;

/// Root configuration for where to read/write library data.
#[derive(Debug, Clone)]
pub struct EngineConfig {
    /// Path to the root data-libraries directory (e.g. "./data-libraries").
    pub data_root: PathBuf,
    /// Output path for the unified registry JSON.
    pub registry_output: PathBuf,
    /// Optional output directory for generated Godot scene blueprints.
    pub godot_scenes_output: Option<PathBuf>,
}

/// Minimal metadata schema for a single text/library.
/// This is intentionally conservative and ND-safe.
///
/// Example metadata.json:
/// {
///   "id": "liber_777",
///   "title": "Liber 777",
///   "author": "Aleister Crowley",
///   "year": 1909,
///   "public_domain": true,
///   "primary_theme": "correspondences",
///   "license_note": "Public domain / source: sacred-texts.com",
///   "source_url": "https://www.sacred-texts.com/oto/777.htm"
/// }
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct LibraryMetadata {
    pub id: String,
    pub title: String,
    pub author: Option<String>,
    pub year: Option<i32>,
    pub public_domain: Option<bool>,
    pub primary_theme: Option<String>,
    pub license_note: Option<String>,
    pub source_url: Option<String>,
    /// Optional: structure hints like ["tables", "commentary", "verses"].
    #[serde(default)]
    pub structure: Vec<String>,
}

/// Chapel/thematic classification for spatial/audio integration.
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct ChapelProfile {
    /// High-level classification, e.g. "kabbalah", "iching", "soyga", "alchemy".
    pub domain: String,
    /// Which Stone Grimoire wing / chapel this belongs to, e.g. "kabbalah_chapel".
    pub chapel_id: String,
    /// Recommended color / light profile, e.g. "#ffffff" or a named gradient preset.
    pub color_profile: Option<String>,
    /// Suggested soundscape key, resolved by your sound engine.
    pub sound_profile: Option<String>,
    /// Optional icon / sigil resource path.
    pub icon: Option<String>,
}

/// One entry in the unified registry, joined from metadata + inferred chapel profile.
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct LibraryEntry {
    pub id: String,
    pub title: String,
    pub path: String,
    pub metadata: LibraryMetadata,
    pub chapel: ChapelProfile,
}

/// Top-level registry format written to JSON.
/// Godot, web frontends, and tools read this instead of crawling directories.
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct LibraryRegistry {
    pub version: String,
    pub generated_by: String,
    pub root: String,
    pub libraries: Vec<LibraryEntry>,
}

/// Dynamic, queryable view over the library registry.
///
/// This is the core of the "living" Stone Grimoire engine:
/// - SOUL: exposes esoteric correspondences and metadata as structured data
/// - BODY: queryable at runtime by games/simulations
/// - SPIRIT: provides color/frequency/geometry hints for audiovisual systems
#[derive(Debug, Clone)]
pub struct StoneLibrary {
    inner: Arc<LibraryRegistry>,
}

impl StoneLibrary {
    /// Create a `StoneLibrary` from an existing `LibraryRegistry`.
    ///
    /// This is zero-copy for callers (uses Arc internally) and keeps the
    /// original `generate_registry` flow fully compatible.
    pub fn from_registry(registry: LibraryRegistry) -> Self {
        StoneLibrary {
            inner: Arc::new(registry),
        }
    }

    /// Load a `LibraryRegistry` from any `Read` + `Deserialize` source and wrap it.
    ///
    /// This avoids hard-coded paths:
    /// callers decide how/where bytes are loaded (disk, network, packed resources).
    pub fn from_reader<R>(reader: R) -> Result<Self, io::Error>
    where
        R: Read,
    {
        let registry: LibraryRegistry = deserialize_json(reader)?;
        Ok(Self::from_registry(registry))
    }

    /// Load from JSON bytes.
    pub fn from_slice(bytes: &[u8]) -> Result<Self, io::Error> {
        let registry: LibraryRegistry = serde_json::from_slice(bytes).map_err(map_serde)?;
        Ok(Self::from_registry(registry))
    }

    /// Load from a JSON file path. This is a convenience only.
    pub fn from_json_file(path: &Path) -> Result<Self, io::Error> {
        let file = fs::File::open(path)?;
        Self::from_reader(file)
    }

    /// Direct access to all entries.
    pub fn entries(&self) -> &[LibraryEntry] {
        &self.inner.libraries
    }

    /// Find a single library by id.
    pub fn by_id(&self, id: &str) -> Option<&LibraryEntry> {
        self.inner.libraries.iter().find(|e| e.id == id)
    }

    /// Run a composable filter over the registry.
    ///
    /// Example:
    /// [`StoneLibrary::query()`](packages/stone-grimoire-library-engine/src/lib.rs:1)
    /// with:
    /// [`StoneFilter::new()`](packages/stone-grimoire-library-engine/src/lib.rs:1)
    ///     .with_domain("kabbalah")
    ///     .with_color("#ffffff")
    ///     .with_numeric_resonance_range(10.0, 22.0);
    pub fn query<'a>(&'a self, filter: &StoneFilter) -> Vec<&'a LibraryEntry> {
        self.inner
            .libraries
            .iter()
            .filter(|entry| filter.matches(entry))
            .collect()
    }

    /// BODY axis helper:
    /// Given a mechanical hint (e.g. "room:library", "mechanic:insight"),
    /// return candidate libraries suitable for this context.
    ///
    /// Games/Godot can:
    /// - Attach this to a room generator
    /// - Use result IDs to spawn localized interactions/scenes
    pub fn suggest_for_mechanic<'a>(
        &'a self,
        mechanic_tag: &str,
        filter: &StoneFilter,
    ) -> Vec<&'a LibraryEntry> {
        let mut extended = filter.clone();
        extended.mechanic_tags.push(mechanic_tag.to_string());
        self.query(&extended)
    }

    /// SPIRIT axis helper:
    /// For a given library id, expose audiovisual hints that render engines can use.
    pub fn palette_for(&self, id: &str) -> Option<SpiritVisualProfile> {
        let entry = self.by_id(id)?;
        Some(SpiritVisualProfile {
            chapel_id: entry.chapel.chapel_id.clone(),
            base_color: entry.chapel.color_profile.clone(),
            sound_profile: entry.chapel.sound_profile.clone(),
        })
    }
}

/// JSON deserialization helper using a generic type.
/// Kept small and explicit to align with repo style.
fn deserialize_json<T, R>(mut reader: R) -> Result<T, io::Error>
where
    T: DeserializeOwned,
    R: Read,
{
    let mut buf = String::new();
    reader.read_to_string(&mut buf)?;
    serde_json::from_str(&buf).map_err(map_serde)
}

/// Convert serde_json errors into io::Error for a simple public surface.
fn map_serde(err: serde_json::Error) -> io::Error {
    io::Error::new(io::ErrorKind::InvalidData, err.to_string())
}

/// Composable filter for registry entries.
///
/// Filters are AND-composed: all specified constraints must match.
/// Unset fields do not constrain the query.
///
/// SOUL:
/// - filter by esoteric domain, primary_theme, author, etc.
///
/// BODY:
/// - filter by mechanic tags resolved from metadata or external schemas.
///
/// SPIRIT:
/// - filter by color profiles, chapel_id, or numeric resonance ranges.
#[derive(Debug, Clone, Default)]
pub struct StoneFilter {
    pub ids: Vec<String>,
    pub domains: Vec<String>,
    pub chapel_ids: Vec<String>,
    pub primary_themes: Vec<String>,
    pub authors: Vec<String>,
    pub colors: Vec<String>,
    pub sound_profiles: Vec<String>,
    pub mechanic_tags: Vec<String>,
    pub min_numeric_resonance: Option<f64>,
    pub max_numeric_resonance: Option<f64>,
}

impl StoneFilter {
    /// Start with an empty filter.
    pub fn new() -> Self {
        Self::default()
    }

    pub fn with_id(mut self, id: impl Into<String>) -> Self {
        self.ids.push(id.into());
        self
    }

    pub fn with_domain(mut self, domain: impl Into<String>) -> Self {
        self.domains.push(domain.into());
        self
    }

    pub fn with_chapel_id(mut self, chapel_id: impl Into<String>) -> Self {
        self.chapel_ids.push(chapel_id.into());
        self
    }

    pub fn with_primary_theme(mut self, theme: impl Into<String>) -> Self {
        self.primary_themes.push(theme.into());
        self
    }

    pub fn with_author(mut self, author: impl Into<String>) -> Self {
        self.authors.push(author.into());
        self
    }

    pub fn with_color(mut self, color: impl Into<String>) -> Self {
        self.colors.push(color.into());
        self
    }

    pub fn with_sound_profile(mut self, sound: impl Into<String>) -> Self {
        self.sound_profiles.push(sound.into());
        self
    }

    pub fn with_mechanic_tag(mut self, tag: impl Into<String>) -> Self {
        self.mechanic_tags.push(tag.into());
        self
    }

    /// Constrain by numeric resonance range (inclusive).
    ///
    /// The actual resonance value is read from metadata if present:
    /// - Look for `metadata.primary_theme == "arcana:NN"` style
    /// - or an externally attached value (see `numeric_resonance_of`).
    pub fn with_numeric_resonance_range(mut self, min: f64, max: f64) -> Self {
        self.min_numeric_resonance = Some(min);
        self.max_numeric_resonance = Some(max);
        self
    }

    /// Internal: test if a registry entry matches this filter.
    fn matches(&self, entry: &LibraryEntry) -> bool {
        if !self.ids.is_empty() && !self.ids.iter().any(|id| id == &entry.id) {
            return false;
        }

        if !self.domains.is_empty()
            && !self
                .domains
                .iter()
                .any(|d| d.eq_ignore_ascii_case(&entry.chapel.domain))
        {
            return false;
        }

        if !self.chapel_ids.is_empty()
            && !self
                .chapel_ids
                .iter()
                .any(|c| c == &entry.chapel.chapel_id)
        {
            return false;
        }

        if !self.primary_themes.is_empty() {
            let theme = entry.metadata.primary_theme.as_deref().unwrap_or_default();
            if !self
                .primary_themes
                .iter()
                .any(|t| t.eq_ignore_ascii_case(theme))
            {
                return false;
            }
        }

        if !self.authors.is_empty() {
            let author = entry.metadata.author.as_deref().unwrap_or_default();
            if !self.authors.iter().any(|a| a.eq_ignore_ascii_case(author)) {
                return false;
            }
        }

        if !self.colors.is_empty() {
            let color = entry.chapel.color_profile.as_deref().unwrap_or_default();
            if !self.colors.iter().any(|c| c.eq_ignore_ascii_case(color)) {
                return false;
            }
        }

        if !self.sound_profiles.is_empty() {
            let sound = entry.chapel.sound_profile.as_deref().unwrap_or_default();
            if !self
                .sound_profiles
                .iter()
                .any(|s| s.eq_ignore_ascii_case(sound))
            {
                return false;
            }
        }

        // Mechanic tags are left open-ended for callers.
        // The engine checks against a conventional metadata field if present.
        if !self.mechanic_tags.is_empty() {
            let meta_string = format!(
                "{},{},{:?}",
                entry.metadata.primary_theme.as_deref().unwrap_or_default(),
                entry.chapel.domain,
                entry.metadata.structure
            )
            .to_lowercase();

            if !self
                .mechanic_tags
                .iter()
                .any(|tag| meta_string.contains(&tag.to_lowercase()))
            {
                return false;
            }
        }

        // Numeric resonance is derived from metadata via a deterministic helper.
        if self.min_numeric_resonance.is_some() || self.max_numeric_resonance.is_some() {
            let resonance = numeric_resonance_of(entry);
            if let Some(min) = self.min_numeric_resonance {
                if resonance < min {
                    return false;
                }
            }
            if let Some(max) = self.max_numeric_resonance {
                if resonance > max {
                    return false;
                }
            }
        }

        true
    }
}

/// Deterministic numeric resonance heuristic.
///
/// This keeps behavior stable and explainable while leaving room
/// for richer numeric schemas in dedicated datasets.
///
/// Current formula:
/// - Hash-like fold over id + primary_theme into [0, 255]
/// - Mapped into [0.0, 255.0]
fn numeric_resonance_of(entry: &LibraryEntry) -> f64 {
    let key = format!(
        "{}:{}",
        entry.id,
        entry.metadata.primary_theme.as_deref().unwrap_or_default()
    );
    let mut acc: u32 = 0;
    for b in key.bytes() {
        acc = acc.wrapping_mul(31).wrapping_add(b as u32);
    }
    (acc % 256) as f64
}

/// High-level entrypoint:
/// - walks data_root
/// - discovers libraries
/// - writes registry JSON
/// - optionally emits minimal .tscn chapel scenes
pub fn generate_registry(config: &EngineConfig) -> io::Result<LibraryRegistry> {
    let mut entries = Vec::new();

    if !config.data_root.exists() {
        return Err(io::Error::new(
            io::ErrorKind::NotFound,
            format!("data_root not found: {}", config.data_root.display()),
        ));
    }

    for entry in fs::read_dir(&config.data_root)? {
        let entry = entry?;
        let path = entry.path();
        if path.is_dir() {
            if let Some(lib) = load_library_from_folder(&path)? {
                entries.push(lib);
            }
        }
    }

    let registry = LibraryRegistry {
        version: "1.0.0".to_string(),
        generated_by: "stone-grimoire-library-engine".to_string(),
        root: path_to_string(&config.data_root),
        libraries: entries,
    };

    // Write registry JSON
    if let Some(parent) = config.registry_output.parent() {
        fs::create_dir_all(parent)?;
    }
    let json = serde_json::to_string_pretty(&registry)
        .map_err(|e| io::Error::new(io::ErrorKind::Other, format!("serialize registry: {e}")))?;
    fs::write(&config.registry_output, json)?;

    // Optionally emit simple Godot scenes for each entry (Phase 1A).
    if let Some(scene_root) = &config.godot_scenes_output {
        emit_godot_scenes(scene_root, &registry)?;
    }

    Ok(registry)
}

/// Attempt to load a single library from a folder:
/// - Requires metadata.json
/// - Derives chapel profile by folder name / metadata
fn load_library_from_folder(folder: &Path) -> io::Result<Option<LibraryEntry>> {
    let metadata_path = folder.join("metadata.json");
    if !metadata_path.exists() {
        // Not a library folder
        return Ok(None);
    }

    let raw = fs::read_to_string(&metadata_path)?;
    let mut meta: LibraryMetadata = serde_json::from_str(&raw).map_err(|e| {
        io::Error::new(
            io::ErrorKind::InvalidData,
            format!(
                "Invalid metadata.json in {}: {e}",
                folder.display()
            ),
        )
    })?;

    // If id missing, derive from folder name.
    if meta.id.trim().is_empty() {
        meta.id = folder
            .file_name()
            .and_then(|s| s.to_str())
            .unwrap_or("unknown_library")
            .to_string();
    }

    let chapel = infer_chapel_profile(folder, &meta);
    let entry = LibraryEntry {
        id: meta.id.clone(),
        title: meta.title.clone(),
        path: path_to_string(folder),
        metadata: meta,
        chapel,
    };

    Ok(Some(entry))
}

/// Infer which chapel this belongs to based on id/title/domain.
/// This is deterministic and conservative; you can refine mappings later.
fn infer_chapel_profile(_folder: &Path, meta: &LibraryMetadata) -> ChapelProfile {
    let id = meta.id.to_lowercase();
    let title = meta.title.to_lowercase();

    // Kabbalistic / 777
    if id.contains("777") || title.contains("777") || id.contains("kabbalah") {
        return ChapelProfile {
            domain: "kabbalah".to_string(),
            chapel_id: "stone_grimoire/kabbalah_chapel".to_string(),
            color_profile: Some("#ffffff".to_string()),
            sound_profile: Some("choir_celestial".to_string()),
            icon: Some("res://icons/kabbalah_sigil.png".to_string()),
        };
    }

    // Liber AL / Thelemic current
    if id.contains("liber_al") || title.contains("liber al") {
        return ChapelProfile {
            domain: "thelemic".to_string(),
            chapel_id: "stone_grimoire/thelemic_oracle_chapel".to_string(),
            color_profile: Some("#ffcc00".to_string()),
            sound_profile: Some("solar_fanfare".to_string()),
            icon: Some("res://icons/liber_al_sigil.png".to_string()),
        };
    }

    // I Ching
    if id.contains("iching") || id.contains("i_ching") || title.contains("i ching") {
        return ChapelProfile {
            domain: "iching".to_string(),
            chapel_id: "stone_grimoire/hexagram_chamber".to_string(),
            color_profile: Some("#222222".to_string()),
            sound_profile: Some("water_metal_resonance".to_string()),
            icon: Some("res://icons/iching_trigram.png".to_string()),
        };
    }

    // Soyga / Enochian ciphers
    if id.contains("soyga") || id.contains("enoch") || title.contains("enochian") {
        return ChapelProfile {
            domain: "cipher".to_string(),
            chapel_id: "stone_grimoire/cipher_lab".to_string(),
            color_profile: Some("#330066".to_string()),
            sound_profile: Some("number_station_choir".to_string()),
            icon: Some("res://icons/soyga_square.png".to_string()),
        };
    }

    // Default chapel
    ChapelProfile {
        domain: "general_esoteric".to_string(),
        chapel_id: "stone_grimoire/unified_library".to_string(),
        color_profile: Some("#999999".to_string()),
        sound_profile: Some("ambient_library".to_string()),
        icon: Some("res://icons/library_default.png".to_string()),
    }
}

/// Emit minimal Godot .tscn blueprints for each library.
/// These are intentionally barebones: a Node3D with metadata stored in a child Label3D.
/// You (human) or downstream tools can later decorate them with real architecture and art.
fn emit_godot_scenes(root: &Path, registry: &LibraryRegistry) -> io::Result<()> {
    fs::create_dir_all(root)?;

    for lib in &registry.libraries {
        let scene_name = format!("{}_chapel.tscn", lib.id);
        let scene_path = root.join(scene_name);

        let contents = format!(
            r#"[gd_scene load_steps=2 format=3]

[node name="{title}_Chapel" type="Node3D"]
metadata/id = "{id}"
metadata/domain = "{domain}"
metadata/chapel_id = "{chapel_id}"
metadata/source_path = "{path}"

[node name="Label3D" type="Label3D" parent="."]
text = "{title}"
"#,
            id = escape_godot(&lib.id),
            title = escape_godot(&lib.title),
            domain = escape_godot(&lib.chapel.domain),
            chapel_id = escape_godot(&lib.chapel.chapel_id),
            path = escape_godot(&lib.path),
        );

        fs::write(scene_path, contents)?;
    }

    Ok(())
}

/// Helper: path to string; fall back to normalized display.
fn path_to_string(p: &Path) -> String {
    p.to_str()
        .map(|s| s.to_string())
        .unwrap_or_else(|| p.display().to_string())
}

/// Basic escaping for embedding strings into .tscn.
/// Keeps this minimal and deterministic; extend if you add richer text.
fn escape_godot(input: &str) -> String {
    input
        .replace('\\', "/")
        .replace('"', "\\\"")
        .replace('\n', " ")
}

/// SOUL/BODY/SPIRIT integration: audiovisual profile for a library.
#[derive(Debug, Clone)]
pub struct SpiritVisualProfile {
    pub chapel_id: String,
    pub base_color: Option<String>,
    pub sound_profile: Option<String>,
}

/// BODY axis trait:
/// Consumers (game engines, Godot wrappers) can implement this to
/// map `LibraryEntry` into concrete runtime effects.
///
/// This crate provides the abstraction only; implementations live in
/// engine-specific crates without creating hard dependencies here.
pub trait BodyMechanicBridge {
    /// Given a library entry and optional mechanic tag/context,
    /// resolve a stable effect identifier understood by the caller.
    fn resolve_effect_id(
        &self,
        entry: &LibraryEntry,
        mechanic_tag: Option<&str>,
    ) -> Option<String>;
}

/// SPIRIT axis trait:
/// Consumers can use this to derive visual/sound configurations
/// from `LibraryEntry` data.
///
/// Implementations remain free-form but deterministic.
pub trait SpiritBridge {
    /// Given a library entry, derive concrete audiovisual parameters.
    fn visual_profile(&self, entry: &LibraryEntry) -> SpiritVisualProfile;
}

/// Example rustdoc usage patterns:
///
/// - Game system (BODY):
///   ```ignore
///   use stone_grimoire_library_engine::{StoneLibrary, StoneFilter};
///
///   // load at startup (from generated registry.json)
///   let lib = StoneLibrary::from_json_file(std::path::Path::new("data-libraries/registry.json"))?;
///
///   // choose a kabbalah-aligned library for an insight mechanic
///   let filter = StoneFilter::new()
///       .with_domain("kabbalah")
///       .with_mechanic_tag("mechanic:insight");
///   let candidates = lib.suggest_for_mechanic("mechanic:insight", &filter);
///   if let Some(entry) = candidates.first() {
///       // bridge to your engine-specific effect id
///       // effect_engine.apply_effect_for_library(entry.id.clone());
///   }
///   ```
///
/// - Synth/visual system (SPIRIT):
///   ```ignore
///   use stone_grimoire_library_engine::{StoneLibrary};
///
///   let lib = StoneLibrary::from_json_file(std::path::Path::new("data-libraries/registry.json"))?;
///   if let Some(profile) = lib.palette_for("liber_777") {
///       // configure color grading & tuning
///       // shaders.set_chapel(profile.chapel_id);
///       // shaders.set_tint(profile.base_color.unwrap_or("#ffffff".into()));
///       // audio_bus.set_scene(profile.sound_profile.unwrap_or("ambient_library".into()));
///   }
///   ```
///
/// These examples are intentionally minimal and deterministic, leaving
/// high-level orchestration to the calling engines.

// Optional: a small CLI-style helper (can be wired via a bin crate):
//
// fn main() {
//     let config = EngineConfig {
//         data_root: PathBuf::from("./data-libraries"),
//         registry_output: PathBuf::from("./data-libraries/registry.json"),
//         godot_scenes_output: Some(PathBuf::from("./godot/scenes/stone_grimoire/chapels")),
//     };
//
//     if let Err(e) = generate_registry(&config) {
//         eprintln!("Stone Grimoire Library Engine error: {e}");
//         std::process::exit(1);
//     }
// }
//
// For now, this module is designed to be invoked from your existing tooling or a thin wrapper.