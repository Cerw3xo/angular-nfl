import {Pipe, PipeTransform} from '@angular/core';
import { Birthplace } from '../../models/athlete';
@Pipe({
  standalone: true,
  name: 'birthplace',
})
export class BirtplacePipe implements PipeTransform {
  transform(value: Birthplace, placeHolder: string = '-'): string {
    if (value) {
      return `${value?.city},${value?.state}`;
    } return placeHolder;
  }
}