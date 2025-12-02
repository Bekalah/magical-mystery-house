/// <reference types="vite/client" />

declare const __CODEX_VERSION__: string
declare const __CATHEDRAL_VERSION__: string  
declare const __LIVING_ARCANAE_COUNT__: number
declare const __FUSION_COMBINATIONS__: number

interface ImportMetaEnv {
  readonly VITE_BASE?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}