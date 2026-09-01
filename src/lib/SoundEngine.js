class SoundEngine {
  constructor() {
    this.ctx = null;
    this.masterGain = null;
    this.isUnlocked = false;
  }

  init() {
    if (typeof window === 'undefined' || this.ctx) return;
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioContext();
      this.masterGain = this.ctx.createGain();
      
      // Add a master compressor to absolutely prevent any harsh clipping or "rough noise"
      this.compressor = this.ctx.createDynamicsCompressor();
      this.compressor.threshold.value = -10;
      this.compressor.knee.value = 40;
      this.compressor.ratio.value = 12;
      this.compressor.attack.value = 0;
      this.compressor.release.value = 0.25;

      this.masterGain.gain.value = 0.6; // Reduced to prevent clipping
      
      this.masterGain.connect(this.compressor);
      this.compressor.connect(this.ctx.destination);
    } catch(e) {
      console.warn("Web Audio API not supported in this browser");
    }
  }

  unlock() {
    if (this.isUnlocked) return;
    this.init();
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().then(() => {
        this.isUnlocked = true;
      }).catch(e => console.warn("Could not resume AudioContext", e));
    } else {
      this.isUnlocked = true;
    }
    
    if (this.ctx) {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      gain.gain.value = 0;
      osc.connect(gain);
      gain.connect(this.masterGain);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.001);
    }
  }

  async _ensureContext() {
    if (!this.ctx) this.init();
    if (this.ctx && this.ctx.state === 'suspended') {
      try {
        await this.ctx.resume();
      } catch (e) {
        // Will fail if triggered by hover instead of click
      }
    }
    return this.ctx && this.ctx.state === 'running';
  }

  // 1. Calm, relaxing hover chime (Glassy, luxurious, two-tone)
  async playHoverChime() {
    const canPlay = await this._ensureContext();
    if (!canPlay) return;
    
    const t = this.ctx.currentTime;
    
    // Fundamental tone (A5)
    const osc1 = this.ctx.createOscillator();
    const gain1 = this.ctx.createGain();
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(880, t); 
    
    gain1.gain.setValueAtTime(0, t);
    gain1.gain.linearRampToValueAtTime(0.3, t + 0.05); // Smooth attack
    gain1.gain.exponentialRampToValueAtTime(0.001, t + 2.0); // Very long, relaxing tail
    
    // Harmonic tone (E6) for glassy elegance
    const osc2 = this.ctx.createOscillator();
    const gain2 = this.ctx.createGain();
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(1318.51, t); 
    
    gain2.gain.setValueAtTime(0, t);
    gain2.gain.linearRampToValueAtTime(0.1, t + 0.1); 
    gain2.gain.exponentialRampToValueAtTime(0.001, t + 1.5);

    osc1.connect(gain1);
    osc2.connect(gain2);
    gain1.connect(this.masterGain);
    gain2.connect(this.masterGain);
    
    osc1.start(t);
    osc2.start(t);
    osc1.stop(t + 2.0);
    osc2.stop(t + 2.0);
  }

  // 2. Extremely soft interface ping (Navigation hover) - Replaced rough triangle with pure sine
  async playSoftClick() {
    const canPlay = await this._ensureContext();
    if (!canPlay) return;
    
    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gainNode = this.ctx.createGain();
    
    // Pure sine is much smoother than triangle
    osc.type = 'sine';
    osc.frequency.setValueAtTime(800, t); // High pitch but very quiet
    
    gainNode.gain.setValueAtTime(0, t);
    gainNode.gain.linearRampToValueAtTime(0.08, t + 0.01);
    gainNode.gain.exponentialRampToValueAtTime(0.001, t + 0.2); // Soft ping
    
    osc.connect(gainNode);
    gainNode.connect(this.masterGain);
    
    osc.start(t);
    osc.stop(t + 0.2);
  }

  // 3. Deep cinematic thud - Smoothed out with lowpass filter
  async playDeepThud() {
    const canPlay = await this._ensureContext();
    if (!canPlay) return;
    
    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gainNode = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();
    
    osc.type = 'sine';
    osc.frequency.setValueAtTime(150, t);
    osc.frequency.exponentialRampToValueAtTime(30, t + 0.4);
    
    // Filter out any accidental high-frequency clipping noise
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(300, t);
    
    gainNode.gain.setValueAtTime(0, t);
    gainNode.gain.linearRampToValueAtTime(0.6, t + 0.02);
    gainNode.gain.exponentialRampToValueAtTime(0.001, t + 1.0);
    
    osc.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(this.masterGain);
    
    osc.start(t);
    osc.stop(t + 1.0);
  }
}

const soundEngine = new SoundEngine();
export default soundEngine;