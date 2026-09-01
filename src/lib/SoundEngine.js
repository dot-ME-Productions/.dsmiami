class SoundEngine {
  constructor() {
    this.ctx = null;
    this.masterGain = null;
    this.isUnlocked = false;
  }

  init() {
    if (typeof window === 'undefined' || this.ctx) return;
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    this.ctx = new AudioContext();
    this.masterGain = this.ctx.createGain();
    this.masterGain.gain.value = 0.4; // Master volume
    this.masterGain.connect(this.ctx.destination);
  }

  unlock() {
    if (this.isUnlocked) return;
    this.init();
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    this.isUnlocked = true;
    
    // Play a completely silent sound to force iOS to unlock
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    gain.gain.value = 0;
    osc.connect(gain);
    gain.connect(this.masterGain);
    osc.start();
    osc.stop(this.ctx.currentTime + 0.001);
  }

  // 1. Calm, relaxing hover chime (Glassy, luxurious)
  playHoverChime() {
    if (!this.ctx || this.ctx.state !== 'running') return;
    
    const osc = this.ctx.createOscillator();
    const gainNode = this.ctx.createGain();
    
    osc.type = 'sine';
    // Pentatonic scale frequency for a calm feel (e.g., E5 - 659.25Hz or A5 - 880Hz)
    osc.frequency.setValueAtTime(880, this.ctx.currentTime); 
    
    // Envelope
    gainNode.gain.setValueAtTime(0, this.ctx.currentTime);
    // Soft attack
    gainNode.gain.linearRampToValueAtTime(0.15, this.ctx.currentTime + 0.05);
    // Long, smooth release
    gainNode.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 1.5);
    
    osc.connect(gainNode);
    gainNode.connect(this.masterGain);
    
    osc.start();
    osc.stop(this.ctx.currentTime + 1.5);
  }

  // 2. Extremely subtle UI tick (Navigation hover)
  playSoftClick() {
    if (!this.ctx || this.ctx.state !== 'running') return;
    
    const osc = this.ctx.createOscillator();
    const gainNode = this.ctx.createGain();
    
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(400, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(50, this.ctx.currentTime + 0.05);
    
    gainNode.gain.setValueAtTime(0, this.ctx.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.05, this.ctx.currentTime + 0.01);
    gainNode.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.1);
    
    osc.connect(gainNode);
    gainNode.connect(this.masterGain);
    
    osc.start();
    osc.stop(this.ctx.currentTime + 0.1);
  }

  // 3. Deep cinematic thud (Button clicks / Modal open)
  playDeepThud() {
    if (!this.ctx || this.ctx.state !== 'running') return;
    
    const osc = this.ctx.createOscillator();
    const gainNode = this.ctx.createGain();
    
    osc.type = 'sine';
    // Pitch drop
    osc.frequency.setValueAtTime(150, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(40, this.ctx.currentTime + 0.3);
    
    gainNode.gain.setValueAtTime(0, this.ctx.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.3, this.ctx.currentTime + 0.02);
    gainNode.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.8);
    
    osc.connect(gainNode);
    gainNode.connect(this.masterGain);
    
    osc.start();
    osc.stop(this.ctx.currentTime + 0.8);
  }
}

const soundEngine = new SoundEngine();
export default soundEngine;