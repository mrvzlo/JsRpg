import QuestStageInterface from './quest-stage.interface';
import { QuestStatus } from './quest.status';

export default interface QuestInterface {
   id: number;
   status: QuestStatus;
   stages: QuestStageInterface[];
}
