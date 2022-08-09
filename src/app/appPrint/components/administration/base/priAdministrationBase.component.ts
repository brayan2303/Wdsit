import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { GenCustomerEntity } from 'src/app/appGeneral/entities/genCustomer.entity';
import { GenCountryCustomerService } from 'src/app/appGeneral/services/genCountryCustomer.service';
import { PriBaseService } from 'src/app/appPrint/services/priBase.service';
import { ConfirmationComponent } from 'src/app/shared/components/confirmation/confirmation.component';
import { AlertService } from 'src/app/shared/services/alert.service';

@Component({
    selector: 'app-priAdministrationBase',
    templateUrl: './priAdministrationBase.component.html',
    styleUrls: ['./priAdministrationBase.component.css']
})
export class PriAdministrationBaseComponent implements OnInit {
    loading: boolean;
    customer: string;
    customerList: GenCustomerEntity[];
    columns: string[];
    dataSource = new MatTableDataSource<any>();
    @ViewChild(MatTable) table: MatTable<any>;
    @ViewChild(MatPaginator) paginator: MatPaginator;

    constructor(private genCountryCustomerS: GenCountryCustomerService, private priBaseS: PriBaseService, private dialog: MatDialog, private alertS: AlertService) {
        this.loading = false;
        this.customer = '0';
        this.customerList = [];
        this.columns = ['serial', 'status'];
        this.dataSource = new MatTableDataSource([]);
    }

    ngOnInit(): void {
        this.genCountryCustomerS.listCustomer(Number(localStorage.getItem('countryId'))).subscribe(res => {
            if (res.message === 'OK') {
                this.customerList = res.object;
            } else {
                this.alertS.open(res.message, 'error');
            }
        }, err => {
            this.alertS.open(err.message, 'error');
        });
    }
    getRecords() {
        this.loading = true;
        this.priBaseS.list(this.customer).subscribe(res => {
            if (res.message === 'OK') {
                this.dataSource = new MatTableDataSource<any>(res.object);
                this.dataSource.paginator = this.paginator;
                this.loading = false;
            } else {
                this.alertS.open(res.message, 'error');
            }
        }, err => {
            this.alertS.open(err.message, 'error');
        });
    }
    loadFile(file: FileList) {
        if (this.customer != '0') {
            this.priBaseS.create(this.customer, file[0]).subscribe(resC => {
                if (resC.message === 'OK') {
                    if (resC.object != 0) {
                        this.alertS.open('Registros cargados!', 'success');
                        this.loading = true;
                        this.priBaseS.list(this.customer).subscribe(res => {
                            if (res.message === 'OK') {
                                this.dataSource = new MatTableDataSource<any>(res.object);
                                this.dataSource.paginator = this.paginator;
                                this.loading = false;
                            } else {
                                this.alertS.open(res.message, 'error');
                            }
                        }, err => {
                            this.alertS.open(err.message, 'error');
                        });
                    } else {
                        this.alertS.open('Error al cargar los registros!', 'error');
                    }
                } else {
                    this.alertS.open(resC.message, 'error');
                }
            }, err => {
                this.alertS.open(err.message, 'error');
            });
        } else {
            this.alertS.open('Seleccione un cliente!', 'warning');
        }
    }
    deleteRecords() {
        if (this.dataSource.data.length > 0) {
            this.dialog.open(ConfirmationComponent,{
                data:{message:'¿ Esta seguro de eliminar los ' + this.dataSource.data.length + ' registros?'},
                height:'250px',
                width:'400px'
            }).afterClosed().subscribe(resA => {
                if (resA) {
                    this.priBaseS.delete(this.customer).subscribe(resD => {
                        if (resD.message === 'OK') {
                            if (resD.object != 0) {
                                this.alertS.open('Registros eliminados!', 'success');
                                this.loading = true;
                                this.priBaseS.list(this.customer).subscribe(res => {
                                    if (res.message === 'OK') {
                                        this.dataSource = new MatTableDataSource<any>(res.object);
                                        this.dataSource.paginator = this.paginator;
                                        this.loading = false;
                                    } else {
                                        this.alertS.open(res.message, 'error');
                                    }
                                }, err => {
                                    this.alertS.open(err.message, 'error');
                                });
                            } else {
                                this.alertS.open('Error al eliminar los registros!', 'error');
                            }
                        } else {
                            this.alertS.open(resD.message, 'error');
                        }
                    }, err => {
                        this.alertS.open(err.message, 'error');
                    });
                }
            });
        }
    }
}