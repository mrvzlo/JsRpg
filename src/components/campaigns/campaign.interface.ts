import Point from '../map/point';
import MapInterface from '../map/map.interface';
import QuestInterface from './quests/quest.interface';

export default interface CampaignInterface {
   map: MapInterface;
   quests: QuestInterface[];
   start: Point;
}
