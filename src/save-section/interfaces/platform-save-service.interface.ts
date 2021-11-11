export default interface PlatformSaveService {
   save(fileName: string, fileContent: string): Promise<void>;
   load(fileName: string): Promise<string>;
   delete(fileName: string): Promise<void>;
   getAllFilesNames(): Promise<string[]>;
}
