import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PqrPqrsFileModel } from 'src/app/appPqrs/models/pqrPqrsFile.model';
import { AlertService } from 'src/app/shared/services/alert.service';
import { FilSerialService } from '../../services/filSerial.service';

@Component({
    selector: 'modal-filFiles',
    templateUrl: 'filFiles.modal.html',
    styleUrls: ['./filFiles.modal.css']
})
export class FilFilesModal implements OnInit {
    loading: boolean;
    fileList: PqrPqrsFileModel[];
    files: File[];

    constructor(private filSerialS: FilSerialService, private alertS: AlertService,
        public dialogRef: MatDialogRef<FilFilesModal>,
        @Inject(MAT_DIALOG_DATA) public data: any) {
        dialogRef.disableClose = true;
        this.loading = false;
        this.fileList = [];
        this.files = [];
    }
    ngOnInit() {
        this.loading = true;
        this.filSerialS.listFile(this.data.serialId, this.data.customerId, 'INICIO').subscribe(resL => {
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
    close(): void {
        this.dialogRef.close();
    }
    load(file: FileList) {
        if (file != undefined) {
            for (let i = 0; i < file.length; i++) {
                this.files.push(file[i]);
            }
            if (this.files.length > 0) {

            }
        }
        this.filSerialS.loadFile(this.data.serialId, String(this.data.customerId), 'INICIO', this.files).subscribe(res => {
            if (res.message === 'OK') {
                if (res.object != 0) {
                    this.files = [];
                    this.list();
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
    list() {
        this.filSerialS.listFile(this.data.serialId, this.data.customerId, 'INICIO').subscribe(res => {
            if (res.message === 'OK') {
                this.fileList = res.object;
            } else {
                this.alertS.open(res.message, 'error');
            }
        }, err => {
            this.alertS.open(err.message, 'error');
        });
    }
    delete(fileName:string){
        this.filSerialS.deleteFile(this.data.serialId,this.data.customerId,'INICIO',fileName).subscribe(res=>{
            if(res.message==='OK'){
                if(res.object!=0){
                    this.alertS.open('Archivo eliminado!','success');
                    this.list();
                }else{
                    this.alertS.open('Error al eliminar el archivo!','error');
                }
            }else{
                this.alertS.open(res.message,'error');
            }
        },err=>{
            this.alertS.open(err.message,'error');
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
}