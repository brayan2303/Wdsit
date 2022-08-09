import { Component, OnInit, ViewChild } from "@angular/core";
import { AlertService } from 'src/app/shared/services/alert.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ConfirmationComponent } from 'src/app/shared/components/confirmation/confirmation.component';
import { GenPersonService } from 'src/app/appGeneral/services/genPerson.service';
import { GenPersonEntity } from 'src/app/appGeneral/entities/genPerson.entity';
import { GenCountryEntity } from 'src/app/appGeneral/entities/genCountry.entity';
import { GenCountryService } from 'src/app/appGeneral/services/genCountry.service';
import { ProPerspectiveService } from "src/app/appProcess/services/proPerspective.service";
import { ProPerspectiveEntity } from "src/app/appProcess/entities/proPerspective.entity";
import { PersonModal } from "src/app/appProcess/modals/person/person.modal";

@Component({
    selector: 'app-proPerspectiveManage',
    templateUrl: './proPerspectiveManage.component.html',
    styleUrls: ['./proPerspectiveManage.component.css']
})
export class ProPerspectiveManageComponent implements OnInit {
    loading: boolean;
    editing: number;
    columns: string[];
    dataSource = new MatTableDataSource<any>();
    @ViewChild(MatTable) table: MatTable<any>;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    form = new FormGroup({
        id: new FormControl(''),
        code: new FormControl('', Validators.required),
        name: new FormControl('', Validators.required),
        objetive: new FormControl('', Validators.required),
        year: new FormControl('', Validators.required),
        color: new FormControl('#ffffff', Validators.required),
        countryId: new FormControl('', Validators.required),
        leaderId: new FormControl('', Validators.required),
        active: new FormControl('')
    });
    year:number;
    yearList:number[];
    countryList: GenCountryEntity[];
    leaderList: GenPersonEntity[];

