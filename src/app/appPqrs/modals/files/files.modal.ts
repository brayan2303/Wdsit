import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AlertService } from 'src/app/shared/services/alert.service';
import { PqrPqrsFileModel } from '../../models/pqrPqrsFile.model';
import { PqrPqrsService } from '../../services/pqrPqrs.service';

@Component({
    selector: 'modal-files',
    templateUrl: 'files.modal.html',
    styleUrls: ['./files.modal.css']
})
export class FilesModal implements OnInit {
    loadingStart: boolean;
    loadingEnd: boolean;
    fileListStart: PqrPqrsFileModel[];
    fileListEnd: PqrPqrsFileModel[];
    files: File[];

    constructor(private pqrPqrsS: PqrPqrsService, private alertS: AlertService,
        public dialogRef: MatDialogRef<FilesModal>,
        @Inject(MAT_DIALOG_DATA) public data: any) {
        dialogRef.disableClose = true;
        this.loadingStart = false;
        this.loadingEnd = false;
        this.fileListStart = [];
        this.fileListEnd = [];
        this.files = [];
    }
    ngOnInit() {
        this.loadingStart = true;
        this.pqrPqrsS.listFile(this.data.number, 'INICIO').subscribe(resL => {
            if (resL.message === 'OK') {
                this.fileListStart = resL.object;
                this.loadingStart = false;
            } else {
                this.alertS.open(resL.message, 'error');
            }
        }, err => {
            this.alertS.open(err.message, 'error');
        });
        this.loadingEnd = true;
        this.pqrPqrsS.listFile(this.data.number, 'FIN').subscribe(resL => {
            if (resL.message === 'OK') {
                this.fileListEnd = resL.object;
                this.loadingEnd = false;
            } else {
                this.alertS.open(resL.message, 'error');
            }
        }, err => {
            this.alertS.open(err.message, 'error');
        });
    }
    delete(name: string,option:string) {
        this.pqrPqrsS.deleteFile(this.data.number, option, name).subscribe(res => {
            if (res.message === 'OK') {
                if (res.object != 0) {
                    if (option === 'INICIO') {
                        this.loadingStart = true;
                    } else {
                        this.loadingEnd = true;
                    }
                    this.pqrPqrsS.listFile(this.data.number, option).subscribe(resL => {
                        if (resL.message === 'OK') {
                            if (option === 'INICIO') {
                                this.fileListStart = resL.object;
                                this.loadingStart = false;
                            } else {
                                this.fileListEnd = resL.object;
                                this.loadingEnd = false;
                            }
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
        downloadLink.setAttribute("download", file.name);
        downloadLink.style.visibility = "hidden";
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
    }
    load(file: FileList,option:string) {
        if (file != undefined) {
            for (let i = 0; i < file.length; i++) {
                this.files.push(file[i]);
            }
            if (this.files.length > 0) {
                this.pqrPqrsS.loadFile(this.data.number, option, this.files).subscribe(res => {
                    if (res.message === 'OK') {
                        if (res.object != 0) {
                            this.files = [];
                            if (option === 'INICIO') {
                                this.loadingStart = true;
                            } else {
                                this.loadingEnd = true;
                            }
                            this.pqrPqrsS.listFile(this.data.number, option).subscribe(resL => {
                                if (resL.message === 'OK') {
                                    if (option === 'INICIO') {
                                        this.fileListStart = resL.object;
                                        this.loadingStart = false;
                                    } else {
                                        this.fileListEnd = resL.object;
                                        this.loadingEnd = false;
                                    }
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