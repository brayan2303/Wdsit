import { Component, Inject, OnInit, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTable, MatTableDataSource } from "@angular/material/table";
import { AlertService } from 'src/app/shared/services/alert.service';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ConfirmationComponent } from 'src/app/shared/components/confirmation/confirmation.component';
import { ActiveFixedReturnService } from "src/app/appActiveFixed/services/activeFixedReturn.service";
import { ActProdDetailReturnlModal } from "src/app/appActiveFixed/modals/detailReturn/actProdDetailReturn.modal";



@Component({
    selector: 'app-activeFixedReturntListAnali',
    templateUrl: './activeFixedReturntListAnali.component.html',
    styleUrls: ['./activeFixedReturntListAnali.component.css']
})

export class ActiveFixedReturntListAnaliComponent implements OnInit {

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
    constructor(private activeFixedRetunS:ActiveFixedReturnService, private dialog: MatDialog, private alertS: AlertService) {
        this.loading = false;
        this.columns = ['identification', 'name', 'mail', 'costCenter', 'position', 'city', 'personRes', 'equipment', 'serial', 'commentary', 'creationDate','active', 'Acciones'];
        this.dataSource = new MatTableDataSource([]);
    }

    ngOnInit(): void {
        this.loading = true,
            this.list();
    }

    list() {
        this.activeFixedRetunS.list().subscribe(res => {
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

    delete(value: number) {
        this.dialog.open(ConfirmationComponent, {
            data: { message: '¿ Desea eliminar el registro ?' },
            height: '250px',
            width: '400px'
        }).afterClosed().subscribe(res => {
            if (res) {
                this.activeFixedRetunS.delete(value).subscribe(res => {
                    if (res.message === 'OK') {
                        if (res.object != 0) {
                            this.alertS.open('Registro eliminado!', 'success');
                            this.activeFixedRetunS.list().subscribe(res => {
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
        this.dialog.open(ActProdDetailReturnlModal, {
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
        downloadLink.setAttribute("download", "Activos Fijos Devolucion.csv");
        downloadLink.style.visibility = "hidden";
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
      }
 

 

    }


