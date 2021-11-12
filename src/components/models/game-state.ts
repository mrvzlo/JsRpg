import Character from './characters/character';
import Map from '../map/map';
import Saveable from '@/save-section/interfaces/saveable.interface';

export default class GameState implements Saveable {
   constructor(public character: Character, public saveName: string) {}

   public saveInfo(): string {
      return this.character.name;
   }
}
