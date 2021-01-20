import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(users: Array<any>, searchName: string): unknown {
    if (!searchName) {
      return users;
    }
    if (!users) {
      return [];
    }
    return users.filter(user => user.name.toLowerCase().indexOf(searchName.toLowerCase()) !== -1);
  }
}
