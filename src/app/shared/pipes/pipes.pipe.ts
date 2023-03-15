import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sliceTitle',
})
export class SliceTitlePipe implements PipeTransform {
  transform(value: string, from: number, to: number): string {
    if (value.length > to) {
      return value.slice(from, to) + '...';
    }
    return value;
  }
}
