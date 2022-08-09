import { Component, Inject, ViewChild } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { AlertService } from 'src/app/shared/services/alert.service';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { InvMasterInitService } from "../../services/invMasterInit.service";

@Component({
    selector: 'modal-invPersonAll',
    templateUrl: 'invPersonAll.modal.html',
    styleUrls: ['./invPersonAll.modal.css']
})
export class InvPersonAllModal {
    loading: boolean;
    columns: string[];
    dataSource = new MatTableDataSource<any>();
    @ViewChild(MatTable) table: MatTable<any>;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    title:string;

    constructor(private InvMasterInitS: InvMasterInitService, private alertS: AlertService,
        public dialogRef: MatDialogRef<InvPersonAllModal>,
        @Inject(MAT_DIALOG_DATA) public data: any) {
        dialogRef.disableClose = true;
        this.loading = false;
        this.columns = ['userName', 'firstName', 'lastName'];
        this.dataSource = new MatTableDataSource([]);
        this.title = '';
    }
    ngOnInit(): void {
        this.loading = true;
        this.InvMasterInitS.personAll().subscribe(res => {
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
           this.title = 'Listado'
        
    }
    filter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim();

        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    }
    close(id: number): void {
        this.dialogRef.close({ 'id': id });
    }
}