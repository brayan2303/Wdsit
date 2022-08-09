import { Component, Inject, ViewChild } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { AlertService } from 'src/app/shared/services/alert.service';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { PqrAgentService } from '../../services/pqrAgent.service';

@Component({
    selector: 'modal-agent',
    templateUrl: 'agent.modal.html',
    styleUrls: ['./agent.modal.css']
})
export class AgentModal {
    loading: boolean;
    columns: string[];
    dataSource= new MatTableDataSource<any>();
    @ViewChild(MatTable) table: MatTable<any>;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    countryIdLocal:string;

    constructor(private pqrAgentS:PqrAgentService,private alertS: AlertService,
        public dialogRef: MatDialogRef<AgentModal>,
        @Inject(MAT_DIALOG_DATA) public data: any) {
        dialogRef.disableClose = true;
        this.loading = false;
        this.columns = ['firstName','lastName','mail'];
        this.dataSource = new MatTableDataSource([]);
        this.countryIdLocal = '';
    }
    ngOnInit(): void {
        this.loading = true;
        this.countryIdLocal=localStorage.getItem('countryId');
        this.pqrAgentS.list(Number(this.countryIdLocal)).subscribe(res => {
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
    close(personId:number,firstName:string,lastName:string): void {
        this.dialogRef.close({personId:personId,firstName:firstName,lastName:lastName});
    }
}