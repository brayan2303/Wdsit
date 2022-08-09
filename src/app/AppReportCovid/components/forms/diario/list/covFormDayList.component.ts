import { CovFormDayEntity } from './../../../../entities/covFormDay.entity';
import { Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTable, MatTableDataSource } from "@angular/material/table";
import { AlertService } from 'src/app/shared/services/alert.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationComponent } from 'src/app/shared/components/confirmation/confirmation.component';
import { GenPersonEntity } from 'src/app/appGeneral/entities/genPerson.entity';
import { covFormDayService } from "src/app/appReportCovid/services/covFormDayReport.service";
import { FilesFormModalDay } from "src/app/appReportCovid/modals/filesDay/fileFormDay.modal";
import { RepLogService } from "src/app/appReport/services/repLog.service";
import { RepReportEntity } from "src/app/appReport/entities/repReport.entity";



@Component({
    selector: 'app-covFormDayList',
    templateUrl: './covFormDayList.component.html',
    styleUrls: ['./covFormDayList.component.css']
})

export class CovFormDayListComponent implements OnInit {
    
    loading: boolean;
    columns: string[];
    id:number;
    genPersonEntity: GenPersonEntity;
    repReportEntity: RepReportEntity;
    covFormDayEntity:CovFormDayEntity;
    dataSource = new MatTableDataSource<any>();
    @ViewChild(MatTable) table: MatTable<any>;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    unibytes: Uint8Array = null;
    form: any;
    constructor(private covFormDayS: covFormDayService,private repLogS: RepLogService, private dialog: MatDialog, private alertS: AlertService) {
        this.loading = false;   
        this.columns = ['identificationUser','name', 'hasSymptoms', 'symptomsDate', 'descripSymptims', 'typeDocument', 'creationDate',  'active', 'Acciones'];
        this.dataSource = new MatTableDataSource([]);
    }

    ngOnInit(): void {
        this.loading = true,
            this.search();
    }

    search(){
        this.covFormDayS.list().subscribe(res => {
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

    delete(value:number) {
        this.dialog.open(ConfirmationComponent, {
            data: { message: '¿ Desea eliminar el registro ?' },
            height: '250px',
            width: '400px'
        }).afterClosed().subscribe(res => {
            if (res) {
                this.covFormDayS.delete(value).subscribe(res => {
                    if (res.message === 'OK') {
                        if (res.object != 0) {
                            this.alertS.open('Registro eliminado!', 'success');
                            this.covFormDayS.list().subscribe(res => {
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
    files(identificationUserCar: number, creationDate:Date) {
        
        this.dialog.open(FilesFormModalDay, {
            width: '800px',
            data: { identification: identificationUserCar, creationDate:creationDate }
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
    downloadLink.setAttribute("download", "Diario Covid.csv");
    downloadLink.style.visibility = "hidden";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  }
  
  activeInactive(id: number, status: boolean) {
    this.covFormDayS.activeInactive(id, !status).subscribe(res => {
        if (res.message === 'OK') {
            if (res.object != 0) {
                this.alertS.open(status === true ? 'Registro activo!' : 'Registro inactivo!', 'success');
                this.loading = true,
                    this.covFormDayS.list().subscribe(res => {
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
}