    constructor(private proPerspectiveS: ProPerspectiveService, private genCountryS: GenCountryService, private genPersonS: GenPersonService, private dialog: MatDialog, private alertS: AlertService) {
        this.year=0;
        this.loading = false;
        this.editing = 0;
        this.columns = ['id', 'code', 'name', 'objetive','year', 'color', 'country', 'leader', 'active', 'acciones'];
        this.dataSource = new MatTableDataSource([]);
        this.yearList=[];
        this.countryList = [];
        this.leaderList = [];
    }
    ngOnInit(): void {
        for (let i = 2020; i < 2026; i++) {
            this.yearList.push(i);
        }
        this.genPersonS.list().subscribe(res => {
            if (res.message === 'OK') {
                this.leaderList = res.object;
            } else {
                this.alertS.open(res.message, 'error');
            }
        }, err => {
            this.alertS.open(err.message, 'error');
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
    getPerspective(){
        this.loading = true;
        this.proPerspectiveS.list(this.year,Number(localStorage.getItem('countryId'))).subscribe(res => {
            if (res.message === 'OK') {
                this.loading = false;
                this.dataSource = new MatTableDataSource<any>(res.object);
                this.dataSource.paginator = this.paginator;
                this.dataSource.sort = this.sort;
            } else {
                this.alertS.open(res.message, 'error');
            }
        }, err => {
            this.alertS.open(err.message, 'error');
        });
    }
    onClick() {
        if (this.editing === 0) {
            this.proPerspectiveS.create(this.form.value).subscribe(res => {
                if (res.message === 'OK') {
                    if (res.object != 0) {
                        this.alertS.open('Proceso creado!', 'success');
                        this.loading = true;
                        this.proPerspectiveS.list(this.year,Number(localStorage.getItem('countryId'))).subscribe(res => {
                            if (res.message === 'OK') {
                                this.loading = false;
                                this.dataSource = new MatTableDataSource<any>(res.object);
                                this.dataSource.paginator = this.paginator;
                                this.dataSource.sort = this.sort;
                                this.form.setValue({
                                    'id': '',
                                    'code': '',
                                    'name': '',
                                    'objetive': '',
                                    'year':'',
                                    'color': '#ffffff',
                                    'countryId': '',
                                    'leaderId': '',
                                    'active': ''
                                });
                            } else {
                                this.alertS.open(res.message, 'error');
                            }
                        }, err => {
                            this.alertS.open(err.message, 'error');
                        });
                    } else {
                        this.alertS.open('Error al crear el proceso!', 'error');
                    }
                } else {
                    this.alertS.open(res.message, 'error');
                }
            }, err => {
                this.alertS.open(err.message, 'error');
            });
        } else {
            this.proPerspectiveS.update(this.form.value).subscribe(res => {
                if (res.message === 'OK') {
                    if (res.object != 0) {
                        this.alertS.open('Proceso actualizado!', 'success');
                        this.loading = true;
                        this.proPerspectiveS.list(this.year,Number(localStorage.getItem('countryId'))).subscribe(res => {
                            if (res.message === 'OK') {
                                this.loading = false;
                                this.dataSource = new MatTableDataSource<any>(res.object);
                                this.dataSource.paginator = this.paginator;
                                this.dataSource.sort = this.sort;
                                this.form.setValue({
                                    'id': '',
                                    'code': '',
                                    'name': '',
                                    'objetive': '',
                                    'year':'',
                                    'color': '#ffffff',
                                    'countryId': '',
                                    'leaderId': '',
                                    'active': ''
                                });
                                this.editing = 0;
                            } else {
                                this.alertS.open(res.message, 'error');
                            }
                        }, err => {
                            this.alertS.open(err.message, 'error');
                        });
                    } else {
                        this.alertS.open('Error al actualizar el proceso!', 'error');
                    }
                } else {
                    this.alertS.open(res.message, 'error');
                }
            }, err => {
                this.alertS.open(err.message, 'error');
            });
        }
    }
    edit(item: ProPerspectiveEntity) {
        this.editing = item.id;
        this.form.setValue(
            {
                'id': item.id,
                'code': item.code,
                'name': item.name,
                'objetive': item.objetive,
                'year':item.year,
                'color': item.color,
                'countryId': item.countryId,
                'leaderId': item.leaderId,
                'active': item.active
            }
        );
    }
    delete(id: number) {
        this.dialog.open(ConfirmationComponent,{
            data:{message:'¿Desea eliminar el proceso?'},
            height:'250px',
            width:'400px'
        }).afterClosed().subscribe(res => {
            if (res) {
                this.proPerspectiveS.delete(id).subscribe(resD => {
                    if (resD.message === 'OK') {
                        if (resD.object != 0) {
                            this.alertS.open('Proceso eliminado!', 'success');
                            this.loading = true;
                            this.proPerspectiveS.list(this.year,Number(localStorage.getItem('countryId'))).subscribe(res => {
                                if (res.message === 'OK') {
                                    this.loading = false;
                                    this.dataSource = new MatTableDataSource<any>(res.object);
                                    this.dataSource.paginator = this.paginator;
                                    this.dataSource.sort = this.sort;
                                    this.form.setValue({
                                        'id': '',
                                        'code': '',
                                        'name': '',
                                        'objetive': '',
                                        'year':'',
                                        'color': '#ffffff',
                                        'countryId': '',
                                        'leaderId': '',
                                        'active': ''
                                    });
                                } else {
                                    this.alertS.open(res.message, 'error');
                                }
                            }, err => {
                                this.alertS.open(err.message, 'error');
                            });
                        } else {
                            this.alertS.open('Error al eliminar el proceso!', 'error');
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
                'code': '',
                'name': '',
                'objetive': '',
                'year':'',
                'color': '#ffffff',
                'countryId': '',
                'leaderId': '',
                'active': ''
            }
        );
    }
    getUsers(id: number) {
        this.dialog.open(PersonModal, {
            data: { 'id': id },
            width: '800px'
        });
    }
}