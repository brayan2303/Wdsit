import { Component, Inject, OnInit, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTable, MatTableDataSource } from "@angular/material/table";
import { AlertService } from 'src/app/shared/services/alert.service';
import { MatDialog } from "@angular/material/dialog";
import { ConfirmationComponent } from "src/app/shared/components/confirmation/confirmation.component";
import { ScpAuditPreviousService } from "../../../services/scpAuditPrevious.service";
import { ScpAuditPreviousEditComponent } from "../edit/scpAuditPreviousEdit.component";
import { ScpAuditPreviousSerialModel } from "src/app/appScrap/models/ScpAuditPreviousSerial.model";
import { ScpAuditPreviousEntity } from "src/app/appScrap/entities/scpAuditPrevious.entity";
import { ScpAuditPreviousTableModel } from "src/app/appScrap/models/ScpAuditPreviousTable.model";
import { ScpAuditPreviousSerialService } from "../../../services/scpAuditPreviousSerial.service";



@Component({
    selector: 'app-scpAuditPreviousList',
    templateUrl: './scpAuditPreviousList.component.html',
    styleUrls: ['./scpAuditPreviousList.component.css']
})

export class ScpAuditPreviousListComponent implements OnInit {
    loading: boolean;
    columns: string[];
    columnsSerial: string[];
    dataSource = new MatTableDataSource<any>();
    dataSourceSerial = new MatTableDataSource<any>();
    validacion:number;
    @ViewChild(MatTable) table: MatTable<any>;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatPaginator) paginatorSerial: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    @ViewChild(MatSort) sortSerial: MatSort;
    unibytes: Uint8Array = null;
    data: ScpAuditPreviousSerialModel[];
    @ViewChild(MatTable) tableSerials: MatTable<any>;
    ScpAuditPreviousSerialM:ScpAuditPreviousSerialModel;
    ScpAuditPreviousE:ScpAuditPreviousEntity;
    ScpAuditPreviousTableM: ScpAuditPreviousTableModel;
    serial:string;

    constructor(private ScpAuditPreviousS: ScpAuditPreviousService, private ScpAuditPreviousSerialS: ScpAuditPreviousSerialService, private dialog: MatDialog,private alertS: AlertService) {
        this.loading = false;
        this.serial='';
        this.validacion = 0;

        this.ScpAuditPreviousSerialM = new ScpAuditPreviousSerialModel();
        this.ScpAuditPreviousE = null;
        this.ScpAuditPreviousTableM = new ScpAuditPreviousTableModel();

        this.data = [];
        this.columns = ['name', 'customerName', 'creationDate', 'userName', 'active', 'acciones'];
        this.columnsSerial = ['serials', 'codigoSap', 'descripcion', 'motivoScrap', 'estado', 'acciones'];
        this.ScpAuditPreviousTableM.rows = [];
        
        this.ScpAuditPreviousTableM.columns = this.columnsSerial;

        this.dataSource = new MatTableDataSource([]);
        this.dataSourceSerial = new MatTableDataSource([]);
    }

    ngOnInit(): void {
        this.loading = true,
            this.list();
    }

    list() {
        this.ScpAuditPreviousS.listForSerials().subscribe(res => {
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

    findAuditPrevious(auditPreviousId:number){
        this.dataSourceSerial = new MatTableDataSource([]);
        this.data = [];
        this.ScpAuditPreviousE = new ScpAuditPreviousEntity();
        this.ScpAuditPreviousTableM.rows = [];
        this.validacion = 0;

        this.ScpAuditPreviousS.findById(auditPreviousId).subscribe(res => {
            if (res.message === 'OK') {
                if (res.object != null) {
                    this.ScpAuditPreviousE = res.object;
                    this.findSerialList();
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

    close(item:ScpAuditPreviousEntity){
        if(this.ScpAuditPreviousE != null )
        {
            if(item.name == this.ScpAuditPreviousE.name)
            {
                if(this.dataSourceSerial.data.length > 0)
                {   
                    if(item.state != 'Abierto')
                    {
                        this.alertS.open('Esta entrada ya se encuentra ' + item.state + ' !', 'warning');
                    } else {
                        this.dialog.open(ConfirmationComponent, {
                            data: { message: '¿ Desea cerrar la entrada ?' },
                            height: '250px',
                            width: '400px'
                        }).afterClosed().subscribe(res => {
                            if (res) {
                                this.ScpAuditPreviousS.close(this.ScpAuditPreviousE.id).subscribe(res => {
                                    if (res.message === 'OK') {
                                        this.alertS.open('Cerrado con exito', 'success');
                                        this.ScpAuditPreviousE = null;
                                        this.serial='';
                                    } else {
                                        this.alertS.open(res.message, 'error');
                                    }
                                }, err => {
                                    this.alertS.open(err.message, 'error');
                                });
                            }
                        });
                    }
                } else {
                    this.alertS.open('Esta entrada no tiene registros guardados!', 'warning');
                }
            } else {
                this.alertS.open('Por favor seleccione primero la entrada correspondiente antes de cerrar', 'warning');
            }
        } else {
            this.alertS.open('Por favor seleccione primero la entrada correspondiente antes de cerrar', 'warning');
        }
    }

    findSerialList(){
        this.ScpAuditPreviousSerialS.list(this.ScpAuditPreviousE.id).subscribe(res => {
            if (res.message === 'OK') {
                if (res.object != 0) {
                    this.data = res.object;
                    this.ScpAuditPreviousTableM.rows = res.object;
                    this.dataSourceSerial = new MatTableDataSource<any>(this.data);
                }
            } else {
                this.alertS.open(res.object, 'warning');
            }
        }, err => {
            this.alertS.open(err.message, 'error');
        });
    }

    findSerial(event) {
        if (event.key === 'Enter' || event.key === 'Tab') {
          if (event.key === 'Tab') {
            event.preventDefault();
          }
          
          (document.getElementById(String("serial")) as HTMLInputElement).value = '';
          var serial = this.serial;
          this.ScpAuditPreviousSerialS.findBySerial(serial, this.ScpAuditPreviousE.customerName).subscribe(res => {
            if (res.message === 'OK') {
                if (res.object != 0) {
                    this.ScpAuditPreviousSerialM = res.object;
                    if(this.ScpAuditPreviousSerialM.estado != 'Aceptado'){
                        this.validacion = 1;
                    }
                    this.addSerial();
                } else {
                    this.alertS.open('El serial no existe', 'warning');
                }
            } else {
                this.alertS.open(res.object, 'warning');
            }
        }, err => {
            this.alertS.open(err.message, 'error');
        });
        (document.getElementById(String("serial")) as HTMLInputElement).focus();
        }
    }

    addSerial(){
        if (!this.data.some(x => x.serial === this.ScpAuditPreviousSerialM.serial)) {
            this.ScpAuditPreviousTableM.rows.push(this.ScpAuditPreviousSerialM);
            this.data=this.ScpAuditPreviousTableM.rows;
            this.dataSourceSerial = new MatTableDataSource<any>(this.data);
        }else {
            this.alertS.open('El serial ya esta en la lista!', 'warning');
        }
    }

    deleteRow(row: number) {
        this.data.splice(row, 1);
        this.dataSourceSerial = new MatTableDataSource<any>(this.data);
    }

    saveSerials(){
        if (this.data.some(x => x.estado != 'Aceptado'))
        {
            this.alertS.open('Verifique que todos los seriales esten en Aceptado!', 'warning');
        } else {
            this.ScpAuditPreviousSerialS.delete(this.ScpAuditPreviousE.id).subscribe(res => {
                if (res.message === 'OK') {
                    this.ScpAuditPreviousSerialS.createAll(JSON.parse(localStorage.getItem('user')).id, this.ScpAuditPreviousE.id, this.data).subscribe(res => {
                        if (res.message === 'OK') {
                            if (res.object != null) {
                                this.ScpAuditPreviousE = null;
                                this.serial='';
                                this.alertS.open('Guardado con Exito!', 'success');    
                            } else {
                            this.alertS.open(res.message, 'error');
                            }
                        } else {
                            this.alertS.open(res.message, 'error');
                        }
                    }, err => {
                        this.alertS.open(err.message, 'error');
                    });
                } else {
                    this.alertS.open(res.message, 'error');
                }
            }, err => {
                this.alertS.open(err.message, 'error');
            });
        }
    }
}


