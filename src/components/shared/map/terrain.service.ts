import MapConfig from '../map.config';
import Map from './map';
import Point from './point';

export default class TerrainService {
   constructor(public editingMode: boolean) {}

   private paths = [
      () => require('@/assets/images/terrain/grass_1.jpg'),
      () => require('@/assets/images/terrain/grass_2.jpg'),
      () => require('@/assets/images/terrain/grass_3.jpg'),
      () => require('@/assets/images/terrain/lava_1.jpg'),
      () => require('@/assets/images/terrain/lava_2.jpg'),
      () => require('@/assets/images/terrain/sand_1.jpg'),
      () => require('@/assets/images/terrain/water_1.jpg'),
      () => require('@/assets/images/terrain/stone_1.jpg'),
      () => require('@/assets/images/terrain/stone_2.jpg'),
      () => require('@/assets/images/terrain/stone_3.jpg'),
   ];

   getCount = (): number => this.paths.length;

   getImageById(id: number): Promise<HTMLImageElement> {
      const img = new Image();
      return new Promise((resolve) => {
         img.onload = () => resolve(img);
         img.src = this.paths[id]();
      });
   }

   drawFullMap(context: CanvasRenderingContext2D, map: Map) {
      map.terrain.forEach((col, x) => col.forEach((_, y) => this.drawTile(context, map, { x, y })));
   }

   drawTile(context: CanvasRenderingContext2D, map: Map, point: Point): void {
      const value = map.terrain[point.x][point.y];
      const absPoint = this.getAbsolutePoint(point);
      this.getImageById(value).then((img) => {
         context.drawImage(img, absPoint.x, absPoint.y, this.cellWidth, this.cellHeight);
      });
   }

   private getAbsolutePoint(point: Point): Point {
      const x = point.x * this.cellWidth;
      const y = point.y * this.cellHeight;
      return { x, y };
   }

   private get cellWidth() {
      return this.editingMode ? MapConfig.EditorCellWidth : MapConfig.CellWidth;
   }
   private get cellHeight() {
      return this.editingMode ? MapConfig.EditorCellHeight : MapConfig.CellHeight;
   }
}
