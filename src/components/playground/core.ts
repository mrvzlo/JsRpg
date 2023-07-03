import MapEvent from '../shared/map/map-event';
import { MapEventType } from '../shared/map/map-event.type';
import Scene from '../shared/scene/scene';

export default class Core {
   questInfo = new Scene();

   public applyEvents(list: MapEvent[]): void {
      list.forEach((x) => this.applyEvent(x));
   }

   private applyEvent(event: MapEvent): void {
      switch (event.type) {
         case MapEventType.Message:
            return this.questInfo.show(event.arguments[0], 2000);
      }
   }
}
