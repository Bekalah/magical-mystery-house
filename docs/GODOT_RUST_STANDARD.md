# Godot 4.5 + Rust: Cathedral Standard

> [!IMPORTANT]
> **Visionary Art Tech**: All game engines, art chapels, and interactive visionary modules will use **Godot 4.5** with **Rust** (via GDExtension) to ensure high performance, memory safety, and older hardware compatibility (Mac/Safari).

## Standards
1.  **Engine**: Godot Engine v4.5 (or latest stable 4.x).
2.  **Language**: Rust (gdext).
3.  **Target**: Web (WASM) for Safari compatibility & Desktop (Metal/Vulkan).

## Setup
### Rust
```bash
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
rustup target add wasm32-unknown-unknown
```

### Godot
- Download Godot 4.x .app to `/Applications`.
- Add `godot` to PATH.

### Project Structure (Module)
```
packages/
  my-art-chapel/
    godot/          # Godot project files
    rust/           # Rust source code
    extension_api.json
```

## Integration
All Godot modules are tracked in the **Model Control Dashboard** under the **VISIONARY** or **ART** modes.
