import { Component, Inject, ViewChild } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { AlertService } from 'src/app/shared/services/alert.service';
import { CertCertService } from "../../servicies/certCert.service";
import { CertCertPersonService } from "../../servicies/certCertPerson.service";


@Component({
    selector: 'modal-certCertPerson',
    templateUrl: './certCertPerson.modal.html',
    styleUrls: ['./certCertPerson.modal.css']
})
export class CertCertPersonModal {
    columns: string[];
    loading: boolean;
    @ViewChild(MatTable) table: MatTable<any>;
    dataSource = new MatTableDataSource<any>();
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    constructor(private CerCertS:CertCertService, private alertS: AlertService, private certCertPersonS:CertCertPersonService,
        public dialogRef: MatDialogRef<CertCertPersonModal>,
        @Inject(MAT_DIALOG_DATA) public data: any) {
        dialogRef.disableClose = true;
        this.columns = ['id', 'name', 'porcentaje','asignar'];
      
        this.dataSource = new MatTableDataSource([]);
    }
    ngOnInit(): void {
        this.CerCertS.findAll(this.data.id).subscribe(res => {
            this.dataSource = res.object;
        }, err => {
            this.alertS.open(err.message, 'error');
        });
        this.search();
    }
    close(): void {
        this.dialogRef.close();
    }
    checked(input: HTMLInputElement,certificateId:number) {
        if (input.checked) {
            this.certCertPersonS.create(this.data.id,certificateId).subscribe(res => {
                this.CerCertS.findAll(this.data.id).subscribe(res => {
                    this.dataSource = res.object;
                    this.table.renderRows();
                }, err => {
                    this.alertS.open(err.message, 'error');
                });
            }, err => {
                this.alertS.open(err.message, 'error');
            });
        } else {            
            this.certCertPersonS.delete(this.data.id,certificateId).subscribe(res => {
            
                this.CerCertS.findAll(this.data.id).subscribe(res => {
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
        this.CerCertS.findAll(this.data.id).subscribe(res => {
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