import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-incExitForm',
  templateUrl: './incExitForm.component.html',
  styleUrls: ['./incExitForm.component.css']
})
export class IncExitFormComponent{
  @Output()exitEmit1=new EventEmitter();
  @Output()exitEmit2=new EventEmitter();

  onClick(){
    this.exitEmit1.emit({register:false,type:'UPDATE'});
    this.exitEmit2.emit();
  }
}
