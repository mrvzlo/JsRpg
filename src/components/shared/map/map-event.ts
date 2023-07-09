import { MapEventType } from './map-event.type';

export default interface MapEvent {
   type: MapEventType;
   arguments: any[];
}
