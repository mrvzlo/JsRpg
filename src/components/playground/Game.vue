<template>
   <div class="position-relative h-100">
      <div class="d-flex">
         <div class="btn"></div>
         <div class="flex-grow-1">
            <div :class="'h5 text-center ' + (core.questInfo.shown ? 'show-up' : 'hide-up')">{{ core.questInfo.text }}</div>
         </div>
         <button class="btn btn-danger" v-on:click="exit">X</button>
      </div>
      <canvas> </canvas>
      <fight />
   </div>
</template>

<script lang="ts">
import { Options, prop, Vue } from 'vue-class-component';
import Core from './core';
import Fight from './fight/fight.vue';
import GameState from './shared/game-state';

class Props {
   gameState: GameState = prop({ required: true });
}

@Options({
   components: {
      Fight,
   },
})
export default class Game extends Vue.with(Props) {
   core = new Core();
   pause = false;

   exit(): void {
      (this.$root as any).exitGame();
   }

   created(): void {
      this.tick();
   }

   tick(): void {
      if (this.pause) return;
      this.checkQuests();
      setTimeout(() => this.tick(), 100);
   }

   checkQuests(): void {
      const questUpdates = this.gameState.getUpdates();
      this.core.applyEvents(questUpdates);
   }
}
</script>
