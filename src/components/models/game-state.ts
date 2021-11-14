import Character from './characters/character';
import Saveable from '@/save-section/interfaces/saveable.interface';
import CampaignsListService from '../campaigns/campaigns-list.service';
import MapEvent from '../map/map-event';
import QuestInterface from '../campaigns/quests/quest.interface';
import QuestService from '../campaigns/quests/quest.service';
import CampaignInterface from '../campaigns/campaign.interface';

export default class GameState implements Saveable {
   questService = new QuestService();
   character = new Character();
   quests: QuestInterface[] = [];

   constructor(public saveName: string) {}

   public saveInfo(): string {
      return this.character.name;
   }

   public loadCampaignName(name: string): void {
      const obj = new CampaignsListService().getByName(name);
      this.loadCampaignObject(obj);
   }

   private loadCampaignObject(campaign: CampaignInterface): void {
      this.character.position = campaign.start;
      this.quests = campaign.quests;
      //map;
   }

   public getUpdates(): MapEvent[] {
      return this.questService.getListUpdates(this.quests);
   }
}
