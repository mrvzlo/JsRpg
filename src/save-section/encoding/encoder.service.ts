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

   decode(src: string, defaultValue: T): T {
      const binary = LZUTF8.decodeStorageBinaryString(src);
      const string: any = LZUTF8.decodeUTF8(binary);
      const data = this.decompress(string);
      const parsed = this.parse(data, defaultValue);
      return parsed;
   }

   private decompress(src: string): T {
      return JSON.parse(src);
   }

   private parse(data: any, object: any): T {
      if (typeof data !== 'object' || data === null) {
         return data;
      }

      while (Array.isArray(data) && object.length < data.length) {
         object.pushNew();
      }

      Object.keys(data).forEach((key) => {
         if (key == 'ctor') return;
         object[key] = this.parse(data[key], object[key]);
      });
      return object;
   }
}
