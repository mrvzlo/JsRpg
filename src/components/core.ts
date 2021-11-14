import MapEvent from './map/map-event';
import { MapEventType } from './map/map-event.type';
import Scene from './scene/scene';

export default class Core {
   scene = new Scene();

   public applyEvents(list: MapEvent[]): void {
      list.forEach((x) => this.applyEvent(x));
   }

   private applyEvent(event: MapEvent): void {
      switch (event.type) {
         case MapEventType.Message:
            return this.scene.show(event.arguments[0]);
      }
   }
}
