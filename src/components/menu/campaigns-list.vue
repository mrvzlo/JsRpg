<template>
   <div class="text-center h5">
      {{ $t('menu.campaigns') }}
   </div>
   <div class="flex-grow-1">
      <div v-for="(item, index) in campaigns" v-bind:key="item" class="card m-2 bg-none border-3 border-primary" v-on:click="select(index)">
         <div :class="'card-body ' + (selected === index ? 'active' : '')">
            {{ item }}
         </div>
      </div>
   </div>
   <div v-if="selected !== null" class="mb-auto text-center">
      <div class="text-secondary">{{ $t('menu.autosaves_warning') }}</div>
      <button class="btn btn-primary" v-on:click="start()">
         {{ $t('menu.start') }}
      </button>
   </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import CampaignsListService from '../campaigns/campaigns-list.service';

@Options({
   props: { saveFiles: {} },
})
export default class CampaignsList extends Vue {
   selected: number | null = null;
   campaigns: string[] = [];

   created() {
      const service = new CampaignsListService();
      this.campaigns = service.getAllNames();
   }

   select(index: number) {
      this.selected = this.selected === index ? null : index;
   }

   start() {
      const selectedName = this.campaigns[this.selected as number];
      (this.$root as any).startCampaign(selectedName);
   }
}
</script>
