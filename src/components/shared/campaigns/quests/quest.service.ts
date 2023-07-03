import MapEvent from '../../map/map-event';
import ConditionTreeInterface from './conditions/condition-tree.interface';
import MapConditionInterface from './conditions/map-condition.interface';
import { MapConditionType } from './conditions/map-condition.type';
import QuestStageInterface from './quest-stage.interface';
import QuestInterface from './quest.interface';
import { QuestStatus } from './quest.status';

export default class QuestService {
   getListUpdates(quests: QuestInterface[]): MapEvent[] {
      return quests.flatMap((x) => this.getQuestUpdates(x));
   }

   getQuestUpdates(quest: QuestInterface): MapEvent[] {
      if (quest.status !== QuestStatus.InProgress) return [];
      const finished = quest.stages.filter((x) => this.stageBecomeEnded(x));
      const result = finished.flatMap((stage) => this.updateQuest(quest, stage));
      return result;
   }

   private updateQuest(quest: QuestInterface, stage: QuestStageInterface): MapEvent[] {
      stage.status = QuestStatus.Ended;
      const otherStages = quest.stages.filter((x) => this.statusIsUpdateable(x.status));
      otherStages.filter((x) => stage.blockStages.includes(x.id)).forEach((x) => (x.status = QuestStatus.Blocked));
      otherStages.filter((x) => stage.nextStages.includes(x.id)).forEach((x) => (x.status = QuestStatus.InProgress));
      return stage.events;
   }

   private stageBecomeEnded(stage: QuestStageInterface): boolean {
      if (stage.status !== QuestStatus.InProgress) return false;
      return this.conditionTreeIsTrue(stage.conditionTree);
   }

   statusIsUpdateable(status: QuestStatus): boolean {
      switch (status) {
         case QuestStatus.NotStarted:
         case QuestStatus.InProgress:
            return true;
         default:
            return false;
      }
   }

   conditionTreeIsTrue(tree: ConditionTreeInterface): boolean {
      const uncompleted = tree.conditions.filter((x) => !this.conditionIsTrue(x));
      return tree.conditions.length > 0 && uncompleted.length === 0;
   }

   conditionIsTrue(condition: MapConditionInterface): boolean {
      switch (condition.type) {
         case MapConditionType.AutoComplete:
            return true;
         case MapConditionType.NeverComplete:
            return false;
      }
      return false;
   }
}
