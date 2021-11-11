import { SaveType } from '../types/save-type';

export default class SaveInfoObject {
   datetime = new Date();
   constructor(private info: string, public type: SaveType) {}
}
