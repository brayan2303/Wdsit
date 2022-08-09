import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AlertService } from 'src/app/shared/services/alert.service';
import { BscAnalysisEntity } from '../../entities/bscAnalysis.entity';
import { BscMeasurementEntity } from '../../entities/bscMeasurement.entity';
import { BscAnalysisService } from '../../services/bscAnalysis.service';

@Component({
    selector: 'modal-bscAnalysis',
    templateUrl: 'bscAnalysis.modal.html',
    styleUrls: ['./bscAnalysis.modal.css']
})
export class BscAnalysisModal implements OnInit {
    title:string;
    measurementEntity: BscMeasurementEntity;
    bscAnalysisEntity: BscAnalysisEntity;

    constructor(private bscAnalysisS: BscAnalysisService, private alertS: AlertService,
        public dialogRef: MatDialogRef<BscAnalysisModal>,
        @Inject(MAT_DIALOG_DATA) public data: any) {
        dialogRef.disableClose = true;
        this.title='';
        this.measurementEntity = new BscMeasurementEntity();
        this.bscAnalysisEntity = new BscAnalysisEntity();
    }
    ngOnInit(): void {
        this.measurementEntity = this.data.measurementEntity;
        this.bscAnalysisEntity.month = this.data.month;
        this.bscAnalysisEntity.analysis = this.data.analysis;
        if (this.data.analysisId != 0) {
            this.title='Editar Analisis de Resultado';
            this.bscAnalysisS.findById(this.data.analysisId).subscribe(res => {
                if (res.message === 'OK') {
                    this.bscAnalysisEntity = res.object;
                } else {
                    this.alertS.open(res.message, 'error');
                }
            }, err => {
                this.alertS.open(err.message, 'error');
            });
        }else{
            this.title='Nuevo Analisis de Resultado';
        }
    }
    save() {
        if (this.bscAnalysisEntity.analysis != '' && this.bscAnalysisEntity.analysis!=null) {
            if (this.data.analysisId === 0) {
                this.bscAnalysisS.create(this.data.measurementDetailId,this.bscAnalysisEntity.analysis).subscribe(resC=>{
                    if(resC.message==='OK'){
                        if(resC.object!=0){
                            this.alertS.open('Analisis creado!','success');
                            this.close();
                        }else{
                            this.alertS.open('Error al crear el analisis!','error');
                        }
                    }else{
                        this.alertS.open(resC.message,'error');
                    }
                },err=>{
                    this.alertS.open(err.message,'error');
                });
            }else{
                this.bscAnalysisS.update(this.data.analysisId,this.bscAnalysisEntity.analysis).subscribe(resU=>{
                    if(resU.message==='OK'){
                        if(resU.object!=0){
                            this.alertS.open('Analisis actualizado!','success');
                            this.close();
                        }else{
                            this.alertS.open('Error al actualizar!','error');
                        }
                    }else{
                        this.alertS.open(resU.message,'error');
                    }
                },err=>{
                    this.alertS.open(err.message,'error');
                });
            }
        } else {
            this.alertS.open('Ingrese un analisis!','warning');
        }
    }
    close(): void {
        this.dialogRef.close(true);
    }
}