import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateFormatService {

  private months: { [key: string]: string } = {
    'enero': '01',
    'febrero': '02',
    'marzo': '03',
    'abril': '04',
    'mayo': '05',
    'junio': '06',
    'julio': '07',
    'agosto': '08',
    'septiembre': '09',
    'octubre': '10',
    'noviembre': '11',
    'diciembre': '12'
  };

  constructor() { }

  formatSpanishDate(date: string): string {
    const dateParts = date.split(' de ');
    if (dateParts.length !== 3) {
      throw new Error('Invalid date format');
    }

    const day = dateParts[0];
    const month = this.months[dateParts[1].toLowerCase()];
    const year = dateParts[2];

    if (!month) {
      throw new Error('Invalid month in date');
    }

    return `${year}-${month}-${day.padStart(2, '0')}`;
  }
}
