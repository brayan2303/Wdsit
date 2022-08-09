import { Component, OnInit, ViewChild } from "@angular/core";
import { AlertService } from 'src/app/shared/services/alert.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ConfirmationComponent } from 'src/app/shared/components/confirmation/confirmation.component';
import { GenCountryEntity } from 'src/app/appGeneral/entities/genCountry.entity';
import { GenCountryService } from 'src/app/appGeneral/services/genCountry.service';
import { GenCountryCustomerEntity } from "src/app/appGeneral/entities/genCountryCustomer.entity";
import { GenCountryCustomerService } from "src/app/appGeneral/services/genCountryCustomer.service";
import { DaiGoalService } from "src/app/appDailyOperation/services/daiGoal.services";
import { DaiGoalEntity } from "src/app/appDailyOperation/entities/daiGoal.entity";
import { DaiMonthEntity } from "src/app/appDailyOperation/entities/daiMonth.entity";
import { DaiMonthService } from "src/app/appDailyOperation/services/daiMonth.services";
import { DaiGoalModel } from "src/app/appDailyOperation/models/daiGoal.model";

@Component({
    selector: 'app-daiGoalManage',
    templateUrl: './daiGoalManage.component.html',
    styleUrls: ['./daiGoalManage.component.css']
})
export class DaiGoalManageComponent implements OnInit {
    loading: boolean;
    editing: number;
    columns: string[];
    dataSource = new MatTableDataSource<any>();
    @ViewChild(MatTable) table: MatTable<any>;
    form = new FormGroup({
        id: new FormControl(''),
        year: new FormControl('', Validators.required),
        monthId:new FormControl('',Validators.required),
        countryId: new FormControl('', Validators.required),
        countryCustomerId: new FormControl('', Validators.required),
        codeFamily: new FormControl('', Validators.required),
        goal: new FormControl('', Validators.required),
       
    });
    year: number;
    countryId: number;
    customer:string;
    codeFamily:string;
    yearList1: number[];
    yearList2: number[];
    monthList:DaiMonthEntity[];
    countryList: GenCountryEntity[];
    customerList: GenCountryCustomerEntity[];
    codeFamilyList:DaiGoalModel[];

