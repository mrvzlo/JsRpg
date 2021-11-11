import Character from '../characters/character';
import Map from '../map-objects/map';
import Saveable from '@/save-section/saveable.interface';

export default class GameState implements Saveable {
   constructor(public map: Map, public character: Character, public saveName: string) {}

   public saveInfo(): string {
      return this.character.name;
   }
}
