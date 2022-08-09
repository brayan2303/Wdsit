import { Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTable, MatTableDataSource } from "@angular/material/table";
import { AlertService } from 'src/app/shared/services/alert.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationComponent } from 'src/app/shared/components/confirmation/confirmation.component';
import { ActFeaturesModal } from "src/app/appActiveFixed/modals/features/actFeatures.modal";
import { PqrFilesService } from "src/app/appPqrs/services/pqrFiles.service";
import { PqrFilestEditComponent } from "../edit/pqrFilestEdit.component";
import { FilesData } from "src/app/appPqrs/modals/filesData/filesData.modal";


@Component({
    selector: 'app-pqrFilesList',
    templateUrl: './pqrFilesList.component.html',
    styleUrls: ['./pqrFilesList.component.css']
})

export class PqrFilesListComponent implements OnInit {

    loading: boolean;
    columns: string[];
    id: number;
    dataSource = new MatTableDataSource<any>();
    @ViewChild(MatTable) table: MatTable<any>;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    unibytes: Uint8Array = null;
    form: any;
    countryIdLocal: string;
    constructor(private PqrFilesS: PqrFilesService, private dialog: MatDialog, private alertS: AlertService) {
        this.loading = false;
        this.columns = ['name', 'typeClient', 'description', 'category', 'active', 'Acciones'];
        this.dataSource = new MatTableDataSource([]);
        this.countryIdLocal = '';
    }

    ngOnInit(): void {
        this.loading = true;
        this.countryIdLocal = localStorage.getItem('countryId');
        this.PqrFilesS.list(Number(localStorage.getItem('countryId'))).subscribe(res => {
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

    
    edit(value: number) {
        const dialogRef = this.dialog.open(PqrFilestEditComponent, {
            data: { formId: value }
        });
        dialogRef.afterClosed().subscribe(resA => {
            this.PqrFilesS.list(Number(this.countryIdLocal)).subscribe(resL => {
                if (resL.message === 'OK') {
                    this.loading = false;
                    this.dataSource = new MatTableDataSource<any>(resL.object);
                    this.dataSource.paginator = this.paginator;
                    this.dataSource.sort = this.sort;
                } else {
                    this.alertS.open(resL.message, 'error');
                }
            }, err => {
                this.alertS.open(err.message, 'error');
            });
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

    delete(value: number) {
        this.dialog.open(ConfirmationComponent, {
            data: { message: '¿ Desea eliminar el registro ?' },
            height: '250px',
            width: '400px'
        }).afterClosed().subscribe(res => {
            if (res) {
                this.PqrFilesS.delete(value).subscribe(res => {
                    if (res.message === 'OK') {
                        if (res.object != 0) {
                            this.alertS.open('Registro eliminado!', 'success');
                            this.PqrFilesS.list(Number(this.countryIdLocal)).subscribe(res => {
                                this.loading = false;
                                this.dataSource = new MatTableDataSource<any>(res.object);
                                this.dataSource.paginator = this.paginator;
                                this.dataSource.sort = this.sort;
                            }, err => {
                                this.alertS.open(err, 'error');
                            });
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
    files(name: string) {

        this.dialog.open(FilesData, {
            width: '800px',
            data: { name: name }
        });

    }

    /*  getfeatures(value:number){
          this.dialog.open(ActFeaturesModal, {
              data: { 'id': value },
              width: '600px'
          });
      } */
}