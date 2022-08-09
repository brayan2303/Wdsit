import { Component, Inject, ViewChild } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { AlertService } from 'src/app/shared/services/alert.service';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { InvMasterInitTigoService } from "src/app/appInventory/services/invMasterInitTigo.service";

@Component({
    selector: 'modal-invMasterTypeTigo',
    templateUrl: 'invMasterTypeTigo.modal.html',
    styleUrls: ['./invMasterTypeTigo.modal.css']
})
export class InvMasterTypeTigoModal {
    loading: boolean;
    columns: string[];
    dataSource = new MatTableDataSource<any>();
    @ViewChild(MatTable) table: MatTable<any>;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    title:string;

    constructor(private InvMasterInitTigoS: InvMasterInitTigoService, private alertS: AlertService,
        public dialogRef: MatDialogRef<InvMasterTypeTigoModal>,
        @Inject(MAT_DIALOG_DATA) public data: any) {
        dialogRef.disableClose = true;
        this.loading = false;
        this.columns = ['code', 'description'];
        this.dataSource = new MatTableDataSource([]);
        this.title = '';
    }
    ngOnInit(): void {
        this.loading = true;
        this.InvMasterInitTigoS.listMasterType(this.data.type).subscribe(res => {
            if (res.message === 'OK') {
                this.loading = false;
                this.dataSource = new MatTableDataSource<any>(res.object);
                this.dataSource.paginator = this.paginator;
                this.dataSource.sort = this.sort;
            } else {
                this.alertS.open(res.message, 'error');
            }
        }, err => {
            this.alertS.open(err.message, 'error');
        });
        if(this.data.type == 'TIPOLOGIA'){
            this.title = 'Listado de tipologias'
        }else
        if(this.data.type == 'CODIGOSAP'){
            this.title = 'Listado de codigos sap'
        }else
        if(this.data.type == 'UBICACION'){
            this.title = 'Listado de ubicaciones'
        }else{
            this.title = 'Listado'
        }
    }
    filter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim();

        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    }
    close(code: string): void {
        this.dialogRef.close({ 'code': code });
    }
}