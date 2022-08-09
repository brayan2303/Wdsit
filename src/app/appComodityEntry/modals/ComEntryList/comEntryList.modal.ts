import { Component, Inject, Input, ViewChild } from "@angular/core";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AlertService } from 'src/app/shared/services/alert.service';
import { MatTable, MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { ComCommodityEntryService } from "../../services/ComCommodityEntryService";
import { ComCommodityEntryEntity } from "../../entities/ComCommodityEntryEntity";

@Component({
    selector: 'comEntryList',
    templateUrl: 'comEntryList.modal.html',
    styleUrls: ['./comEntryList.modal.css']
})
export class ComEntryListModal {
    public loading: boolean;
    columns: string[];

    dataSource = new MatTableDataSource<any>();
    @ViewChild(MatTable) table: MatTable<any>;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;


    constructor(private alertS: AlertService, public dialogRef: MatDialogRef<ComEntryListModal>, private dialog: MatDialog,
        @Inject(MAT_DIALOG_DATA) public data: any, private ComS:ComCommodityEntryService) {

        dialogRef.disableClose = true;
        this.loading = false;
        
        this.columns = ['number','customerName', 'city','origin', 'originType', 'userName', 'creationDate', 'state'];
        this.dataSource = new MatTableDataSource([]);

    }

    ngOnInit(): void {
        this.list();
    }

    list() {
        this.ComS.listToSap(this.data.customerId).subscribe(res => {
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
    }

    close(item: ComCommodityEntryEntity): void {
        this.dialogRef.close({'object':item});
    }

    closeEntry(): void {
        this.dialogRef.close();
    }

    filter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim();
    
        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    }

}