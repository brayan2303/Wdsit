import { Component, Inject, OnInit, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTable, MatTableDataSource } from "@angular/material/table";
import { AlertService } from 'src/app/shared/services/alert.service';
import { MatDialog } from "@angular/material/dialog";
import { ConfirmationComponent } from "src/app/shared/components/confirmation/confirmation.component";
import { ScpAuditService } from "../../../services/scpAudit.service";
import { ScpAuditEntity } from "src/app/appScrap/entities/scpAudit.entity";
import { ScpAuditEditComponent } from "../edit/scpAuditEdit.component";
import { ScpPalletModel } from "src/app/appScrap/models/scpPallet.model";
import { ScpAuditPreviousEntity } from "src/app/appScrap/entities/scpAuditPrevious.entity";
import { ScpAuditPreviousTableModel } from "src/app/appScrap/models/ScpAuditPreviousTable.model";
import { ScpAuditPalletEntity } from "src/app/appScrap/entities/scpAuditPallet.entity";
import { ScpAuditPalletService } from "../../../services/scpAuditPallet.service";
import { ScpAuditPreviousService } from "../../../services/scpAuditPrevious.service";



@Component({
    selector: 'app-scpAuditListAdmin',
    templateUrl: './scpAuditListAdmin.component.html',
    styleUrls: ['./scpAuditListAdmin.component.css']
})

export class ScpAuditListAdminComponent implements OnInit {
    loading: boolean;
    columns: string[];
    columnsPallet: string[];
    pallet:string;
    quantity:number;
    data: ScpAuditPalletEntity[];
    dataSource = new MatTableDataSource<any>();
    dataSourcePallet = new MatTableDataSource<any>();
    validacion:number;
    @ViewChild(MatTable) table: MatTable<any>;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    unibytes: Uint8Array = null;
    ScpPalletM:ScpPalletModel;
    ScpAuditE:ScpAuditEntity;
    ScpAuditPreviousE:ScpAuditPreviousEntity;
    ScpAuditPreviousTableM:ScpAuditPreviousTableModel;

    constructor(private ScpAuditS: ScpAuditService, private ScpAuditPalletS:ScpAuditPalletService, private ScpAuditPreviousS: ScpAuditPreviousService, private dialog: MatDialog,private alertS: AlertService) {
        this.loading = false;
        this.validacion = 0;
        this.pallet= '';
        this.quantity = 0;

        this.data = [];
        this.columns = ['codeAudit', 'auditPreviousName', 'typeAuditName', 'state', 'levelRuleName', 'userName', 'active', 'acciones'];
        this.columnsPallet = ['pallet', 'typology', 'quantity', 'state'];

        this.ScpPalletM = null;
        this.ScpAuditE = null;
        this.ScpAuditPreviousE= null;
        this.ScpAuditPreviousTableM = new ScpAuditPreviousTableModel();
        this.ScpAuditPreviousTableM.rows = [];
        
        this.ScpAuditPreviousTableM.columns = this.columnsPallet;

        this.dataSource = new MatTableDataSource([]);
        this.dataSourcePallet = new MatTableDataSource([]);
    }

    ngOnInit(): void {
        this.loading = true,
            this.list();
    }

    list() {
        this.ScpAuditS.list().subscribe(res => {
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

    edit(item:ScpAuditEntity) {
        if(item.openPallet == false)
        {
            this.alertS.open('Esta auditoria ya se encuentra cerrada!', 'warning');
        } else {
            const dialogRef = this.dialog.open(ScpAuditEditComponent, {
                data: { auditId: item.id }
            });
            dialogRef.afterClosed().subscribe(resA => {
                this.ScpAuditS.list().subscribe(resL => {
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

    delete(item:ScpAuditEntity) {
        if(item.openPallet == false)
        {
            this.alertS.open('Esta auditoria ya se encuentra '+item.state+'!', 'warning');
        } else {
            this.dialog.open(ConfirmationComponent, {
                data: { message: '¿ Desea eliminar el registro ?' },
                height: '250px',
                width: '400px'
            }).afterClosed().subscribe(res => {
                if (res) {
                    this.ScpAuditS.delete(item.id).subscribe(res => {
                        if (res.message === 'OK') {
                            if (res.object != 0) {
                                this.alertS.open('Registro eliminado!', 'success');
                                this.ScpAuditS.list().subscribe(res => {
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
    searchAudit(item:ScpAuditEntity){
        this.quantity = 0;
        this.data = [];
        this.dataSourcePallet = new MatTableDataSource<any>(this.data);
        this.ScpAuditS.findById(item.id).subscribe(resP => {
            if (resP.message === 'OK') {
                this.ScpAuditE = resP.object;
                this.searchCliente(this.ScpAuditE.auditPreviousId);
            } else {
                this.alertS.open(resP.message, 'error');
            }
        }, err => {
            this.alertS.open(err.message, 'error');
        });
    }

    searchCliente(auditPreviousId:number){
        this.ScpAuditPreviousS.findById(auditPreviousId).subscribe(resP => {
            if (resP.message === 'OK') {
                this.ScpAuditPreviousE = resP.object;
                this.findPalletList();
            } else {
                this.alertS.open(resP.message, 'error');
            }
        }, err => {
            this.alertS.open(err.message, 'error');
        });
    }

    findPalletList(){
        this.ScpAuditPalletS.findByAuditId(this.ScpAuditE.id).subscribe(res => {
            if (res.message === 'OK') {
                if (res.object != 0) {
                    this.data = res.object;
                    this.ScpAuditPreviousTableM.rows = res.object;
                    this.dataSourcePallet = new MatTableDataSource<any>(this.data);
                    this.data.forEach(valor => {
                        this.quantity = this.quantity + valor.quantity;    
                    });
                }
            } else {
                this.alertS.open(res.object, 'warning');
            }
        }, err => {
            this.alertS.open(err.message, 'error');
        });
    }


    
}


