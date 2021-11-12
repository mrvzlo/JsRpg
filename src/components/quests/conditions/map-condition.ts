import { MapConditionType } from './map-condition.type';

export default class MapCondition {
   type = MapConditionType.NeverComplete;
   arguments: number[] = [];

   isTrue(): boolean {
      switch (this.type) {
         case MapConditionType.AutoComplete:
            return true;
         case MapConditionType.NeverComplete:
            return false;
      }
      return false;
   }
}
