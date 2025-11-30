# Unified Professional Theme Specification

**Status**: ✅ Implemented  
**Version**: 1.0.0  
**Date**: 2024-11-30  
**License**: CC0-1.0 - Public Domain

## Overview

A unified, high-end, portfolio-quality design system applied across all Cathedral tools, games, design mathematics, FusionKink, books, and systems. This ensures consistent professional business standards with alchemical/hermetic theming.

## Scope

Applies to:
- **Games**: All game interfaces and components
- **Design Mathematics**: Mathematical visualization tools
- **FusionKink**: FusionKink interfaces and systems
- **Books/Grimoires**: All book and grimoire interfaces
- **All Tools**: Every tool in the Cathedral ecosystem
- **All Systems**: All system interfaces and dashboards

## Design Standards

### High-End Portfolio Quality
- Museum-grade typography
- Professional business standards
- Sacred geometry spacing (Fibonacci, Golden Ratio, Cathedral Ratio 144:99)
- Never flat - depth, shadows, gradients
- Asymmetric, breathing layouts

### Color Palette
- **Primary**: Burnished Gold (#D4AF37)
- **Secondary**: Deep Violet (#6B46C1)
- **Accent**: Amber (#F59E0B)
- **Background**: Deep Black (#0A0A0A)
- **Surface**: Rich Dark Purple (#1A1333)
- **Text Primary**: Champagne (#F5E6D3)
- **Text Secondary**: Soft Gold (#D4AF37)

### Alchemical Elements
- **Fire**: Gold (#FFD700) - Games
- **Water**: Silver (#C0C0C0) - FusionKink
- **Air**: Mercury/Lavender (#E6E6FA) - Design Math
- **Earth**: Lead/Dark Slate (#2F4F4F) - Books

### Typography
- **Display**: Cormorant Garamond, EB Garamond (serif)
- **Body**: Crimson Text, Lora (serif)
- **Mono**: JetBrains Mono, Fira Code (monospace)

### Spacing
- Base unit: 8px
- Fibonacci scale: 8, 13, 21, 34, 55, 89, 144
- Golden Ratio: 1.618
- Cathedral Ratio: 144:99 (1.4545...)

### Shadows & Depth
- Subtle: `0 2px 8px rgba(0, 0, 0, 0.3)`
- Medium: `0 4px 16px rgba(0, 0, 0, 0.4), 0 2px 4px rgba(212, 175, 55, 0.1)`
- Deep: `0 8px 32px rgba(0, 0, 0, 0.5), 0 4px 8px rgba(212, 175, 55, 0.15)`
- Glow: `0 0 24px rgba(212, 175, 55, 0.3), 0 0 48px rgba(212, 175, 55, 0.15)`
- Alchemical: `0 0 32px rgba(212, 175, 55, 0.4), inset 0 0 16px rgba(107, 70, 193, 0.2)`

### Borders
- Never flat - always depth
- Organic, asymmetric: `4px 8px 12px 6px`
- Gradient borders for alchemical elements

### Animations
- Smooth: `cubic-bezier(0.4, 0, 0.2, 1)`
- Breathe: `cubic-bezier(0.68, -0.55, 0.265, 1.55)`
- Reveal: `cubic-bezier(0.25, 0.46, 0.45, 0.94)`
- Alchemical: `cubic-bezier(0.618, 0, 0.382, 1)` (Golden Ratio easing)

## Implementation

### Files
- `packages/shared/src/unified-professional-theme.ts` - TypeScript theme definition
- `packages/shared/src/styles/unified-professional.css` - CSS implementation
- `tools/apply-unified-theme.mjs` - Theme application tool

### Usage
```bash
pnpm run theme:apply
```

### Integration
All components automatically import the unified theme CSS:
```typescript
import '@cathedral/shared/src/styles/unified-professional.css';
```

## Component-Specific Styles

### Games
- Font: Display (Cormorant Garamond)
- Background: Fire gradient (Gold)
- Border: Fire element (Gold)
- Shadow: Alchemical glow

### Design Mathematics
- Background: Air gradient (Lavender)
- Border: Air element (Lavender)
- Font: Mono (JetBrains Mono)

### FusionKink
- Background: Water gradient (Silver)
- Border: Water element (Silver)
- Shadow: Glow

### Books/Grimoires
- Background: Paper texture
- Border: Subtle gold
- Font: Body (Crimson Text)
- Shadow: Medium depth

### Tools
- Background: Surface gradient
- Border: Subtle gold
- Shadow: Medium
- Border-radius: Organic

## Compliance

✅ **Free Tools Only**: No paid services or subscriptions  
✅ **Public Domain**: CC0-1.0 license  
✅ **Professional Standards**: High-end portfolio quality  
✅ **Alchemical Theme**: Monas Hieroglyphica alignment  
✅ **Never Flat**: Depth, shadows, gradients throughout  
✅ **Sacred Geometry**: Fibonacci, Golden Ratio, Cathedral Ratio  

## Change Management

All theme changes must:
1. Update `unified-professional-theme.ts`
2. Update `unified-professional.css`
3. Run `pnpm run theme:apply`
4. Test across all component types
5. Document in this spec

---

**Master V1 Control Compliance**: This specification follows OpenSpec protocols and Master V1 Control standards.

