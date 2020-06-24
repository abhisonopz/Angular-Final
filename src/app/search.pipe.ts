import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(items: any, SearchD: string) {
    if (items && items.length) {
      return items.filter(item => {
        if (SearchD && item.name.toLowerCase().indexOf(SearchD.toLowerCase()) === -1) {
          return false;

        }
        return true;
      })

    }
    else {
      return items;
    }

  }

}
