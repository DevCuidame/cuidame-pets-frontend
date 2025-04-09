// filter-array.pipe.ts

import { Pipe, PipeTransform } from '@angular/core';
import { DataService } from '../services/data.service';

@Pipe({
    name: 'filterArray',
    standalone: false
})
export class FilterArrayPipe implements PipeTransform {
  constructor(private searchService: DataService) {}

  transform(array: any[], searchTerm: string, propertyName: string): any[] {
    return this.searchService.filterItems(array, searchTerm, propertyName);
  }
}
