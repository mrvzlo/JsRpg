import { SaveLoadStatusType } from '../types/save-load-status.type';

export default class SaveLoadResponseObject<T> {
   constructor(public data: T, public status: SaveLoadStatusType) {}
}
