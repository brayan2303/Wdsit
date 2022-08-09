import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { GenCustomerEntity } from 'src/app/appGeneral/entities/genCustomer.entity';
import { GenCountryCustomerService } from 'src/app/appGeneral/services/genCountryCustomer.service';
import { InvCoutingEntity } from 'src/app/appInventory/entities/invCouting.entity';
import { InvCyclicEntity } from 'src/app/appInventory/entities/invCyclic.entity';
import { InvPalletEntity } from 'src/app/appInventory/entities/invPallet.entity';
import { InvCoutingService } from 'src/app/appInventory/services/invCouting.service';
import { InvCyclicService } from 'src/app/appInventory/services/invCyclic.service';
import { InvPalletService } from 'src/app/appInventory/services/invPallet.service';
import { InvSerialService } from 'src/app/appInventory/services/invSerial.service';
import { ConfirmationComponent } from 'src/app/shared/components/confirmation/confirmation.component';
import { AlertService } from 'src/app/shared/services/alert.service';

@Component({
    selector: 'app-invAuditCouting',
    templateUrl: './invAuditCouting.component.html',
    styleUrls: ['./invAuditCouting.component.css']
})
export class InvAuditCoutingComponent implements OnInit {
    loadingCouting: boolean;
    loadingSerials: boolean;
    columnsCouting: string[];
    columnsSerials1: string[];
    columnsSerials2: string[];
    dataSourceCouting = new MatTableDataSource<any>();
    dataSourceSerials = new MatTableDataSource<any>();
    @ViewChild('paginatorCouting') paginatorCouting: MatPaginator;
    @ViewChild('paginatorSerials') paginatorSerials: MatPaginator;
    coutingId: number;
    pallet: string;
    number: string;
    coutingType: string;
    type: String;
    customer: string;
    cyclicId: number;
    customerList: GenCustomerEntity[];
    cyclicList: InvCyclicEntity[];
    palletEntity: InvPalletEntity;

    constructor(private genCountryCustomerS: GenCountryCustomerService, private invCyclicS: InvCyclicService, private invCoutingS: InvCoutingService, private invSerialS: InvSerialService, private invPalletS: InvPalletService, private dialog: MatDialog, private alertS: AlertService) {
        this.loadingCouting = false;
        this.loadingSerials = false;
        this.columnsCouting = ['coutingType', 'sampling', 'total','quantity', 'status', 'type', 'creationDate', 'startDate', 'endDate', 'assistant', 'card', 'creationUser', 'actions'];
        this.columnsSerials1 = ['serial', 'mac', 'sapCode', 'sapCodeSap', 'sapCodeWms', 'sapCodeBase', 'status', 'statusSap', 'statusWms', 'statusBase', 'pallet', 'palletSap', 'palletWms', 'creationDate', 'creationUser'];
        this.columnsSerials2 = ['quantity', 'creationDate'];
        this.dataSourceCouting = new MatTableDataSource([]);
        this.dataSourceSerials = new MatTableDataSource<any>();
        this.coutingId = 0;
        this.pallet = '';
        this.customer = '0';
        this.cyclicId = 0;
        this.customerList = [];
        this.cyclicList = [];
    }

