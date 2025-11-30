#!/usr/bin/env python3
"""
Cathedral Synth Labs - Classic Synthesizer Emulations
Emulating legendary synthesizers with mathematical precision
"""

import numpy as np
import sounddevice as sd
import json
from pathlib import Path
import math
import time
from dataclasses import dataclass
from typing import List, Dict, Tuple

@dataclass
class Oscillator:
    """Basic oscillator configuration"""
    waveform: str = "saw"  # saw, square, sine, triangle
    frequency: float = 440.0
    amplitude: float = 0.5
    phase: float = 0.0
    detune: float = 0.0

@dataclass
class Filter:
    """Filter configuration"""
    type: str = "lowpass"  # lowpass, highpass, bandpass
    cutoff: float = 1000.0
    resonance: float = 0.0
    envelope_amount: float = 0.0

@dataclass
class Envelope:
    """ADSR envelope configuration"""
    attack: float = 0.1
    decay: float = 0.2
    sustain: float = 0.7
    release: float = 0.5

class WaveformGenerator:
    """Generate classic synthesizer waveforms"""
    
    @staticmethod
    def generate_waveform(waveform: str, frequency: float, duration: float, 
                         sample_rate: int = 44100, phase: float = 0.0) -> np.ndarray:
        """Generate waveform array"""
        t = np.linspace(0, duration, int(sample_rate * duration), False)
        
        if waveform == "sine":
            return np.sin(2 * np.pi * frequency * t + phase)
        elif waveform == "saw":
            return 2 * (t * frequency - np.floor(0.5 + t * frequency))
        elif waveform == "square":
            return np.sign(np.sin(2 * np.pi * frequency * t + phase))
        elif waveform == "triangle":
            return 2 * np.abs(2 * (t * frequency - np.floor(0.5 + t * frequency))) - 1
        else:
            raise ValueError(f"Unknown waveform: {waveform}")

class FilterEngine:
    """Digital filter implementations"""
    
    @staticmethod
    def lowpass_filter(signal: np.ndarray, cutoff: float, resonance: float, 
                      sample_rate: int = 44100) -> np.ndarray:
        """Simple lowpass filter implementation"""
        # Simplified digital filter (for production, use scipy.signal)
        omega = 2 * np.pi * cutoff / sample_rate
        alpha = np.sin(omega) / (2 * (1 + resonance))
        
        b0 = (1 - np.cos(omega)) / 2
        b1 = 1 - np.cos(omega)
        b2 = (1 - np.cos(omega)) / 2
        a0 = 1 + alpha
        a1 = -2 * np.cos(omega)
        a2 = 1 - alpha
        
        # Normalize coefficients
        b = np.array([b0, b1, b2]) / a0
        a = np.array([1, a1/a0, a2/a0])
        
        # Apply filter (simplified - use scipy.signal.lfilter for production)
        filtered = np.convolve(signal, b, mode='same')
        return filtered

class EnvelopeGenerator:
    """ADSR envelope generator"""
    
    @staticmethod
    def generate_adsr(envelope: Envelope, duration: float, 
                     sample_rate: int = 44100) -> np.ndarray:
        """Generate ADSR envelope"""
        total_samples = int(duration * sample_rate)
        attack_samples = int(envelope.attack * sample_rate)
        decay_samples = int(envelope.decay * sample_rate)
        release_samples = int(envelope.release * sample_rate)
        sustain_samples = total_samples - attack_samples - decay_samples - release_samples
        
        env = np.zeros(total_samples)
        
        # Attack
        if attack_samples > 0:
            env[:attack_samples] = np.linspace(0, 1, attack_samples)
        
        # Decay
        if decay_samples > 0:
            start_idx = attack_samples
            end_idx = start_idx + decay_samples
            env[start_idx:end_idx] = np.linspace(1, envelope.sustain, decay_samples)
        
        # Sustain
        if sustain_samples > 0:
            start_idx = attack_samples + decay_samples
            end_idx = start_idx + sustain_samples
            env[start_idx:end_idx] = envelope.sustain
        
        # Release
        if release_samples > 0:
            start_idx = total_samples - release_samples
            env[start_idx:] = np.linspace(envelope.sustain, 0, release_samples)
        
        return env

