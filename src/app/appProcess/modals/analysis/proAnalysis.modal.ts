import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AlertService } from 'src/app/shared/services/alert.service';
import { ProAnalysisEntity } from '../../entities/ProAnalysis.entity';
import { ProMeasurementEntity } from '../../entities/ProMeasurement.entity';
import { ProAnalysisService } from '../../services/proAnalysis.service';

@Component({
    selector: 'modal-proAnalysis',
    templateUrl: 'proAnalysis.modal.html',
    styleUrls: ['./proAnalysis.modal.css']
})
export class ProAnalysisModal implements OnInit {
    title:string;
    measurementEntity: ProMeasurementEntity;
    proAnalysisEntity: ProAnalysisEntity;

    constructor(private proAnalysisS: ProAnalysisService, private alertS: AlertService,
        public dialogRef: MatDialogRef<ProAnalysisModal>,
        @Inject(MAT_DIALOG_DATA) public data: any) {
        dialogRef.disableClose = true;
        this.title='';
        this.measurementEntity = new ProMeasurementEntity();
        this.proAnalysisEntity = new ProAnalysisEntity();
    }
    ngOnInit(): void {
        this.measurementEntity = this.data.measurementEntity;
        this.proAnalysisEntity.month = this.data.month;
        this.proAnalysisEntity.analysis = this.data.analysis;
        if (this.data.analysisId != 0) {
            this.title='Editar Analisis de Resultado';
            this.proAnalysisS.findById(this.data.analysisId).subscribe(res => {
                if (res.message === 'OK') {
                    this.proAnalysisEntity = res.object;
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
        if (this.proAnalysisEntity.analysis != '' && this.proAnalysisEntity.analysis!=null) {
            if (this.data.analysisId === 0) {
                this.proAnalysisS.create(this.data.measurementDetailId,this.proAnalysisEntity.analysis).subscribe(resC=>{
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
                this.proAnalysisS.update(this.data.analysisId,this.proAnalysisEntity.analysis).subscribe(resU=>{
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