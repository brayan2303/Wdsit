import { Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTable, MatTableDataSource } from "@angular/material/table";
import { AlertService } from 'src/app/shared/services/alert.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationComponent } from 'src/app/shared/components/confirmation/confirmation.component';
import { ReceptionHomeService } from "src/app/appReception/services/receptionHome.service";
import { ReceptionEditComponent } from "../edit/receptionEdit.component";
import { ReceptionLogService } from "src/app/appReception/services/receptionLog.service";
import { GenPersonEntity } from "src/app/appGeneral/entities/genPerson.entity";

@Component({
    selector: 'app-receptionList',
    templateUrl: './receptionList.component.html',
    styleUrls: ['./receptionList.component.css']
})

export class ReceptionListComponent implements OnInit {

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
    constructor(private receptionHomeS: ReceptionHomeService, private dialog: MatDialog, private alertS: AlertService, private ReceptionLogS: ReceptionLogService) {
        this.loading = false;
        this.columns = ['typeDocument', 'identification', 'name', 'lastName', 'phone', 'email', 'entity', 'eps', 'arl', 'visit', 'license', 'typeVisit', 'team', 'brand', 'serial', 'Acciones'];
        this.dataSource = new MatTableDataSource([]);
    }

    ngOnInit(): void {
        this.loading = true,
            this.search();
        this.genPersonEntity = JSON.parse(localStorage.getItem('user'));
    }

    search() {
        this.receptionHomeS.list().subscribe(res => {
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
        const dialogRef = this.dialog.open(ReceptionEditComponent, {
            data: { formId: value }
        });
        dialogRef.afterClosed().subscribe(resA => {
            this.receptionHomeS.list().subscribe(resL => {
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

    delete(value: number) {
        this.dialog.open(ConfirmationComponent, {
            data: { message: '¿ Desea eliminar el registro ?' },
            height: '250px',
            width: '400px'
        }).afterClosed().subscribe(res => {
            if (res) {
                this.receptionHomeS.delete(value).subscribe(res => {
                    if (res.message === 'OK') {
                        if (res.object != 0) {
                            this.alertS.open('Registro eliminado!', 'success');
                            this.ReceptionLogS.create(this.genPersonEntity.id).subscribe(resC => {
                                if (resC.message === 'OK') {
                                    if (resC.object != 0){
                                        this.receptionHomeS.list().subscribe(res => {
                                            this.loading = false;
                                            this.dataSource = new MatTableDataSource<any>(res.object);
                                            this.dataSource.paginator = this.paginator;
                                            this.dataSource.sort = this.sort;
                                        }, err => {
                                            this.alertS.open(err, 'error');
                                        });
                                    }else{
                                        this.alertS.open(res.message, 'error');
                                    }
                                } else {
                                    this.alertS.open(res.message, 'error');
                                }
                            }, err => {
                                this.alertS.open(err.message, 'error');
                            })
                        } else {
                            this.alertS.open(res.message, 'error');
                        }
                    } else {
                        this.alertS.open(res.message, 'error');
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