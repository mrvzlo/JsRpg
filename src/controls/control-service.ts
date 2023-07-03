import { ActiveDialog } from '@/components/shared/models/session/active-dialog.type';
import SessionState from '@/components/shared/models/session/session-state';
import { Key } from './key.type';

export default class ControlService {
   locked: string[] = [];

   processKeyDown(event: KeyboardEvent, sessionState: SessionState): void {
      if (sessionState.dialog === ActiveDialog.Menu) return;
      if (this.locked.indexOf(event.code) !== -1) return;

      switch (event.code) {
         case Key.up:
            break;
         case Key.down:
            break;
         case Key.left:
            break;
         case Key.right:
            break;
      }

      switch (event.code) {
         case Key.up:
         case Key.down:
         case Key.left:
         case Key.right:
            this.lock(event.code, 100);
      }
   }

   processKeyUp(event: KeyboardEvent, sessionState: SessionState): void {
      if (sessionState.dialog === ActiveDialog.Menu) return;
   }

   lock(key: string, interval: number): void {
      this.locked.push(key);
      setTimeout(() => {
         const index = this.locked.indexOf(key);
         this.locked.splice(index, 1);
      }, interval);
   }
}
