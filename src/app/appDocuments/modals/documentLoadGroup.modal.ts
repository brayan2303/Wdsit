import { Component, Inject, ViewChild } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort, MatSortHeader } from "@angular/material/sort";
import { MatTable, MatTableDataSource } from "@angular/material/table";
import { AlertService } from "src/app/shared/services/alert.service";
import { DocumentLoadAssigService } from "../services/DocumentLoadAssig.Service";

@Component({
    selector: 'modal-documentLoadGroup',
    templateUrl: 'documentLoadGroup.modal.html',
    styleUrls: ['./documentLoadGroup.modal.css']
})
export class DocumentLoadGroupModal {
    columns: string[];
    loading: boolean;
    @ViewChild(MatTable) table: MatTable<any>;
    dataSource = new MatTableDataSource<any>();
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;


    constructor(private alertS: AlertService, private documentLoadSe: DocumentLoadAssigService,
        public dialogRef: MatDialogRef<DocumentLoadGroupModal>,
        @Inject(MAT_DIALOG_DATA) public data: any) {
        dialogRef.disableClose = true;
        this.columns = ['id', 'description', 'actions'];
        this.dataSource = new MatTableDataSource([]);
    }

    ngOnInit(): void {
        console.log(this.data.id)
        this.documentLoadSe.findAll(this.data.id).subscribe(res => {
            this.dataSource = res.object;
        }, err => {
            this.alertS.open(err.message, 'error');
        });
        this.search();
    }

    close(): void {
        this.dialogRef.close();
    }
    
    checked(input: HTMLInputElement, groupId:number) {
        if (input.checked) {
            this.documentLoadSe.create(this.data.id, groupId).subscribe(res => {          
                this.documentLoadSe.findAll(this.data.id).subscribe(res => {
                    this.dataSource = res.object;
                    this.table.renderRows(); // posicionamiento y actualizacion de un drownDropList   
                }, err => {
                    this.alertS.open(err.message, 'error');
                });
            }, err => {
                this.alertS.open(err.message, 'error');
            });
        } else {
            this.documentLoadSe.delete(this.data.id, groupId).subscribe(res => {
                this.documentLoadSe.findAll(this.data.id).subscribe(res => {           
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

    search() {
        this.documentLoadSe.findAll(this.data.id).subscribe(res => {
            if (res.message == 'OK') {
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



