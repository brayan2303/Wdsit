import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PqrPqrsFileModel } from 'src/app/appPqrs/models/pqrPqrsFile.model';
import { AlertService } from 'src/app/shared/services/alert.service';
import { ProMeasurementDetailService } from '../../services/ProMeasurementDetail.service';

@Component({
    selector: 'measurementFiles',
    templateUrl: 'measurementFiles.modal.html',
    styleUrls: ['./measurementFiles.modal.css']
})
export class MeasurementFilesModal implements OnInit {
    loading: boolean;
    fileList: PqrPqrsFileModel[];
    files: File[];

    constructor(private proMeasurementDetailS: ProMeasurementDetailService, private alertS: AlertService,
        public dialogRef: MatDialogRef<MeasurementFilesModal>,
        @Inject(MAT_DIALOG_DATA) public data: any) {
        dialogRef.disableClose = true;
        this.loading = false;
        this.fileList = [];
        this.files = [];
    }
    ngOnInit() {
        this.loading = true;
        this.proMeasurementDetailS.listFile(this.data.measurementId,this.data.measurementDetailId).subscribe(resL => {
            if (resL.message === 'OK') {
                this.fileList = resL.object;
                this.loading = false;
            } else {
                this.alertS.open(resL.message, 'error');
            }
        }, err => {
            this.alertS.open(err.message, 'error');
        });
    }
    delete(name: string) {
        this.proMeasurementDetailS.deleteFile(this.data.measurementId,this.data.measurementDetailId, name).subscribe(res => {
            if (res.message === 'OK') {
                if (res.object != 0) {
                    this.alertS.open('Archivo eliminado!','success');
                    this.loading=true;
                    this.proMeasurementDetailS.listFile(this.data.measurementId,this.data.measurementDetailId).subscribe(resL => {
                        if (resL.message === 'OK') {
                            this.fileList = resL.object;
                            this.loading = false;
                        } else {
                            this.alertS.open(resL.message, 'error');
                        }
                    }, err => {
                        this.alertS.open(err.message, 'error');
                    });
                } else {
                    this.alertS.open('Error al eliminar el archivo!', 'error');
                }
            } else {
                this.alertS.open(res.message, 'error');
            }
        }, err => {
            this.alertS.open(err.message, 'error');
        });
    }
    download(file: PqrPqrsFileModel) {
        var downloadLink = document.createElement("a");
        if (file.type === 'imagen') {
            downloadLink.setAttribute("href", "data:image/png;base64," + file.file);
        } else {
            var binary = window.atob(file.file);
            var binaryLength = binary.length;
            var bytes = new Uint8Array(binaryLength);
            for (var i = 0; i < binaryLength; i++) {
                var ascii = binary.charCodeAt(i);
                bytes[i] = ascii;
            }
            var blob = new Blob([bytes], { type: "application/" + file.type });
            downloadLink.href = window.URL.createObjectURL(blob);
        }
        downloadLink.setAttribute("download", file.name + '.' + file.type);
        downloadLink.style.visibility = "hidden";
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
    }
    load(file: FileList) {
        if (file != undefined) {
            for (let i = 0; i < file.length; i++) {
                this.files.push(file[i]);
            }
            if (this.files.length > 0) {
                this.proMeasurementDetailS.loadFile(this.data.measurementId,this.data.measurementDetailId, this.files).subscribe(res => {
                    if (res.message === 'OK') {
                        if (res.object != 0) {
                            this.files = [];
                            this.loading=true;
                            this.proMeasurementDetailS.listFile(this.data.measurementId,this.data.measurementDetailId).subscribe(resL => {
                                if (resL.message === 'OK') {
                                    this.fileList= resL.object;
                                    this.loading = false;
                                } else {
                                    this.alertS.open(resL.message, 'error');
                                }
                            }, err => {
                                this.alertS.open(err.message, 'error');
                            });
                        } else {
                            this.alertS.open('Error al cargar el archivo!', 'error');
                        }
                    } else {
                        this.alertS.open(res.message, 'error');
                    }
                }, err => {
                    this.alertS.open(err.message, 'error');
                });
            }
        }
    }
    close(): void {
        this.dialogRef.close();
    }
}