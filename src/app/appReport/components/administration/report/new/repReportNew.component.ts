import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { AlertService } from 'src/app/shared/services/alert.service';
import { RepReportService } from 'src/app/appReport/services/repReport.service';
import { RepReportEntity } from 'src/app/appReport/entities/repReport.entity';
import { GenSectionEntity } from 'src/app/appGeneral/entities/genSection.entity';
import { GenSectionService } from 'src/app/appGeneral/services/genSection.service';

@Component({
  selector: 'app-repReportNew',
  templateUrl: './repReportNew.component.html',
  styleUrls: ['./repReportNew.component.css']
})
export class RepReportNewComponent implements OnInit {
  @Input()reportId:number;
  @Output() closeDialog = new EventEmitter<any>();
  title:string;
  repReportEntity:RepReportEntity;
  sectionList:GenSectionEntity[];
  newForm = new FormGroup({
    id: new FormControl(''),
    name: new FormControl('', Validators.required),
    typeQuery: new FormControl('', Validators.required),
    storeProcedure: new FormControl('', Validators.required),
    sectionId: new FormControl('', Validators.required),
    active: new FormControl('')
  });

  constructor(private repReportS:RepReportService,private genSectionS:GenSectionService,private alertS:AlertService) {
    this.reportId=0;
    this.sectionList=[];
  }

  ngOnInit() {
    this.genSectionS.list('REPORTES').subscribe(res=>{
      if(res.message==='OK'){
        this.sectionList=res.object;
      }else{
        this.alertS.open(res.message,'error');
      }
    },err=>{
      this.alertS.open(err.message,'error');
    });
    if(this.reportId != 0){
      this.title="Editar Reporte";
      this.repReportS.findById(this.reportId).subscribe(res=>{
        if(res.message==='OK'){
          this.repReportEntity=res.object;
          this.newForm.setValue(
            {
              'id':this.repReportEntity.id,
              'name':this.repReportEntity.name,
              'typeQuery':this.repReportEntity.typeQuery,
              'storeProcedure':this.repReportEntity.storeProcedure,
              'sectionId':this.repReportEntity.sectionId,
              'active':this.repReportEntity.active
            }
          );
        }else{
          this.alertS.open(res.message,'error');
        }
      },err=>{
        this.alertS.open(err.message,'error');
      });
    }else{
      this.title="Nuevo Reporte";
    }
  }
  onClick(){
    if(this.reportId===0){
      this.repReportS.create(this.newForm.value).subscribe(res=>{
        if(res.message==='OK'){
          if(res.object !=0){
            this.closeDialog.emit();
            this.alertS.open('Reporte creado!','success');
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
      this.repReportS.update(this.newForm.value).subscribe(res=>{
        if(res.message==='OK'){
          if(res.object !=0){
            this.closeDialog.emit();
            this.alertS.open('Reporte actualizado!','success');
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
