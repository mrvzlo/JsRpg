import CampaignObject from './campaign.object';

export default class CampaignsListService {
   getAllNames(): string[] {
      const folders = require.context('@/assets/campaigns', false).keys();
      const json = folders.filter((x) => x.includes('.json'));
      const withoutResolution = json.map((x) => x.replace('./', '').replace('.json', ''));
      const sentenceFormat = withoutResolution.map((x) => x[0].toUpperCase() + x.substr(1));
      return sentenceFormat;
   }

   getByName(name: string): CampaignObject {
      return require('@/assets/campaigns/' + name.toLocaleLowerCase() + '.json');
   }
}
