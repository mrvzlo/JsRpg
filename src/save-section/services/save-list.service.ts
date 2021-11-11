import { AppConfig } from '@/app.config';
import SaveInfoObject from '../objects/save-info.object';
import CapacitorSaveService from './capacitor-save.service';

export default class SaveListService {
   async getAllSaves(): Promise<SaveInfoObject[]> {
      const saveService = new CapacitorSaveService();
      const files = await saveService.getAllFilesNames();
      const infoFiles = files.filter((x) => x.includes(AppConfig.infoSaveFilePostfix));

      const getSaveInfoByName = async (name: string) => {
         const data = await saveService.load(name);
         return JSON.parse(data) as SaveInfoObject;
      };
      return Promise.all(infoFiles.map(getSaveInfoByName));
   }

   async deleteSave(name: string): Promise<void> {
      const saveLoadService = new CapacitorSaveService();
      const infoFile = name + AppConfig.infoSaveFilePostfix;
      await saveLoadService.delete(infoFile);
      const dataFile = name + AppConfig.dataSaveFilePostfix;
      await saveLoadService.delete(dataFile);
   }
}
