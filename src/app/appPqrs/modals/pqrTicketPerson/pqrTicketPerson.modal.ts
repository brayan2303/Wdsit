import { Component, Inject, ViewChild } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { AlertService } from 'src/app/shared/services/alert.service';
import { PqrPersonMasterService } from "../../services/pqrPersonMaster.service";
import { PqrTicketPersonService } from "../../services/pqrTicketPerson.service";


@Component({
    selector: 'modal-pqrTicketPerson',
    templateUrl: 'pqrTicketPerson.modal.html',
    styleUrls: ['./pqrTicketPerson.modal.css']
})
export class PqrTicketPersonModal {
    columns: string[];
    loading: boolean;
    @ViewChild(MatTable) table: MatTable<any>;
    dataSource = new MatTableDataSource<any>();
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    constructor(private alertS: AlertService, private pqrTicketPersonS:PqrTicketPersonService,
        public dialogRef: MatDialogRef<PqrTicketPersonModal>,
        @Inject(MAT_DIALOG_DATA) public data: any) {
        dialogRef.disableClose = true;
        this.columns = ['id', 'name', 'asignar'];
      
        this.dataSource = new MatTableDataSource([]);
    }
    ngOnInit(): void {
        this.pqrTicketPersonS.findAll(this.data.userId).subscribe(res => {
            
            this.dataSource = res.object;
        }, err => {
            this.alertS.open(err.message, 'error');
        });
        this.search();
    }
    close(): void {
        this.dialogRef.close();
    }
    checked(input: HTMLInputElement,pqrTicketId:number) {
        if (input.checked) {
            this.pqrTicketPersonS.create(this.data.userId, pqrTicketId).subscribe(res => {
                this.pqrTicketPersonS.findAll(this.data.userId).subscribe(res => {
                    this.dataSource = res.object;
                    this.table.renderRows();
                }, err => {
                    this.alertS.open(err.message, 'error');
                });
            }, err => {
                this.alertS.open(err.message, 'error');
            });
        } else {
            this.pqrTicketPersonS.delete(this.data.userId,pqrTicketId).subscribe(res => {
                this.pqrTicketPersonS.findAll(this.data.userId).subscribe(res => {
                    this.dataSource = res.object;
                    this.table.renderRows();
                }, err => {
                    this.alertS.open(err.message, 'error');
                });
            }, err => {
                this.alertS.open(err.message, 'error');
            });
        }
    }
    search(){
        this.pqrTicketPersonS.findAll(this.data.userId).subscribe(res => {
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
 
    filter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim();

        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    }
}