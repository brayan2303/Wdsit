import { Component, Inject, ViewChild } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { AlertService } from 'src/app/shared/services/alert.service';
import { PqrUserProjectService } from "../../services/pqrUserProject.service";


@Component({
    selector: 'modal-pqrUserProject',
    templateUrl: 'pqrUserProject.modal.html',
    styleUrls: ['./pqrUserProject.modal.css']
})
export class PqrUserProjectModal {
    columns: string[];
    loading: boolean;
    @ViewChild(MatTable) table: MatTable<any>;
    dataSource = new MatTableDataSource<any>();
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    constructor(private alertS: AlertService, private pqrUserProjectS:PqrUserProjectService,
        public dialogRef: MatDialogRef<PqrUserProjectModal>,
        @Inject(MAT_DIALOG_DATA) public data: any) {
        dialogRef.disableClose = true;
        this.columns = ['id', 'name', 'asignar'];
      
        this.dataSource = new MatTableDataSource([]);
    }
    ngOnInit(): void {
        this.pqrUserProjectS.findAll(this.data.userId).subscribe(res => {
            this.dataSource = res.object;
        }, err => {
            this.alertS.open(err.message, 'error');
        });
        this.search();
    }
    close(): void {
        this.dialogRef.close();
    }
    checked(input: HTMLInputElement,projectId:number) {
        if (input.checked) {
            this.pqrUserProjectS.create(this.data.userId, projectId).subscribe(res => {
                this.pqrUserProjectS.findAll(this.data.userId).subscribe(res => {
                    this.dataSource = res.object;
                    this.table.renderRows();
                }, err => {
                    this.alertS.open(err.message, 'error');
                });
            }, err => {
                this.alertS.open(err.message, 'error');
            });
        } else {
            this.pqrUserProjectS.delete(this.data.userId,projectId).subscribe(res => {
                this.pqrUserProjectS.findAll(this.data.userId).subscribe(res => {
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
        this.pqrUserProjectS.findAll(this.data.userId).subscribe(res => {
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