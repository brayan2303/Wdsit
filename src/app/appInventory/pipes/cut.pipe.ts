import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'cut' })

export class CutPipe implements PipeTransform {

  constructor() { }

  transform(value: number): any {
    if(String(value).split('.').length>1){
      return String(value).split('.',2)[0]+'.'+String(value).split('.',2)[1].substring(0,1);
    }
    return String(value);
  }
}