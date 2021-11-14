import LZUTF8 from 'lzutf8';
import Saveable from '../interfaces/saveable.interface';

export default class EncoderService<T extends Saveable> {
   encode(src: T): string {
      const string = this.compress(src);
      const binary = LZUTF8.encodeUTF8(string);
      const encoded = LZUTF8.encodeStorageBinaryString(binary);
      return encoded;
   }

   private compress(src: T): string {
      const json = JSON.stringify(src);
      if (!json) return '';
      return json;
   }

   decode(src: string): T {
      const binary = LZUTF8.decodeStorageBinaryString(src);
      const string: any = LZUTF8.decodeUTF8(binary);
      const data = this.decompress(string);
      return data;
   }

   private decompress(src: string): T {
      return JSON.parse(src);
   }
}
