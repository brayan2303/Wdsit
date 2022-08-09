import { MatTableDataSource, MatTable } from '@angular/material/table';
import { ViewChild, Component, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { AlertService } from 'src/app/shared/services/alert.service';
import { InvCyclicService } from 'src/app/appInventory/services/invCyclic.service';
import { InvCyclicEntity } from 'src/app/appInventory/entities/invCyclic.entity';
import { InvPalletService } from 'src/app/appInventory/services/invPallet.service';
import { GenCustomerEntity } from 'src/app/appGeneral/entities/genCustomer.entity';
import { GenCountryCustomerService } from 'src/app/appGeneral/services/genCountryCustomer.service';
import { MatDialog } from '@angular/material/dialog';
import { PalletCoutingModal } from 'src/app/appInventory/modals/palletCouting/palletCouting.modal';
import { InvPalletModel } from 'src/app/appInventory/models/invPallet.model';

@Component({
    selector: 'app-invControlTablePallet',
    templateUrl: './invControlTablePallet.component.html',
    styleUrls: ['./invControlTablePallet.component.css']
})
export class InvControlTablePalletComponent implements OnInit {
    loading: boolean;
    customerId: number;
    cyclicId: number;
    columns: string[];
    dataSource = new MatTableDataSource<any>();
    @ViewChild(MatTable) table: MatTable<any>;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    customerList: GenCustomerEntity[];
    cyclicList: InvCyclicEntity[];
    invCyclicEntity: InvCyclicEntity;

    constructor(private invCyclicS: InvCyclicService, private genCountryCustomerS: GenCountryCustomerService, private invPalletS: InvPalletService, private dialog: MatDialog, private alertS: AlertService) {
        this.loading = false;
        this.customerId = 0;
        this.cyclicId = 0;
        this.columns = ['number', 'location', 'quantity', 'couting1', 'couting2', 'couting3','couting4', 'status', 'actions'];
        this.dataSource = new MatTableDataSource([]);
        this.customerList = [];
        this.cyclicList = [];
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
    getCyclic() {
        this.dataSource = new MatTableDataSource([]);
        this.dataSource.paginator = this.paginator;
        this.cyclicId=0;
        this.invCyclicS.list(this.customerId, 0, '0').subscribe(res => {
            if (res.message === 'OK') {
                this.cyclicList = res.object;
            } else {
                this.alertS.open(res.message, 'error');
            }
        }, err => {
            this.alertS.open(err.message, 'error');
        });
    }
    search() {
        if (this.cyclicId != 0) {
            this.loading = true;
            this.invCyclicS.findById(this.cyclicId).subscribe(resF => {
                if (resF.message === 'OK') {
                    this.invCyclicEntity = resF.object;
                    this.invPalletS.listAll(this.cyclicId, this.invCyclicEntity.system, resF.object.customer).subscribe(resL => {
                        if (resL.message === 'OK') {
                            this.loading = false;
                            this.dataSource = new MatTableDataSource<any>(resL.object);
                            this.dataSource.paginator = this.paginator;
                        } else {
                            this.alertS.open(resL.message, 'error');
                        }
                    }, err => {
                        this.alertS.open(err.message, 'error');
                    });
                } else {
                    this.alertS.open(resF.message, 'error');
                }
            }, err => {
                this.alertS.open(err.message, 'error');
            });
        } else {
            this.alertS.open('Seleccione un ciclico!', 'warning');
        }
    }
    approveReject(p: InvPalletModel, status: string) {
        this.invPalletS.approveReject(p.id, status).subscribe(res => {
            if (res.message === 'OK') {
                if (res.object != 0) {
                    this.invPalletS.print(this.invCyclicEntity.customer,status, p).subscribe(resP => {
                        if (resP.message === 'OK') {
                            if (resP.object != 0) {
                                this.alertS.open(status === 'Aprobado' ? 'Pallet aprobado!' : 'Pallet rechazado!', 'success');
                                let downloadLink = document.createElement("a");
                                downloadLink.setAttribute("href", "data:application/pdf;base64,"+resP.object);
                                downloadLink.setAttribute("download", p.number + ".pdf");
                                downloadLink.style.visibility = "hidden";
                                document.body.appendChild(downloadLink);
                                downloadLink.click();
                                document.body.removeChild(downloadLink);
                                this.search();
                            } else {
                                this.alertS.open('Error al imprimir!', 'error');
                            }
                        } else {
                            this.alertS.open(resP.message, 'error');
                        }
                    }, err => {
                        this.alertS.open(err.message, 'error');
                    });
                    this.search();
                } else {
                    this.alertS.open(status === 'Aprobado' ? 'Error al aprobar el pallet!' : 'Error al rechazar el pallet!', 'error');
                }
            } else {
                this.alertS.open(res.message, 'error');
            }
        }, err => {
            this.alertS.open(err.message, 'error');
        });
    }
    open(id: number) {
        this.invPalletS.approveReject(id, 'Pendiente').subscribe(resA => {
            if (resA.message === 'OK') {
                if (resA.object != 0) {
                    this.alertS.open('Pallet abierto!', 'success');
                    this.search();
                } else {
                    this.alertS.open('Error al abrir el pallet!', 'error');
                }
            } else {
                this.alertS.open(resA.message, 'error');
            }
        }, err => {
            this.alertS.open(err.message, 'error');
        });
    }
    getCouting(palletId: number) {
        var coutingDialog = this.dialog.open(PalletCoutingModal, {
            data: { palletId: palletId },
            width: '100%'
        });
        coutingDialog.afterClosed().subscribe(resA => {
            if (resA) {
                this.search();
            }
        });
    }
}