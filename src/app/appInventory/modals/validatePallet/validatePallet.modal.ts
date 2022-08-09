import { Component, Inject, ViewChild } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { AlertService } from 'src/app/shared/services/alert.service';
import { MatPaginator } from '@angular/material/paginator';
import { InvCoutingService } from "../../services/invCouting.service";
import { GenPersonEntity } from "src/app/appGeneral/entities/genPerson.entity";
import { InvSerialService } from "../../services/invSerial.service";

@Component({
    selector: 'validatePallet',
    templateUrl: 'validatePallet.modal.html',
    styleUrls: ['./validatePallet.modal.css']
})
export class ValidatePalletModal {
    loading: boolean;
    columns: string[];
    dataSource = new MatTableDataSource<any>();
    @ViewChild(MatPaginator) paginator: MatPaginator;
    personEntity:GenPersonEntity;

    constructor(private invCoutingS:InvCoutingService,private invSerialS:InvSerialService, private alertS: AlertService,
        public dialogRef: MatDialogRef<ValidatePalletModal>,
        @Inject(MAT_DIALOG_DATA) public data: any) {
        dialogRef.disableClose = true;
        this.loading = false;
        this.columns = ['serial', 'mac','sapCode','sapCodeSap','sapCodeWms','sapCodeBase','status','statusSap','statusWms','statusBase','pallet','palletSap','palletWms'];
        this.dataSource = new MatTableDataSource([]);
    }
    ngOnInit(): void {
        this.loading = true;
        this.personEntity=JSON.parse(localStorage.getItem('user'));
        this.invCoutingS.validatePallet(this.data.cyclicId,this.data.pallet,this.personEntity.id).subscribe(res=>{
            if(res.message==='OK'){
                this.dataSource=new MatTableDataSource(res.object);
                this.dataSource.paginator=this.paginator;
                this.loading=false;
            }else{
                this.alertS.open(res.message,'error');
            }
        },err=>{
            this.alertS.open(err.message,'error');
        });
    }
    validate(){
        this.invSerialS.createAll(this.data.coutingEntity.coutingType, this.data.coutingEntity.id, this.personEntity.id, this.dataSource.data).subscribe(resC => {
            if (resC.message === 'OK') {
                if (resC.object != 0) {
                    this.alertS.open('Registros insertados!','success');
                    this.close(true);
                } else {
                    this.alertS.open('Error al insertar los registros!', 'error');
                }
            } else {
                this.alertS.open(resC.message, 'error');
            }
        }, err => {
            this.alertS.open(err.message, 'error');
        });
    }
    close(status:boolean): void {
        this.dialogRef.close(status);
    }
}