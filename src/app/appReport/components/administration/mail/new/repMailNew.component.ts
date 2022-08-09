import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { AlertService } from 'src/app/shared/services/alert.service';
import { RepMailService } from 'src/app/appReport/services/repMail.service';
import { RepMailEntity } from 'src/app/appReport/entities/repMail.entity';
import { RepReportEntity } from 'src/app/appReport/entities/repReport.entity';
import { RepReportService } from 'src/app/appReport/services/repReport.service';
import * as moment from 'moment';

@Component({
  selector: 'app-repMailNew',
  templateUrl: './repMailNew.component.html',
  styleUrls: ['./repMailNew.component.css']
})
export class RepMailNewComponent implements OnInit {
  @Input()mailId:number;
  @Output() closeDialog = new EventEmitter<any>();
  title:string;
  startHour:number;
  startMinute:number;
  repMailEntity:RepMailEntity;
  reportList:RepReportEntity[];
  periodList:string[];
  form = new FormGroup({
    id: new FormControl(''),
    title: new FormControl('', Validators.required),
    message: new FormControl('', Validators.required),
    period: new FormControl('', Validators.required),
    startDate:new FormControl('',Validators.required),
    reportId: new FormControl('', Validators.required),
    active: new FormControl('')
  });

  constructor(private repMailS:RepMailService,private repReportS:RepReportService,private alertS:AlertService) {
    this.mailId=0;
    this.startHour=0;
    this.startMinute=0;
    this.periodList=['Cada hora','Diario','Semanal'];
  }

  ngOnInit() {
    this.repReportS.list().subscribe(res=>{
      if(res.message==='OK'){
        this.reportList=res.object;
      }else{
        this.alertS.open(res.message,'error');
      }
    },err=>{
      this.alertS.open(err.message,'error');
    });
    if(this.mailId != 0){
      this.title="Editar Correo";
      this.repMailS.findById(this.mailId).subscribe(res=>{
        if(res.message==='OK'){
          this.repMailEntity=res.object;
          this.form.setValue(
            {
              'id':this.repMailEntity.id,
              'title':this.repMailEntity.title,
              'message':this.repMailEntity.message,
              'period':this.repMailEntity.period,
              'startDate':this.repMailEntity.startDate,
              'reportId':this.repMailEntity.reportId,
              'active':this.repMailEntity.active
            }
          );
          this.startHour=Number(this.repMailEntity.startDate.substring(11,13));
          this.startMinute=Number(this.repMailEntity.startDate.substring(14,16));
        }else{
          this.alertS.open(res.message,'error');
        }
      },err=>{
        this.alertS.open(err.message,'error');
      });
    }else{
      this.title="Nuevo Correo";
    }
  }
  onClick(){
    if(this.mailId===0){
      this.form.controls.startDate.setValue(moment(this.form.controls.startDate.value).format('YYYY-MM-DD')+' '+this.startHour+':'+this.startMinute+':00.000');
      this.repMailS.create(this.form.value).subscribe(res=>{
        if(res.message==='OK'){
          if(res.object !=0){
            this.closeDialog.emit();
            this.alertS.open('Correo creado!','success');
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
      this.form.controls.startDate.setValue(moment(this.form.controls.startDate.value).format('YYYY-MM-DD')+' '+this.startHour+':'+this.startMinute+':00.000');
      this.repMailS.update(this.form.value).subscribe(res=>{
        if(res.message==='OK'){
          if(res.object !=0){
            this.closeDialog.emit();
            this.alertS.open('Correo actualizado!','success');
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
