import { Component, OnInit, ViewChild } from "@angular/core";
import { AlertService } from 'src/app/shared/services/alert.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ConfirmationComponent } from 'src/app/shared/components/confirmation/confirmation.component';
import { ProListService } from "src/app/appProcess/services/ProList.service";
import { ProListTypeService } from "src/app/appProcess/services/proListType.service";
import { ProListTypeEntity } from "src/app/appProcess/entities/ProListType.entity";
import { ProListEntity } from "src/app/appProcess/entities/proList.entity";

@Component({
    selector: 'app-proAdministrationList',
    templateUrl: './proAdministrationList.component.html',
    styleUrls: ['./proAdministrationList.component.css']
})
export class ProAdministrationListComponent implements OnInit {
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
        listTypeId: new FormControl('', Validators.required),
        active: new FormControl('')
    });
    listTypeList: ProListTypeEntity[];

    constructor(private proListS: ProListService, private proListTypeS: ProListTypeService, public dialog: MatDialog, private alertS: AlertService) {
        this.loading = false;
        this.editing = 0;
        this.columns = ['id', 'code', 'name', 'listType', 'active', 'Acciones'];
        this.dataSource = new MatTableDataSource([]);
        this.listTypeList = [];
    }
    ngOnInit(): void {
        this.loading = true;
        this.proListS.list().subscribe(res => {
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
        this.proListTypeS.list().subscribe(res => {
            if (res.message === 'OK') {
                this.listTypeList = res.object;
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
            this.proListS.create(this.form.value).subscribe(res => {
                if (res.message === 'OK') {
                    if (res.object != 0) {
                        this.alertS.open('Listado creado!', 'success');
                        this.loading = true;
                        this.proListS.list().subscribe(res => {
                            if (res.message === 'OK') {
                                this.loading = false;
                                this.dataSource = new MatTableDataSource<any>(res.object);
                                this.dataSource.paginator = this.paginator;
                                this.dataSource.sort = this.sort;
                                this.form.setValue({
                                    'id': '',
                                    'code': '',
                                    'name': '',
                                    'listTypeId': '',
                                    'active': ''
                                });
                            } else {
                                this.alertS.open(res.message, 'error');
                            }
                        }, err => {
                            this.alertS.open(err.message, 'error');
                        });
                    } else {
                        this.alertS.open('Error al crear el listado!', 'error');
                    }
                } else {
                    this.alertS.open(res.message, 'error');
                }
            }, err => {
                this.alertS.open(err.message, 'error');
            });
        } else {
            this.proListS.update(this.form.value).subscribe(res => {
                if (res.message === 'OK') {
                    if (res.object != 0) {
                        this.alertS.open('Listado actualizado!', 'success');
                        this.loading = true;
                        this.proListS.list().subscribe(res => {
                            if (res.message === 'OK') {
                                this.loading = false;
                                this.dataSource = new MatTableDataSource<any>(res.object);
                                this.dataSource.paginator = this.paginator;
                                this.dataSource.sort = this.sort;
                                this.form.setValue({
                                    'id': '',
                                    'code': '',
                                    'name': '',
                                    'listTypeId': '',
                                    'active': ''
                                });
                                this.editing=0;
                            } else {
                                this.alertS.open(res.message, 'error');
                            }
                        }, err => {
                            this.alertS.open(err.message, 'error');
                        });
                    } else {
                        this.alertS.open('Error al actualizar el listado!', 'error');
                    }
                } else {
                    this.alertS.open(res.message, 'error');
                }
            }, err => {
                this.alertS.open(err.message, 'error');
            });
        }
    }
    edit(item: ProListEntity) {
        this.editing = item.id;
        this.form.setValue(
            {
                'id': item.id,
                'code': item.code,
                'name': item.name,
                'listTypeId': item.listTypeId,
                'active': item.active
            }
        );
    }
    delete(id: number) {
        this.dialog.open(ConfirmationComponent,{
            data:{message:'¿Desea eliminar el listado?'},
            height:'250px',
            width:'400px'
        }).afterClosed().subscribe(res => {
            if (res) {
                this.proListS.delete(id).subscribe(resD => {
                    if (resD.message === 'OK') {
                        if (resD.object != 0) {
                            this.alertS.open('Listado eliminado!', 'success');
                            this.loading = true;
                            this.proListS.list().subscribe(res => {
                                if (res.message === 'OK') {
                                    this.loading = false;
                                    this.dataSource = new MatTableDataSource<any>(res.object);
                                    this.dataSource.paginator = this.paginator;
                                    this.dataSource.sort = this.sort;
                                    this.form.setValue({
                                        'id': '',
                                        'code': '',
                                        'name': '',
                                        'listTypeId': '',
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
                'code': '',
                'name': '',
                'listTypeId': '',
                'active': ''
            }
        );
    }
}