<template>
   <div class="position-relative h-100">
      <div class="position-absolute end-0">
         <button class="btn btn-danger" v-on:click="exit">X</button>
      </div>
      <fight />
   </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import Core from './core';
import Fight from './fight/fight.vue';
import GameState from './models/game-state';

@Options({
   props: { gamestate: GameState },
   components: {
      Fight,
   },
})
export default class Game extends Vue {
   core = new Core();

   exit(): void {
      (this.$root as any).exitGame();
   }
}
</script>
