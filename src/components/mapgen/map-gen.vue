<template>
   <div class="d-flex flex-column h-100">
      <div class="border-bottom border-dark px-3 py-1 toolbar d-flex">
         <div class="btn btn-info" data-bs-toggle="tooltip" title="Create new" v-on:click="() => (createMode = !createMode)">▶</div>
      </div>
      <div class="d-flex flex-grow-1 h-0">
         <div class="col-2 border-dark border-end"></div>
         <div class="col-8 overflow-auto d-flex">
            <canvas id="main-canvas"></canvas>
         </div>
         <div class="col-2 border-dark border-start" v-if="initiated">
            <div class="nav nav-tabs">
               <button class="nav-link" :class="rightTab === 0 ? 'active' : ''" v-on:click="() => (rightTab = 0)">Terrain</button>
               <button class="nav-link" :class="rightTab === 1 ? 'active' : ''" v-on:click="() => (rightTab = 1)">Objects</button>
            </div>
            <div class="d-flex flex-wrap" v-if="rightTab == 0">
               <div class="col-6">Grass</div>
               <div class="col-6">Water</div>
               <div class="col-6">Sand</div>
               <div class="col-6">Stone</div>
            </div>
         </div>
      </div>
   </div>
   <div v-if="createMode" class="position-absolute bg-white p-2 position-fixed start-50 top-50 translate-middle bg-opacity-50">
      <div class="h6 text-center">Please select the new map size</div>
      <div class="d-flex border justify-content-center">
         <input class="form-control w-50px border-0 rounded-0 px-1 text-center" v-model="newWidth" />
         <div class="my-auto mx-1">x</div>
         <input class="form-control w-50px border-0 rounded-0 px-1 text-center" v-model="newHeight" />
      </div>
      <div class="d-flex justify-content-around toolbar pt-2">
         <button class="btn" v-on:click="applySizes">✓</button>
         <button class="btn btn-close" v-on:click="() => (createMode = false)"></button>
      </div>
   </div>
</template>

<script lang="ts">
import { Vue } from 'vue-class-component';
export default class MapGen extends Vue {
   createMode = false;
   newWidth = 100;
   newHeight = 100;
   rightTab = 0;
   initiated = false;

   applySizes() {
      this.initiated = true;
      this.createMode = false;
      const canvasElem = document.getElementById('main-canvas')!;
      canvasElem.style.height = this.newHeight * 10 + 'px';
      canvasElem.style.width = this.newWidth * 10 + 'px';
   }
}
</script>
