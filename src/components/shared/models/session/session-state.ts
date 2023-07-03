import { ActiveDialog } from './active-dialog.type';

export default class SessionState {
   paused = true;
   dialog = ActiveDialog.Menu;
}
