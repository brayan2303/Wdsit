import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { GenCustomerEntity } from 'src/app/appGeneral/entities/genCustomer.entity';
import { GenCountryCustomerService } from 'src/app/appGeneral/services/genCountryCustomer.service';
import { InvCyclicEntity } from 'src/app/appInventory/entities/invCyclic.entity';
import { CyclicCoutingModal } from 'src/app/appInventory/modals/cyclicCouting/cyclicCouting.modal';
import { CyclicPersonModal } from 'src/app/appInventory/modals/cyclicPerson/cyclicPerson.modal';
import { InvCoutingService } from 'src/app/appInventory/services/invCouting.service';
import { InvCyclicService } from 'src/app/appInventory/services/invCyclic.service';
import { InvPalletService } from 'src/app/appInventory/services/invPallet.service';
import { ConfirmationComponent } from 'src/app/shared/components/confirmation/confirmation.component';
import { AlertService } from 'src/app/shared/services/alert.service';

@Component({
    selector: 'app-invAuditPallet',
    templateUrl: './invAuditPallet.component.html',
    styleUrls: ['./invAuditPallet.component.css']
})
export class InvAuditPalletComponent implements OnInit {
    loadingPallet: boolean;
    loadingCouting: boolean;
    columnsPallet: string[];
    columnsCouting: string[];
    dataSourcePallet = new MatTableDataSource<any>();
    dataSourceCouting = new MatTableDataSource<any>();
    @ViewChild('paginatorPallet') paginatorPallet: MatPaginator;
    @ViewChild('paginatorCouting') paginatorCouting: MatPaginator;
    number: string;
    invCyclicEntity: InvCyclicEntity;
    customer: string;
    cyclicId: number;
    type: string;
    customerList: GenCustomerEntity[];
    cyclicList: InvCyclicEntity[];

    constructor(private genCountryCustomerS: GenCountryCustomerService, private invCyclicS: InvCyclicService, private invCoutingS: InvCoutingService, private invPalletS: InvPalletService, private dialog: MatDialog, private alertS: AlertService) {
        this.loadingPallet = false;
        this.loadingCouting = false;
        this.columnsPallet = ['number', 'type', 'sapCode', 'location', 'status', 'quantity', 'actions'];
        this.columnsCouting = ['coutingType', 'sampling', 'total','quantity', 'status', 'type', 'creationDate', 'startDate', 'endDate', 'assistant', 'card', 'creationUser', 'actions'];
        this.dataSourcePallet = new MatTableDataSource([]);
        this.dataSourceCouting = new MatTableDataSource([]);
        this.number = '';
        this.customer = '0';
        this.cyclicId = 0;
        this.type = '0';
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
    filter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSourcePallet.filter = filterValue.trim();
        if (this.dataSourcePallet.paginator) {
            this.dataSourcePallet.paginator.firstPage();
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
    selectCyclic() {
        this.invCyclicS.findById(this.cyclicId).subscribe(resF => {
            if (resF.message === 'OK') {
                this.invCyclicEntity = resF.object;
            } else {
                this.alertS.open(resF.message, 'error');
            }
        }, err => {
            this.alertS.open(err.message, 'error');
        });
    }
    getPallet() {
        this.loadingPallet = true;
        this.invPalletS.list(this.invCyclicEntity.id, this.invCyclicEntity.system, this.type, this.invCyclicEntity.customer).subscribe(res => {
            if (res.message === 'OK') {
                this.dataSourcePallet = new MatTableDataSource(res.object);
                this.dataSourcePallet.paginator = this.paginatorPallet;
                this.loadingPallet = false;
                this.dataSourcePallet.filter = this.number.trim();
                if (this.dataSourcePallet.paginator) {
                    this.dataSourcePallet.paginator.firstPage();
                }
            } else {
                this.alertS.open(res.message, 'error');
            }
        }, err => {
            this.alertS.open(err.message, 'error');
        });
    }
    getCouting(palletId: number) {
        this.loadingCouting = true;
        this.invCoutingS.findAll(this.customer.split('_', 2)[1], palletId).subscribe(res => {
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
    }
    createCouting(id: number, number: string, status: string) {
        if (status != 'Terminado') {
            this.dialog.open(CyclicCoutingModal, {
                data: { id: id, cyclicId: this.invCyclicEntity.id, cyclic: this.invCyclicEntity.name, customerId: this.invCyclicEntity.customerId, customer: this.invCyclicEntity.customer, number: number, type: this.type },
                width: '100%',
            });
        } else {
            this.alertS.open('El pallet tiene el estado Terminado, no se pueden crear mas conteos!', 'warning');
        }
    }
    finish(id: number, status: string) {
        if (status != 'Terminado') {
            this.invCoutingS.findPending(id).subscribe(resF => {
                if (resF.message === 'OK') {
                    if (resF.object === 0) {
                        this.invPalletS.approveReject(id, 'Terminado').subscribe(resA => {
                            if (resA.message === 'OK') {
                                if (resA.object != 0) {
                                    this.alertS.open('Pallet terminado!', 'success');
                                    this.getPallet();
                                } else {
                                    this.alertS.open('Error al terminar el pallet!', 'error');
                                }
                            } else {
                                this.alertS.open(resA.message, 'error');
                            }
                        }, err => {
                            this.alertS.open(err.message, 'error');
                        });
                    } else {
                        this.alertS.open('El pallet tiene conteos pendientes por cerrar!', 'warning');
                    }
                } else {
                    this.alertS.open(resF.message, 'error');
                }
            }, err => {
                this.alertS.open(err.message, 'error');
            });
        } else {
            this.alertS.open('El pallet ya esta terminado!', 'warning');
        }
    }
    delete(pallet: string) {
        this.dialog.open(ConfirmationComponent,{
            data:{message:'¿Desea eliminar el pallet?'},
            height:'250px',
            width:'400px'
        }).afterClosed().subscribe(resA => {
            if (resA) {
                this.invPalletS.delete(this.cyclicId, pallet).subscribe(resD => {
                    if (resD.message === 'OK') {
                        if (resD.object != 0) {
                            this.alertS.open('Pallet eliminado!', 'success');
                            this.getPallet();
                        } else {
                            this.alertS.open('Error al eliminar el pallet!', 'error');
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
    getAssistant(id: number,status:string) {
        if(status==='Pendiente'){
            this.dialog.open(CyclicPersonModal, {
                data: { cyclicId: id, type: 'Auxiliar' },
                width: '800px'
            });
        }else{
            this.alertS.open('El conteo tiene el estado '+status+', no se pueden asignar mas auxiliares!','warning');
        }
    }
    deleteCouting(id:number,status:string){
        if(status!='Cerrado'){
            this.invCoutingS.delete(id).subscribe(resD=>{
                if(resD.message==='OK'){
                    if(resD.object!=0){
                        this.alertS.open('Conteo eliminado!','success');
                    }else{
                        this.alertS.open('Error al eliminar el conteo!','error');
                    }
                }else{
                    this.alertS.open(resD.message,'error');
                }
            },err=>{
                this.alertS.open(err.message,'error');
            });
        }else{
            this.alertS.open('El conteo tiene el estado '+status+', no se puede eliminar!','warning');
        }
    }
}