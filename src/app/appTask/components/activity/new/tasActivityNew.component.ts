import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { AlertService } from 'src/app/shared/services/alert.service';
import { GenPersonService } from 'src/app/appGeneral/services/genPerson.service';
import { GenPersonEntity } from 'src/app/appGeneral/entities/genPerson.entity';
import { TasActivityEntity } from 'src/app/appTask/entities/tasActivity.entity';
import { TasActivityService } from 'src/app/appTask/services/tasActivity.service';

@Component({
  selector: 'app-tasActivityNew',
  templateUrl: './tasActivityNew.component.html',
  styleUrls: ['./tasActivityNew.component.css']
})
export class TasActivityNewComponent implements OnInit {
  @Input()activityId:number;
  @Input()taskId:number;
  @Output() closeDialog = new EventEmitter<any>();
  title:string;
  genPersonEntity:GenPersonEntity;
  personList:GenPersonEntity[];
  tasActivityEntity:TasActivityEntity;
  form = new FormGroup({
    id: new FormControl(''),
    title: new FormControl('', Validators.required),
    status: new FormControl('', Validators.required),
    note: new FormControl(''),
    taskId: new FormControl(''),
    personId: new FormControl('')
  });

  constructor(private tasActivityS:TasActivityService,private genPersonS:GenPersonService,private alertS:AlertService) {
    this.activityId=0;
    this.taskId=0;
  }

  ngOnInit() {
    this.genPersonEntity = JSON.parse(localStorage.getItem('user'));
    this.genPersonS.list().subscribe(res=>{
      if(res.message==='OK'){
        this.personList=res.object;
      }else{
        this.alertS.open(res.message,'error');
      }
    },err=>{
      this.alertS.open(err.message,'error');
    });
    if(this.activityId != 0 && this.taskId!=0){
      this.title="Editar Actividad";
      this.tasActivityS.findById(this.activityId).subscribe(res=>{
        if(res.message==='OK'){
          this.tasActivityEntity=res.object;
          this.form.setValue(
            {
              'id':this.tasActivityEntity.id,
              'title':this.tasActivityEntity.title,
              'status':this.tasActivityEntity.status,
              'note':this.tasActivityEntity.note,
              'taskId':this.tasActivityEntity.taskId,
              'personId':this.tasActivityEntity.personId
            }
          );
        }else{
          this.alertS.open(res.message,'error');
        }
      },err=>{
        this.alertS.open(err.message,'error');
      });
    }else if(this.activityId===0 && this.taskId!=0){
      this.title="Nueva Actividad";
    }
  }
  onClick(){
    if(this.activityId===0 && this.taskId!=0){
      this.form.controls.taskId.setValue(this.taskId);
      this.form.controls.personId.setValue(this.genPersonEntity.id);
      this.tasActivityS.create(this.form.value).subscribe(res=>{
        if(res.message==='OK'){
          if(res.object !=0){
            this.closeDialog.emit();
            this.alertS.open('Actividad creada!','success');
            this.form.reset();
          }else{
            this.alertS.open(res.message,'error');
          }
        }else{
          this.alertS.open(res.message,'error');
        }        
      },err=>{
        this.alertS.open(err.message,'error');
      });
    }else{
      this.form.controls.taskId.setValue(this.taskId);
      this.form.controls.personId.setValue(this.genPersonEntity.id);
      this.tasActivityS.update(this.form.value).subscribe(res=>{
        if(res.message==='OK'){
          if(res.object !=0){
            this.closeDialog.emit();
            this.alertS.open('Actividad actualizada!','success');
            this.form.reset();
          }else{
            this.alertS.open(res.message,'error');
          }
        }else{
          this.alertS.open(res.message,'error');
        }        
      },err=>{
        this.alertS.open(err.message,'error');
      });
    }    
  }
}
