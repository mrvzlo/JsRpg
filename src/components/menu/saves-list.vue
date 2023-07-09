<template>
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
</template>

<script lang="ts">
import { dateFormatter } from '@/components/shared/formatters/date-formatter';
import { Options, Vue } from 'vue-class-component';

@Options({
   props: { saveFiles: [] },
})
export default class SavesList extends Vue {
   dateToStr(date: Date): string {
      return dateFormatter(date);
   }
}
</script>
