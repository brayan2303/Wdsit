import { Component, OnInit, ViewChild } from "@angular/core";
import { AlertService } from 'src/app/shared/services/alert.service';
import { MatDialog } from '@angular/material/dialog';
import { GenPersonEntity } from 'src/app/appGeneral/entities/genPerson.entity';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PqrMasterService } from 'src/app/appPqrs/services/pqrMaster.service';
import { PqrMasterEntity } from 'src/app/appPqrs/entities/pqrMaster.entity';
import { PqrMasterTypeService } from 'src/app/appPqrs/services/pqrMasterType.service';
import { ConfirmationComponent } from 'src/app/shared/components/confirmation/confirmation.component';

@Component({
    selector: 'app-pqrAdministrationMaster',
    templateUrl: './pqrAdministrationMaster.component.html',
    styleUrls: ['./pqrAdministrationMaster.component.css']
})
export class PqrAdministrationMasterComponent implements OnInit {
    loading: boolean;
    editing: number;
    countryId:string
    columns: string[];
    genPersonEntity: GenPersonEntity;
    dataSource = new MatTableDataSource<any>();
    @ViewChild(MatTable) table: MatTable<any>;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    form = new FormGroup({
        id: new FormControl(''),
        name: new FormControl('', Validators.required),
        value: new FormControl('', Validators.required),
        masterTypeId: new FormControl('', Validators.required),
        active: new FormControl('')
    });
    masterTypeList: PqrMasterEntity[];

    constructor(private pqrMasterS: PqrMasterService, private pqrMasterTypeS: PqrMasterTypeService, private dialog: MatDialog, private alertS: AlertService) {
        this.loading = false;
        this.editing = 0;
        this.columns = ['id', 'name', 'value', 'masterType', 'active', 'Acciones'];
        this.dataSource = new MatTableDataSource([]);
        this.masterTypeList = [];
        this.countryId = '';
    }
    ngOnInit(): void {
        this.loading = true;
        this.countryId=localStorage.getItem('countryId');
        this.pqrMasterS.list(Number(this.countryId)).subscribe(res => {
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
        this.pqrMasterTypeS.list().subscribe(res => {
            if (res.message === 'OK') {
                this.masterTypeList = res.object;
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
    onClick() {
        if (this.editing === 0) {
            this.pqrMasterS.create(this.form.value, Number(this.countryId)).subscribe(res => {
                if (res.message === 'OK') {
                    if (res.object != 0) {
                        this.alertS.open('Listado maestro creado!', 'success');
                        this.loading = true;
                        this.pqrMasterS.list(Number(this.countryId)).subscribe(res => {
                            if (res.message === 'OK') {
                                this.loading = false;
                                this.dataSource = new MatTableDataSource<any>(res.object);
                                this.dataSource.paginator = this.paginator;
                                this.dataSource.sort = this.sort;
                                this.form.setValue({
                                    'id': '',
                                    'name': '',
                                    'value': '',
                                    'masterTypeId': '',
                                    'active': ''
                                });
                            } else {
                                this.alertS.open(res.message, 'error');
                            }
                        }, err => {
                            this.alertS.open(err.message, 'error');
                        });
                    } else {
                        this.alertS.open('Error al crear el listado maestro', 'error');
                    }
                } else {
                    this.alertS.open(res.message, 'error');
                }
            }, err => {
                this.alertS.open(err.message, 'error');
            });
        } else {
            this.pqrMasterS.update(this.form.value).subscribe(res => {
                if (res.message === 'OK') {
                    if (res.object != 0) {
                        this.alertS.open('Listado maestro actualizado!', 'success');
                        this.loading = true;
                        this.pqrMasterS.list(Number(this.countryId)).subscribe(res => {
                            if (res.message === 'OK') {
                                this.loading = false;
                                this.dataSource = new MatTableDataSource<any>(res.object);
                                this.dataSource.paginator = this.paginator;
                                this.dataSource.sort = this.sort;
                                this.form.setValue({
                                    'id': '',
                                    'name': '',
                                    'value': '',
                                    'masterTypeId': '',
                                    'active': ''
                                });
                            } else {
                                this.alertS.open(res.message, 'error');
                            }
                        }, err => {
                            this.alertS.open(err.message, 'error');
                        });
                    } else {
                        this.alertS.open('Error al actualizar el listado maestro!', 'error');
                    }
                } else {
                    this.alertS.open(res.message, 'error');
                }
            }, err => {
                this.alertS.open(err.message, 'error');
            });
        }
    }
    edit(id: number, name: string, value: string, masterTypeId: number, active: boolean) {
        this.editing = id;
        this.form.setValue(
            {
                'id': id,
                'name': name,
                'value': value,
                'masterTypeId': masterTypeId,
                'active': active
            }
        );
    }
    delete(id: number) {
        this.dialog.open(ConfirmationComponent,{
            data:{message:'¿ Desea eliminar el listado?'},
            height:'250px',
            width:'400px'
        }).afterClosed().subscribe(res => {
            if (res) {
                this.pqrMasterS.delete(id).subscribe(resD => {
                    if (resD.message === 'OK') {
                        if (resD.object != 0) {
                            this.alertS.open('Listado eliminado!', 'success');
                            this.loading = true;
                            this.pqrMasterS.list(Number(this.countryId)).subscribe(res => {
                                if (res.message === 'OK') {
                                    this.loading = false;
                                    this.dataSource = new MatTableDataSource<any>(res.object);
                                    this.dataSource.paginator = this.paginator;
                                    this.dataSource.sort = this.sort;
                                    this.form.setValue({
                                        'id': '',
                                        'name': '',
                                        'value': '',
                                        'masterTypeId': '',
                                        'active': ''
                                    });
                                } else {
                                    this.alertS.open(res.message, 'error');
                                }
                            }, err => {
                                this.alertS.open(err.message, 'error');
                            });
                        } else {
                            this.alertS.open('Error al eliminar el listado!', 'error');
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
                'name': '',
                'value': '',
                'masterTypeId': '',
                'active': ''
            }
        );
    }
}