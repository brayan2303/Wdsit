import { Component, Output,EventEmitter, Input, OnInit } from '@angular/core';
import { GenCenterCostService } from 'src/app/appGeneral/services/genCenterCost.service';
import { GenCenterCostEntity } from 'src/app/appGeneral/entities/genCenterCost.entity';

@Component({
  selector: 'app-incCenterCostForm',
  templateUrl: './incCenterCostForm.component.html',
  styleUrls: ['./incCenterCostForm.component.css']
})
export class IncCenterCostFormComponent implements OnInit{
  @Output()centerCostEmit=new EventEmitter();
  @Input()segmentId:number;
  centerCostList: GenCenterCostEntity[];

  constructor(private genCenterCostS:GenCenterCostService){}

  ngOnInit() {
    this.genCenterCostS.findBySegmentId(this.segmentId).subscribe(res=>{
      this.centerCostList=res.object;
    },err=>{
      console.log(err);
    });
  }
  onClick(input: HTMLInputElement) {
    if (input.tagName === 'SPAN') {
      let parent = input.parentNode as HTMLInputElement;
      this.centerCostEmit.emit(parseInt(parent.value));
    } else {
      this.centerCostEmit.emit(parseInt(input.value));
    }
  }
}
