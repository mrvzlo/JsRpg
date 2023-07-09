import Map from '../shared/map/map';
import { TerrainType } from '../shared/map/terrain.type';

export default class MapEditService {
   createNewMap(width: number, height: number): Map {
      const terrain = [];
      for (let i = 0; i < width; i++) {
         const col = [];
         for (let j = 0; j < height; j++) col.push(TerrainType.Water);
         terrain.push(col);
      }
      const map = { terrain };
      return map;
   }
}
