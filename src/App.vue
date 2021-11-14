<style lang="scss">
@import '@/assets/scss/main.scss';
</style>

<template>
   <div class="position-relative">
      <game v-if="gameState" :gameState="gameState" />
      <mainMenu v-else />
      <music :musicService="musicService" />
   </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import Game from './components/Game.vue';
import MainMenu from './components/menu/main-menu.vue';
import GameState from './components/models/game-state';
import MusicService from './components/music/music.service';
import Music from './components/settings/music.vue';

@Options({
   components: {
      Game,
      MainMenu,
      Music,
   },
})
export default class App extends Vue {
   gameState: GameState | null = null;
   musicService = new MusicService();

   exitGame() {
      this.gameState = null;
   }

   startCampaign(name: string) {
      const saveName = btoa(new Date().getTime().toString());
      this.gameState = new GameState(saveName);
      this.gameState.loadCampaignName(name);
   }
}
</script>
