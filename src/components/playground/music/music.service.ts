export default class MusicService {
   musicAudio = new Audio();
   constructor() {
      this.musicAudio.loop = true;
   }

   public setMenuMusic(): void {
      this.musicAudio.src = require('@/assets/music/ambient.wav');
   }

   public toggle() {
      if (this.musicAudio.paused) this.musicAudio.play();
      else this.musicAudio.pause();
   }
}
