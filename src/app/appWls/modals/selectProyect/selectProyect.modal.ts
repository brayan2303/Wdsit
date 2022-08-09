import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GenCountryCustomerEntity } from 'src/app/appGeneral/entities/genCountryCustomer.entity';
import { GenCountryCustomerService } from 'src/app/appGeneral/services/genCountryCustomer.service';
import { AlertService } from 'src/app/shared/services/alert.service';
import { WlsProyectEntity } from '../../entities/wlsProyect.entity';
import { WlsProyectService } from '../../services/wlsProyect.service';

@Component({
    selector: 'selectProyect',
    templateUrl: 'selectProyect.modal.html',
    styleUrls: ['./selectProyect.modal.css']
})
export class SelectProyectModal implements OnInit {
    customerId:number;
    proyectId:number;
    customerList: GenCountryCustomerEntity[];
    proyectList:WlsProyectEntity[];

    constructor(private genCountryCustomerS: GenCountryCustomerService,private wlsProyectS:WlsProyectService,private alertS:AlertService,
        public dialogRef: MatDialogRef<SelectProyectModal>,
        @Inject(MAT_DIALOG_DATA) public data: any) {
            this.customerId=0;
            this.proyectId=0;
            this.customerList=[];
            this.proyectList=[];
        dialogRef.disableClose = true;
    }
    ngOnInit(): void {
        this.genCountryCustomerS.listCustomer(Number(localStorage.getItem('countryId'))).subscribe(res => {
            if(res.message==='OK'){
                this.customerList = res.object;
            }else{
                this.alertS.open(res.message,'error');
            }
        }, err => {
            this.alertS.open(err,'error');
        });
    }
    getProyect(){
        this.wlsProyectS.listByCustomer(Number(localStorage.getItem('countryId')),this.customerId).subscribe(res=>{
            if(res.message==='OK'){
                this.proyectList=res.object;
            }else{
                this.alertS.open(res.message,'error');
            }
        },err=>{
            this.alertS.open(err.message,'error');
        });
    }
    selectProyect(){
        this.wlsProyectS.findById(this.proyectId).subscribe(res=>{
            if(res.message==='OK'){
                localStorage.setItem('proyect',JSON.stringify(res.object));
                this.close(true);
            }else{
                this.alertS.open(res.message,'error');
            }
        },err=>{
            this.alertS.open(err.message,'error');
        });
    }
    close(status:boolean): void {
        this.dialogRef.close(status);
    }
}