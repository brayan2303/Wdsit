import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AlertService } from 'src/app/shared/services/alert.service';
import { InvMasterInitService } from '../../services/invMasterInit.service';
import { ComCommodityPalletModel } from 'src/app/appComodityEntry/models/comCommodityPalletModel';

@Component({
    selector: 'app-invPalletGenerate',
    templateUrl: './invPalletGenerate.component.html',
    styleUrls: ['./invPalletGenerate.component.css']
})
export class invPalletGenerateComponent implements OnInit {
    loading: boolean;
    columns: string[];

    palletId:string;

    constructor(private dialog: MatDialog, private alertS: AlertService, private InvMasterInitS: InvMasterInitService) {
        this.loading = false;
    }

    ngOnInit(): void {
    }

    getDocument(){
        //Busqueda del certificado
        this.InvMasterInitS.generatePallet(this.palletId).subscribe(res => {
            if (res.message === 'OK') {
            //Descarga de lo obtenido.
            this.downloadFile(res.object);
            } else {
                this.alertS.open(res.message, 'error');
            }
        }, err => {
            this.alertS.open(err.message, 'error');
        });
    }

    //Descargar el documento obtenido
    downloadFile(file: ComCommodityPalletModel) {
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