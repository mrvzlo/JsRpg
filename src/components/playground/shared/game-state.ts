import Character from '../../shared/models/characters/character';
import Saveable from '@/save-section/interfaces/saveable.interface';
import CampaignsListService from '../../shared/campaigns/campaigns-list.service';
import QuestInterface from '../../shared/campaigns/quests/quest.interface';
import QuestService from '../../shared/campaigns/quests/quest.service';
import CampaignInterface from '../../shared/campaigns/campaign.interface';
import MapEvent from '@/components/shared/map/map-event';

export default class GameState implements Saveable {
   questService = new QuestService();
   character!: Character;
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
