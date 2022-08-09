import { Component, Inject, ViewChild } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { AlertService } from 'src/app/shared/services/alert.service';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { GenPersonService } from "src/app/appGeneral/services/genPerson.service";


@Component({
    selector: 'modal-person',
    templateUrl: 'person.modal.html',
    styleUrls: ['./person.modal.css']
})
export class PersonListModal {
    loading: boolean;
    columns: string[];
    dataSource= new MatTableDataSource<any>();
    @ViewChild(MatTable) table: MatTable<any>;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    constructor(private genPersonS:GenPersonService ,private alertS: AlertService,
        public dialogRef: MatDialogRef<PersonListModal>,
        @Inject(MAT_DIALOG_DATA) public data: any) {
        dialogRef.disableClose = true;
        this.loading = false;
        this.columns = ['firstName','lastName','mail'];
        this.dataSource = new MatTableDataSource([]);
    }
    ngOnInit(): void {
        this.loading = true;
        this.genPersonS.list().subscribe(res => {
            if (res.message === 'OK') {
                this.loading = false;
                this.dataSource= new MatTableDataSource<any>(res.object);
                this.dataSource.paginator = this.paginator;
                this.dataSource.sort = this.sort;
            } else {
                this.alertS.open(res.message, 'error');
            }
        }, err => {
            this.alertS.open(err.message, 'error');
        });
    }
    filter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim();

        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    }
    close(id:number,firstName:string,lastName:string,email:string): void {
        this.dialogRef.close({'id':id,'person':firstName+'|'+lastName+'|'+email});
    }
}