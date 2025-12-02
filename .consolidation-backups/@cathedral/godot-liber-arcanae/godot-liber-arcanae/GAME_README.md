# Liber Arcanae - 22 Major Arcana Game

A full Godot game featuring all 22 Major Arcana characters from the Liber Arcanae system as playable characters.

## Features

- **22 Playable Characters**: All Major Arcana (0-21) are fully playable
- **Character Selection**: Choose from any of the 22 characters
- **Unique Abilities**: Each character has 4 unique abilities based on their arcana
- **Color Palettes**: Each character has a unique color palette from their arcana data
- **Playstyles**: Each character has a distinct playstyle (Explorer, Mage, Support, Tank, etc.)

## Characters

### 0. The Fool - Rebecca Respawn, The Wonder-Keeper
- **Playstyle**: Explorer - High mobility, unpredictable movement
- **Abilities**: Leap of Faith, Infinite Possibilities, Beginner's Mind, Quantum Jump

### 1. The Magician - The Manifestor
- **Playstyle**: Mage - High magic damage, versatile spells
- **Abilities**: Elemental Mastery, Reality Manipulation, Sacred Tools, Will Power

### 2. The High Priestess - Gemini Rivers, The Wisdom Keeper
- **Playstyle**: Support - Healing, protection, wisdom
- **Abilities**: Intuitive Vision, Lunar Power, Hidden Knowledge, Mystical Shield

### 3. The Empress - The Fertility Guardian
- **Playstyle**: Summoner - Nature allies, area control
- **Abilities**: Nature Command, Growth, Abundance, Life Force

### 4. The Emperor - The Order Keeper
- **Playstyle**: Tank - High defense, team buffs
- **Abilities**: Command Authority, Structure, Protection, Leadership

### 5. The Hierophant - The Chohan of the Golden Flame
- **Playstyle**: Support - Team enhancement, knowledge sharing
- **Abilities**: Sacred Teaching, Tradition, Initiation, Spiritual Guidance

### 6. The Lovers - Scarlett Lady, The Sacred Union Master
- **Playstyle**: Hybrid - Balanced offense and support
- **Abilities**: Sacred Union, Dual Power, Harmony, Love Shield

### 7. The Chariot - Elyria Nox, The Dimensional Navigator
- **Playstyle**: Mobility - Fast movement, hit-and-run
- **Abilities**: Dimensional Travel, Speed, Control, Victory

### 8. Strength - The Inner Power Master
- **Playstyle**: Warrior - High physical damage, resilience
- **Abilities**: Inner Strength, Patience, Courage, Overcoming

### 9. The Hermit - Orin Lantern, The Seeker Guide
- **Playstyle**: Sage - High magic, self-sufficient
- **Abilities**: Inner Light, Wisdom, Guidance, Solitude Power

### 10. Wheel of Fortune - Grand Professor of Eternal Flux
- **Playstyle**: Gambler - Random powerful effects, luck-based
- **Abilities**: Fortune Spin, Probability Control, Cycles, Change

### 11. Justice - The Balanced Judge
- **Playstyle**: Paladin - Balanced offense/defense, justice effects
- **Abilities**: Balance, Judgment, Karma, Truth

### 12. The Hanged Man - The Suspended Seeker
- **Playstyle**: Trickster - Unconventional tactics, perspective shifts
- **Abilities**: Sacrifice, New Perspective, Suspension, Enlightenment

### 13. Death - The Transformation Master
- **Playstyle**: Necromancer - Transformation magic, rebirth
- **Abilities**: Transformation, Endings, Rebirth, Change

### 14. Temperance - The Alchemical Balancer
- **Playstyle**: Alchemist - Elemental mixing, balance effects
- **Abilities**: Balance, Moderation, Alchemy, Harmony

### 15. The Devil - The Shadow Binder
- **Playstyle**: Warlock - Dark magic, binding effects
- **Abilities**: Binding, Shadow Power, Materialism, Temptation

### 16. The Tower - The Destructive Awakener
- **Playstyle**: Berserker - High burst damage, area destruction
- **Abilities**: Destruction, Revelation, Sudden Change, Breakthrough

### 17. The Star - The Hope Bringer
- **Playstyle**: Healer - Strong healing, inspiration buffs
- **Abilities**: Hope, Inspiration, Guidance, Healing

### 18. The Moon - Luna Mystery, The Dream Navigator
- **Playstyle**: Illusionist - Confusion effects, dream magic
- **Abilities**: Illusion, Dreams, Intuition, Mystery

### 19. The Sun - The Radiant One
- **Playstyle**: Paladin - High damage, healing, positive energy
- **Abilities**: Radiance, Joy, Vitality, Enlightenment

### 20. Judgment - The Awakening Caller
- **Playstyle**: Reviver - Resurrection, judgment effects
- **Abilities**: Awakening, Judgment, Resurrection, Call

### 21. The World - The Completion Master
- **Playstyle**: Master - Balanced all abilities, completion power
- **Abilities**: Completion, Integration, Wholeness, Mastery

## Controls

- **WASD**: Move character
- **ESC**: Return to main menu (in game)

## Character Data

All character data is loaded from `characters.json`, which includes:
- Character names and numbers
- Purity designations
- Fractal signatures
- Color palettes
- Frequency resonances
- Abilities
- Playstyles

## Game Structure

- `scenes/main_menu.tscn`: Character selection screen
- `scenes/game_scene.tscn`: Main game scene
- `scripts/character.gd`: Base character class
- `scripts/character_selector.gd`: Character selection UI
- `scripts/game_manager.gd`: Game state management
- `scripts/main_menu_handler.gd`: Main menu logic
- `scripts/game_scene_handler.gd`: Game scene logic

## Development

This game is built with Godot 4.5 and uses the Liber Arcanae character system. All 22 Major Arcana are fully playable with unique abilities and playstyles based on their mystical properties.

