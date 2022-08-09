import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { GenCustomerEntity } from 'src/app/appGeneral/entities/genCustomer.entity';
import { InvCardEntity } from 'src/app/appInventory/entities/invCard.entity';
import { CyclicSignedModal } from 'src/app/appInventory/modals/cyclicSigned/cyclicSigned.modal';
import { InvCardService } from 'src/app/appInventory/services/invCard.service';
import { PriLabelService } from 'src/app/appPrint/services/priLabel.service';
import { ConfirmationComponent } from 'src/app/shared/components/confirmation/confirmation.component';
import { AlertService } from 'src/app/shared/services/alert.service';
import { InvCyclicEntity } from 'src/app/appInventory/entities/invCyclic.entity';
import { InvCyclicService } from 'src/app/appInventory/services/invCyclic.service';
import { GenCountryCustomerService } from 'src/app/appGeneral/services/genCountryCustomer.service';

@Component({
    selector: 'app-invControlTableCard',
    templateUrl: './invControlTableCard.component.html',
    styleUrls: ['./invControlTableCard.component.css']
})
export class InvControlTableCardComponent implements OnInit {
    loading: boolean;
    total: number;
    customerId1: number;
    customerId2: number;
    cyclicId: number;
    invCardEntity: InvCardEntity;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    customerList: GenCustomerEntity[];
    cyclicList1: InvCyclicEntity[];
    cyclicList2: InvCyclicEntity[];
    cardList: InvCardEntity[];
    cardListSlice: InvCardEntity[];

    constructor(private invCardS: InvCardService, private genCountryCustomerS: GenCountryCustomerService, private invCyclicS: InvCyclicService, private priLabelS: PriLabelService, private dialog: MatDialog, private alertS: AlertService) {
        this.loading = false;
        this.total = 0;
        this.customerId1 = 0;
        this.customerId2 = 0;
        this.cyclicId = 0;
        this.invCardEntity = new InvCardEntity();
        this.invCardEntity.cyclicId = 0;
        this.invCardEntity.coutingType = '0';
        this.customerList = [];
        this.cyclicList1 = [];
        this.cyclicList2 = [];
        this.cardList = [];
        this.cardListSlice = [];
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
    getCyclic(customerId: number, option: number) {
        this.invCyclicS.listByCustomerId(customerId).subscribe(res => {
            if (res.message === 'OK') {
                if (option === 1) {
                    this.cyclicList1 = res.object;
                } else {
                    this.cyclicList2 = res.object;
                }
            } else {
                this.alertS.open(res.message, 'error');
            }
        }, err => {
            this.alertS.open(err.message, 'error');
        });
    }
    save() {
        if (this.total != 0 && this.invCardEntity.cyclicId != 0 && this.invCardEntity.coutingType != '0') {
            this.invCardS.create(this.total, this.invCardEntity).subscribe(res => {
                if (res.message === 'OK') {
                    if (res.object != 0) {
                        this.alertS.open('Tarjetas creadas!', 'success');
                    } else {
                        this.alertS.open('Error al crear la tarjetas!', 'error');
                    }
                } else {
                    this.alertS.open(res.message, 'error');
                }
            }, err => {
                this.alertS.open(err.message, 'error');
            });
        } else {
            this.alertS.open('Complete la informacion!', 'warning');
        }
    }
    search() {
        this.cardList = [];
        this.cardListSlice = [];
        this.loading = true;
        this.invCardS.list(this.cyclicId).subscribe(res => {
            if (res.message === 'OK') {
                this.cardList = res.object;
                this.cardListSlice = this.cardList;
                this.paginator.pageIndex = 0;
                if (this.paginator.pageIndex === 0) {
                    this.cardListSlice = this.cardListSlice.slice(0, this.paginator.pageSize);
                } else {
                    this.cardListSlice = this.cardListSlice.slice((this.paginator.pageIndex * this.paginator.pageSize), (this.paginator.pageIndex * this.paginator.pageSize) + this.paginator.pageSize);
                }
                this.loading = false;
            } else {
                this.alertS.open(res.message, 'error');
            }
        }, err => {
            this.alertS.open(err.message, 'error');
        });
    }
    /*print(id: string) {
        var doc = document.getElementById(id);

        html2canvas(doc).then(function(canvas) {
            var image=canvas.toDataURL();
            var print=window.open('','_blank');
            print.document.write(`<html><body><img src='data:image/png;base64,`+image+`'></body></html>`);
            print.print();
            print.close();
        });
    }*/
    print(invCardEntity: InvCardEntity, type: number) {
        var array: InvCardEntity[] = [];
        if (type === 0) {
            array.push(invCardEntity);
        } else {
            array = this.cardListSlice;
        }
        this.priLabelS.printCard(this.customerId2, 'TARJETA', array).subscribe(resP => {
            if (resP.message === 'OK') {
                if (resP.object != 0) {
                    this.alertS.open('Impresion correcta!', 'success');
                } else {
                    this.alertS.open('Error al imprimir la tarjeta!', 'error');
                }
            } else {
                this.alertS.open(resP.message, 'error');
            }
        }, err => {
            this.alertS.open(err.message, 'error');
        });
    }
    delete(cardId: number) {
        this.dialog.open(ConfirmationComponent,{
            data:{message:cardId === 0 ? '¿ Desea eliminar todas las tarjetas ?' : '¿ Desea eliminar la tarjeta ?'},
            height:'250px',
            width:'400px'
        }).afterClosed().subscribe(resA => {
            if (resA) {
                if (cardId === 0) {
                    this.invCardS.delete(cardId).subscribe(resD => {
                        if (resD.message === 'OK') {
                            if (resD.object != 0) {
                                this.alertS.open(cardId === 0 ? 'Tarjetas eliminadas!' : 'Tarjeta eliminada!', 'success');
                                this.loading = true;
                                this.invCardS.list(this.customerId2).subscribe(res => {
                                    if (res.message === 'OK') {
                                        this.cardList = res.object;
                                        this.cardListSlice = this.cardList;
                                        this.paginator.pageIndex = 0;
                                        if (this.paginator.pageIndex === 0) {
                                            this.cardListSlice = this.cardListSlice.slice(0, this.paginator.pageSize);
                                        } else {
                                            this.cardListSlice = this.cardListSlice.slice((this.paginator.pageIndex * this.paginator.pageSize), (this.paginator.pageIndex * this.paginator.pageSize) + this.paginator.pageSize);
                                        }
                                        this.loading = false;
                                    } else {
                                        this.alertS.open(res.message, 'error');
                                    }
                                }, err => {
                                    this.alertS.open(err.message, 'error');
                                });

                            } else {
                                this.alertS.open('Error al eliminar!', 'error');
                            }
                        } else {
                            this.alertS.open(resD.message, 'error');
                        }
                    }, err => {
                        this.alertS.open(err.message, 'error');
                    });
                }
            }
        });
    }
    signed(cardId: number, signed: string, bytes: string) {
        this.dialog.open(CyclicSignedModal, {
            data: { cardId: cardId, signed: signed, bytes: bytes }
        });
    }
    change(e) {
        this.cardListSlice = this.cardList;
        if (e.pageIndex === 0) {
            this.cardListSlice = this.cardListSlice.slice(0, e.pageSize);
        } else {
            this.cardListSlice = this.cardListSlice.slice((e.pageIndex * e.pageSize), (e.pageIndex * e.pageSize) + e.pageSize);
        }
    }
}