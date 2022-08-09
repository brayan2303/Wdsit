import { Component, OnInit } from "@angular/core";
import { AlertService } from 'src/app/shared/services/alert.service';
import { DisMonthService } from 'src/app/appDistribution/services/disMonth.service';
import { DisMonthModel } from 'src/app/appDistribution/models/disMonth.model';
import { GenCustomerEntity } from 'src/app/appGeneral/entities/genCustomer.entity';
import { GenCustomerService } from 'src/app/appGeneral/services/genCustomer.service';
import { GenCountryEntity } from 'src/app/appGeneral/entities/genCountry.entity';
import { GenCountryService } from 'src/app/appGeneral/services/genCountry.service';
import { GenDepartmentService } from 'src/app/appGeneral/services/genDepartment.service';
import { GenCityService } from 'src/app/appGeneral/services/genCity.service';
import { MatDialog } from '@angular/material/dialog';
import { DisProyectComponent } from 'src/app/appDistribution/modals/proyect/disProyect.component';
import { DisMonthDayService } from 'src/app/appDistribution/services/disMonthDay.service';
import { DisDailyOperationService } from 'src/app/appDistribution/services/disDailyOperation.service';
import { DisDailyOperationModel } from 'src/app/appDistribution/models/disDailyProduction.model';
import { DisDailyOperationDayService } from 'src/app/appDistribution/services/disDailyOperationDay.service';

@Component({
    selector: 'app-disDailyOperationControl',
    templateUrl: './disDailyOperationControl.component.html',
    styleUrls: ['./disDailyOperationControl.component.css']
})
export class DisDailyOperationControlComponent implements OnInit {
    countryList:GenCountryEntity[];
    yearList: number[];
    monthList: DisMonthModel[];
    daysList:number[];
    customerList: GenCustomerEntity[];
    dailyOperationList:DisDailyOperationModel[];
    country:number;
    year: number;
    month: string;
    day:number;
    customer: number;

    constructor(private disDailyOperationS:DisDailyOperationService,private disDailyOperationDayS:DisDailyOperationDayService,private genCountryS:GenCountryService,private genDepartmentS:GenDepartmentService,private genCityS:GenCityService,private disMonthS: DisMonthService,private disMonthDayS:DisMonthDayService, private genCustomerS: GenCustomerService,private dialog: MatDialog, private alertS: AlertService) {
        this.countryList=[];
        this.yearList = [];
        this.monthList = [];
        this.daysList=[];
        this.customerList = [];
        this.dailyOperationList=[];
        this.country=0;
        this.year = 0;
        this.month = '';
        this.day=0;
        this.customer = 0;
    }
    ngOnInit(): void {
        for (let i = 2000; i < 2051; i++) {
            this.yearList.push(i);
        }
        this.genCountryS.listActive().subscribe(res=>{
            if(res.message==='OK'){
                this.countryList=res.object;
            }else{
                this.alertS.open(res.message,'error');
            }
        },err=>{
            this.alertS.open(err.message,'error');
        });
        this.genCustomerS.list().subscribe(res => {
            if (res.message === 'OK') {
                this.customerList = res.object;
            } else {
                this.alertS.open(res.message, 'error');
            }
        }, err => {
            this.alertS.open(err.message, 'error');
        });
    }
    getMonth() {
        this.disMonthS.listAll(this.year).subscribe(res => {
            if (res.message === 'OK') {
                this.monthList = res.object;
            } else {
                this.alertS.open(res.message, 'error');
            }
        }, err => {
            this.alertS.open(err.message, 'error');
        });
    }
    getDays(){
        this.disMonthDayS.days(Number(this.month.split(',',2)[0]),this.year,this.month.split(',',2)[1]).subscribe(res=>{
            if(res.message==='OK'){
                this.daysList=res.object;
            }else{
                this.alertS.open(res.message,'error');
            }
        },err=>{
            this.alertS.open(err.message,'error');
        });
    }
    getDailyOperation(){
        this.disDailyOperationS.list(this.country,this.year,Number(this.month.split(',',2)[0]),this.day).subscribe(res=>{
            if(res.message==='OK'){
                this.dailyOperationList=res.object;
            }else{
                this.alertS.open(res.message,'error');
            }
        },err=>{
            this.alertS.open(err.message,'error');
        });
    }
    createProyect(){
        var dialogActionPlan = this.dialog.open(DisProyectComponent, {
            width: '100%'
        });
    }
    updateDay(id:number,type:string){
        var value=Number((document.getElementById(String(id)+'day'+type)as HTMLInputElement).value);
        this.disDailyOperationDayS.create(id,this.day,type,value).subscribe(res=>{
            if(res.message==='OK'){
                if(res.object!=0){
                    this.alertS.open('Dia actualizado!','success');
                    this.getDailyOperation();
                }else{
                    this.alertS.open('Error al actualizar el dia!','error');
                }
            }else{
                this.alertS.open(res.message,'error');
            }
        },err=>{
            this.alertS.open(err.message,'error');
        });
    }
    updateGoal(id:number,type:string){
        var value=Number((document.getElementById(String(id)+'goal'+type)as HTMLInputElement).value);
        this.disDailyOperationS.update(id,value,type).subscribe(res=>{
            if(res.message==='OK'){
                if(res.object!=0){
                    this.alertS.open('Meta actualizada!','success');
                    this.getDailyOperation();
                }else{
                    this.alertS.open('Error al actualizar la meta!','error');
                }
            }else{
                this.alertS.open(res.message,'error');
            }
        },err=>{
            this.alertS.open(err.message,'error');
        });
    }
}