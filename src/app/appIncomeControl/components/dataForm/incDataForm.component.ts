import { Component, Output, EventEmitter, Input } from '@angular/core';
import { GenPersonEntity } from 'src/app/appGeneral/entities/genPerson.entity';

@Component({
  selector: 'app-incDataForm',
  templateUrl: './incDataForm.component.html',
  styleUrls: ['./incDataForm.component.css']
})
export class IncDataFormComponent{
  @Output()dataEmit=new EventEmitter();
  @Input() genPersonModel:GenPersonEntity;

  onClick(value:boolean){
    this.dataEmit.emit(value);   
  }
}