    constructor(private daiGoalS: DaiGoalService,private daiMonthS:DaiMonthService, private genCountryS: GenCountryService, private genCountryCustomerS: GenCountryCustomerService, private dialog: MatDialog, private alertS: AlertService) {
        this.loading = false;
        this.editing = 0;
        this.columns = ['id','year','month', 'country', 'customer', 'codeFamily','goal', 'actions'];
        this.dataSource = new MatTableDataSource([]);
        this.year = 0;
        this.countryId = 0;
        this.yearList1 = [];
        this.yearList2=[];
        this.monthList=[];
        this.countryList = [];
        this.customerList = [];
        this.customer = "";
        this.codeFamilyList = [];
        this.codeFamily = "";
    }
    ngOnInit(): void {
        this.countryId = 0;
        for (let i = 2020; i < 2026; i++) {
            this.yearList1.push(i);
            this.yearList2.push(i);
        }
        this.daiMonthS.list().subscribe(res=>{
            if(res.message==='OK'){
                this.monthList=res.object;
            }else{
                this.alertS.open(res.message,'error');
            }
        },err=>{
            this.alertS.open(err.message,'error');
        });
        this.genCountryS.listActive().subscribe(res => {
            if (res.message === 'OK') {
                this.countryList = res.object;
            } else {
                this.alertS.open(res.message, 'error');
            }
        }, err => {
            this.alertS.open(err.message, 'error');
        });
    }
    getCustomer() {
        this.genCountryCustomerS.listCustomer(this.countryId).subscribe(res => {
            if (res.message === 'OK') {
                this.customerList = res.object;
            } else {
                this.alertS.open(res.message, 'error');
            }
        }, err => {
            this.alertS.open(err.message, 'error');
        });
        
    }
    getGoal(){
        this.loading=true;
        this.daiGoalS.list(this.year).subscribe(res=>{
            if(res.message==='OK'){
                this.dataSource=new MatTableDataSource(res.object);
                this.loading=false;
            }else{
                this.alertS.open(res.message,'error');
            }
        },err=>{
            this.alertS.open(err.message,'error');
        });
    }
    getCodeFammily(){
        var validation = Number(localStorage.getItem('countryId'))
        if(this.countryId == validation ){
            console.log(this.countryId);
            console.log(Number(localStorage.getItem('countryId')))
            this.daiGoalS.codigoFamiliaList(this.customer,Number(localStorage.getItem('countryId'))).subscribe(resC =>{
                if(resC.message === 'OK'){
                    this.codeFamilyList = resC.object;
        
                }else{
                    this.alertS.open(resC.message, 'error');
                }
            }, err=>{
                this.alertS.open(err.message, 'error');
            });
        }else{
            this.alertS.open('El usuario no se encuentra logueado en el pais seleccionado', 'warning');
        }
    }
    save() {
        this.customer = "";
        this.countryId = 0;
        if (this.editing === 0) {
            this.daiGoalS.create(this.form.value).subscribe(res => {
                if (res.message === 'OK') {
                    if (res.object != 0) {
                        this.alertS.open('Meta creada!', 'success');
                        this.loading = true;
                        this.countryId = 0;
                        this.year = 0;
                        this.customer = '';
                        this.form.reset();
                        this.daiGoalS.list(this.year).subscribe(res => {
                            this.form.reset();
                            this.countryId = 0;
                            console.log(this.countryId)
                            if (res.message === 'OK') {
                                this.loading = false;
                                this.dataSource = new MatTableDataSource<any>(res.object);
                                this.form.setValue({
                                    'id': '',
                                    'year': '',
                                    'monthId':'',
                                    'countryId':'',
                                    'countryCustomerId': '',
                                    'codeFamily':'',
                                    'goal': ''
                                });
                                this.countryId = 0;
                                
                            } else {
                                this.alertS.open(res.message, 'error');
                            }
                        }, err => {
                            this.alertS.open(err.message, 'error');
                        });
                    } else {
                        this.alertS.open('Error al crear la meta!', 'error');
                    }
                } else {
                    this.alertS.open(res.message, 'error');
                }
            }, err => {
                this.alertS.open(err.message, 'error');
            });
        } else {
            this.daiGoalS.update(this.form.value).subscribe(res => {
                if (res.message === 'OK') {
                    if (res.object != 0) {
                        this.alertS.open('Meta actualizada!', 'success');
                        this.loading = true;
                        this.form.reset();
                        this.daiGoalS.list(this.year).subscribe(res => {
                            if (res.message === 'OK') {
                                this.loading = false;
                                this.dataSource = new MatTableDataSource<any>(res.object);
                                this.form.setValue({
                                    'id': '',
                                    'year': '',
                                    'monthId':'',
                                    'countryId':0,
                                    'countryCustomerId': 0,
                                    'codeFamily':'',
                                    'goal': ''
                                });
                                this.editing = 0;
                                this.countryId = 0;
                                
                            } else {
                                this.alertS.open(res.message, 'error');
                            }
                        }, err => {
                            this.alertS.open(err.message, 'error');
                        });
                    } else {
                        this.alertS.open('Error al actualizar la meta!', 'error');
                    }
                } else {
                    this.alertS.open(res.message, 'error');
                }
            }, err => {
                this.alertS.open(err.message, 'error');
            });
        }
    }
    edit(item: DaiGoalEntity) {
        this.countryId = item.countryId;
        this.getCustomer();
        this.editing = item.id;
        this.customer = item.customer;
        this.getCodeFammily();
        this.form.setValue(
            
            {
                'id': item.id,
                'year': item.year,
                'monthId':item.monthId,
                'countryId':item.countryId,
                'countryCustomerId': item.countryCustomerId,
                'codeFamily':item.codeFamily,
                'goal': item.goal
            }
            
        );
    }
    delete(id: number) {
        this.dialog.open(ConfirmationComponent,{
            data:{message:'¿Desea eliminar la meta?'},
            height:'250px',
            width:'400px'
        }).afterClosed().subscribe(res => {
            if (res) {
                this.daiGoalS.delete(id).subscribe(resD => {
                    if (resD.message === 'OK') {
                        if (resD.object != 0) {
                            this.alertS.open('Meta eliminada!', 'success');
                            this.loading = true;
                            this.daiGoalS.list(this.year).subscribe(res => {
                                if (res.message === 'OK') {
                                    this.loading = false;
                                    this.dataSource = new MatTableDataSource<any>(res.object);
                                    this.form.setValue({
                                        'id': '',
                                        'year': '',
                                        'monthId':'',
                                        'countryCustomerId': '',
                                        'codeFamily':'',
                                        'goal': ''
                                    });
                                } else {
                                    this.alertS.open(res.message, 'error');
                                }
                            }, err => {
                                this.alertS.open(err.message, 'error');
                            });
                        } else {
                            this.alertS.open('Error al eliminar la meta!', 'error');
                        }
                    } else {
                        this.alertS.open(resD.message, 'error');
                    }
                }, err => {
                    this.alertS.open(err.message, 'error');
                });
            }
        })
    }
    closeEditing() {
        this.editing = 0;
        this.form.setValue(
            {
                'id': '',
                'year': '',
                'monthId':'',
                'countryId':'',
                'countryCustomerId': '',
                'codeFamily':'',
                'goal': ''
            }
        );
        this.countryId=0;
    }
}