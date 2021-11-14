export default class Scene {
   shown = false;
   text = '';

   public show(text: string) {
      this.shown = true;
      this.text = text;
   }

   public hide() {
      this.shown = false;
   }
}
