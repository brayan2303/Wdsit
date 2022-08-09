import { Component, Inject, ViewChild } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { ActiveFixedService } from "src/app/appActiveFixed/services/activeFixed.service";
import { ActiveFixedProfeaturService } from "src/app/appActiveFixed/services/ActiveFixedProfeatur.service";
import { AlertService } from 'src/app/shared/services/alert.service';


@Component({
    selector: 'modal-actFeatures',
    templateUrl: 'actFeatures.modal.html',
    styleUrls: ['./actFeatures.modal.css']
})
export class ActFeaturesModal {
    columns: string[];
    loading: boolean;
    @ViewChild(MatTable) table: MatTable<any>;
    dataSource = new MatTableDataSource<any>();
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    constructor(private ActiveFixedS:ActiveFixedService, private alertS: AlertService, private activeFixedProfeaturS:ActiveFixedProfeaturService,
        public dialogRef: MatDialogRef<ActFeaturesModal>,
        @Inject(MAT_DIALOG_DATA) public data: any) {
        dialogRef.disableClose = true;
        this.columns = ['id', 'name', 'asignar'];
      
        this.dataSource = new MatTableDataSource([]);
    }
    ngOnInit(): void {
        this.ActiveFixedS.findAll(this.data.id).subscribe(res => {
            this.dataSource = res.object;
        }, err => {
            this.alertS.open(err.message, 'error');
        });
        this.search();
    }
    close(): void {
        this.dialogRef.close();
    }
    checked(input: HTMLInputElement,featuresId:number) {
        if (input.checked) {
            this.activeFixedProfeaturS.create(this.data.id,featuresId).subscribe(res => {
                this.ActiveFixedS.findAll(this.data.id).subscribe(res => {
                    this.dataSource = res.object;
                    this.table.renderRows();
                }, err => {
                    this.alertS.open(err.message, 'error');
                });
            }, err => {
                this.alertS.open(err.message, 'error');
            });
        } else {            
            this.activeFixedProfeaturS.delete(this.data.id,featuresId).subscribe(res => {
            
                this.ActiveFixedS.findAll(this.data.id).subscribe(res => {
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
        this.ActiveFixedS.findAll(this.data.id).subscribe(res => {
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