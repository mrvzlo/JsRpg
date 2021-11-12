import MapEvent from '../map/map-event';
import TypedArray from '../shared/base/typed-array';
import QuestStage from './quest-stage';
import { QuestStatus } from './quest.status';

export default class Quest {
   id = 0;
   status = QuestStatus.NotStarted;
   stages = new TypedArray<QuestStage>(QuestStage);

   constructor() {}

   getUpdates(): MapEvent[] {
      if (this.status !== QuestStatus.InProgress) return [];
      const finished = this.stages.filter((x) => x.hasBecomeEnded());
      const result = finished.flatMap((stage) => this.update(stage));
      return result;
   }

   update(stage: QuestStage): MapEvent[] {
      stage.status = QuestStatus.Ended;
      this.stages.filter((x) => x.canUpdate && stage.blockStages.includes(x.id)).forEach((x) => (x.status = QuestStatus.Blocked));
      this.stages.filter((x) => x.canUpdate && stage.nextStages.includes(x.id)).forEach((x) => (x.status = QuestStatus.InProgress));
      return stage.events;
   }
}
