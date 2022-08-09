import { Component, Inject, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GenCityEntity } from 'src/app/appGeneral/entities/genCity.entity';
import { GenCountryEntity } from 'src/app/appGeneral/entities/genCountry.entity';
import { GenCustomerEntity } from 'src/app/appGeneral/entities/genCustomer.entity';
import { GenDepartmentEntity } from 'src/app/appGeneral/entities/genDepartment.entity';
import { GenCityService } from 'src/app/appGeneral/services/genCity.service';
import { GenCountryService } from 'src/app/appGeneral/services/genCountry.service';
import { GenCustomerService } from 'src/app/appGeneral/services/genCustomer.service';
import { GenDepartmentService } from 'src/app/appGeneral/services/genDepartment.service';
import { AlertService } from 'src/app/shared/services/alert.service';
import { DisMonthModel } from '../../models/disMonth.model';
import { DisDailyOperationService } from '../../services/disDailyOperation.service';
import { DisMonthService } from '../../services/disMonth.service';
import { DisMonthDayService } from '../../services/disMonthDay.service';

@Component({
    selector: 'modal-disProyect',
    templateUrl: 'disProyect.component.html',
    styleUrls: ['./disProyect.component.css']
})
export class DisProyectComponent implements OnInit {
    countryList: GenCountryEntity[];
    departmentList: GenDepartmentEntity[];
    cityList: GenCityEntity[];
    yearList: number[];
    monthList: DisMonthModel[];
    daysList:number[];
    customerList: GenCustomerEntity[];
    day:number;
    form = new FormGroup({
        countryId: new FormControl('',Validators.required),
        departmentId: new FormControl('', Validators.required),
        cityId: new FormControl('', Validators.required),
        customerId: new FormControl('', Validators.required),
        year: new FormControl('', Validators.required),
        monthId: new FormControl('', Validators.required),
        goalLogistic: new FormControl('', Validators.required),
        goalProduction: new FormControl('', Validators.required),
        goalReconditioning: new FormControl('', Validators.required),
        goalMakeover: new FormControl('', Validators.required),
        goalRepair: new FormControl('', Validators.required)
    });

    constructor(private disDailyOperationS:DisDailyOperationService,private genCountryS: GenCountryService, private genDepartmentS: GenDepartmentService, private genCityS: GenCityService, private disMonthS: DisMonthService,private disMonthDayS:DisMonthDayService, private genCustomerS: GenCustomerService, private alertS: AlertService,
        public dialogRef: MatDialogRef<DisProyectComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any) {
        dialogRef.disableClose = true;
        this.countryList = [];
        this.departmentList = [];
        this.cityList = [];
        this.yearList = [];
        this.monthList = [];
        this.daysList=[];
        this.customerList = [];
        this.day=0;
    }
    ngOnInit(): void {
        for (let i = 2000; i < 2051; i++) {
            this.yearList.push(i);
        }
        this.genCountryS.listActive().subscribe(res => {
            if (res.message === 'OK') {
                this.countryList = res.object;
            } else {
                this.alertS.open(res.message, 'error');
            }
        }, err => {
            this.alertS.open(err.message, 'error');
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
    save() {
        this.disDailyOperationS.create(this.day,this.form.value).subscribe(resC=>{
            if(resC.message==='OK'){
                if(resC.object!=0){
                    this.alertS.open('Proyecto creado!','success');
                }else{
                    this.alertS.open('Error al crear el proyecto!','error');
                }
            }else{
                this.alertS.open(resC.message,'error');
            }
        },err=>{
            this.alertS.open(err.message,'error');
        });
    }
    getDepartment() {
        this.genDepartmentS.listActive(this.form.controls.countryId.value).subscribe(res => {
            if (res.message === 'OK') {
                this.departmentList = res.object;
            } else {
                this.alertS.open(res.message, 'error');
            }
        }, err => {
            this.alertS.open(err.message, 'error');
        });
    }
    getCity() {
        this.genCityS.listActive(this.form.controls.departmentId.value).subscribe(res => {
            if (res.message === 'OK') {
                this.cityList = res.object;
            } else {
                this.alertS.open(res.message, 'error');
            }
        }, err => {
            this.alertS.open(err.message, 'error');
        });
    }
    getMonth() {
        this.disMonthS.listAll(this.form.controls.year.value).subscribe(res => {
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
        var meses=document.getElementById('selectMonth')as HTMLSelectElement;
        var mes=(meses.options as HTMLOptionsCollection)[meses.options.selectedIndex];
        this.disMonthDayS.days(this.form.controls.monthId.value,this.form.controls.year.value,mes.textContent).subscribe(res=>{
            if(res.message==='OK'){
                this.daysList=res.object;
            }else{
                this.alertS.open(res.message,'error');
            }
        },err=>{
            this.alertS.open(err.message,'error');
        });
    }
    close(): void {
        this.dialogRef.close(true);
    }
}