class YamahaCS80Emulator:
    """Emulate the legendary Yamaha CS-80 synthesizer"""
    
    def __init__(self, sample_rate: int = 44100):
        self.sample_rate = sample_rate
        self.name = "Yamaha CS-80"
        
        # CS-80 characteristic settings
        self.default_oscillators = [
            Oscillator("saw", 440.0, 0.6, 0.0, 0.0),
            Oscillator("saw", 440.0, 0.4, 0.0, -7.0)  # Slightly detuned
        ]
        
        self.default_filter = Filter("lowpass", 2000.0, 0.3, 0.5)
        self.default_envelope = Envelope(0.05, 0.3, 0.6, 1.2)
    
    def generate_note(self, frequency: float, duration: float, 
                     velocity: float = 0.8) -> np.ndarray:
        """Generate a note with CS-80 characteristics"""
        
        # Generate oscillator signals
        osc_signals = []
        for osc in self.default_oscillators:
            osc_freq = frequency + osc.detune
            signal = WaveformGenerator.generate_waveform(
                osc.waveform, osc_freq, duration, self.sample_rate, osc.phase
            )
            osc_signals.append(signal * osc.amplitude)
        
        # Mix oscillators
        mixed_signal = sum(osc_signals)
        
        # Apply filter
        filtered_signal = FilterEngine.lowpass_filter(
            mixed_signal, self.default_filter.cutoff, self.default_filter.resonance
        )
        
        # Apply envelope
        envelope_curve = EnvelopeGenerator.generate_adsr(
            self.default_envelope, duration, self.sample_rate
        )
        
        # Apply velocity and envelope
        final_signal = filtered_signal * envelope_curve * velocity
        
        return final_signal

class MoogModularEmulator:
    """Emulate Moog Modular characteristics"""
    
    def __init__(self, sample_rate: int = 44100):
        self.sample_rate = sample_rate
        self.name = "Moog Modular"
        
        # Moog characteristic fat bass
        self.default_oscillators = [
            Oscillator("saw", 440.0, 0.8, 0.0, 0.0),
            Oscillator("square", 220.0, 0.4, 0.0, 0.0)  # Sub oscillator
        ]
        
        # Characteristic Moog ladder filter
        self.default_filter = Filter("lowpass", 800.0, 0.7, 0.8)
        self.default_envelope = Envelope(0.01, 0.4, 0.5, 0.8)
    
    def generate_note(self, frequency: float, duration: float, 
                     velocity: float = 0.8) -> np.ndarray:
        """Generate Moog-style note"""
        
        osc_signals = []
        for osc in self.default_oscillators:
            if osc.frequency == 220.0:  # Sub oscillator
                osc_freq = frequency / 2
            else:
                osc_freq = frequency
                
            signal = WaveformGenerator.generate_waveform(
                osc.waveform, osc_freq, duration, self.sample_rate
            )
            osc_signals.append(signal * osc.amplitude)
        
        mixed_signal = sum(osc_signals)
        
        # Moog-style filter with higher resonance
        filtered_signal = FilterEngine.lowpass_filter(
            mixed_signal, self.default_filter.cutoff, self.default_filter.resonance
        )
        
        envelope_curve = EnvelopeGenerator.generate_adsr(
            self.default_envelope, duration, self.sample_rate
        )
        
        return filtered_signal * envelope_curve * velocity

