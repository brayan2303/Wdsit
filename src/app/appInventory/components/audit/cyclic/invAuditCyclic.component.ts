import { MatTableDataSource } from '@angular/material/table';
import { ViewChild, Component, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { AlertService } from 'src/app/shared/services/alert.service';
import { InvCyclicService } from 'src/app/appInventory/services/invCyclic.service';
import { GenPersonEntity } from 'src/app/appGeneral/entities/genPerson.entity';
import { CyclicLocationModal } from 'src/app/appInventory/modals/cyclicLocation/cyclicLocation.modal';
import { InvPalletService } from 'src/app/appInventory/services/invPallet.service';
import { GenCustomerEntity } from 'src/app/appGeneral/entities/genCustomer.entity';
import { GenCountryCustomerService } from 'src/app/appGeneral/services/genCountryCustomer.service';

@Component({
    selector: 'app-invAuditCyclic',
    templateUrl: './invAuditCyclic.component.html',
    styleUrls: ['./invAuditCyclic.component.css']
})
export class InvAuditCyclicComponent implements OnInit {
    loading: boolean;
    loadingPallet: boolean;
    columns: string[];
    columnsPallet: string[];
    dataSource = new MatTableDataSource<any>();
    dataSourcePallet = new MatTableDataSource<any>();
    @ViewChild('paginatorCyclic') paginatorCyclic: MatPaginator;
    @ViewChild('paginatorPallet') paginatorPallet: MatPaginator;
    genPersonEntity: GenPersonEntity;
    customerId: number;
    customerList: GenCustomerEntity[];
    cyclicId: number;
    system: string;
    customer: string;

    constructor(private invCyclicS: InvCyclicService, private genCountryCustomerS: GenCountryCustomerService, private invPalletS: InvPalletService, private dialog: MatDialog, private alertS: AlertService) {
        this.loading = false;
        this.loadingPallet = false;
        this.columns = ['name', 'system', 'typeSampling', 'sampling', 'total', 'creationDate', 'crossCustomer', 'crossWms', 'status', 'customer', 'actions'];
        this.columnsPallet = ['number', 'sapCode', 'location', 'type', 'status', 'quantity', 'actionsPallet'];
        this.dataSource = new MatTableDataSource([]);
        this.dataSourcePallet = new MatTableDataSource([]);
        this.customerId = 0;
        this.customerList = [];
    }

    ngOnInit(): void {
        this.genPersonEntity = (JSON.parse(localStorage.getItem('user')));
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
        this.loading = true;
        this.invCyclicS.list(this.customerId, this.genPersonEntity.id, 'Auditor').subscribe(res => {
            if (res.message === 'OK') {
                this.loading = false;
                this.dataSource = new MatTableDataSource<any>(res.object);
                this.dataSource.paginator = this.paginatorCyclic;
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
    getPallet(cyclicId: number, system: string, typeSampling: string, customer: string, status: string) {
        if (status === 'Pendiente') {
            this.dialog.open(CyclicLocationModal, {
                data: { cyclicId: cyclicId, system: system, typeSampling: typeSampling, customer: customer },
                width: '800px',
            });
        } else {
            this.alertS.open('El ciclico ya fue ' + status + ', no se pueden agregar mas pallets!', 'warning');
        }
    }
    getAllPallet(cyclicId: number, system: string, customer: string) {
        this.loadingPallet = true;
        this.cyclicId = cyclicId;
        this.system = system;
        this.customer = customer;
        this.invPalletS.list(cyclicId, system, 'Todos', customer).subscribe(res => {
            if (res.message === 'OK') {
                this.dataSourcePallet = new MatTableDataSource<any>(res.object);
                this.dataSourcePallet.paginator = this.paginatorPallet;
                this.loadingPallet = false;
            } else {
                this.alertS.open(res.message, 'error');
            }
        }, err => {
            this.alertS.open(err.message, 'error');
        });
    }
    finish(cyclicId: number, status: string) {
        if (status === 'Pendiente') {
            this.invPalletS.findPending(cyclicId).subscribe(resF => {
                if (resF.message === 'OK') {
                    if (resF.object === 0) {
                        this.invCyclicS.approveReject(cyclicId, 'Terminado').subscribe(resA => {
                            if (resA.message === 'OK') {
                                if (resA.object != 0) {
                                    this.alertS.open('Ciclico terminado!', 'success');
                                    this.loading = true;
                                    this.invCyclicS.list(this.customerId, this.genPersonEntity.id, 'Auditor').subscribe(resL => {
                                        if (resL.message === 'OK') {
                                            this.loading = false;
                                            this.dataSource = new MatTableDataSource<any>(resL.object);
                                            this.dataSource.paginator = this.paginatorCyclic;
                                        } else {
                                            this.alertS.open(resL.message, 'error');
                                        }
                                    }, err => {
                                        this.alertS.open(err.message, 'error');
                                    });
                                } else {
                                    this.alertS.open('Error al terminar el ciclico!', 'error');
                                }
                            } else {
                                this.alertS.open(resA.message, 'error');
                            }
                        }, err => {
                            this.alertS.open(err.message, 'error');
                        });
                    } else {
                        this.alertS.open('El ciclico tiene pallets pendientes por auditar!', 'warning');
                    }
                } else {
                    this.alertS.open(resF.message, 'error');
                }
            }, err => {
                this.alertS.open(err.message, 'error');
            });
        } else {
            this.alertS.open('El ciclico ya fue ' + status + '!', 'warning');
        }
    }
    download(number: string, type: string) {
        var columnSerials: string[] = ['serial', 'mac', 'sapCode', 'pallet'];
        this.invPalletS.findSerials(this.cyclicId, this.system, type, number, this.customer, 0).subscribe(res => {
            if (res.message === 'OK') {
                var data = new MatTableDataSource<any>(res.object);
                if (data.data.length > 0) {
                    let delimiter = "\\";
                    let headers = '';
                    let file = '';
                    for (let i = 0; i < columnSerials.length; i++) {
                        headers = headers + columnSerials[i];
                        if (i < columnSerials.length - 1) {
                            headers = headers + delimiter;
                        }
                    }
                    file = headers;
                    for (let i = 0; i < data.data.length; i++) {
                        file = file + "\n";
                        for (let j = 0; j < columnSerials.length; j++) {
                            file = file + data.data[i][columnSerials[j]];
                            if (j < columnSerials.length - 1) {
                                file = file + delimiter;
                            }
                        }
                    }
                    let blob = new Blob(['\ufeff' + file], { type: 'text/csv;charset=utf-8;' });
                    let url = URL.createObjectURL(blob);
                    let downloadLink = document.createElement("a");
                    downloadLink.setAttribute("href", url);
                    downloadLink.setAttribute("download", number + ".csv");
                    downloadLink.style.visibility = "hidden";
                    document.body.appendChild(downloadLink);
                    downloadLink.click();
                    document.body.removeChild(downloadLink);
                } else {
                    this.alertS.open('No hay registros para descargar!', 'warning');
                }
            } else {
                this.alertS.open(res.message, 'error');
            }
        }, err => {
            this.alertS.open(err.message, 'error');
        });
    }
}