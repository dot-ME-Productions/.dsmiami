class SoundEngine {
  constructor() {
    this.ctx = null;
    this.masterGain = null;
    this.isUnlocked = false;
    this.isMuted = true;
  }

  init() {
    if (typeof window === 'undefined' || this.ctx) return;
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioContext();
      this.masterGain = this.ctx.createGain();
      
      // Dynamics Compressor to prevent clipping
      this.compressor = this.ctx.createDynamicsCompressor();
      this.compressor.threshold.value = -20;
      this.compressor.knee.value = 30;
      this.compressor.ratio.value = 12;
      this.compressor.attack.value = 0;
      this.compressor.release.value = 0.25;

      // Global Lowpass Filter to inherently muffle everything for a relaxing vibe
      this.globalFilter = this.ctx.createBiquadFilter();
      this.globalFilter.type = 'lowpass';
      this.globalFilter.frequency.value = 800; // Cuts off high harsh frequencies
      
      this.masterGain.gain.value = 0; // Lower overall volume
      
      this.masterGain.connect(this.globalFilter);
      this.globalFilter.connect(this.compressor);
      this.compressor.connect(this.ctx.destination);
    } catch(e) {
      console.warn("Web Audio API not supported in this browser");
    }
  }

  mute() {
    this.isMuted = true;
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setTargetAtTime(0, this.ctx.currentTime, 0.05);
    }
  }

  unmute() {
    this.isMuted = false;
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setTargetAtTime(0.35, this.ctx.currentTime, 0.05);
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
      } catch (e) {}
    }
    return this.ctx && this.ctx.state === 'running';
  }

  // 1. Calm, relaxing hover chime (Slower attack, muffled, softer)
  async playHoverChime() {
    if (this.isMuted) return;
    const canPlay = await this._ensureContext();
    if (!canPlay) return;
    
    const t = this.ctx.currentTime;
    
    const osc1 = this.ctx.createOscillator();
    const gain1 = this.ctx.createGain();
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(523.25, t); // C5 - Lower pitch, more relaxing
    
    gain1.gain.setValueAtTime(0, t);
    gain1.gain.linearRampToValueAtTime(0.15, t + 0.15); // Much slower swell (0.15s)
    gain1.gain.exponentialRampToValueAtTime(0.001, t + 2.5); // Longer tail
    
    const osc2 = this.ctx.createOscillator();
    const gain2 = this.ctx.createGain();
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(783.99, t); // G5 - Perfect fifth harmony
    
    gain2.gain.setValueAtTime(0, t);
    gain2.gain.linearRampToValueAtTime(0.05, t + 0.2); 
    gain2.gain.exponentialRampToValueAtTime(0.001, t + 2.0);

    osc1.connect(gain1);
    osc2.connect(gain2);
    gain1.connect(this.masterGain);
    gain2.connect(this.masterGain);
    
    osc1.start(t);
    osc2.start(t);
    osc1.stop(t + 2.5);
    osc2.stop(t + 2.5);
  }

  // 2. Extremely soft interface ping (Very muffled, low volume)
  async playSoftClick() {
    if (this.isMuted) return;
    const canPlay = await this._ensureContext();
    if (!canPlay) return;
    
    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gainNode = this.ctx.createGain();
    
    osc.type = 'sine';
    osc.frequency.setValueAtTime(400, t); // Lower pitch ping
    
    gainNode.gain.setValueAtTime(0, t);
    gainNode.gain.linearRampToValueAtTime(0.02, t + 0.02); // Barely audible, slow attack
    gainNode.gain.exponentialRampToValueAtTime(0.001, t + 0.15); 
    
    osc.connect(gainNode);
    gainNode.connect(this.masterGain);
    
    osc.start(t);
    osc.stop(t + 0.15);
  }

  // 3. Deep cinematic thud (Super muffled heartbeat style)
  async playDeepThud() {
    if (this.isMuted) return;
    const canPlay = await this._ensureContext();
    if (!canPlay) return;
    
    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gainNode = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();
    
    osc.type = 'sine';
    osc.frequency.setValueAtTime(100, t);
    osc.frequency.exponentialRampToValueAtTime(20, t + 0.5); // Slower drop
    
    // Very aggressive lowpass filter to remove all click/pop
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(120, t); 
    
    gainNode.gain.setValueAtTime(0, t);
    gainNode.gain.linearRampToValueAtTime(0.4, t + 0.05); // Slower attack
    gainNode.gain.exponentialRampToValueAtTime(0.001, t + 1.2);
    
    osc.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(this.masterGain);
    
    osc.start(t);
    osc.stop(t + 1.2);
  }
  // 4. Action Swell (For massive CTA buttons like INITIATE and BOOK CONSULTATION)
  // Deep, slow, luxurious ambient chord
  async playActionSwell() {
    if (this.isMuted) return;
    const canPlay = await this._ensureContext();
    if (!canPlay) return;
    
    const t = this.ctx.currentTime;
    
    const osc1 = this.ctx.createOscillator();
    const gain1 = this.ctx.createGain();
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(261.63, t); // C4
    
    gain1.gain.setValueAtTime(0, t);
    gain1.gain.linearRampToValueAtTime(0.2, t + 0.3); // Very slow 300ms attack
    gain1.gain.exponentialRampToValueAtTime(0.001, t + 3.0);
    
    const osc2 = this.ctx.createOscillator();
    const gain2 = this.ctx.createGain();
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(392.00, t); // G4
    
    gain2.gain.setValueAtTime(0, t);
    gain2.gain.linearRampToValueAtTime(0.1, t + 0.4); 
    gain2.gain.exponentialRampToValueAtTime(0.001, t + 2.5);

    osc1.connect(gain1);
    osc2.connect(gain2);
    gain1.connect(this.masterGain);
    gain2.connect(this.masterGain);
    
    osc1.start(t);
    osc2.start(t);
    osc1.stop(t + 3.0);
    osc2.stop(t + 3.0);
  }
}

const soundEngine = new SoundEngine();
export default soundEngine;