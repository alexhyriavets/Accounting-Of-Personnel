import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  transform(items: any[], searchText: string): any[] {
    if (!items) {
        return [];
    }
    if (!searchText) {
        return items;
    }

    searchText = searchText.toLowerCase();

    return items.filter(it =>  it.name.toLowerCase().includes(searchText));

   }
}

@Pipe({
  name: 'subdivFilter'
})
export class SubdivFilterPipe implements PipeTransform {
  transform(items: any[], hasScienceDegree: any): any[] {
    if (!items) {
        return [];
    }

    if (!hasScienceDegree) {
      return items;
    } else {
      return items.filter(item => item.scienceDegree !== null);
    }
   }
}

@Pipe({
  name: 'dismissalFilter'
})
export class DismissalFilterPipe implements PipeTransform {
  transform(items: any[], isShowDismissed: any): any[] {
    if (!items) {
        return [];
    }

    if (!isShowDismissed) {
      return items.filter(item => item.dismissalDate === null);
    } else {
      return items;
    }
   }
}

@Pipe({
  name: 'retirementFilter'
})
export class RetirementFilterPipe implements PipeTransform {
  transform(items: any[], isOnlyRetirenmentAge: any): any[] {
    if (!items) {
        return [];
    }

    const date = new Date();
    const curYear = date.getFullYear();

    console.log(items);

    if (isOnlyRetirenmentAge) {
      return items.filter(item => {
        const birthYear = +item.birthDate.slice(0, 4);
        return curYear - birthYear > 60;
        // if (item.sex === 'female') {
        //   console.log(`cur = ${curYear} birth = ${birthYear} subrt = ${curYear - birthYear}`);
        //   return curYear - birthYear > 55;
        // } else {
        //   console.log('male');
        //   return curYear - birthYear > 60;
        // }
      });
    } else {
      return items;
    }
  }
}
