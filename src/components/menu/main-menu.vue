<template>
   <div class="mx-5 vh-100 d-flex flex-column justify-content-center">
      <div class="row mx-2">
         <div class="col-3"></div>
         <div class="col-6 overflow-auto saves d-flex flex-column">
            <saves-list v-if="showSaves" :saveFiles="saveFiles" />
            <campaigns-list v-if="showCampaigns" />
         </div>
         <div class="col-3 responsive-text d-flex flex-column justify-content-center text-end">
            <div class="h5 mb-5 d-inline-block">
               <div class="btn btn-primary d-inline-flex m-2" v-on:click="toggleCampaigns()">{{ $t('menu.new_game') }}</div>
               <br />
               <button class="btn btn-primary d-inline-flex m-2" v-on:click="toggleSaves()" :disabled="!saveFiles">
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
import { Options, Vue } from 'vue-class-component';
import SavesList from './saves-list.vue';
import CampaignsList from './campaigns-list.vue';

@Options({
   components: {
      SavesList,
      CampaignsList,
   },
})
export default class MainMenu extends Vue {
   saveFiles: SaveInfoObject[] = [];
   showSaves = false;
   showCampaigns = false;

   created(): void {
      const saveListService = new SaveListService();
      saveListService.getAllSaves().then((files) => (this.saveFiles = files));
   }

   toggleSaves() {
      this.showCampaigns = false;
      this.showSaves = !this.showSaves;
   }

   toggleCampaigns() {
      this.showSaves = false;
      this.showCampaigns = !this.showCampaigns;
   }
}
</script>
