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
      this.masterGain.gain.value = 1.0; // Max master volume
      this.masterGain.connect(this.ctx.destination);
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
        console.log("AudioContext successfully unlocked");
      }).catch(e => console.warn("Could not resume AudioContext", e));
    } else {
      this.isUnlocked = true;
    }
    
    // Play a completely silent sound to force iOS to unlock
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
        // Will fail if triggered by hover instead of click. Normal browser security behavior.
      }
    }
    return this.ctx && this.ctx.state === 'running';
  }

  // 1. Calm, relaxing hover chime (Glassy, luxurious)
  async playHoverChime() {
    const canPlay = await this._ensureContext();
    if (!canPlay) return;
    
    const osc = this.ctx.createOscillator();
    const gainNode = this.ctx.createGain();
    
    osc.type = 'sine';
    // Pentatonic scale frequency for a calm feel
    osc.frequency.setValueAtTime(880, this.ctx.currentTime); 
    
    // Envelope (Louder)
    gainNode.gain.setValueAtTime(0, this.ctx.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.4, this.ctx.currentTime + 0.05); // Increased from 0.15
    gainNode.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 1.5);
    
    osc.connect(gainNode);
    gainNode.connect(this.masterGain);
    
    osc.start();
    osc.stop(this.ctx.currentTime + 1.5);
  }

  // 2. Extremely subtle UI tick (Navigation hover)
  async playSoftClick() {
    const canPlay = await this._ensureContext();
    if (!canPlay) return;
    
    const osc = this.ctx.createOscillator();
    const gainNode = this.ctx.createGain();
    
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(400, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(50, this.ctx.currentTime + 0.05);
    
    gainNode.gain.setValueAtTime(0, this.ctx.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.15, this.ctx.currentTime + 0.01); // Increased from 0.05
    gainNode.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.1);
    
    osc.connect(gainNode);
    gainNode.connect(this.masterGain);
    
    osc.start();
    osc.stop(this.ctx.currentTime + 0.1);
  }

  // 3. Deep cinematic thud (Button clicks / Modal open)
  async playDeepThud() {
    const canPlay = await this._ensureContext();
    if (!canPlay) return;
    
    const osc = this.ctx.createOscillator();
    const gainNode = this.ctx.createGain();
    
    osc.type = 'sine';
    osc.frequency.setValueAtTime(150, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(40, this.ctx.currentTime + 0.3);
    
    gainNode.gain.setValueAtTime(0, this.ctx.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.8, this.ctx.currentTime + 0.02); // Increased from 0.3
    gainNode.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.8);
    
    osc.connect(gainNode);
    gainNode.connect(this.masterGain);
    
    osc.start();
    osc.stop(this.ctx.currentTime + 0.8);
  }
}

const soundEngine = new SoundEngine();
export default soundEngine;