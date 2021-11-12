<style lang="scss">
@import '@/assets/scss/main.scss';
</style>

<template>
   <div class="position-relative">
      <game v-if="gameState" :gamestate="gameState" />
      <mainMenu v-else />
      <music :musicService="musicService" />
   </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import Game from './components/Game.vue';
import MainMenu from './components/menu/main-menu.vue';
import Character from './components/models/characters/character';
import GameState from './components/models/items/game-state';
import Map from './components/models/map-objects/map';
import Music from './components/settings/music.vue';
import MusicService from './music/music.service';

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

   newGame() {
      const map = new Map();
      const character = new Character();
      const name = btoa(new Date().getTime().toString());
      this.gameState = new GameState(map, character, name);
   }

   exitGame() {
      this.gameState = null;
   }
}
</script>
