import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AlertService } from 'src/app/shared/services/alert.service';
import { ActiveFixedEntity } from "../../entities/activeFixed.entity";
import { ActiveFixedAssigmentEntity } from "../../entities/activeFixedAssigment.entity";
import { ActiveFixedAssigmentFeatur } from "../../models/ActiveFixedAssigFeatur.model";
import { ActiveFixedReturnModel } from "../../models/ActiveFixedReturnModel.model";
import { ActiveFixedReturnService } from "../../services/activeFixedReturn.service";

@Component({
    selector: 'modal-actProdDetailReturn',
    templateUrl: 'actProdDetailReturn.modal.html',
    styleUrls: ['./actProdDetailReturn.modal.css']
})
export class ActProdDetailReturnlModal {
    activeFixedAssigmentFeatur:ActiveFixedAssigmentFeatur;
    loading: boolean;
    filetList: ActiveFixedReturnModel[];
    activeFixedAssigmentEntity:ActiveFixedAssigmentEntity;
    actFixedEntity: ActiveFixedEntity[];

    constructor(private activeFixedRetunS:ActiveFixedReturnService, private alertS: AlertService,
        public dialogRef: MatDialogRef<ActProdDetailReturnlModal>,
        @Inject(MAT_DIALOG_DATA) public data: any) {
        this.loading = false;
        this.actFixedEntity = [];
        this.filetList = [];
    }
    ngOnInit(): void {
        this.loading = true;
                this.activeFixedRetunS.listFile(this.data.identification, this.data.creationDate).subscribe(resL => {
                    if (resL.message === 'OK') {
                        this.filetList = resL.object;
                        this.loading = false;   
                    } else {
                        this.alertS.open(resL.message, 'error');
                    }
                }, err => {
                    this.alertS.open(err.message, 'error');
                });
    }
    downloadFile(file: ActiveFixedReturnModel) {
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
