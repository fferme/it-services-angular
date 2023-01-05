import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'generalIcons'
})
export class GeneralIconsPipe implements PipeTransform {

  transform(value: string): string {
    switch(value) {
      case 'client': return 'person'
    }
    return 'person';
  }

}
