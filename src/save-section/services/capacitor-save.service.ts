import { DeleteFileOptions, Directory, Encoding, Filesystem, ReadFileOptions, WriteFileOptions } from '@capacitor/filesystem';
import PlatformSaveService from '../interfaces/platform-save-service.interface';

export default class CapacitorSaveService implements PlatformSaveService {
   async save(fileName: string, fileContent: string): Promise<void> {
      const options = this.getWriteFileOptions(fileName, fileContent);
      await Filesystem.writeFile(options);
   }

   private getWriteFileOptions(path: string, data: string): WriteFileOptions {
      return {
         path: path,
         data: data,
         directory: this.directory,
         encoding: Encoding.UTF8,
      };
   }

   async load(fileName: string): Promise<string> {
      const options = this.getReadFileOptions(fileName);
      const result = await Filesystem.readFile(options);
      return result?.data ?? '';
   }

   private getReadFileOptions(name: string): ReadFileOptions {
      return {
         path: name,
         directory: this.directory,
         encoding: Encoding.UTF8,
      };
   }

   async delete(fileName: string): Promise<void> {
      const options = this.getDeleteFileOptions(fileName);
      await Filesystem.deleteFile(options);
   }

   private getDeleteFileOptions(destination: string): DeleteFileOptions {
      return {
         path: destination,
         directory: this.directory,
      };
   }

   async getAllFilesNames(): Promise<string[]> {
      const dir = await Filesystem.readdir({
         path: '',
         directory: this.directory,
      });
      return dir.files;
   }

   private get directory() {
      return Directory.Data;
   }
}
