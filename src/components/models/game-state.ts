import Character from './characters/character';
import Map from '../map/map';
import Saveable from '@/save-section/interfaces/saveable.interface';
import CampaignObject from '../campaigns/campaign.object';
import TypedArray from '../shared/base/typed-array';
import Quest from '../campaigns/quests/quest';
import CampaignsListService from '../campaigns/campaigns-list.service';

export default class GameState implements Saveable {
   character = new Character();
   quests = new TypedArray<Quest>(Quest);

   constructor(public saveName: string) {}

   public saveInfo(): string {
      return this.character.name;
   }

   public loadCampaignName(name: string): void {
      const obj = new CampaignsListService().getByName(name);
      this.loadCampaignObject(obj);
   }

   private loadCampaignObject(campaign: CampaignObject): void {
      this.character.position = campaign.start;
      Array.prototype.push.apply(this.quests, campaign.quests);
      //map;
   }
}
