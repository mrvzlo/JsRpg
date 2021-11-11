<template>
   <div class="position-relative">
      <div class="position-absolute end-0">
         <button class="btn btn-danger" v-on:click="exit">X</button>
      </div>
      <canvas> </canvas>
   </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import GameState from './models/items/game-state';

@Options({
   props: { gamestate: GameState },
})
export default class Game extends Vue {
   msg!: string;

   exit() {
      (this.$root as any).exitGame();
   }
}
</script>
