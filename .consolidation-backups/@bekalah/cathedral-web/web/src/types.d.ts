// Global type definitions for Cathedral
declare module '*.json' {
  const value: any;
  export default value;
}

// Cathedral System Types
interface SystemStatus {
  cathedral: {
    status: string;
    version: string;
    quality: string;
    accessibility: string;
  };
  codex_144_99: {
    status: string;
    sacred_ratio: string;
    nodes_loaded: number;
  };
  living_arcanae: {
    status: string;
    tradition_engines: number;
  };
  fusion_kink_heaven: {
    status: string;
    ribbons: number;
  };
}

// Vite Environment Variables
declare const __CODEX_VERSION__: string;
declare const __CATHEDRAL_VERSION__: string;
declare const __LIVING_ARCANAE_COUNT__: number;
declare const __FUSION_COMBINATIONS__: number;