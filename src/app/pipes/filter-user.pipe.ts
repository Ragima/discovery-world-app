import { Pipe, PipeTransform } from '@angular/core';
import { User } from '../components/models/user';

@Pipe({
  name: 'callback',
  pure: false
})
export class FilterUserPipe implements PipeTransform {

  transform(items: any[], callback: (item: any) => any): any {
    if (!items || !callback) {
        return items;
    }
    return items.filter(item => callback(item));
}

}
