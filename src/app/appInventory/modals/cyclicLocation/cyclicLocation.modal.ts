import { Component, Inject, ViewChild } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from "@angular/material/paginator";
import { AlertService } from 'src/app/shared/services/alert.service';
import { InvCyclicLocationModel } from '../../models/invCyclicLocation.model';
import { InvPalletModel } from '../../models/invPallet.model';
import { InvCyclicService } from '../../services/invCyclic.service';
import { InvPalletService } from '../../services/invPallet.service';

@Component({
    selector: 'modal-cyclicLocation',
    templateUrl: 'cyclicLocation.modal.html',
    styleUrls: ['./cyclicLocation.modal.css']
})
export class CyclicLocationModal {
    open: string = '';
    height: string;
    loadingLocation: boolean;
    loadingPallet: boolean;
    locationList: InvCyclicLocationModel[];
    locationListSlice: InvCyclicLocationModel[];
    palletList: InvPalletModel[];
    type: string;
    @ViewChild(MatPaginator) paginator: MatPaginator;

    constructor(private invCyclicS: InvCyclicService, private invPalletS: InvPalletService, private alertS: AlertService,
        public dialogRef: MatDialogRef<CyclicLocationModal>,
        @Inject(MAT_DIALOG_DATA) public data: any) {
        dialogRef.disableClose = true;
        this.loadingLocation = false;
        this.loadingPallet = false;
        this.locationList = [];
        this.locationListSlice=[];
        this.palletList = [];
        this.type = '';
    }
    ngOnInit(): void { }

    getLocation() {
        this.locationList=[];
        this.palletList=[];
        this.loadingLocation = true;
        this.invCyclicS.findLocation(this.data.cyclicId,this.data.system, this.data.typeSampling,this.type, this.data.customer).subscribe(res => {
            if (res.message === 'OK') {
                this.locationList = res.object;
                this.locationListSlice=this.locationList;
                this.paginator.pageIndex = 0;
                if (this.paginator.pageIndex === 0) {
                    this.locationListSlice = this.locationListSlice.slice(0, this.paginator.pageSize);
                } else {
                    this.locationListSlice = this.locationListSlice.slice((this.paginator.pageIndex * this.paginator.pageSize), (this.paginator.pageIndex * this.paginator.pageSize) + this.paginator.pageSize);
                }
                this.loadingLocation = false;
            } else {
                this.alertS.open(res.message, 'error');
            }
        }, err => {
            this.alertS.open(err.message, 'error');
        });
        this.loadingPallet = true;
        this.invPalletS.findAll(this.data.cyclicId,this.data.system, this.data.typeSampling,this.type, this.data.customer).subscribe(res => {
            if (res.message === 'OK') {
                this.palletList = res.object;
                this.loadingPallet = false;
            } else {
                this.alertS.open(res.message, 'error');
            }
        }, err => {
            this.alertS.open(err.message, 'error');
        });
    }
    close(): void {
        this.dialogRef.close();
    }
    onClick(value) {
        this.height = (document.getElementById('pallet_' + value).children.length * 60) + 'px';
        if (this.open === '' || this.open != value) {
            this.open = value;
        } else if (this.open === value) {
            this.open = '';
        }
    }
    add(number: string,sapCode:string,location:string) {
        this.invPalletS.create(this.data.cyclicId, number,sapCode,location,this.type).subscribe(resC => {
            if (resC.message === 'OK') {
                if (resC.object != 0) {
                    this.alertS.open('Pallet agregado!', 'success');
                    this.loadingPallet = true;
                    this.invPalletS.findAll(this.data.cyclicId,this.data.system, this.data.typeSampling,this.type, this.data.customer).subscribe(resF => {
                        if (resF.message === 'OK') {
                            this.palletList = resF.object;
                            this.loadingPallet = false;
                        } else {
                            this.alertS.open(resF.message, 'error');
                        }
                    }, err => {
                        this.alertS.open(err.message, 'error');
                    });
                } else {
                    this.alertS.open('Error al agregar el pallet!', 'error');
                }
            } else {
                this.alertS.open(resC.message, 'error');
            }
        }, err => {
            this.alertS.open(err.message, 'error');
        });
    }
    remove(number: string) {
        this.invPalletS.delete(this.data.cyclicId, number).subscribe(resD => {
            if (resD.message === 'OK') {
                if (resD.object != 0) {
                    this.alertS.open('Pallet removido!', 'success');
                    this.loadingPallet = true;
                    this.invPalletS.findAll(this.data.cyclicId,this.data.system, this.data.typeSampling,this.type, this.data.customer).subscribe(resF => {
                        if (resF.message === 'OK') {
                            this.palletList = resF.object;
                            this.loadingPallet = false;
                        } else {
                            this.alertS.open(resF.message, 'error');
                        }
                    }, err => {
                        this.alertS.open(err.message, 'error');
                    });
                } else {
                    this.alertS.open('Error al remover el pallet!', 'error');
                }
            } else {
                this.alertS.open(resD.message, 'error');
            }
        }, err => {
            this.alertS.open(err.message, 'error');
        });
    }
    change(e) {
        this.locationListSlice = this.locationList;
        if (e.pageIndex === 0) {
            this.locationListSlice = this.locationListSlice.slice(0, e.pageSize);
        } else {
            this.locationListSlice = this.locationListSlice.slice((e.pageIndex * e.pageSize), (e.pageIndex * e.pageSize) + e.pageSize);
        }
    }
}