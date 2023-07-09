<template>
   <div class="d-flex flex-column h-100">
      <div class="border-bottom border-dark px-3 py-1 toolbar d-flex">
         <div class="btn btn-info" data-bs-toggle="tooltip" title="Create new" v-on:click="() => (createMode = !createMode)">▶</div>
      </div>
      <div class="d-flex flex-grow-1 h-0">
         <div class="col-2 border-dark border-end"></div>
         <div class="col-8 overflow-auto d-flex position-relative">
            <canvas id="terrain-canvas"></canvas>
            <div
               class="position-absolute hover-block"
               :class="initiated ? '' : 'd-none'"
               :style="`left: ${hoverBlock.x * mapConfig.EditorCellWidth}px; top: ${hoverBlock.y * mapConfig.EditorCellHeight}px; width: ${
                  mapConfig.EditorCellWidth
               }px; height: ${mapConfig.EditorCellHeight}px`"
            ></div>
         </div>
         <div class="col-2 border-dark border-start" v-if="initiated">
            <div class="nav nav-tabs">
               <button class="nav-link" :class="rightTab === 0 ? 'active' : ''" v-on:click="() => (rightTab = 0)">Terrain</button>
               <button class="nav-link" :class="rightTab === 1 ? 'active' : ''" v-on:click="() => (rightTab = 1)">Objects</button>
            </div>
            <div class="d-flex flex-wrap" v-if="rightTab == 0">
               <div class="col-4" v-for="(image, index) in terrainImages" v-bind:key="index">
                  <img
                     class="img-fluid w-100 cursor-pointer"
                     :class="activeTerrain == index ? 'active' : ''"
                     :src="image.src"
                     v-on:click="activeTerrain = index"
                  />
               </div>
            </div>
         </div>
      </div>
   </div>
   <div v-if="createMode" class="position-absolute bg-white p-2 position-fixed start-50 top-50 translate-middle bg-opacity-50">
      <div class="h6 text-center">Please select the new map size</div>
      <div class="d-flex border justify-content-center">
         <input class="form-control w-50px border-0 rounded-0 px-1 text-center" v-model="newSize.w" />
         <div class="my-auto mx-1">x</div>
         <input class="form-control w-50px border-0 rounded-0 px-1 text-center" v-model="newSize.h" />
      </div>
      <div class="d-flex justify-content-around toolbar pt-2">
         <button class="btn" v-on:click="applySizes">✓</button>
         <button class="btn btn-close" v-on:click="() => (createMode = false)"></button>
      </div>
   </div>
</template>

<script lang="ts">
import { Vue } from 'vue-class-component';
import MapConfig from '../shared/map.config';
import Map from '../shared/map/map';
import TerrainService from '../shared/map/terrain.service';
import MapEditService from './map-edit.service';
export default class MapGen extends Vue {
   createMode = false;
   newSize = { w: 10, h: 10 };
   currentSize = { w: 0, h: 0 };
   rightTab = 0;
   initiated = false;
   terrainService = new TerrainService(true);
   terrainImages: HTMLImageElement[] = [];
   activeTerrain = -1;
   hoverBlock = { x: 0, y: 0 };
   mapConfig = MapConfig;
   map!: Map;
   mapEditService = new MapEditService();
   context!: CanvasRenderingContext2D;

   created() {
      const count = this.terrainService.getCount();
      for (let i = 0; i < count; i++) {
         this.terrainService.getImageById(i).then((x) => this.terrainImages.push(x));
      }
      document.addEventListener('mousemove', this.moveCursor);
      document.addEventListener('click', this.applyClick);
   }

   moveCursor(event: MouseEvent) {
      if (!this.initiated || (event.target as HTMLElement).id !== 'terrain-canvas') return;
      const x = Math.floor(event.offsetX / MapConfig.EditorCellWidth);
      const y = Math.floor(event.offsetY / MapConfig.EditorCellHeight);
      this.hoverBlock.x = Math.max(0, Math.min(this.currentSize.w - 1, x));
      this.hoverBlock.y = Math.max(0, Math.min(this.currentSize.h - 1, y));
   }

   applyClick(event: MouseEvent) {
      const target = event.target as HTMLElement;
      if (!target.className.includes('hover-block')) return;
      if (this.activeTerrain < 0) return;
      if (this.map.terrain[this.hoverBlock.x][this.hoverBlock.y] === this.activeTerrain) return;
      this.map.terrain[this.hoverBlock.x][this.hoverBlock.y] = this.activeTerrain;
      this.terrainService.drawTile(this.context, this.map, this.hoverBlock);
   }

   applySizes() {
      this.initiated = true;
      this.createMode = false;
      const canvasElem = document.getElementById('terrain-canvas') as HTMLCanvasElement;
      this.currentSize = { w: this.newSize.w, h: this.newSize.h };
      canvasElem.height = this.newSize.h * MapConfig.EditorCellHeight;
      canvasElem.width = this.newSize.w * MapConfig.EditorCellWidth;
      canvasElem.style.height = canvasElem.height + 'px';
      canvasElem.style.width = canvasElem.width + 'px';
      this.context = canvasElem.getContext('2d') as CanvasRenderingContext2D;
      this.map = this.mapEditService.createNewMap(this.newSize.w, this.newSize.h);
      this.terrainService.drawFullMap(this.context, this.map);
   }
}
</script>
