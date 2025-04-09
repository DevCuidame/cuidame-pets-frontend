import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent implements OnInit {
  currentYear: number;
  currentMonth: number;
  selectedDate: Date | null = null;
  today: Date = new Date();
  weekDays = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
  months = [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre',
  ];
  daysInMonth: { date: Date; otherMonth: boolean }[] = [];
  hours: string[] = [
    '11:00 am',
    '11:30 am',
    '02:00 pm',
    '02:30 pm',
    '03:00 pm',
    '03:30 pm',
  ];
  selectedHour: string | null = null;
  showMonthList: boolean = false;
  showYearList: boolean = false;
  years: number[] = [];

  constructor() {
    const today = new Date();
    this.currentYear = today.getFullYear();
    this.currentMonth = today.getMonth();
  }

  ngOnInit() {
    this.generateCalendar();
    this.generateYears();
  }

  generateCalendar() {
    const firstDayOfMonth = new Date(
      this.currentYear,
      this.currentMonth,
      1
    ).getDay();
    const daysInCurrentMonth = new Date(
      this.currentYear,
      this.currentMonth + 1,
      0
    ).getDate();
    const daysInPrevMonth = new Date(
      this.currentYear,
      this.currentMonth,
      0
    ).getDate();

    this.daysInMonth = [];

    // Fill in days from previous month
    for (let i = firstDayOfMonth - 1; i >= 0; i--) {
      this.daysInMonth.push({
        date: new Date(
          this.currentYear,
          this.currentMonth - 1,
          daysInPrevMonth - i
        ),
        otherMonth: true,
      });
    }

    // Fill in days of current month
    for (let i = 1; i <= daysInCurrentMonth; i++) {
      this.daysInMonth.push({
        date: new Date(this.currentYear, this.currentMonth, i),
        otherMonth: false,
      });
    }

    // Fill in days from next month to complete the week
    const totalDays = this.daysInMonth.length;
    const daysToNextMonth = totalDays % 7 === 0 ? 0 : 7 - (totalDays % 7);

    for (let i = 1; i <= daysToNextMonth; i++) {
      this.daysInMonth.push({
        date: new Date(this.currentYear, this.currentMonth + 1, i),
        otherMonth: true,
      });
    }
  }

  changeMonth(amount: number) {
    this.currentMonth += amount;
    if (this.currentMonth < 0) {
      this.currentMonth = 11;
      this.currentYear--;
    } else if (this.currentMonth > 11) {
      this.currentMonth = 0;
      this.currentYear++;
    }
    this.generateCalendar();
  }

  changeYear(amount: number) {
    this.currentYear += amount;
    this.generateCalendar();
  }

  selectDate(day: { date: Date; otherMonth: boolean }) {
    if (day.otherMonth) return;
    this.selectedDate = day.date;
    this.selectedHour = null; // Reset selected hour when selecting a new date
    console.log('Selected date:', this.selectedDate);
  }

  selectHour(hour: string) {
    this.selectedHour = hour;
    console.log('Selected hour:', this.selectedHour);
    console.log(
      'Selected date and hour:',
      this.selectedDate,
      this.selectedHour
    );
  }

  isSelectedDay(day: { date: Date; otherMonth: boolean }): boolean {
    if (!this.selectedDate || day.otherMonth) {
      return false;
    }
    return (
      this.selectedDate.getDate() === day.date.getDate() &&
      this.selectedDate.getMonth() === day.date.getMonth() &&
      this.selectedDate.getFullYear() === day.date.getFullYear()
    );
  }

  isToday(date: Date): boolean {
    return (
      date.getDate() === this.today.getDate() &&
      date.getMonth() === this.today.getMonth() &&
      date.getFullYear() === this.today.getFullYear()
    );
  }

  toggleMonthList() {
    this.showMonthList = !this.showMonthList;
    this.showYearList = false;
  }

  toggleYearList() {
    this.showYearList = !this.showYearList;
    this.showMonthList = false;
  }

  selectMonth(month: number) {
    this.currentMonth = month;
    this.showMonthList = false;
    this.generateCalendar();
  }

  selectYear(year: number) {
    this.currentYear = year;
    this.showYearList = false;
    this.generateCalendar();
  }

  generateYears() {
    const startYear = this.currentYear - 10;
    const endYear = this.currentYear + 10;
    this.years = [];
    for (let i = startYear; i <= endYear; i++) {
      this.years.push(i);
    }
  }

  goToToday() {
    this.currentYear = this.today.getFullYear();
    this.currentMonth = this.today.getMonth();
    this.generateCalendar();
  }
}
