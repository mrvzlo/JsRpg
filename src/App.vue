<style lang="scss">
@import '@/assets/scss/main.scss';
</style>

<template>
   <div class="position-relative h-100">
      <game v-if="gameState" :gameState="gameState" />
      <mapGen v-else-if="isMapGenMode" />
      <mainMenu v-else />
      <music v-if="!isMapGenMode" :musicService="musicService" />
   </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import Game from './components/playground/Game.vue';
import MainMenu from './components/menu/main-menu.vue';
import Music from './components/playground/settings/music.vue';
import ControlService from '@/controls/control-service';
import MusicService from './components/playground/music/music.service';
import { ActiveDialog } from './components/shared/models/session/active-dialog.type';
import SessionState from './components/shared/models/session/session-state';
import GameState from './components/playground/shared/game-state';
import MapGen from './components/mapgen/map-gen.vue';

@Options({
   components: {
      Game,
      MainMenu,
      Music,
      MapGen,
   },
})
export default class App extends Vue {
   gameState: GameState | null = null;
   isMapGenMode = false;
   sessionState = new SessionState();
   musicService = new MusicService();

   created() {
      this.setupControls();
   }

   exitGame() {
      this.gameState = null;
   }

   startCampaign(name: string) {
      const saveName = btoa(new Date().getTime().toString());
      this.gameState = new GameState(saveName);
      this.gameState.loadCampaignName(name);
      this.sessionState.dialog = ActiveDialog.Map;
   }

   setupControls() {
      const controlService = new ControlService();
      document.onkeydown = (e) => controlService.processKeyDown(e, this.sessionState);
      document.onkeyup = (e) => controlService.processKeyUp(e, this.sessionState);
   }

   openMapGen() {
      this.isMapGenMode = true;
   }
}
</script>
