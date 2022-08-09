import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AlertService } from 'src/app/shared/services/alert.service';
import { MeeSupportService } from '../../services/meeSupport.service';
import { MeeSupportFileModel } from '../../models/meeSupportFile.model';
import { GenPersonEntity } from 'src/app/appGeneral/entities/genPerson.entity';

@Component({
    selector: 'supportFile',
    templateUrl: 'supportFile.modal.html',
    styleUrls: ['./supportFile.modal.css']
})
export class SupportFileModal implements OnInit {
    loading: boolean;
    fileList: MeeSupportFileModel[];

    constructor(private meeSupportS: MeeSupportService, private alertS: AlertService, public dialogRef: MatDialogRef<SupportFileModal>, @Inject(MAT_DIALOG_DATA) public data: any) {
        dialogRef.disableClose = true;
        this.loading = false;
        this.fileList = [];
    }
    ngOnInit(): void {
        this.getFiles();
    }
    getFiles() {
        this.loading = true;
        this.meeSupportS.listFiles(this.data.meetingId, this.data.supportId).subscribe(res => {
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
    download(file: MeeSupportFileModel) {
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
    close(): void {
        this.dialogRef.close();
    }
}