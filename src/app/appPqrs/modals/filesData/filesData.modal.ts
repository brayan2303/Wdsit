
import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GenPersonEntity } from "src/app/appGeneral/entities/genPerson.entity";
import { AlertService } from 'src/app/shared/services/alert.service';
import { PqrFilesModel } from "../../models/pqrFiles.model";
import { PqrFilesService } from '../../services/pqrFiles.service';


@Component({
    selector: 'filesData-modal',
    templateUrl: 'filesData.modal.html',
    styleUrls: ['./filesData.modal.css']
})
export class FilesData implements OnInit {
    genPersonEntity: GenPersonEntity;
    loadingDay: boolean;
    fileListStart: PqrFilesModel[];

    constructor(private PqrFilesS:PqrFilesService, private alertS: AlertService,
        public dialogRef: MatDialogRef<FilesData>,
        @Inject(MAT_DIALOG_DATA) public data: any) {
        dialogRef.disableClose = true;
        
    }
    ngOnInit() {
        this.loadingDay = true;
        this.PqrFilesS.listFile(this.data.name).subscribe(res => {

            if (res.message === 'OK') {
                this.fileListStart = res.object;
                this.loadingDay = false;
            } else {
                this.alertS.open(res.message, 'error');
            }
        }, err => {
            this.alertS.open(err.message, 'error');
        });

    }
    
    download(file: PqrFilesModel) {
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
    
    close(): void {
        this.dialogRef.close();
    }
}
    

