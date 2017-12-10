import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtersub'
})
export class FilterSubPipe implements PipeTransform {
  transform(items: any[], searchText: string): any[] {
    if (!items) {
        return [];
    }
    if (!searchText) {
        return items;
    }
    searchText = searchText.toLowerCase();

    return items.filter(it => it.subdivision.toLowerCase().includes(searchText));

   }
}
