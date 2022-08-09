import { Component, Inject, OnInit, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTable, MatTableDataSource } from "@angular/material/table";
import { AlertService } from 'src/app/shared/services/alert.service';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ConfirmationComponent } from 'src/app/shared/components/confirmation/confirmation.component';
import { ActiveFixedAssigmentService } from "src/app/appActiveFixed/services/activeFixedAssigment.service";
import { ActFeaturesAssigmentEditComponent } from "../edit/ActFeaturesAssigmetEdit.component";
import { ActDetailAllModal } from "src/app/appActiveFixed/modals/detailsAll/actProdDetailAll.modal";
import { ActiveFixedAssigSerialService } from "src/app/appActiveFixed/services/activeFixedAssigSerial.service";



@Component({
    selector: 'app-actListAnali',
    templateUrl: './actListAnali.component.html',
    styleUrls: ['./actListAnali.component.css']
})

export class ActListAnaliComponent implements OnInit {

    loading: boolean;
    columns: string[];
    id: number;
    dataSource = new MatTableDataSource<any>();
    @ViewChild(MatTable) table: MatTable<any>;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @Inject(MAT_DIALOG_DATA) public data: any
    @ViewChild(MatSort) sort: MatSort;
    unibytes: Uint8Array = null;
    form: any;
    constructor(private activeFixedAsigmentS: ActiveFixedAssigmentService, private dialog: MatDialog, private alertS: AlertService, private activeFixedSerialesS:ActiveFixedAssigSerialService) {
        this.loading = false;
        this.columns = ['identification', 'name', 'mail', 'costCenter', 'position', 'city', 'product', 'serial', 'creationDate', 'statusEquipament', 'exitPermanent', 'nameRes','active', 'Acciones'];
        this.dataSource = new MatTableDataSource([]);
    }

    ngOnInit(): void {
        this.loading = true,
            this.list();
    }

    list() {
        this.activeFixedAsigmentS.list().subscribe(res => {
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
        const dialogRef = this.dialog.open(ActFeaturesAssigmentEditComponent, {
            data: { ActFixAsigformId: value }
        });
        dialogRef.afterClosed().subscribe(resA => {
            this.activeFixedAsigmentS.list().subscribe(resL => {
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
                this.activeFixedAsigmentS.delete(value).subscribe(res => {
                    if (res.message === 'OK') {
                        if (res.object != 0) {
                            this.alertS.open('Registro eliminado!', 'success');
                            this.activeFixedAsigmentS.list().subscribe(res => {
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

    detail(id:number, identification: number, creationDate: string) {
        this.dialog.open(ActDetailAllModal, {
            width: '100%',
            data: {id: id, identification:identification, creationDate:creationDate}
        });
    }
    download() {
        let delimiter = "\\";
        let headers = '';
        let file = '';
    
        for (let i = 0; i < this.columns.length; i++) {
          headers = headers + this.columns[i];
          if (i < this.columns.length - 1) {
            headers = headers + delimiter;
          }
        }
        file = headers;
        for (let i = 0; i < this.dataSource.data.length; i++) {
          file = file + "\n";
          for (let j = 0; j < this.columns.length; j++) {
            file = file + this.dataSource.data[i][this.columns[j]];
            file = file + delimiter;
          }
        }
        let blob = new Blob(['\ufeff' + file], { type: 'text/csv;charset=utf-8;' });
        let url = URL.createObjectURL(blob);
        let downloadLink = document.createElement("a");
        downloadLink.setAttribute("href", url);
        downloadLink.setAttribute("download", "Activos Fijos.csv");
        downloadLink.style.visibility = "hidden";
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
      }
 

    }


