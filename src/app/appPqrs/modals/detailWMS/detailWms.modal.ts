import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AlertService } from 'src/app/shared/services/alert.service';
import { PqrPqrsFileModel } from '../../models/pqrPqrsFile.model';
import { WtsPService } from "../../services/pqrWts.service";
import { wtspModel } from "../../models/wtsp.model";

@Component({
    selector: 'modal-detailWms',
    templateUrl: 'detailWms.modal.html',
    styleUrls: ['./detailWms.modal.css']
})
export class DetailWMSModal {
    loading: boolean;
    pqrPqrsEntity: wtspModel;
    fileStartList: PqrPqrsFileModel[];
    fileEndList: PqrPqrsFileModel[];
    wtspModelDocumentList: wtspModel[];
    wtspModelSerialList: wtspModel[];
    wtspModelPhoneList: wtspModel[];
    wtspModelImeiList: wtspModel[];
 



    constructor(private pqrPqrsS: WtsPService, private alertS: AlertService,
        public dialogRef: MatDialogRef<DetailWMSModal>,
        @Inject(MAT_DIALOG_DATA) public data: any) {
        this.loading = false;
        this.pqrPqrsEntity = new wtspModel();
        this.wtspModelDocumentList =[];
        this.wtspModelSerialList = [];
        this.wtspModelPhoneList = [];
        this.wtspModelImeiList = [];
        this.fileStartList = [];
        this.fileEndList = [];
    }
    ngOnInit(): void {
        this.loading = true;
        var array1 = this.data.detail.split(",");
        var index = 0;
        for (index = 0; index < array1.length; index++) {
            let element = array1[index];
            if(element.includes("SERIAL"))
            {
                let element2 = element.split(":");
                this.findSerial(element2[1]);
                
            } else if(element.includes("CELULAR"))
            {
                let element2 = element.split(":");
                this.findPhone(element2[1]);
            } else if(element.includes("CEDULA"))
            {
                let element2 = element.split(":");
                this.findDocument(element2[1]);
            } else if(element.includes("IMEI"))
            {
                let element2 = element.split(":");
                this.findIMEI(element2[1]);
            }
            
        }
        if(array1.length == 1)
        {
            this.findSerial(array1[0]);
            this.findIMEI(array1[0]);
        }
    }

    findDocument(document:string){
        this.loading = true;
        this.pqrPqrsS.listDocument(document).subscribe(res => {
            if (res.message === 'OK') {
                this.loading = false;
                this.wtspModelDocumentList = res.object;
            } else {
            }
        }, err => {
        });
    }

    findPhone(telephone:string){
        this.loading = true;
        this.pqrPqrsS.listPhone(telephone).subscribe(res => {
            if (res.message === 'OK') {
                this.loading = false;
                this.wtspModelPhoneList = res.object;
            } else {
            
            }
        }, err => {
        });
    }

    findSerial(serial:string){
        this.loading = true;
        this.pqrPqrsS.listSerial(serial).subscribe(res => {
            if (res.message === 'OK') {
                this.loading = false;
                this.wtspModelSerialList = res.object;
            } else {
            }
        }, err => {
        });
    }

    findIMEI(serial:string){
        this.loading = true;
        this.pqrPqrsS.listSerial(serial).subscribe(res => {
            if (res.message === 'OK') {
                this.loading = false;
                this.wtspModelImeiList = res.object;
            } else {
            }
        }, err => {
        });
    }
    close(): void {
        this.dialogRef.close();
    }
}