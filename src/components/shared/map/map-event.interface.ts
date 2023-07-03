import { MapEventType } from './map-event.type';

export default interface MapEventInterface {
   type: MapEventType;
   arguments: any[];
}
