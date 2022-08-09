import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({ name: 'DateDiff' })

export class DateDiffPipe implements PipeTransform {

  transform(date2: string): any {
    var date1=moment(new Date());

    return  moment(date1.diff(date2,'hours'));
  }
}