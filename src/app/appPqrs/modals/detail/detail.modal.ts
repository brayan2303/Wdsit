import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AlertService } from 'src/app/shared/services/alert.service';
import { PqrPqrsService } from '../../services/pqrPqrs.service';
import { PqrPqrsEntity } from '../../entities/pqrPqrs.entity';
import { PqrPqrsFileModel } from '../../models/pqrPqrsFile.model';
import { PqrCustomerService } from "../../services/pqrCustomer.service";
import { PqrsClientSerialModel } from "../../models/pqrClientSerial.model";
import { formatDate } from "@angular/common";
import { PqrsClientSerialService } from "../../services/pqrsClientSerial.service";

@Component({
    selector: 'modal-detail',
    templateUrl: 'detail.modal.html',
    styleUrls: ['./detail.modal.css']
})
export class DetailModal {
    loading: boolean;
    pqrPqrsEntity: PqrPqrsEntity;
    fileStartList: PqrPqrsFileModel[];
    fileEndList: PqrPqrsFileModel[];
    fileList: PqrsClientSerialModel[];

    constructor(private pqrPqrsS: PqrPqrsService, private alertS: AlertService, private meeSupportS: PqrCustomerService,
        public dialogRef: MatDialogRef<DetailModal>,
        @Inject(MAT_DIALOG_DATA) public data: any) {
        this.loading = false;
        this.pqrPqrsEntity = new PqrPqrsEntity();
        this.fileStartList = [];
        this.fileEndList = [];
        this.fileList = [];
    }
    ngOnInit(): void {
        this.details();
    }
    details() {
        this.loading = true;
        this.pqrPqrsS.findById(this.data.pqrsId).subscribe(res => {
            if (res.message === 'OK') {
                this.loading = false;
                this.pqrPqrsEntity = res.object;
                console.log(res.object)
                this.pqrPqrsS.listFile(this.pqrPqrsEntity.number, 'INICIO').subscribe(resL => {
                    if (resL.message === 'OK') {
                        this.fileStartList = resL.object;
                            this.meeSupportS.listFile(this.pqrPqrsEntity.filesId, this.pqrPqrsEntity.creationDateFile).subscribe(res => {
                                if (res.message === 'OK') {
                                    this.fileList = res.object;
                                    this.loading = false;
                                } else {
                                    this.alertS.open(res.message, 'error');
                                    this.loading = false;
                                }
                            }, err => {
                                this.alertS.open(err.message, 'error');
                                this.loading = false;
                            });
                        }
                 
                }, err => {
                    this.alertS.open(err.message, 'error');
                });
                this.pqrPqrsS.listFile(this.pqrPqrsEntity.number, 'FIN').subscribe(resL => {
                    if (resL.message === 'OK') {
                        this.fileEndList = resL.object;
                    } else {
                        this.alertS.open(resL.message, 'error');
                    }
                }, err => {
                    this.alertS.open(err.message, 'error');
                });
            } else {
                this.alertS.open(res.message, 'error');
            }
        }, err => {
            this.alertS.open(err.message, 'error');
        });
    }


    downloadFile(file: PqrPqrsFileModel) {
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
}