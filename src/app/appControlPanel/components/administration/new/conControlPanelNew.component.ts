import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { AlertService } from 'src/app/shared/services/alert.service';
import { GenCustomerEntity } from 'src/app/appGeneral/entities/genCustomer.entity';
import { GenSectionEntity } from 'src/app/appGeneral/entities/genSection.entity';
import { GenCustomerService } from 'src/app/appGeneral/services/genCustomer.service';
import { GenSectionService } from 'src/app/appGeneral/services/genSection.service';
import { ConControlPanelEntity } from 'src/app/appControlPanel/entities/conControlPanel.entity';
import { ConControlPanelService } from 'src/app/appControlPanel/services/conControlPanel.service';

@Component({
  selector: 'app-conControlPanelNew',
  templateUrl: './conControlPanelNew.component.html',
  styleUrls: ['./conControlPanelNew.component.css']
})
export class ConControlPanelNewComponent implements OnInit {
  @Input()controlPanelId:number;
  @Output() closeDialog = new EventEmitter<any>();
  title:string;
  conControlPanelEntity:ConControlPanelEntity;
  customerList:GenCustomerEntity[];
  sectionList:GenSectionEntity[];
  newForm = new FormGroup({
    id: new FormControl(''),
    name: new FormControl('', Validators.required),
    link: new FormControl('', Validators.required),
    customerId: new FormControl('', Validators.required),
    sectionId: new FormControl('', Validators.required),
    active: new FormControl('')
  });

  constructor(private conControlPanelS:ConControlPanelService,private genCustomerS:GenCustomerService,private genSectionS:GenSectionService,private alertS:AlertService) {
    this.controlPanelId=0;
  }

  ngOnInit() {
    this.genCustomerS.findAll().subscribe(res=>{
      if(res.message==='OK'){
        this.customerList=res.object;
      }else{
        this.alertS.open(res.message,'error');
      }
    },err=>{
      this.alertS.open(err.message,'error');
    });
    this.genSectionS.list('TABLEROS DE CONTROL').subscribe(res=>{
      if(res.message==='OK'){
        this.sectionList=res.object;
      }else{
        this.alertS.open(res.message,'error');
      }
    },err=>{
      this.alertS.open(err.message,'error');
    });
    if(this.controlPanelId != 0){
      this.title="Editar Tablero de Control";
      this.conControlPanelS.findById(this.controlPanelId).subscribe(res=>{
        if(res.message==='OK'){
          this.conControlPanelEntity=res.object;
          this.newForm.setValue(
            {
              'id':this.conControlPanelEntity.id,
              'name':this.conControlPanelEntity.name,
              'link':this.conControlPanelEntity.link,
              'customerId':this.conControlPanelEntity.customerId,
              'sectionId':this.conControlPanelEntity.sectionId,
              'active':this.conControlPanelEntity.active
            }
          );
        }else{
          this.alertS.open(res.message,'error');
        }
      },err=>{
        this.alertS.open(err.message,'error');
      });
    }else{
      this.title="Nuevo Tablero de Control";
    }
  }
  onClick(){
    if(this.controlPanelId===0){
      this.conControlPanelS.create(this.newForm.value).subscribe(res=>{
        if(res.message==='OK'){
          if(res.object !=0){
            this.closeDialog.emit();
            this.alertS.open('Tablero de Control creado!','success');
            this.newForm.reset();
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
      this.conControlPanelS.update(this.newForm.value).subscribe(res=>{
        if(res.message==='OK'){
          if(res.object !=0){
            this.closeDialog.emit();
            this.alertS.open('Tablero de Control actualizado!','success');
            this.newForm.reset();
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
