
import { AlertService } from 'src/app/shared/services/alert.service';
import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { GenPlantEntity } from 'src/app/appGeneral/entities/genPlant.entity';
import { GenPlantService } from 'src/app/appGeneral/services/genPlant.service';


@Component({
  selector: 'app-genPlantNew',
  templateUrl: './genPlantNew.component.html',
  styleUrls: ['./genPlantNew.component.css']
})
export class GenPlantNewComponent implements OnInit {
  public loading: boolean;
  @Input() genPlantformId: number;
  @Output() closeDialog = new EventEmitter<any>();
  title:string;
  form: FormGroup;
  genPlantEntity:GenPlantEntity;
  
  constructor(private fb: FormBuilder,private alertS: AlertService,private genPlantS:GenPlantService, ) {
    this.genPlantformId = 0;

  }
  ngOnInit(): void {
    this.formBuilders();
    if(this.genPlantformId != 0){
      this.title="Editar Registro";
      this.genPlantS.findById(this.genPlantformId).subscribe(res=>{
        if(res.message==='OK'){
          this.genPlantEntity=res.object;
          this.form.setValue(
            {
              'id':this.genPlantEntity.id,
              'cod': this.genPlantEntity.cod,
              'name':this.genPlantEntity.name,
              'description':this.genPlantEntity.description,
              'active':this.genPlantEntity.active
            }
          );
        }else{
          this.alertS.open(res.message,'error');
        }
      },err=>{
        this.alertS.open(err.message,'error');
      });
    }else{
      this.title="Nuevo registro";
    }
  }


  formBuilders(){
    this.form= this.fb.group({
      id: [,[]],
      cod:[,[Validators.required]],
      name:[,[Validators.required]],
      description:[,[Validators.required]],
      active: [,[]]
      //[,[Validators.required]],
    })

  }
 
  save() {
    if(this.genPlantformId===0){
      this.form.markAllAsTouched();
      if (this.form.invalid) {
        return;
      }
      this.genPlantS.create(this.form.value).subscribe(res=>{
        if(res.message==='OK'){
          if(res.object !=0){
            this.closeDialog.emit();
            this.alertS.open('Registro creado','success');
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
      this.genPlantS.update(this.form.value).subscribe(res=>{
        if(res.message==='OK'){
          if(res.object !=0){
            this.alertS.open('Registro actualizado!','success');
            this.form.setValue({
              'id': 0,
              'cod':'',
              'name': '',
              'description': '',
              'active': ''
            });
            this.closeDialog.emit();
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



