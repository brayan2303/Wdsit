import { Component, OnInit, ViewChild } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTable, MatTableDataSource } from "@angular/material/table";
import { DocumentLoadService } from "src/app/appDocuments/services/DocumentLoad.Service";
import { ConfirmationComponent } from "src/app/shared/components/confirmation/confirmation.component";

import { AlertService } from "src/app/shared/services/alert.service";
import { DocumentLoadEditComponent } from "../edit/documentLoadEdit.component";

@Component({
    selector: 'app-documentLoadListD',
    templateUrl: './documentLoadListD.component.html',
    styleUrls: ['./documentLoadListD.component.css']
})
export class DocumentLoadListDocComponent implements OnInit {
    loading: boolean;
    columns: string[];
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatTable) table: MatTable<any>;
    @ViewChild(MatSort) sort: MatSort;
    dataSource = new MatTableDataSource<any>();
    form: any;

    constructor(private documentLoadEs: DocumentLoadService, private dialog: MatDialog, private alertS: AlertService) {
        this.loading = false;
        this.columns = ['userPropertyIdentification', 'userPropertyName', 'documentName', 'version', 'creationDate', 'active', 'actions'];
        this.dataSource = new MatTableDataSource([]);
    }
    ngOnInit(): void {
        this.loading = true;
        this.search();
    }

    search() {
        this.documentLoadEs.list().subscribe(res => {
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

    edit(docLoadformId: number) {
        const dialogRef = this.dialog.open(DocumentLoadEditComponent, {
            data: { docLoadformId: docLoadformId }
        });
        dialogRef.afterClosed().subscribe(resA => {
            this.documentLoadEs.list().subscribe(resB => {
                if (resB.message === 'OK') {
                    this.loading = false;
                    this.dataSource = new MatTableDataSource<any>(resB.object);
                    this.dataSource.paginator = this.paginator;
                } else {
                    this.alertS.open(resB.message, 'error');

                }
            }, err => {
                this.alertS.open(err.message, 'error');
            });
        }, err => {
            this.alertS.open(err.message, 'error');
        });
    }

    delete(value: number) {
        this.dialog.open(ConfirmationComponent, {
            data: { message: '¿ Desea eliminar el registro ?' },
            height: '250px',
            width: '400px'
        }).afterClosed().subscribe(res => {
            if (res) {
                this.documentLoadEs.delete(value).subscribe(res => {
                    if (res.message === 'OK') {
                        if (res.object != 0) {
                            this.alertS.open('Registro eliminado!', 'success');
                            this.search();
                        } else {
                            this.alertS.open(res.message, 'error');
                        }
                    } else {
                        this.alertS.open(res.message, 'error');
                    }
                }, err => {
                    this.alertS.open(err.message, 'error');
                });
            }
        }, err => {
            this.alertS.open(err.message, 'error');
        });
    }
}