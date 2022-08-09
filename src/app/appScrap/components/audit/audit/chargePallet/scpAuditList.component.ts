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
import { ScpAuditPreviousService } from "../../../services/scpAuditPrevious.service";
import { ScpAuditPalletService } from "../../../services/scpAuditPallet.service";
import { ScpAuditPalletEntity } from "src/app/appScrap/entities/scpAuditPallet.entity";
import { ScpAuditPreviousTableModel } from "src/app/appScrap/models/ScpAuditPreviousTable.model";



@Component({
    selector: 'app-scpAuditList',
    templateUrl: './scpAuditList.component.html',
    styleUrls: ['./scpAuditList.component.css']
})

export class ScpAuditListComponent implements OnInit {
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
        this.columnsPallet = ['pallet', 'typology', 'quantity', 'state', 'acciones'];

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
        this.ScpAuditS.listForPallet().subscribe(res => {
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

    // Buscar Pallet en el sistema
    searchPallet(event) {
        if (event.key === 'Enter' || event.key === 'Tab') {
            if (event.key === 'Tab') {
                event.preventDefault();
            }
            var pallet = this.pallet;
            this.pallet = '';
            this.ScpAuditPalletS.searchByPalletNumber(pallet, this.ScpAuditPreviousE.customerName).subscribe(resP => {
                if (resP.message === 'OK') {
                    if(resP.object != null)
                    {
                        this.ScpPalletM = resP.object;
                        this.add();
                    } else {
                        this.alertS.open('El pallet ' + this.pallet + ' para el cliente ' + this.ScpAuditPreviousE.customerName + ' NO EXISTE !', 'warning');
                        (document.getElementById(String("pallet")) as HTMLInputElement).value = '';
                        (document.getElementById(String("pallet")) as HTMLInputElement).focus();
                    }
                } else {
                    this.alertS.open(resP.message, 'error');
                }
            }, err => {
                this.alertS.open(err.message, 'error');
            });
        }
    }

    //Agregar a la data general para enviar
    add(){
        if (!this.data.some(x => x.pallet === this.ScpPalletM.pallet)) {
            this.quantity = this.quantity + this.ScpPalletM.quantity;
            this.ScpAuditPreviousTableM.rows.push(this.ScpPalletM);
            this.data=this.ScpAuditPreviousTableM.rows;
            this.dataSourcePallet = new MatTableDataSource<any>(this.data);
        }else {
            this.alertS.open('El pallet ya esta en la lista!', 'warning');
        }
        (document.getElementById(String("pallet")) as HTMLInputElement).value = '';
        (document.getElementById(String("pallet")) as HTMLInputElement).focus();
    }

    savePallets(){
        if (this.data.some(x => x.state != 'Aceptado'))
        {
            this.alertS.open('Verifique que todos los pallet esten en Aceptado!', 'warning');
        } else {
            this.ScpAuditPalletS.delete(this.ScpAuditE.id).subscribe(res => {
                if (res.message === 'OK') {
                    this.ScpAuditPalletS.createAll(JSON.parse(localStorage.getItem('user')).id, this.ScpAuditE.id, this.data).subscribe(res => {
                        if (res.message === 'OK') {
                            if (res.object != null) {
                                this.ScpAuditPreviousE = null;
                                this.ScpAuditE = null;
                                this.pallet='';
                                this.quantity = 0;
                                this.data = [];
                                this.dataSourcePallet = new MatTableDataSource<any>(this.data);
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

    deleteRow(row: number) {
        this.quantity = this.quantity - this.dataSourcePallet.filteredData[row].quantity;
        this.data.splice(row, 1);
        this.dataSourcePallet = new MatTableDataSource<any>(this.data);
    }

    close(item:ScpAuditEntity){
        if(this.ScpAuditE != null)
        {
            if(item.codeAudit == this.ScpAuditE.codeAudit)
            {
                if(!item.openPallet){
                    this.alertS.open('Esta auditoria ya fue cerrada y esta en el estado de: ' + item.state, 'warning');
                } else {
                    this.dialog.open(ConfirmationComponent, {
                        data: { message: '¿ Desea cerrar la entrada de pallets ?' },
                        height: '250px',
                        width: '400px'
                    }).afterClosed().subscribe(res => {
                        if (res) {
                            this.ScpAuditS.close(item.id, this.quantity).subscribe(res => {
                                if (res.message === 'OK') {
                                    if (res.object != null) {
                                        this.alertS.open('Cerrado con Exito!', 'success');
                                        this.ScpAuditPreviousE = null;
                                        this.ScpAuditE = null;
                                        this.pallet='';
                                        this.quantity = 0;
                                        this.data = [];
                                        this.dataSourcePallet = new MatTableDataSource<any>(this.data);
                                        this.list();
                                    } else {
                                        this.alertS.open(res.message, 'error');
                                    }
                                } else {
                                    this.alertS.open(res.message, 'error');
                                }
                            }, err => {
                                this.alertS.open(err.message, 'error');
                            });
                    }});
                }
            } else {
                this.alertS.open('Primero debe seleccionar la auditoria antes de cerrar !', 'warning');
            }
        } else {
            this.alertS.open('Primero debe seleccionar la auditoria antes de cerrar !', 'warning');
        }
    } 

}


