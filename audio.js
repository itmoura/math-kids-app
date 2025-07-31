// Sistema de Áudio para Matemática Divertida
class MathAudio {
  constructor() {
    this.audioContext = null;
    this.sounds = {};
    this.backgroundMusic = null;
    this.isMuted = false;
    this.musicEnabled = false;
    this.volume = 0.7;
    
    this.init();
  }
  
  async init() {
    try {
      // Criar contexto de áudio
      this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
      
      // Criar sons sintéticos
      this.createSounds();
      
      console.log('Sistema de áudio inicializado');
    } catch (error) {
      console.log('Erro ao inicializar áudio:', error);
    }
  }
  
  createSounds() {
    // Som de sucesso (acorde alegre)
    this.sounds.success = () => {
      if (!this.audioContext || this.isMuted) return;
      
      const frequencies = [523.25, 659.25, 783.99]; // C5, E5, G5
      frequencies.forEach((freq, index) => {
        setTimeout(() => {
          this.playTone(freq, 0.3, 'sine', 0.1 + index * 0.05);
        }, index * 100);
      });
    };
    
    // Som de erro (tom descendente)
    this.sounds.error = () => {
      if (!this.audioContext || this.isMuted) return;
      
      const startFreq = 400;
      const endFreq = 200;
      const duration = 0.5;
      
      const oscillator = this.audioContext.createOscillator();
      const gainNode = this.audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(this.audioContext.destination);
      
      oscillator.type = 'sawtooth';
      oscillator.frequency.setValueAtTime(startFreq, this.audioContext.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(endFreq, this.audioContext.currentTime + duration);
      
      gainNode.gain.setValueAtTime(0, this.audioContext.currentTime);
      gainNode.gain.linearRampToValueAtTime(this.volume * 0.3, this.audioContext.currentTime + 0.01);
      gainNode.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + duration);
      
      oscillator.start(this.audioContext.currentTime);
      oscillator.stop(this.audioContext.currentTime + duration);
    };
    
    // Som de clique (pop curto)
    this.sounds.click = () => {
      if (!this.audioContext || this.isMuted) return;
      this.playTone(800, 0.1, 'square', 0.05);
    };
    
    // Som de hover (tom suave)
    this.sounds.hover = () => {
      if (!this.audioContext || this.isMuted) return;
      this.playTone(600, 0.05, 'sine', 0.03);
    };
    
    // Som de conquista (fanfarra)
    this.sounds.achievement = () => {
      if (!this.audioContext || this.isMuted) return;
      
      const melody = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
      melody.forEach((freq, index) => {
        setTimeout(() => {
          this.playTone(freq, 0.2, 'sine', 0.15);
        }, index * 150);
      });
    };
  }
  
  playTone(frequency, duration, type = 'sine', volume = 0.1) {
    if (!this.audioContext || this.isMuted) return;
    
    try {
      const oscillator = this.audioContext.createOscillator();
      const gainNode = this.audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(this.audioContext.destination);
      
      oscillator.type = type;
      oscillator.frequency.setValueAtTime(frequency, this.audioContext.currentTime);
      
      gainNode.gain.setValueAtTime(0, this.audioContext.currentTime);
      gainNode.gain.linearRampToValueAtTime(this.volume * volume, this.audioContext.currentTime + 0.01);
      gainNode.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + duration);
      
      oscillator.start(this.audioContext.currentTime);
      oscillator.stop(this.audioContext.currentTime + duration);
    } catch (error) {
      console.log('Erro ao reproduzir som:', error);
    }
  }
  
  // Música de fundo ambiente
  startBackgroundMusic() {
    if (!this.audioContext || this.isMuted || !this.musicEnabled) return;
    
    this.stopBackgroundMusic();
    
    // Criar música ambiente suave
    const createAmbientTone = (freq, delay = 0) => {
      setTimeout(() => {
        if (!this.musicEnabled) return;
        
        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();
        const filter = this.audioContext.createBiquadFilter();
        
        oscillator.connect(filter);
        filter.connect(gainNode);
        gainNode.connect(this.audioContext.destination);
        
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(freq, this.audioContext.currentTime);
        
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(800, this.audioContext.currentTime);
        
        gainNode.gain.setValueAtTime(0, this.audioContext.currentTime);
        gainNode.gain.linearRampToValueAtTime(this.volume * 0.02, this.audioContext.currentTime + 2);
        gainNode.gain.linearRampToValueAtTime(0, this.audioContext.currentTime + 8);
        
        oscillator.start(this.audioContext.currentTime);
        oscillator.stop(this.audioContext.currentTime + 8);
        
        // Repetir
        if (this.musicEnabled) {
          createAmbientTone(freq, 10000);
        }
      }, delay);
    };
    
    // Tons harmônicos suaves
    createAmbientTone(220, 0);    // A3
    createAmbientTone(330, 2000); // E4
    createAmbientTone(440, 4000); // A4
  }
  
  stopBackgroundMusic() {
    this.musicEnabled = false;
  }
  
  toggleMusic() {
    this.musicEnabled = !this.musicEnabled;
    if (this.musicEnabled) {
      this.startBackgroundMusic();
    } else {
      this.stopBackgroundMusic();
    }
    return this.musicEnabled;
  }
  
  toggleMute() {
    this.isMuted = !this.isMuted;
    if (this.isMuted) {
      this.stopBackgroundMusic();
    }
    return this.isMuted;
  }
  
  setVolume(volume) {
    this.volume = Math.max(0, Math.min(1, volume));
  }
  
  // Reproduzir som por nome
  play(soundName) {
    if (this.sounds[soundName]) {
      this.sounds[soundName]();
    }
  }
  
  // Resumir contexto de áudio (necessário para alguns navegadores)
  resume() {
    if (this.audioContext && this.audioContext.state === 'suspended') {
      this.audioContext.resume();
    }
  }
}

// Instância global
window.mathAudio = new MathAudio();
