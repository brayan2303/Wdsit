import { AlertService } from 'src/app/shared/services/alert.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ActiveFixedEntity } from 'src/app/appActiveFixed/entities/activeFixed.entity';
import { InvMasterCodSapService } from 'src/app/appInventory/services/invMasterCodSap.service';
import { GenPersonEntity } from 'src/app/appGeneral/entities/genPerson.entity';
import { InvMasterCodSapEntity } from 'src/app/appInventory/entities/invMasterCodSap.entity';



@Component({
  selector: 'app-codSapTigoNew',
  templateUrl: './codSapTigoNew.component.html',
  styleUrls: ['./codSapTigoNew.component.css']
})
export class CodSapTigoNewComponent implements OnInit {

  title = '';
  public loading: boolean;
  @Input() formId: number;
  @Output() closeDialog = new EventEmitter<any>();
  form: FormGroup;
  InvMasterCodSapE:InvMasterCodSapEntity;
  genPersonEntity: GenPersonEntity;
  constructor(private fb: FormBuilder,private alertS: AlertService,private InvMasterCodSapS:InvMasterCodSapService) {
    this.formId = 0;
  

  }
  ngOnInit(): void {
    this.formBuilders();
    this.genPersonEntity = JSON.parse(localStorage.getItem('user'));
    if(this.formId != 0){
      this.title="Editar Registro";
      this.InvMasterCodSapS.findById(this.formId).subscribe(res=>{
        if(res.message==='OK'){
          this.InvMasterCodSapE=res.object;
          this.form.setValue(
            {
              'id':this.InvMasterCodSapE.id,
              'codSap':this.InvMasterCodSapE.codSap,
              'initTrim':this.InvMasterCodSapE.initTrim,
              'endTrim':this.InvMasterCodSapE.endTrim,
              'active':this.InvMasterCodSapE.active,

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
      codSap:[,[Validators.required]],
      initTrim:[,[Validators.required]],
      endTrim:[,[Validators.required]],
      active: [,[]]
      //[,[Validators.required]],
    })

  }
 
  save() {
    if(this.formId===0){
      this.form.markAllAsTouched();
      if (this.form.invalid) {
        return;
      }
      this.InvMasterCodSapS.create(this.form.value, this.genPersonEntity.id).subscribe(res=>{
        if(res.message==='OK'){
          if(res.object !=0){
            this.closeDialog.emit();
            this.alertS.open('Registro creado!','success');
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
      this.InvMasterCodSapS.update(this.form.value, this.genPersonEntity.id).subscribe(res=>{
        if(res.message==='OK'){
          if(res.object !=0){
            this.alertS.open('Registro actualizado!','success');
            this.form.setValue({
              'id': '',
              'name': '',
              'description': '',
              'serial':'',
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




