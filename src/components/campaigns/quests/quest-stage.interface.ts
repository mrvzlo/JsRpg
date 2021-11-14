import MapEventInterface from '@/components/map/map-event.interface';
import ConditionTreeInterface from './conditions/condition-tree.interface';
import { QuestStatus } from './quest.status';

export default interface QuestStageInterface {
   id: number;
   status: QuestStatus;
   nextStages: number[];
   blockStages: number[];
   events: MapEventInterface[];
   conditionTree: ConditionTreeInterface;
}