    ngOnInit() {
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
    search(event) {
        if (event.type === 'click' || event.key === 'Enter') {
            if (this.pallet != '') {
                this.invPalletS.find(this.cyclicId, this.pallet).subscribe(resF => {
                    if (resF.message === 'OK') {
                        if (resF.object != null) {
                            this.palletEntity = resF.object;
                            this.loadingCouting = true;
                            this.invCoutingS.findAll(this.customer.split('_', 2)[1], this.palletEntity.id).subscribe(res => {
                                if (res.message === 'OK') {
                                    this.dataSourceCouting = new MatTableDataSource(res.object);
                                    this.dataSourceCouting.paginator = this.paginatorCouting;
                                    this.loadingCouting = false;
                                } else {
                                    this.alertS.open(res.message, 'error');
                                }
                            }, err => {
                                this.alertS.open(err.message, 'error');
                            });
                        } else {
                            this.alertS.open('Pallet no encontrado!', 'warning');
                        }
                    } else {
                        this.alertS.open(resF.message, 'error');
                    }
                }, err => {
                    this.alertS.open(err.message, 'error');
                });
            } else {
                this.alertS.open('Ingrese un pallet!', 'warning');
            }
        }
    }
    getCyclic() {
        this.invCyclicS.list(Number(this.customer.split('_', 2)[0]), 0, '0').subscribe(res => {
            if (res.message === 'OK') {
                this.cyclicList = res.object;
            } else {
                this.alertS.open(res.message, 'error');
            }
        }, err => {
            this.alertS.open(err.message, 'error');
        });
    }
    getSerials(id: number, coutingType: string, number: string, type: string) {
        this.number = number;
        this.coutingType = coutingType;
        this.type = type;
        this.loadingSerials = true;
        if (this.type === 'Serializar') {
            this.invSerialS.list(id, coutingType).subscribe(res => {
                if (res.message === 'OK') {
                    this.dataSourceSerials = new MatTableDataSource(res.object);
                    this.dataSourceSerials.paginator = this.paginatorSerials;
                    this.loadingSerials = false;
                } else {
                    this.alertS.open(res.message, 'error');
                }
            }, err => {
                this.alertS.open(err.message, 'error');
            });
        } else {
            this.invCoutingS.findQuantity(id).subscribe(res => {
                if (res.message === 'OK') {
                    this.dataSourceSerials = new MatTableDataSource(res.object);
                    this.dataSourceSerials.paginator = this.paginatorSerials;
                    this.loadingSerials = false;
                } else {
                    this.alertS.open(res.message, 'error');
                }
            }, err => {
                this.alertS.open(err.message, 'error');
            });
        }
    }
    print(i: InvCoutingEntity) {
        this.invCoutingS.print(this.customer.split('_', 2)[1], i).subscribe(resP => {
            if (resP.message === 'OK') {
                if (resP.object != 0) {
                    let downloadLink = document.createElement("a");
                    downloadLink.setAttribute("href", "data:application/pdf;base64," + resP.object);
                    downloadLink.setAttribute("download", i.pallet + '_' + i.coutingType + ".pdf");
                    downloadLink.style.visibility = "hidden";
                    document.body.appendChild(downloadLink);
                    downloadLink.click();
                    document.body.removeChild(downloadLink);
                } else {
                    this.alertS.open('Error al imprimir!', 'error');
                }
            } else {
                this.alertS.open(resP.message, 'error');
            }
        }, err => {
            this.alertS.open(err.message, 'error');
        });
    }
    close(id: number, sampling: number, total: number, status: string) {
        if (status === 'Terminado') {
            if (total < sampling) {
                this.dialog.open(ConfirmationComponent,{
                    data:{message:'El conteo esta por debajo del porcentaje de muestra, ¿Desea cerrarlo?'},
                    height:'250px',
                    width:'400px'
                }).afterClosed().subscribe(resA => {
                    if (resA) {
                        this.invCoutingS.openClose(id, 'Cerrado').subscribe(resAP => {
                            if (resAP.message === 'OK') {
                                if (resAP.object != 0) {
                                    this.alertS.open('Conteo cerrado!', 'success');
                                    this.loadingCouting = true;
                                    this.invCoutingS.findAll(this.customer.split('_', 2)[1], this.palletEntity.id).subscribe(res => {
                                        if (res.message === 'OK') {
                                            this.dataSourceCouting = new MatTableDataSource(res.object);
                                            this.dataSourceCouting.paginator = this.paginatorCouting;
                                            this.loadingCouting = false;
                                        } else {
                                            this.alertS.open(res.message, 'error');
                                        }
                                    }, err => {
                                        this.alertS.open(err.message, 'error');
                                    });
                                } else {
                                    this.alertS.open('Error al cerrar el conteo', 'error');
                                }
                            } else {
                                this.alertS.open(resAP.message, 'error');
                            }
                        }, err => {
                            this.alertS.open(err.message, 'error');
                        });
                    }
                });
            } else {
                this.invCoutingS.openClose(id, 'Cerrado').subscribe(resAP => {
                    if (resAP.message === 'OK') {
                        if (resAP.object != 0) {
                            this.alertS.open('Conteo cerrado!', 'success');
                            this.loadingCouting = true;
                            this.invCoutingS.findAll(this.customer.split('_', 2)[1], this.palletEntity.id).subscribe(res => {
                                if (res.message === 'OK') {
                                    this.dataSourceCouting = new MatTableDataSource(res.object);
                                    this.dataSourceCouting.paginator = this.paginatorCouting;
                                    this.loadingCouting = false;
                                } else {
                                    this.alertS.open(res.message, 'error');
                                }
                            }, err => {
                                this.alertS.open(err.message, 'error');
                            });
                        } else {
                            this.alertS.open('Error al cerrar el conteo', 'error');
                        }
                    } else {
                        this.alertS.open(resAP.message, 'error');
                    }
                }, err => {
                    this.alertS.open(err.message, 'error');
                });
            }
        } else {
            this.alertS.open('El conteo aun esta sin terminar!', 'warning');
        }
    }
    open(id: number) {
        this.invCoutingS.openClose(id, 'Pendiente').subscribe(resO => {
            if (resO.message === 'OK') {
                if (resO.object != 0) {
                    this.alertS.open('Conteo abierto!', 'success');
                    this.loadingCouting = true;
                    this.invCoutingS.findAll(this.customer.split('_', 2)[1], this.palletEntity.id).subscribe(res => {
                        if (res.message === 'OK') {
                            this.dataSourceCouting = new MatTableDataSource(res.object);
                            this.dataSourceCouting.paginator = this.paginatorCouting;
                            this.loadingCouting = false;
                        } else {
                            this.alertS.open(res.message, 'error');
                        }
                    }, err => {
                        this.alertS.open(err.message, 'error');
                    });
                } else {
                    this.alertS.open('Error al abrir el conteo!', 'error');
                }
            } else {
                this.alertS.open(resO.message, 'error');
            }
        }, err => {
            this.alertS.open(err.message, 'error');
        });
    }
    download() {
        if (this.dataSourceSerials.data.length > 0) {
            let delimiter = "\\";
            let headers = '';
            let file = '';
            for (let i = 0; i < (this.type === 'Serializar' ? this.columnsSerials1.length : this.columnsSerials2.length); i++) {
                headers = headers + (this.type === 'Serializar' ? this.columnsSerials1[i] : this.columnsSerials2[i]);
                if (i < (this.type === 'Serializar' ? this.columnsSerials1.length-1 : this.columnsSerials2.length-1)) {
                    headers = headers + delimiter;
                }
            }
            file = headers;
            for (let i = 0; i < this.dataSourceSerials.data.length; i++) {
                file = file + "\n";
                for (let j = 0; j < (this.type === 'Serializar' ? this.columnsSerials1.length : this.columnsSerials2.length); j++) {
                    file = file + this.dataSourceSerials.data[i][(this.type === 'Serializar' ? this.columnsSerials1[j] : this.columnsSerials2[j])];
                    if (j < (this.type === 'Serializar' ? this.columnsSerials1.length-1 : this.columnsSerials2.length-1)) {
                        file = file + delimiter;
                    }
                }
            }
            let blob = new Blob(['\ufeff' + file], { type: 'text/csv;charset=utf-8;' });
            let url = URL.createObjectURL(blob);
            let downloadLink = document.createElement("a");
            downloadLink.setAttribute("href", url);
            downloadLink.setAttribute("download", this.number + '_' + this.coutingType + ".csv");
            downloadLink.style.visibility = "hidden";
            document.body.appendChild(downloadLink);
            downloadLink.click();
            document.body.removeChild(downloadLink);
        } else {
            this.alertS.open('No hay registros para descargar!', 'warning');
        }
    }
}