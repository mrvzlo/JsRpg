<style lang="scss">
@import '@/assets/scss/main.scss';
</style>

<template>
   <game v-if="gameState" :gamestate="gameState" />
   <mainMenu v-else />
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import Game from './components/Game.vue';
import MainMenu from './components/menu/main-menu.vue';
import Character from './components/models/characters/character';
import GameState from './components/models/items/game-state';
import Map from './components/models/map-objects/map';

@Options({
   components: {
      Game,
      MainMenu,
   },
})
export default class App extends Vue {
   gameState: GameState | null = null;

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
