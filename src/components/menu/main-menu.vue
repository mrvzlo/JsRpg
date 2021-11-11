<template>
   <div class="mx-5 vh-100 d-flex flex-column justify-content-center">
      <div class="row mx-2">
         <div class="col-3"></div>
         <div class="col-6 overflow-auto saves">
            <div v-if="showSaves">
               <div class="text-center h5">
                  {{ $t('menu.saves') }}
               </div>
               <div v-for="save in saveFiles" v-bind:key="save" class="card m-2 bg-none">
                  <div class="card-body border-primary">
                     {{ save.info }}
                     <div class="text-end">
                        {{ dateToStr(save.datetime) }}
                     </div>
                  </div>
               </div>
            </div>
         </div>
         <div class="col-3 responsive-text d-flex flex-column justify-content-center text-end">
            <div class="h5 mb-5 d-inline-block">
               <div class="btn btn-primary d-inline-flex m-2" v-on:click="startNewGame()">{{ $t('menu.new_game') }}</div>
               <br />
               <button class="btn btn-primary d-inline-flex m-2" v-on:click="showSaves = !showSaves" :disabled="!saveFiles">
                  {{ $t('menu.load_game') }}
               </button>
            </div>
         </div>
      </div>
   </div>
</template>

<script lang="ts">
import SaveInfoObject from '@/save-section/objects/save-info.object';
import SaveListService from '@/save-section/services/save-list.service';
import { dateFormatter } from '../formatters/date-formatter';
import { Vue } from 'vue-class-component';

export default class MainMenu extends Vue {
   saveFiles: SaveInfoObject[] = [];
   showSaves = false;

   created(): void {
      const saveListService = new SaveListService();
      saveListService.getAllSaves().then((files) => (this.saveFiles = files));
   }

   //todo: inform about autosaves clear
   startNewGame() {
      (this.$root as any).newGame();
   }

   dateToStr(date: Date) {
      return dateFormatter(date);
   }
}
</script>
