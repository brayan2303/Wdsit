import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AlertService } from 'src/app/shared/services/alert.service';
import { ComCommodityPalletModel } from 'src/app/appComodityEntry/models/comCommodityPalletModel';
import { InvMasterInitTigoService } from 'src/app/appInventory/services/invMasterInitTigo.service';

@Component({
    selector: 'app-invPalletGenerateTigo',
    templateUrl: './invPalletGenerateTigo.component.html',
    styleUrls: ['./invPalletGenerateTigo.component.css']
})
export class InvPalletGenerateTigoComponent implements OnInit {
    loading: boolean;
    columns: string[];

    palletId:string;

    constructor(private dialog: MatDialog, private alertS: AlertService, private InvMasterInitTigoS: InvMasterInitTigoService) {
        this.loading = false;
    }

    ngOnInit(): void {
    }

    getDocument(){
        //Busqueda del certificado
        this.InvMasterInitTigoS.generatePallet(this.palletId).subscribe(res => {
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