class AphexTwinGenerator:
    """Richard D. James style generative engine"""
    
    def __init__(self, sample_rate: int = 44100):
        self.sample_rate = sample_rate
        self.name = "Aphex Generator"
    
    def generate_complex_patch(self, base_frequency: float, duration: float) -> np.ndarray:
        """Generate complex Aphex-style patch"""
        
        # Multiple detuned oscillators
        oscillators = []
        for i in range(5):
            detune = np.random.uniform(-50, 50)
            waveform = np.random.choice(["saw", "square", "sine"])
            osc = Oscillator(waveform, base_frequency + detune, 
                           np.random.uniform(0.1, 0.3))
            oscillators.append(osc)
        
        # Generate and mix signals
        signals = []
        for osc in oscillators:
            signal = WaveformGenerator.generate_waveform(
                osc.waveform, osc.frequency, duration, self.sample_rate
            )
            signals.append(signal * osc.amplitude)
        
        mixed_signal = sum(signals)
        
        # Apply random modulation
        modulation_freq = np.random.uniform(0.1, 20.0)
        modulation = WaveformGenerator.generate_waveform(
            "sine", modulation_freq, duration, self.sample_rate
        )
        
        # Ring modulation
        modulated_signal = mixed_signal * (1 + 0.3 * modulation)
        
        # Random filter sweep
        cutoff_start = np.random.uniform(200, 2000)
        cutoff_end = np.random.uniform(200, 2000)
        
        # Simple filter sweep (in production, use time-varying filter)
        mid_cutoff = (cutoff_start + cutoff_end) / 2
        filtered_signal = FilterEngine.lowpass_filter(
            modulated_signal, mid_cutoff, np.random.uniform(0.1, 0.8)
        )
        
        # Random envelope
        envelope = Envelope(
            np.random.uniform(0.01, 0.5),
            np.random.uniform(0.1, 1.0),
            np.random.uniform(0.3, 0.9),
            np.random.uniform(0.2, 2.0)
        )
        
        envelope_curve = EnvelopeGenerator.generate_adsr(envelope, duration)
        
        return filtered_signal * envelope_curve

class SynthLabManager:
    """Main synthesizer lab manager"""
    
    def __init__(self, sample_rate: int = 44100):
        self.sample_rate = sample_rate
        self.synths = {
            "cs80": YamahaCS80Emulator(sample_rate),
            "moog": MoogModularEmulator(sample_rate),
            "aphex": AphexTwinGenerator(sample_rate)
        }
    
    def generate_sequence(self, synth_name: str, notes: List[Tuple[float, float]], 
                         note_duration: float = 1.0) -> np.ndarray:
        """Generate a sequence of notes"""
        
        if synth_name not in self.synths:
            raise ValueError(f"Unknown synth: {synth_name}")
        
        synth = self.synths[synth_name]
        sequences = []
        
        for frequency, velocity in notes:
            if hasattr(synth, 'generate_note'):
                note_signal = synth.generate_note(frequency, note_duration, velocity)
            elif hasattr(synth, 'generate_complex_patch'):
                note_signal = synth.generate_complex_patch(frequency, note_duration)
            else:
                raise ValueError(f"Synth {synth_name} has no generate method")
            
            sequences.append(note_signal)
        
        # Concatenate sequences with small gaps
        gap_samples = int(0.1 * self.sample_rate)
        gap = np.zeros(gap_samples)
        
        full_sequence = []
        for seq in sequences:
            full_sequence.extend(seq)
            full_sequence.extend(gap)
        
        return np.array(full_sequence)
    
    def save_sequence(self, sequence: np.ndarray, filename: str):
        """Save sequence to WAV file (requires scipy)"""
        # Normalize
        sequence = sequence / np.max(np.abs(sequence))
        
        # In production, use scipy.io.wavfile.write
        print(f"Would save sequence to {filename}")
        print(f"Sequence length: {len(sequence)} samples, Duration: {len(sequence)/self.sample_rate:.2f}s")

def main():
    """Generate sample synthesizer sequences"""
    lab = SynthLabManager()
    
    # Create output directory
    output_dir = Path("generated_synth")
    output_dir.mkdir(exist_ok=True)
    
    # Test sequence (C major scale)
    notes = [
        (261.63, 0.8),  # C4
        (293.66, 0.8),  # D4
        (329.63, 0.8),  # E4
        (349.23, 0.8),  # F4
        (392.00, 0.8),  # G4
        (440.00, 0.8),  # A4
        (493.88, 0.8),  # B4
        (523.25, 0.8),  # C5
    ]
    
    # Generate sequences for each synth
    for synth_name in lab.synths.keys():
        print(f"Generating {synth_name} sequence...")
        sequence = lab.generate_sequence(synth_name, notes, 0.8)
        lab.save_sequence(sequence, output_dir / f"{synth_name}_sequence.wav")
    
    # Generate Aphex-style random patch
    print("Generating Aphex-style complex patch...")
    aphex = lab.synths["aphex"]
    complex_patch = aphex.generate_complex_patch(220.0, 4.0)
    lab.save_sequence(complex_patch, output_dir / "aphex_complex_patch.wav")
    
    print(f"Generated synth sequences (simulated) in {output_dir}")

if __name__ == "__main__":
    main()