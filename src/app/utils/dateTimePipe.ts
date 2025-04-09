import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'dateTime',
    standalone: false
})
export class DateTimePipe implements PipeTransform {

  transform(value: any): string {
    if (!value) return '';

    const date = new Date(value);
    const formattedDate = `${this.formatNumber(date.getDate())}/${this.formatNumber(date.getMonth() + 1)}/${date.getFullYear()}`;
    const formattedTime = `${this.formatNumber(date.getHours())}:${this.formatNumber(date.getMinutes())}`;

    return `${formattedDate} ${formattedTime}`;
  }

  private formatNumber(num: number): string {
    return num < 10 ? `0${num}` : num.toString();
  }

}
