export default class CustomDate {
   day: number;
   month: number;
   hour: number;
   minute: number;
   year: number;

   constructor(date: Date) {
      this.minute = date.getMinutes();
      this.hour = date.getHours();
      this.day = date.getDate();
      this.month = date.getMonth() + 1;
      this.year = date.getFullYear() % 100;
   }
}
