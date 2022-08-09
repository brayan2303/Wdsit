import { Component, OnInit, ViewChild } from "@angular/core";
import { AlertService } from 'src/app/shared/services/alert.service';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { SchSuscriptorService } from 'src/app/appScheduling/services/schSuscriptor.service';
import { SchClienteEntity } from 'src/app/appScheduling/entities/schCliente.entity';
import { SchClienteService } from 'src/app/appScheduling/services/schCliente.service';

@Component({
    selector: 'app-schAdministrationSubscriber',
    templateUrl: './schAdministrationSubscriber.component.html',
    styleUrls: ['./schAdministrationSubscriber.component.css']
})
export class SchAdministrationSubscriberComponent implements OnInit {
    loading: boolean;
    loadingFile:boolean;
    columns: string[];
    dataSource = new MatTableDataSource<any>();
    @ViewChild(MatTable) table: MatTable<any>;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    customerId: number;
    customerList:SchClienteEntity[];

    constructor(private schSuscriptorS: SchSuscriptorService,private schClienteS:SchClienteService, private alertS: AlertService) {
        this.loading = false;
        this.loadingFile=false;
        this.columns = ['cliente', 'identificacion', 'nombre', 'correo', 'telefono1', 'telefono2', 'direccion', 'departamento', 'ciudad', 'rowIdPedido'];
        this.dataSource = new MatTableDataSource([]);
        this.customerId = 0;
        this.customerList=[];
    }
    ngOnInit(): void {
        this.schClienteS.list().subscribe(res=>{
            if(res.message==='OK'){
                this.customerList=res.object;
            }else{
                this.alertS.open(res.message,'error');
            }
        },err=>{
            this.alertS.open(err.message,'error');
        });
        this.loading = true;
        this.schSuscriptorS.list().subscribe(res => {
            if (res.message === 'OK') {
                this.dataSource = new MatTableDataSource<any>(res.object);
                this.dataSource.paginator = this.paginator;
                this.loading = false;
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
    loadFile(file: FileList) {
        if (file.length > 0) {
            this.loadingFile=true;
            this.schSuscriptorS.create(this.customerId,file[0]).subscribe(resC => {
                if (resC.message === 'OK') {
                    if (resC.object != 0) {
                        this.alertS.open('Registros cargados!', 'success');
                        this.loading = true;
                        this.schSuscriptorS.list().subscribe(res => {
                            if (res.message === 'OK') {
                                this.dataSource = new MatTableDataSource<any>(res.object);
                                this.dataSource.paginator = this.paginator;
                                this.loadingFile=false;
                                this.loading = false;
                            } else {
                                this.alertS.open(res.message, 'error');
                                this.loadingFile=false;
                            }
                        }, err => {
                            this.alertS.open(err.message, 'error');
                            this.loadingFile=false;
                        });
                    } else {
                        this.alertS.open('Error al cargar los registros!', 'error');
                        this.loadingFile=false;
                    }
                } else {
                    this.alertS.open(resC.message, 'error');
                    this.loadingFile=false;
                }
            }, err => {
                this.alertS.open(err.message, 'error');
            });
        }
    }
}