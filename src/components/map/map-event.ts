import { MapEventType } from './map-event.type';
import MapEventInterface from './map-event.interface';

export default class MapEvent implements MapEventInterface {
   type = MapEventType.Message;
   arguments: any[] = [];
}
