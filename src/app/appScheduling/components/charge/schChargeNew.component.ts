import { Component, OnInit, ViewChild } from "@angular/core";
import { AlertService } from 'src/app/shared/services/alert.service';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ConfirmationComponent } from 'src/app/shared/components/confirmation/confirmation.component';
import { SchPaisEntity } from 'src/app/appScheduling/entities/schPais.entity';
import { SchPaisService } from 'src/app/appScheduling/services/schPais.service';
import { SchClientBaseService } from "../../services/schClientBase.service";
import { GenPersonCustomerService } from "src/app/appGeneral/services/genPersonCustomer.service";
import { GenCustomerEntity } from "src/app/appGeneral/entities/genCustomer.entity";

@Component({
    selector: 'app-schChargeNew',
    templateUrl: './schChargeNew.component.html',
    styleUrls: ['./schChargeNew.component.css']
})
export class SchChargeNewComponent implements OnInit {
    loading: boolean;
    uploading: boolean;
    editing: number;
    header: string[];
    columns: string[];
    customerList: GenCustomerEntity[];
    dataSource = new MatTableDataSource<any>();
    customerId:number;
    @ViewChild(MatTable) table: MatTable<any>;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    constructor(private schClientBaseS: SchClientBaseService, private GenPersonS:GenPersonCustomerService, private dialog: MatDialog, private alertS: AlertService) {
        this.loading = false;
        this.uploading = false;
        this.customerId=0;
        this.editing = 0;
        this.customerList=[];
        this.columns = ['customer', 'identification', 'nameComplete', 'email', 'telephone', 'celphone','address','departament','province','district'];
        this.header = ['CLIENTE', 'IDENTIFICACION', 'NOMBRE COMPLETO', 'EMAIL', 'TELEFONO', 'CELULAR','DIRECCION','DEPARTAMENTO','PROVINCIA','DISTRITO'];
        this.dataSource = new MatTableDataSource([]);
    }
    ngOnInit(): void {
        this.listCustomer();
    }

    load(file: FileList) {
    if (file.length > 0) {
      this.uploading = true;
      this.schClientBaseS.create(this.customerId, file[0]).subscribe(resC => {
        if (resC.message === 'OK') {
          if (resC.object != 0) {
            this.alertS.open('Archivo cargado!', 'success');
            this.loading = true;
            this.uploading = false;
            this.schClientBaseS.createHistory(this.customerId,JSON.parse(localStorage.getItem('user')).id).subscribe(resL => {
              if (resL.message === 'OK') {
                this.alertS.open('Historico Creado!', 'success');
              } else {
                this.alertS.open(resL.message, 'error');
              }
            }, err => {
              this.alertS.open(err.message, 'error');
              this.uploading = false;
            });
            this.schClientBaseS.list(this.customerId).subscribe(resL => {
              if (resL.message === 'OK') {
                this.dataSource = new MatTableDataSource(resL.object);
                this.dataSource.paginator = this.paginator;
                this.loading = false;
                this.uploading = false;
              } else {
                this.alertS.open(resL.message, 'error');
                this.uploading = false;
              }
            }, err => {
              this.alertS.open(err.message, 'error');
              this.uploading = false;
            });
          } else {
            this.alertS.open('Error al cargar el archivo!', 'error');
            this.uploading = false;
          }
        } else {
          this.alertS.open(resC.message, 'error');
          this.uploading = false;
        }
      }, err => {
        this.alertS.open(err.message, 'error');
        this.uploading = false;

      });
      (document.getElementById('serials') as HTMLInputElement).value = null;
    }
    }

    list(){
        this.loading = true;
        this.schClientBaseS.list(this.customerId).subscribe(resL => {
            if (resL.message === 'OK') {
                this.dataSource = new MatTableDataSource(resL.object);
                this.dataSource.paginator = this.paginator;
                this.loading = false;
                this.uploading = false;
            } else {
                this.alertS.open(resL.message, 'error');
                this.uploading = false;
                this.loading = false;
            }
            }, err => {
                this.alertS.open(err.message, 'error');
                this.uploading = false;
                this.loading = false;
            });
    }

    listCustomer(){
        this.GenPersonS.listCustomer(JSON.parse(localStorage.getItem('user')).id,Number(localStorage.getItem('countryId'))).subscribe(res => {
            if (res.message === 'OK') {
                this.customerList=res.object;
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
    
    delete(){
        this.dialog.open(ConfirmationComponent, {
            data: { message: '¿ Desea eliminar la base cargada ?' },
            height: '250px',
            width: '400px'
          }).afterClosed().subscribe(res => {
            if(res){
              this.schClientBaseS.delete(this.customerId).subscribe(resL => {
                  if (resL.message === 'OK') {
                      this.alertS.open('Base Eliminada', 'success');
                      this.list();
                  } else {
                      this.alertS.open(resL.message, 'error');
                  }
                  }, err => {
                      this.alertS.open(err.message, 'error');
                  });
            }
          }, err => {
              this.alertS.open(err.message, 'error');
            });
    }

    download(){
        let delimiter = "\\";
        let headers = '';
        let file = '';

        for (let i = 0; i < this.header.length; i++) {
            headers = headers + this.header[i];
                headers = headers + delimiter;
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
        downloadLink.setAttribute("download", "Cargue.csv");
        downloadLink.style.visibility = "hidden";
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
    }
}