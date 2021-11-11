import CustomDate from './custom-date';

const dateFormatter = (datetime: Date) => {
   const date = new CustomDate(new Date(datetime));
   const params = [date.hour, date.minute, date.day, date.month, date.year].map(formatTwoDigits);
   const separator = ': .. ';
   return params.map((x, i) => x + separator[i]).join('');
};

function formatTwoDigits(number: number) {
   return isNaN(number) ? '00' : number > 9 ? number : '0' + number;
}

export { dateFormatter };
