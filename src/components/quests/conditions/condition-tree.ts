import TypedArray from '@/components/shared/base/typed-array';
import MapCondition from './map-condition';

export default class ConditionTree {
   conditions = new TypedArray<MapCondition>(MapCondition);

   isTrue() {
      const uncompleted = this.conditions.filter((x) => !x.isTrue());
      return this.conditions.length > 0 && uncompleted.length === 0;
   }
}
