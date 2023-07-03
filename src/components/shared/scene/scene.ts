export default class Scene {
   shown = false;
   text = '';

   public show(text: string, interval: number): void {
      this.shown = true;
      this.text = text;
      if (interval > 0) {
         setTimeout(() => (this.shown = false), interval);
      }
   }

   public hide(): void {
      this.shown = false;
   }
}
