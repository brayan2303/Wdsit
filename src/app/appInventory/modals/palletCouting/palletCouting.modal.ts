import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { AlertService } from 'src/app/shared/services/alert.service';
import { InvPalletService } from "../../services/invPallet.service";

@Component({
    selector: 'modal-palletCouting',
    templateUrl: 'palletCouting.modal.html',
    styleUrls: ['./palletCouting.modal.css']
})
export class PalletCoutingModal {
    loading: boolean;
    columns: string[];
    dataSource = new MatTableDataSource<any>();

    constructor(private invPalletS:InvPalletService,private alertS: AlertService,
        public dialogRef: MatDialogRef<PalletCoutingModal>,
        @Inject(MAT_DIALOG_DATA) public data: any) {
        dialogRef.disableClose = true;
        this.loading = false;
        this.columns = ['coutingType', 'status','type','quantity','startDate','endDate','assistant'];
        this.dataSource = new MatTableDataSource([]);
    }
    ngOnInit(): void {
        this.loading = true;
        this.invPalletS.findCouting(this.data.palletId).subscribe(res=>{
            if(res.message==='OK'){
                this.dataSource=new MatTableDataSource(res.object);
                this.loading=false;
            }else{
                this.alertS.open(res.message,'error');
            }
        },err=>{
            this.alertS.open(err.message,'error');
        });
    }
    close(): void {
        this.dialogRef.close();
    }
}