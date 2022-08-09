import { Component, OnInit } from '@angular/core';
import { IncIncomeControlService } from '../../services/incIncomeControl.service';
import { GenPersonEntity } from 'src/app/appGeneral/entities/genPerson.entity';

@Component({
  selector: 'app-incPrincipal',
  templateUrl: './incPrincipal.component.html',
  styleUrls: ['./incPrincipal.component.css']
})
export class IncPrincipalComponent implements OnInit {
  isProgress: boolean;
  isData:boolean;
  isCreate:boolean;
  activeForm: string;
  genPersonEntity: GenPersonEntity;
  segmentId: number;
  centerCostId: number;
  customerId: number;
  fecha: Date;

  constructor(private incIncomeControlS: IncIncomeControlService) {
    this.isProgress = false;
    this.activeForm = "form1";
  }
  ngOnInit(): void {
    window.document.title='Control de Ingresos';
  }
  getDate() {
    setInterval(() => {
      this.fecha = new Date();
    }, 1000);
  }
  onRegistry(value:boolean){
    this.isCreate=value;
    if(this.isCreate){
      this.activeForm="form2";
    }else{
      this.activeForm="form6";
    }    
  }
  onSelectOption(value:boolean){
    this.isData=value;
    if(this.isData){
      this.activeForm="form5";
    }else{
      this.activeForm="form3";
    }
  }
  onSelectPerson(value: GenPersonEntity) {
    this.genPersonEntity = value;
  }
  onSelectSegment(value: number) {
    this.segmentId = value;
    this.activeForm="form4";
  }
  onSelectCenterCost(value: number) {
    this.centerCostId = value;
    this.activeForm="form5";
  }
  onSelectCustomer(value: number) {
    this.customerId = value;
    this.activeForm="form7";
  }
  onSubmit(value:string) {
    if (value==="CREATE") {
      if (this.isData) {
        var json = { 'personId': this.genPersonEntity.id, 'centerCostId': this.genPersonEntity.centerCostId, 'customerId': this.customerId, 'initialDate': this.fecha, 'finalDate': null };
        this.incIncomeControlS.create(json).subscribe(res => {
          if (res.object > 0) {
            this.activeForm = "form1";
          }
        }, err => {
          console.log(err);
        });
      } else {
        var json = { 'personId': this.genPersonEntity.id, 'centerCostId': this.centerCostId, 'customerId': this.customerId, 'initialDate': this.fecha, 'finalDate': null };
        this.incIncomeControlS.create(json).subscribe(res => {
          if (res.object > 0) {
            this.activeForm = "form1";
          }
        }, err => {
          console.log(err);
        });
      }
    }else{
      this.incIncomeControlS.update(this.genPersonEntity.id).subscribe(res=>{
        if(res.object>0){
          this.activeForm='form1';
        }
      },err=>{
        console.log(err);
      });
    }
  }
}
