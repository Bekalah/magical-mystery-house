import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

// Cathedral Unity State Management
// Core state for all Cathedral systems

export interface CathedralState {
  // Core state
  consciousnessLevel: number
  isInitialized: boolean
  activeSystem: string
  error: string | null
  
  // Bridge state
  bridgeConnected: boolean
  activeNodes: string[]
  
  // User preferences
  traumaSafeMode: boolean
  audioEnabled: boolean
  reducedMotion: boolean
  theme: 'dark' | 'light' | 'auto'
  
  // Actions
  initializeCathedral: () => Promise<void>
  setConsciousnessLevel: (level: number) => void
  setActiveSystem: (system: string) => void
  setError: (error: string | null) => void
  clearError: () => void
  setBridgeConnected: (connected: boolean) => void
  setActiveNodes: (nodes: string[]) => void
  toggleTraumaSafeMode: () => void
  toggleAudio: () => void
  setTheme: (theme: 'dark' | 'light' | 'auto') => void
}

export const useCathedralStore = create<CathedralState>()(
  devtools(
    (set, get) => ({
      // Initial state
      consciousnessLevel: 0,
      isInitialized: false,
      activeSystem: 'home',
      error: null,
      bridgeConnected: false,
      activeNodes: [],
      traumaSafeMode: true,
      audioEnabled: true,
      reducedMotion: false,
      theme: 'dark',

      // Actions
      initializeCathedral: async () => {
        try {
          console.log('🏛️ Initializing Cathedral Unity...')
          
          // Simulate initialization
          await new Promise(resolve => setTimeout(resolve, 1000))
          
          set({ 
            isInitialized: true,
            error: null
          })
          
          console.log('✅ Cathedral Unity initialized successfully!')
        } catch (error) {
          console.error('❌ Cathedral initialization failed:', error)
          set({ error: error instanceof Error ? error.message : 'Unknown error' })
        }
      },

      setConsciousnessLevel: (level: number) => {
        set({ consciousnessLevel: Math.max(0, Math.min(22, level)) })
      },

      setActiveSystem: (system: string) => {
        set({ activeSystem: system })
      },

      setError: (error: string | null) => {
        set({ error })
      },

      clearError: () => {
        set({ error: null })
      },

      setBridgeConnected: (connected: boolean) => {
        set({ bridgeConnected: connected })
      },

      setActiveNodes: (nodes: string[]) => {
        set({ activeNodes: nodes })
      },

      toggleTraumaSafeMode: () => {
        set(state => ({ traumaSafeMode: !state.traumaSafeMode }))
      },

      toggleAudio: () => {
        set(state => ({ audioEnabled: !state.audioEnabled }))
      },

      setTheme: (theme: 'dark' | 'light' | 'auto') => {
        set({ theme })
      }
    }),
    {
      name: 'cathedral-store'
    }
  )
)