import EncoderService from '../encoding/encoder.service';
import SaveLoadResponse from '../objects/save-load-response.object';
import { SaveLoadStatusType } from '../types/save-load-status.type';
import Saveable from '../interfaces/saveable.interface';
import { SaveType } from '../types/save-type';
import SaveInfoObject from '../objects/save-info.object';
import CapacitorSaveService from './capacitor-save.service';
import { AppConfig } from '@/app.config';
import PlatformSaveService from '../interfaces/platform-save-service.interface';

export default class SaveLoadService<T extends Saveable> {
   private readonly separator = '-';

   async loadSave(saveName: string, saveType: SaveType): Promise<SaveLoadResponse<T>> {
      const service = this.platformSaveService;
      const dataSaveName = `${saveType}${this.separator}${saveName}${AppConfig.dataSaveFilePostfix}`;
      const data = await service.load(dataSaveName);
      return this.load(data);
   }

   private load(input: string): SaveLoadResponse<T> {
      const encoder = new EncoderService<T>();
      const data = {} as T;
      const response = new SaveLoadResponse(data, SaveLoadStatusType.Unsuccessful);
      try {
         response.data = encoder.decode(input, data);
         response.status = SaveLoadStatusType.Successful;
      } catch {}
      return response;
   }

   async makeSave(saveable: T, saveType: SaveType): Promise<SaveLoadStatusType> {
      const encoder = new EncoderService();
      const data = encoder.encode(saveable);
      const service = this.platformSaveService;
      const dataSaveName = `${saveType}${this.separator}${saveable.saveName}${AppConfig.dataSaveFilePostfix}`;
      await service.save(dataSaveName, data);
      const saveInfo = new SaveInfoObject(saveable.saveInfo(), saveType);
      const infoSaveName = `${saveType}${this.separator}${saveable.saveName}${AppConfig.infoSaveFilePostfix}`;
      await service.save(infoSaveName, JSON.stringify(saveInfo));
      return SaveLoadStatusType.Successful;
   }

   private get platformSaveService(): PlatformSaveService {
      return new CapacitorSaveService();
   }
}
