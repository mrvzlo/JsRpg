<template>
   <game />
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import Game from './components/Game.vue';
import SaveLoadService from '@/save-section/save-load.service';

@Options({
   components: {
      Game,
   },
})
export default class App extends Vue {
   saveLoadService = new SaveLoadService();
}
</script>
