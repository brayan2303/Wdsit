import { Component, OnInit, ViewChild } from "@angular/core";
import { AlertService } from 'src/app/shared/services/alert.service';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { GenCountryEntity } from "src/app/appGeneral/entities/genCountry.entity";
import { GenDepartmentEntity } from "src/app/appGeneral/entities/genDepartment.entity";
import { GenCityEntity } from "src/app/appGeneral/entities/genCity.entity";
import { GenCountryService } from "src/app/appGeneral/services/genCountry.service";
import { GenDepartmentService } from "src/app/appGeneral/services/genDepartment.service";
import { GenCityService } from "src/app/appGeneral/services/genCity.service";
import { PqrRegionalService } from "src/app/appPqrs/services/pqrRegional.service";

@Component({
    selector: 'app-pqrAdministrationRegional',
    templateUrl: './pqrAdministrationRegional.component.html',
    styleUrls: ['./pqrAdministrationRegional.component.css']
})
export class PqrAdministrationRegionalComponent implements OnInit {
    loading: boolean;
    editing: number;
    columns: string[];
    dataSource = new MatTableDataSource<any>();
    @ViewChild(MatTable) table: MatTable<any>;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    form = new FormGroup({
        id: new FormControl(''),
        name: new FormControl('', Validators.required),
        cityId: new FormControl('', Validators.required),
        active: new FormControl('')
    });
    countryId1:number;
    departmentId1:number;
    countryId2:number;
    departmentId2:number;
    cityId:number;
    countryList1:GenCountryEntity[];
    departmentList1:GenDepartmentEntity[];
    cityList1:GenCityEntity[];
    countryList2:GenCountryEntity[];
    departmentList2:GenDepartmentEntity[];
    cityList2:GenCityEntity[];
    countryIdLocal:string;

    constructor(private pqrRegionalS:PqrRegionalService,private genCountryS:GenCountryService,private genDepartmentS:GenDepartmentService,private genCityS:GenCityService,public dialog: MatDialog, private alertS: AlertService) {
        this.loading = false;
        this.editing = 0;
        this.columns = ['id', 'name', 'country','department','city', 'active', 'actions'];
        this.dataSource = new MatTableDataSource([]);
        this.countryId1=0;
        this.departmentId1=0;
        this.countryId2=0;
        this.departmentId2=0;
        this.cityId=0;
        this.countryList1=[];
        this.departmentList1=[];
        this.cityList1=[];
        this.countryList2=[];
        this.departmentList2=[];
        this.cityList2=[];
        this.countryIdLocal = '';
    }
    ngOnInit(): void {
        this.countryIdLocal=localStorage.getItem('countryId');
        this.genCountryS.list().subscribe(res => {
            if (res.message === 'OK') {
                this.countryList1=res.object;
                this.countryList2=res.object;
            } else {
                this.alertS.open(res.message, 'error');
            }
        }, err => {
            this.alertS.open(err.message, 'error');
        });
    }
    filter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim();

        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    }
    getDepartment(option:number){
        this.genDepartmentS.listActive(option===1?this.countryId1:this.countryId2).subscribe(res=>{
            if(res.message==='OK'){
                if(option===1){
                    this.departmentList1=res.object;
                }else{
                    this.departmentList2=res.object;
                }
            }else{
                this.alertS.open(res.message,'error');
            }
        },err=>{
            this.alertS.open(err.message,'error');
        });
    }
    getCity(option:number){
        this.genCityS.listActive(option===1?this.departmentId1:this.departmentId2).subscribe(res=>{
            if(res.message==='OK'){
                if(option===1){
                    this.cityList1=res.object;
                }else{
                    this.cityList2=res.object;
                }
            }else{
                this.alertS.open(res.message,'error');
            }
        },err=>{
            this.alertS.open(err.message,'error');
        });
    }
    getRegional(){
        this.loading=true;
        this.pqrRegionalS.list(this.cityId,Number(this.countryIdLocal)).subscribe(res=>{
            if(res.message==='OK'){
                this.dataSource=new MatTableDataSource(res.object);
                this.dataSource.paginator=this.paginator;
                this.loading=false;
            }else{
                this.alertS.open(res.message,'error');
            }
        },err=>{
            this.alertS.open(err.message,'error');
        });
    }
    save() {
        if (this.editing === 0) {
            this.pqrRegionalS.create(this.form.value, Number(this.countryIdLocal)).subscribe(res => {
                if (res.message === 'OK') {
                    if (res.object != 0) {
                        this.alertS.open('Regional creada!', 'success');
                        this.loading = true;
                        this.pqrRegionalS.list(this.cityId,Number(this.countryIdLocal)).subscribe(res => {
                            if (res.message === 'OK') {
                                this.loading = false;
                                this.dataSource = new MatTableDataSource<any>(res.object);
                                this.dataSource.paginator = this.paginator;
                                this.dataSource.sort = this.sort;
                                this.form.setValue({
                                    'id': '',
                                    'name': '',
                                    'cityId': '',
                                    'active': ''
                                });
                            } else {
                                this.alertS.open(res.message, 'error');
                            }
                        }, err => {
                            this.alertS.open(err.message, 'error');
                        });
                    } else {
                        this.alertS.open('Error al crear la regional', 'error');
                    }
                } else {
                    this.alertS.open(res.message, 'error');
                }
            }, err => {
                this.alertS.open(err.message, 'error');
            });
        } else {
            this.pqrRegionalS.update(this.form.value).subscribe(res => {
                if (res.message === 'OK') {
                    if (res.object != 0) {
                        this.alertS.open('Regional actualizada!', 'success');
                        this.loading = true;
                        this.pqrRegionalS.list(this.cityId, Number(this.countryIdLocal)).subscribe(res => {
                            if (res.message === 'OK') {
                                this.loading = false;
                                this.dataSource = new MatTableDataSource<any>(res.object);
                                this.dataSource.paginator = this.paginator;
                                this.dataSource.sort = this.sort;
                                this.form.setValue({
                                    'id': '',
                                    'name': '',
                                    'cityId': '',
                                    'active': ''
                                });
                                this.countryId1=0;
                                this.departmentId1=0;
                            } else {
                                this.alertS.open(res.message, 'error');
                            }
                        }, err => {
                            this.alertS.open(err.message, 'error');
                        });
                    } else {
                        this.alertS.open('Error al actualizar la regional!', 'error');
                    }
                } else {
                    this.alertS.open(res.message, 'error');
                }
            }, err => {
                this.alertS.open(err.message, 'error');
            });
        }
    }
    edit(id: number, name: string,countryId:number,departmentId:number, cityId: number, active: boolean) {
        this.editing = id;
        this.form.setValue(
            {
                'id': id,
                'name': name,
                'cityId': cityId,
                'active': active
            }
        );
        this.countryId1=countryId;
        this.departmentId1=departmentId;
        this.getDepartment(1);
        this.getCity(1);
    }
    closeEditing() {
        this.editing = 0;
        this.form.setValue(
            {
                'id': '',
                'name': '',
                'cityId': '',
                'active': ''
            }
        );
        this.countryId1=0;
        this.departmentId1=0;
    }
}