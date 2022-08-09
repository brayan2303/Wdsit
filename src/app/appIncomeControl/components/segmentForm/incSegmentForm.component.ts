import { Component, EventEmitter, Output } from '@angular/core';
import { GenSegmentService } from 'src/app/appGeneral/services/genSegment.service';
import { GenSegmentEntity } from 'src/app/appGeneral/entities/genSegment.entity';

@Component({
  selector: 'app-incSegmentForm',
  templateUrl: './incSegmentForm.component.html',
  styleUrls: ['./incSegmentForm.component.css']
})
export class IncSegmentFormComponent {
  @Output()segmentEmit=new EventEmitter();
  segmentList: GenSegmentEntity[];

  constructor(private genSegmentS:GenSegmentService) {
    this.genSegmentS.findByIncomeActive().subscribe(res => {
      this.segmentList = res.object;
    }, err => {
      console.log(err);
    });
  }
  onClick(input: HTMLInputElement) {
    if (input.tagName === 'SPAN') {
      let parent = input.parentNode as HTMLInputElement;
      this.segmentEmit.emit(parseInt(parent.value));
    } else {
      this.segmentEmit.emit(parseInt(input.value));
    }
  }
}
