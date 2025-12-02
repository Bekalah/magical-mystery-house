// Agent of Kaoz Real Integration for Rosslyn Explorer
// Connects to actual Azure AI service for divine/infernal content generation

class AgentOfKaozReal {
    constructor() {
        this.agentUrl = 'http://localhost:8000';
        this.synthUrl = 'http://localhost:8000'; // Will add synth endpoint
        this.audioContext = null;
        this.activeSpells = new Map();
        this.initializeAudio();
    }

    async initializeAudio() {
        try {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        } catch (e) {
            console.warn('Web Audio not supported:', e);
        }
    }

    async invokeAgent(query, actionType = 'general', context = {}, character = null) {
        try {
            const response = await fetch(`${this.agentUrl}/invoke`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    query,
                    action_type: actionType,
                    context,
                    character
                })
            });

            if (!response.ok) {
                throw new Error(`HTTP ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error('Agent of Kaoz error:', error);
            return {
                response: `Agent of Kaoz is temporarily unavailable: ${error.message}`,
                success: false
            };
        }
    }

    async generateHarmonyArt(theme, angelAspect = '', demonAspect = '') {
        try {
            const response = await fetch(`${this.agentUrl}/art/harmony`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    theme,
                    angel_aspect: angelAspect,
                    demon_aspect: demonAspect
                })
            });

            if (!response.ok) {
                throw new Error(`HTTP ${response.status}`);
            }

            const data = await response.json();
            return data.art_prompt;
        } catch (error) {
            console.error('Art generation error:', error);
            return `Art generation temporarily unavailable: ${error.message}`;
        }
    }

    async castSpellWithSynth(spellName, context = '') {
        try {
            // First cast the spell through Agent of Kaoz
            const spellResult = await this.invokeAgent(
                `Cast the ${spellName} spell in the cathedral`,
                'spell_creation',
                { spell: spellName, context }
            );

            if (spellResult.success) {
                // Generate synth audio for the spell
                await this.playSynthSpell(spellName);

                return {
                    ...spellResult,
                    synthActive: true,
                    spellName
                };
            }

            return spellResult;
        } catch (error) {
            console.error('Spell casting error:', error);
            return {
                response: `Spell casting failed: ${error.message}`,
                success: false
            };
        }
    }

    async playSynthSpell(spellName) {
        if (!this.audioContext) return;

        // Synth spell mappings for Web Audio API
        const spellSynths = {
            'lightning_clarity': {
                type: 'sawtooth',
                frequencies: [261.63, 392.00, 523.25, 783.99], // C, G, C, G
                duration: 3.0,
                filter: { freq: 2000, Q: 10 },
                envelope: { attack: 0.0, decay: 0.3, sustain: 0.6, release: 0.8 },
                effects: { reverb: 0.9, chorus: 0.6 }
            },
            'dragon_transformation': {
                type: 'square',
                frequencies: [65.41, 98.00, 130.81, 196.00], // Low C, G, C, G
                duration: 5.0,
                filter: { freq: 400, Q: 15 },
                envelope: { attack: 0.1, decay: 1.5, sustain: 0.7, release: 2.0 },
                effects: { reverb: 0.7, distortion: 0.3 }
            },
            'spiral_meditation': {
                type: 'triangle',
                frequencies: [311.13, 392.00, 466.16, 587.33, 739.99], // E, G, B, D, F#
                duration: 8.0,
                filter: { freq: 800, Q: 5 },
                envelope: { attack: 0.5, decay: 2.0, sustain: 0.8, release: 3.0 },
                effects: { delay: 0.375, reverb: 0.9 }
            },
            'surreal_transformation': {
                type: 'sawtooth',
                frequencies: [220.00, 261.63, 329.63, 392.00, 523.25], // A, C, E, G, C
                duration: 6.0,
                filter: { freq: 1200, Q: 8 },
                envelope: { attack: 0.2, decay: 0.8, sustain: 0.8, release: 1.5 },
                effects: { chorus: 0.8, reverb: 0.7 }
            },
            'trauma_healing': {
                type: 'sine',
                frequencies: [130.81, 164.81, 196.00, 261.63, 329.63], // C, E, G, C, E
                duration: 10.0,
                filter: { freq: 1500, Q: 3 },
                envelope: { attack: 0.8, decay: 1.0, sustain: 0.9, release: 3.0 },
                effects: { reverb: 0.8, warmth: 0.6 }
            },
            'wild_wisdom': {
                type: 'sawtooth',
                frequencies: [146.83, 185.00, 220.00, 293.66, 369.99], // D, F#, A, D, F#
                duration: 7.0,
                filter: { freq: 600, Q: 12 },
                envelope: { attack: 0.1, decay: 0.5, sustain: 0.6, release: 1.0 },
                effects: { formant: 0.7, reverb: 0.8 }
            },
            'arcane_knowledge': {
                type: 'sine',
                frequencies: [523.25, 659.25, 783.99, 1046.50, 1318.51], // C, E, G, C, E (high)
                duration: 12.0,
                filter: { freq: 3000, Q: 2 },
                envelope: { attack: 0.0, decay: 2.0, sustain: 0.4, release: 4.0 },
                effects: { reverb: 1.0, shimmer: 0.3 }
            }
        };

        const synthConfig = spellSynths[spellName];
        if (!synthConfig) return;

        // Create and play the synth patch
        const now = this.audioContext.currentTime;
        const gainNode = this.audioContext.createGain();
        const filterNode = this.audioContext.createBiquadFilter();
        const reverbNode = this.createReverb();

        // Set up filter
        filterNode.type = 'lowpass';
        filterNode.frequency.setValueAtTime(synthConfig.filter.freq, now);
        filterNode.Q.setValueAtTime(synthConfig.filter.Q, now);

        // Connect audio graph
        gainNode.connect(filterNode);
        filterNode.connect(reverbNode);
        reverbNode.connect(this.audioContext.destination);

        // Play each frequency in sequence
        synthConfig.frequencies.forEach((freq, index) => {
            const startTime = now + (index * synthConfig.duration / synthConfig.frequencies.length * 0.8);
            const noteLength = synthConfig.duration / synthConfig.frequencies.length * 1.2;

            this.playNote(freq, startTime, noteLength, synthConfig, gainNode);
        });

        // Store active spell
        this.activeSpells.set(spellName, {
            startTime: now,
            duration: synthConfig.duration,
            gainNode
        });

        // Auto-cleanup
        setTimeout(() => {
            this.activeSpells.delete(spellName);
        }, synthConfig.duration * 1000);
    }

    playNote(frequency, startTime, duration, synthConfig, destination) {
        const oscillator = this.audioContext.createOscillator();
        const noteGain = this.audioContext.createGain();

        oscillator.type = synthConfig.type;
        oscillator.frequency.setValueAtTime(frequency, startTime);

        // Apply envelope
        const env = synthConfig.envelope;
        noteGain.gain.setValueAtTime(0, startTime);
        noteGain.gain.linearRampToValueAtTime(0.3, startTime + env.attack);
        noteGain.gain.exponentialRampToValueAtTime(0.3 * env.sustain, startTime + env.attack + env.decay);
        noteGain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);

        oscillator.connect(noteGain);
        noteGain.connect(destination);

        oscillator.start(startTime);
        oscillator.stop(startTime + duration);
    }

    createReverb() {
        const reverbNode = this.audioContext.createConvolver();

        // Create simple reverb impulse response
        const length = this.audioContext.sampleRate * 3; // 3 seconds
        const impulse = this.audioContext.createBuffer(2, length, this.audioContext.sampleRate);

        for (let channel = 0; channel < 2; channel++) {
            const channelData = impulse.getChannelData(channel);
            for (let i = 0; i < length; i++) {
                channelData[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / length, 2);
            }
        }

        reverbNode.buffer = impulse;
        return reverbNode;
    }

    getActiveSpells() {
        const now = this.audioContext?.currentTime || 0;
        const active = [];

        for (const [spellName, spell] of this.activeSpells) {
            if (now < spell.startTime + spell.duration) {
                active.push({
                    name: spellName,
                    timeRemaining: (spell.startTime + spell.duration - now).toFixed(1)
                });
            }
        }

        return active;
    }

    dismissSpell(spellName) {
        const spell = this.activeSpells.get(spellName);
        if (spell && spell.gainNode) {
            spell.gainNode.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + 0.1);
            this.activeSpells.delete(spellName);
        }
    }
}

// Initialize the real Agent of Kaoz
const agentOfKaozReal = new AgentOfKaozReal();

// Update the explorer's triggerAgentOfKaoz method to use real AI
async function triggerAgentOfKaozReal(context, actionType, data = {}) {
    const agentStatus = document.getElementById('agent-status');
    const agentMessage = document.getElementById('agent-message');
    const agentResult = document.getElementById('agent-result');

    agentStatus.style.display = 'block';
    agentMessage.textContent = 'Agent of Kaoz is channeling divine/infernal wisdom...';
    agentResult.innerHTML = '';

    try {
        let result;

        if (actionType === 'spell_creation') {
            // Cast spell with synth integration
            result = await agentOfKaozReal.castSpellWithSynth(data.spell || context, JSON.stringify(data));
        } else {
            // Regular Agent of Kaoz invocation
            result = await agentOfKaozReal.invokeAgent(
                typeof context === 'string' ? context : JSON.stringify(context),
                actionType,
                data,
                data.character
            );
        }

        if (result.success) {
            agentMessage.textContent = `Agent of Kaoz has manifested divine wisdom!`;

            let htmlContent = `
                <div class="generated-content">
                    <h4 style="color: #ffd700;">✨ Agent of Kaoz Response</h4>
                    <div style="margin: 15px 0; line-height: 1.6;">${result.response.replace(/\n/g, '<br>')}</div>
            `;

            if (result.art_prompt) {
                htmlContent += `
                    <div class="art-preview" style="margin: 15px 0; padding: 15px; background: rgba(139, 115, 85, 0.1); border-radius: 8px;">
                        <strong>🎨 Generated Art Prompt:</strong><br>
                        <em>${result.art_prompt.substring(0, 300)}${result.art_prompt.length > 300 ? '...' : ''}</em>
                    </div>
                `;
            }

            if (result.synthActive) {
                const activeSpells = agentOfKaozReal.getActiveSpells();
                htmlContent += `
                    <div style="margin: 15px 0; padding: 10px; background: rgba(255, 215, 0, 0.1); border: 1px solid #ffd700; border-radius: 8px;">
                        <strong>🎵 Synth Spell Active: ${result.spellName}</strong><br>
                        <small>Listen to the mystical sounds weaving through the cathedral...</small>
                    </div>
                `;
            }

            htmlContent += '</div>';
            agentResult.innerHTML = htmlContent;
        } else {
            agentMessage.textContent = 'Agent of Kaoz encountered turbulence...';
            agentResult.innerHTML = `
                <div class="generated-content">
                    <p style="color: #ff6b6b;">${result.response}</p>
                </div>
            `;
        }
    } catch (error) {
        agentMessage.textContent = 'Agent of Kaoz is currently unreachable...';
        agentResult.innerHTML = `
            <div class="generated-content">
                <p style="color: #ff6b6b;">Connection to the mystical realm failed: ${error.message}</p>
                <p><em>The Agent works through Azure AI and requires the service to be running.</em></p>
            </div>
        `;
    }
}

// Export for global use
window.agentOfKaozReal = agentOfKaozReal;
window.triggerAgentOfKaozReal = triggerAgentOfKaozReal;