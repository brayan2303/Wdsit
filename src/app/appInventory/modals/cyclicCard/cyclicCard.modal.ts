import { Component, Inject, ViewChild } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { AlertService } from 'src/app/shared/services/alert.service';
import { InvCardService } from '../../services/invCard.service';
import { InvCoutingService } from '../../services/invCouting.service';

@Component({
    selector: 'modal-cyclicCard',
    templateUrl: 'cyclicCard.modal.html',
    styleUrls: ['./cyclicCard.modal.css']
})
export class CyclicCardModal {
    cardId: number;
    cardCode: string;
    loading: boolean;
    columns: string[];
    dataSource = new MatTableDataSource<any>();
    @ViewChild(MatTable) table: MatTable<any>;
    @ViewChild(MatPaginator) paginator: MatPaginator;

    constructor(private invCardS: InvCardService, private invCoutingS: InvCoutingService, private alertS: AlertService, public dialogRef: MatDialogRef<CyclicCardModal>,
        @Inject(MAT_DIALOG_DATA) public data: any) {
        dialogRef.disableClose = true;
        this.cardId = 0;
        this.loading = false;
        this.columns = ['code'];
        this.dataSource = new MatTableDataSource([]);
    }
    ngOnInit(): void {
        if(this.data.type==='Crear'){
            this.invCoutingS.findByPalletId(this.data.palletId).subscribe(resF => {
                if (resF.message === 'OK') {
                    this.invCardS.findAvailable(this.data.cyclicId,resF.object+1).subscribe(res => {
                        if (res.message === 'OK') {
                            this.dataSource = new MatTableDataSource<any>(res.object);
                            this.dataSource.paginator = this.paginator;
                            this.loading = false;
                            if(this.dataSource.data.length===0){
                                if(resF.object===0){
                                    this.alertS.open('No hay tarjetas de primer conteo creadas!','warning');
                                }else if(resF.object===1){
                                    this.alertS.open('No hay tarjetas de segundo conteo creadas!','warning');
                                }else if(resF.object===2){
                                    this.alertS.open('No hay tarjetas de tercer conteo creadas!','warning');
                                }
                            }
                        } else {
                            this.alertS.open(res.message, 'error');
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
        }else{
            this.invCoutingS.findByPalletId(this.data.palletId).subscribe(resF => {
                if (resF.message === 'OK') {
                    this.invCardS.findAvailable(this.data.cyclicId,resF.object).subscribe(res => {
                        if (res.message === 'OK') {
                            this.dataSource = new MatTableDataSource<any>(res.object);
                            this.dataSource.paginator = this.paginator;
                            this.loading = false;
                            if(this.dataSource.data.length===0){
                                if(resF.object===1){
                                    this.alertS.open('No hay tarjetas de primer conteo creadas!','warning');
                                }else if(resF.object===2){
                                    this.alertS.open('No hay tarjetas de segundo conteo creadas!','warning');
                                }else if(resF.object===3){
                                    this.alertS.open('No hay tarjetas de tercer conteo creadas!','warning');
                                }
                            }
                        } else {
                            this.alertS.open(res.message, 'error');
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
        }
    }
    save(cardId: number, cardCode: string) {
        this.cardId = cardId;
        this.cardCode = cardCode;
        this.close();
    }
    close(): void {
        this.dialogRef.close({ cardId: this.cardId, cardCode: this.cardCode });
    }
}