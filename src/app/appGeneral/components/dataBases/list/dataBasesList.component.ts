import { Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTable, MatTableDataSource } from "@angular/material/table";
import { AlertService } from 'src/app/shared/services/alert.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationComponent } from 'src/app/shared/components/confirmation/confirmation.component';
import { ConnectioGeneralService } from "src/app/appGeneral/services/genDataBases.service";
import { ConnectionGeneralLogService } from "src/app/appGeneral/services/genDataBasesLog.service";
import { DataBasesEditComponent } from "../edit/dataBasesEdit.component";
import { ObservationsGenModal } from "src/app/appGeneral/modals/observations/observations.modal";
import { GenPersonEntity } from "src/app/appGeneral/entities/genPerson.entity";
import { Router } from "@angular/router";
import { PasswordModal } from "src/app/appGeneral/modals/password/password.modal";

@Component({
    selector: 'app-dataBasesList',
    templateUrl: './dataBasesList.component.html',
    styleUrls: ['./dataBasesList.component.css']
})

export class DataBasesListComponent implements OnInit {

    loading: boolean;
    columns: string[];
    id: number;
    dataSource = new MatTableDataSource<any>();
    @ViewChild(MatTable) table: MatTable<any>;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    unibytes: Uint8Array = null;
    form: any;
    genPersonEntity: GenPersonEntity;
    observation: string;
    constructor( private route: Router,private ConnectioGeneralS: ConnectioGeneralService, private ConnectionGeneralLogS: ConnectionGeneralLogService, private dialog: MatDialog, private alertS: AlertService) {
        this.loading = false;
        this.columns = [ 'country','customer','driver', 'url', 'name', 'password', 'active', 'Acciones'];
        this.dataSource = new MatTableDataSource([]);
        this.observation = '';
    }

    ngOnInit(): void {
        this.loading = true,
        this.search();
        this.genPersonEntity = JSON.parse(localStorage.getItem('user'));
    }

    search() {
        this.ConnectioGeneralS.list().subscribe(res => {
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
    edit(value: number) {
        const dialogRef = this.dialog.open(DataBasesEditComponent, {
            data: { formId: value }
        });
        dialogRef.afterClosed().subscribe(resA => {
            this.ConnectioGeneralS.list().subscribe(resL => {
                if (resL.message === 'OK') {
                    this.loading = false;
                    this.dataSource = new MatTableDataSource<any>(resL.object);
                    this.dataSource.paginator = this.paginator;
                    this.dataSource.sort = this.sort;
                } else {
                    this.alertS.open(resL.message, 'error');
                }
            }, err => {
                this.alertS.open(err.message, 'error');
            });
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

    delete(id: number, customer: string, url: string) {
        this.dialog.open(ConfirmationComponent, {
            data: { message: '¿ Desea eliminar el registro ?' },
            height: '250px',
            width: '400px'
        }).afterClosed().subscribe(res => {
            if (res) {
                this.dialog.open(ObservationsGenModal).afterClosed().subscribe(resO => {
                    console.log(resO);
                    if (resO != '') {
                        this.observation = resO;
                        this.ConnectionGeneralLogS.create(this.genPersonEntity.id, this.observation, customer, url).subscribe(resC => {
                            if (resC.message === 'OK') {
                                if (res.object != 0) {
                                    this.ConnectioGeneralS.delete(id).subscribe(res => {
                                        if (res.message === 'OK') {
                                            if (res.object != 0) {
                                                this.alertS.open('Registro eliminado!', 'success');
                                                this.ConnectioGeneralS.list().subscribe(res => {
                                                    this.loading = false;
                                                    this.dataSource = new MatTableDataSource<any>(res.object);
                                                    this.dataSource.paginator = this.paginator;
                                                    this.dataSource.sort = this.sort;
                                                }, err => {
                                                    this.alertS.open(err, 'error');
                                                });
                                            } else {
                                                this.alertS.open(res.message, 'error');
                                            }
                                        } else {
                                            this.alertS.open(res.message, 'error');
                                        }
                                    }, err => {
                                        this.alertS.open(err.message, 'error');
                                    });

                                } else {
                                    this.alertS.open(resC.message, 'error');
                                }
                            } else {
                                this.alertS.open(resC.message, 'error');
                            }

                        }, err => {
                            this.alertS.open(err, 'error');
                        });
                    }
                }, err => {
                    this.alertS.open(err.message, 'error');
                });
            }
        }, err => {
            this.alertS.open(err.message, 'error');
        });
    }




}