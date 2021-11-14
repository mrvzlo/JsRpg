import Map from '@/components/map/map';
import Quest from '@/components/campaigns/quests/quest';
import Point from '../map/point';

export default interface CampaignObject {
   map: Map;
   quests: Quest[];
   start: Point;
}
