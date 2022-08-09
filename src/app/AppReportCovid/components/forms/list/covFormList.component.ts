import { Component, Input, OnInit, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTable, MatTableDataSource } from "@angular/material/table";
import { AlertService } from 'src/app/shared/services/alert.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationComponent } from 'src/app/shared/components/confirmation/confirmation.component';
import { GenPersonEntity } from 'src/app/appGeneral/entities/genPerson.entity';
import { FilesModalDay } from "src/app/appReportCovid/modals/files/filesDay.modal";
import { covFormService } from "src/app/appReportCovid/services/covFormReport.services";
import { DetailRegisterModal } from "src/app/appReportCovid/modals/detailCov/detailCov.modal";
import { DetailDetailRegisterModal } from "src/app/appReportCovid/modals/detailResgisCov/detailResgisCov.modal";



@Component({
    selector: 'app-covFormList',
    templateUrl: './covFormList.component.html',
    styleUrls: ['./covFormList.component.css']
})

export class CovFormListComponent implements OnInit {

    loading: boolean;
    columns: string[];
    genPersonEntity: GenPersonEntity;
    dataSource = new MatTableDataSource<any>();
    @Input() formId: number;
    @ViewChild(MatTable) table: MatTable<any>;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    unibytes: Uint8Array = null;
    //Constructor
    constructor(private covFormS: covFormService, private dialog: MatDialog, private alertS: AlertService) {
        this.loading = false;
        this.columns = ['id','identificationUser', 'company', 'creationUser', 'positions',
            'phone', 'mobile',  'creationDate',
            'active', 'Acciones'];
        this.dataSource = new MatTableDataSource([]);
    }

    ngOnInit(): void {
        this.loading = true,
        this.search();
    }
    search(){
        this.covFormS.list().subscribe(res => {
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
                this.covFormS.delete(value).subscribe(res => {
                    if (res.message === 'OK') {
                        if (res.object != 0) {
                            this.alertS.open('Registro eliminado!', 'success');
                            this.covFormS.list().subscribe(res => {
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

    files(identificationUserCar: number, creationDate: Date) {

        this.dialog.open(FilesModalDay, {
            width: '800px',
            data: { identification: identificationUserCar, creationDate: creationDate }
        });
    }
    activeInactive(id: number, status: boolean) {
        this.covFormS.activeInactive(id, !status).subscribe(res => {
            if (res.message === 'OK') {
                if (res.object != 0) {
                    this.alertS.open(status === true ? 'Registro activo!' : 'Registro inactivo!', 'success');
                    this.loading = true,
                        this.covFormS.list().subscribe(res => {
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
                } else {
                    this.alertS.open(status === true ? 'Error al activar!' : 'Error al inactivar!', 'error');
                }
            } else {
                this.alertS.open(res.message, 'error');
            }
        }, err => {
            this.alertS.open(err.message, 'error');
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
        downloadLink.setAttribute("download", "Inicio de proceso.csv");
        downloadLink.style.visibility = "hidden";
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
      }

      
    register(id: number) {

        this.dialog.open(DetailRegisterModal, {
            width: '800px',
            data: { id: id, }
        });
    }
    details(id: number) {

        this.dialog.open(DetailDetailRegisterModal, {
            width: '800px',
            data: { id: id, }
        });
    }
}