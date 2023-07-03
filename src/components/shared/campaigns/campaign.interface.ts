import Point from '../shared/map/point';
import MapInterface from '../shared/map/map.interface';
import QuestInterface from './quests/quest.interface';

export default interface CampaignInterface {
   map: MapInterface;
   quests: QuestInterface[];
   start: Point;
}
