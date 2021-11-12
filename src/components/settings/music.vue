<template>
   <div class="position-absolute top-0 start-0">
      <button class="btn btn-primary" v-on:click="toggle">S</button>
   </div>
</template>

<script lang="ts">
import { prop, Vue } from 'vue-class-component';
import MusicService from '@/music/music.service';

class Props {
   musicService: MusicService = prop({ required: true });
}

export default class Music extends Vue.with(Props) {
   created() {
      this.$props.musicService.setMenuMusic();
   }

   toggle(): void {
      this.musicService.toggle();
   }
}
</script>
