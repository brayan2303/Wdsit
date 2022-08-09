import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AlertService } from 'src/app/shared/services/alert.service';
import { ActiveFixedEntity } from "../../entities/activeFixed.entity";
import { ActiveFixedAssigmentEntity } from "../../entities/activeFixedAssigment.entity";
import { ActiveFixedAssigmentFeatur } from "../../models/ActiveFixedAssigFeatur.model";
import { ActiveFixedAssigmentFile } from "../../models/ActiveFixedAssigmentFile.model";
import { ActiveFixedAssigmentService } from "../../services/activeFixedAssigment.service";

@Component({
    selector: 'modal-actProdDetailAll',
    templateUrl: 'actProdDetailAll.modal.html',
    styleUrls: ['./actProdDetailAll.modal.css']
})
export class ActDetailAllModal {
    activeFixedAssigmentFeatur:ActiveFixedAssigmentFeatur;
    loading: boolean;
    filetList: ActiveFixedAssigmentFile[];
    activeFixedAssigmentEntity:ActiveFixedAssigmentEntity;
    actFixedEntity: ActiveFixedEntity[];

    constructor(private activeFixedS:ActiveFixedAssigmentService , private alertS: AlertService,
        public dialogRef: MatDialogRef<ActDetailAllModal>,
        @Inject(MAT_DIALOG_DATA) public data: any) {
        this.loading = false;
        this.actFixedEntity = [];
        this.filetList = [];
    }
    ngOnInit(): void {
        this.loading = true;
        this.activeFixedS.assigFeaturAll(this.data.id).subscribe(res => {
            if (res.message === 'OK') {
                this.loading = false;
                this.activeFixedAssigmentFeatur = res.object;
                this.activeFixedS.listFile(this.data.identification, this.data.creationDate).subscribe(resL => {
                    if (resL.message === 'OK') {
                        this.filetList = resL.object;   
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
    downloadFile(file: ActiveFixedAssigmentFile) {
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
            var blob = new Blob([bytes], { type: "application/" + file.type});
            downloadLink.href = window.URL.createObjectURL(blob);
        }
        downloadLink.setAttribute("download", file.name+'.'+file.type);
        downloadLink.style.visibility = "hidden";
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
    }
     
    }
