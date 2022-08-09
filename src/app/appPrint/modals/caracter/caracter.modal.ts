import { Component, Inject, ViewChild } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { AlertService } from 'src/app/shared/services/alert.service';
import { MatPaginator } from '@angular/material/paginator';
import { PriVariableService } from "../../services/priVarible.service";
import { PriCaracterService } from "../../services/priCaracter.service";

@Component({
    selector: 'modal-caracter',
    templateUrl: 'caracter.modal.html',
    styleUrls: ['./caracter.modal.css']
})
export class CaracterModalForm {
    loading: boolean;
    columns: string[];
    dataSource = new MatTableDataSource<any>();
    @ViewChild(MatTable) table: MatTable<any>;
    @ViewChild(MatPaginator) paginator: MatPaginator;

    constructor(private priCaracterS:PriCaracterService, private alertS: AlertService,
        public dialogRef: MatDialogRef<CaracterModalForm>,
        @Inject(MAT_DIALOG_DATA) public data: any) {
        dialogRef.disableClose = true;
        this.loading = false;
        this.columns = ['id', 'name'];
        this.dataSource = new MatTableDataSource([]);
    }
    ngOnInit(): void {
        this.loading = true;
        this.priCaracterS.list().subscribe(res => {
            if (res.message === 'OK') {
                this.loading = false;
                this.dataSource = new MatTableDataSource<any>(res.object);
                this.dataSource.paginator = this.paginator;
            } else {
                this.alertS.open(res.message, 'error');
            }
        }, err => {
            this.alertS.open(err.message, 'error');
        });
    }
    close(id:number,name:string): void {
        this.dialogRef.close({'id':id,'name':name});
    }
}