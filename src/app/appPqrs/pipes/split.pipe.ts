import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'Split' })

export class SplitPipe implements PipeTransform {

  transform(value: string): any {
    return  value.split('.',2)[1];
  }
}