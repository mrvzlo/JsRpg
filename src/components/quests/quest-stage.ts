import MapEvent from '../map/map-event';
import TypedArray from '../shared/base/typed-array';
import ConditionTree from './conditions/condition-tree';
import { QuestStatus } from './quest.status';

export default class QuestStage {
   id = 0;
   status = QuestStatus.NotStarted;
   nextStages: number[] = [];
   blockStages: number[] = [];
   events = new TypedArray<MapEvent>(MapEvent);
   conditionTree = new ConditionTree();

   constructor() {}

   hasBecomeEnded(): boolean {
      if (this.status !== QuestStatus.InProgress) return false;
      return this.conditionTree.isTrue();
   }

   get canUpdate() {
      const updateableStatuses = [QuestStatus.NotStarted, QuestStatus.InProgress];
      return updateableStatuses.includes(this.status);
   }
}
