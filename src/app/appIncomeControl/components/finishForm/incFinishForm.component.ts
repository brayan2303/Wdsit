import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-incFinishForm',
  templateUrl: './incFinishForm.component.html',
  styleUrls: ['./incFinishForm.component.css']
})
export class IncFinishFormComponent{
  @Output()finishEmit=new EventEmitter();

  onClick(){
    this.finishEmit.emit("CREATE");
  }
}
