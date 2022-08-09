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
    selector: 'app-scpAuditPreviousListAdmin',
    templateUrl: './scpAuditPreviousListAdmin.component.html',
    styleUrls: ['./scpAuditPreviousListAdmin.component.css']
})

export class ScpAuditPreviousListAdminComponent implements OnInit {
    loading: boolean;
    columns: string[];
    columnsSerial: string[];
    dataSource = new MatTableDataSource<any>();
    dataSourceSerial = new MatTableDataSource<any>();
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

    constructor(private ScpAuditPreviousS: ScpAuditPreviousService, private ScpAuditPreviousSerialS: ScpAuditPreviousSerialService, private dialog: MatDialog,private alertS: AlertService) {
        this.loading = false;

        this.ScpAuditPreviousSerialM = new ScpAuditPreviousSerialModel();
        this.ScpAuditPreviousE = null;
        this.ScpAuditPreviousTableM = new ScpAuditPreviousTableModel();

        this.data = [];
        this.columns = ['name', 'customerName', 'creationDate', 'userName', 'active', 'acciones'];
        this.columnsSerial = ['serials', 'codigoSap', 'descripcion', 'motivoScrap', 'estado'];
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
        this.ScpAuditPreviousS.list().subscribe(res => {
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

    edit(item:ScpAuditPreviousEntity) {
        if(item.state != 'Abierto')
        {
            this.alertS.open('Esta entrada ya se encuentra cerrada!', 'warning');
        } else {
            const dialogRef = this.dialog.open(ScpAuditPreviousEditComponent, {
                data: { auditPreviousId: item.id }
            });
            dialogRef.afterClosed().subscribe(resA => {
                this.ScpAuditPreviousS.list().subscribe(resL => {
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
    }


    filter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim();

        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    }

    delete(item:ScpAuditPreviousEntity) {
        if(item.state != 'Abierto')
        {
            this.alertS.open('Esta entrada ya se encuentra '+item.state+'!', 'warning');
        } else {
            this.dialog.open(ConfirmationComponent, {
                data: { message: '¿ Desea eliminar el registro ?' },
                height: '250px',
                width: '400px'
            }).afterClosed().subscribe(res => {
                if (res) {
                    this.ScpAuditPreviousS.delete(item.id).subscribe(res => {
                        if (res.message === 'OK') {
                            if (res.object != 0) {
                                this.alertS.open('Registro eliminado!', 'success');
                                this.ScpAuditPreviousS.list().subscribe(res => {
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
    }

    findAuditPrevious(auditPreviousId:number){
        this.dataSourceSerial = new MatTableDataSource([]);
        this.data = [];
        this.ScpAuditPreviousE = new ScpAuditPreviousEntity();
        this.ScpAuditPreviousTableM.rows = [];

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
}


