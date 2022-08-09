import { Component, Inject } from "@angular/core";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AlertService } from 'src/app/shared/services/alert.service';
import { GenPersonEntity } from 'src/app/appGeneral/entities/genPerson.entity';
import { ConfirmationComponent } from 'src/app/shared/components/confirmation/confirmation.component';
import { CyclicCardModal } from '../cyclicCard/cyclicCard.modal';
import { InvCoutingService } from '../../services/invCouting.service';

@Component({
    selector: 'modal-cyclicCouting',
    templateUrl: 'cyclicCouting.modal.html',
    styleUrls: ['./cyclicCouting.modal.css']
})
export class CyclicCoutingModal {
    editing: number;
    cardId: number;
    cardCode: string;
    sampling: number;
    status: string;
    coutingType: string;
    genPersonEntity: GenPersonEntity;

    constructor(private invCoutingS: InvCoutingService, private dialog: MatDialog, private alertS: AlertService,
        public dialogRef: MatDialogRef<CyclicCoutingModal>,
        @Inject(MAT_DIALOG_DATA) public data: any) {
        dialogRef.disableClose = true;
        this.editing = 0;
        this.cardId = 0;
        this.cardCode = '';
        this.sampling = 0;
        this.status = 'Pendiente';
        this.coutingType = '0';
    }
    ngOnInit(): void {
        this.genPersonEntity = (JSON.parse(localStorage.getItem('user')));
    }
    close(): void {
        this.dialogRef.close();
    }
    save() {
        if (this.sampling != null && this.status != '0' && this.cardCode != '' && this.coutingType != '0') {
            if (this.editing === 0) {
                this.invCoutingS.create(this.cardId, this.data.id, this.sampling, this.coutingType,this.genPersonEntity.id).subscribe(resC => {
                    if (resC.message === 'OK') {
                        if (resC.object != 0) {
                            this.alertS.open('Conteo creado!', 'success');
                            this.close();
                        } else {
                            this.alertS.open('Error al crear el conteo!', 'error');
                        }
                    } else {
                        this.alertS.open(resC.message, 'error');
                    }
                }, err => {
                    this.alertS.open(err.message, 'error');
                });
            } else {
                this.invCoutingS.update(this.editing, this.sampling, this.status, this.coutingType).subscribe(resU => {
                    if (resU.message === 'OK') {
                        if (resU.object != 0) {
                            this.alertS.open('Conteo actualizado!', 'success');
                            this.close();
                        } else {
                            this.alertS.open('Error al actualizar el conteo!', 'error');
                        }
                    } else {
                        this.alertS.open(resU.message, 'error');
                    }
                }, err => {
                    this.alertS.open(err.message, 'error');
                });
            }
        } else {
            this.alertS.open('Complete la informacion!', 'warning');
        }
    }
    delete(id: number) {
        this.dialog.open(ConfirmationComponent,{
            data:{message:'¿ Desea eliminar el conteo ?'},
            height:'250px',
            width:'400px'
        }).afterClosed().subscribe(resA => {
            if (resA) {
                this.invCoutingS.delete(id).subscribe(resD => {
                    if (resD.message === 'OK') {
                        if (resD.object != 0) {
                            this.alertS.open('Conteo eliminado!', 'success');
                            this.close();
                        } else {
                            this.alertS.open('Error al eliminar el conteo!', 'error');
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
    getCards() {
        const dialogRef = this.dialog.open(CyclicCardModal, {
            data: { cyclicId: this.data.cyclicId, palletId: this.data.id, type: this.editing === 0 ? 'Crear' : 'Editar' },
            width: '600px'
        });
        dialogRef.afterClosed().subscribe(resA => {
            if (resA != 0) {
                this.cardId = resA.cardId;
                this.cardCode = resA.cardCode;
            }
        });
    }
}