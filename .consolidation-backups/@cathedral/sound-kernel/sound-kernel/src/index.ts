import * as Tone from 'tone';

export interface MotifConfig {
  motif: string;
  energy: number; // 1–9
  mode: string;
  instrumentation: string[];
  adaptive?: { rise?: boolean; pulse?: boolean; fractalLayer?: boolean };
  solfeggioHz?: number;
  beatPattern?: string;
  synthPreset?: string;
}

export class SoundKernel {
  private started = false;
  private layers: Record<string, Tone.ToneAudioNode> = {};
  private mode: 'ambient' | 'story' | 'art' = 'ambient';
  private gainBus: Tone.Gain | null = null;

  async init() {
    if (!this.started) {
      await Tone.start();
      this.gainBus = new Tone.Gain(0.9).toDestination();
      this.started = true;
    }
  }

  applyMotif(cfg: MotifConfig) {
    if (!this.layers[cfg.motif]) {
      const synth = new Tone.PolySynth(Tone.Synth, { maxPolyphony: 8 });
      (synth as any).connect(this.gainBus || Tone.getDestination());
      this.layers[cfg.motif] = synth;
    }
    const synth = this.layers[cfg.motif] as any;
    const baseHz = cfg.solfeggioHz || 432;
    const notes = ['C4','E4','G4'].map((n,i)=> n.replace('4', String(4+i)));
    // Basic variation using energy and mode to shift duration
    const dur = cfg.energy >= 7 ? '2n' : '1n';
    synth.triggerAttackRelease(notes, dur);
  }

  setMode(mode: 'ambient' | 'story' | 'art') {
    this.mode = mode;
    if (this.gainBus) {
      const target = mode === 'ambient' ? 0.6 : mode === 'story' ? 0.85 : 1.0;
      this.gainBus.gain.rampTo(target, 0.5);
    }
  }
}

export const kernel = new SoundKernel();
