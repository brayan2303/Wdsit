import { Component, OnInit, ViewChild } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { MatTooltip } from "@angular/material/tooltip";
import { WlsProyectEntity } from "src/app/appWls/entities/wlsProyect.entity";
import { SettingProyectModal } from "src/app/appWls/modals/settingProyect/settingProyect.modal";
import { WlsProyectService } from "src/app/appWls/services/wlsProyect.service";
import { ConfirmationComponent } from "src/app/shared/components/confirmation/confirmation.component";
import { AlertService } from "src/app/shared/services/alert.service";

@Component({
    selector: 'app-wlsSettingProyect',
    templateUrl: './wlsSettingProyect.component.html',
    styleUrls: ['./wlsSettingProyect.component.css']
})
export class WlsSettingProyectComponent implements OnInit {
    tab: number;
    loading1: boolean;
    columns1: string[];
    @ViewChild('paginatorProyect') paginatorProyect: MatPaginator;
    @ViewChild('tooltipSyncronize') tooltipSyncronize:MatTooltip;
    dataSource1: MatTableDataSource<any>;
    proyectId: number;
    syncing: boolean;
    uploading:boolean;

    constructor(private wlsProyectS: WlsProyectService, private alertS: AlertService, private dialog: MatDialog) {
        this.tab = 0;
        this.loading1 = false;
        this.columns1 = ['name', 'prefix', 'country', 'customer', 'server', 'dataBaseName', 'creationDate', 'creationUser', 'active', 'actions'];
        this.dataSource1 = new MatTableDataSource([]);
        this.proyectId = 0;
        this.syncing = false;
        this.uploading=false;
    }

    ngOnInit(): void {
        this.loading1 = true;
        this.wlsProyectS.list().subscribe(res => {
            if (res.message === 'OK') {
                this.dataSource1 = new MatTableDataSource(res.object);
                this.dataSource1.paginator = this.paginatorProyect;
                this.loading1 = false;
            } else {
                this.alertS.open(res.message, 'error');
            }
        }, err => {
            this.alertS.open(err.message, 'error');
        });
    }
    detail(proyectId: number) {
        this.proyectId = proyectId;
        this.tab = 0;
    }
    select(tab: number) {
        this.tab = tab===this.tab?0:tab;
    }
    create(proyectEntity: WlsProyectEntity) {
        this.dialog.open(SettingProyectModal, {
            data: { proyectEntity: proyectEntity },
            width: '100%'
        }).afterClosed().subscribe(resA => {
            if (resA) {
                this.loading1 = true;
                this.wlsProyectS.list().subscribe(res => {
                    if (res.message === 'OK') {
                        this.dataSource1 = new MatTableDataSource(res.object);
                        this.dataSource1.paginator = this.paginatorProyect;
                        this.loading1 = false;
                    } else {
                        this.alertS.open(res.message, 'error');
                    }
                }, err => {
                    this.alertS.open(err.message, 'error');
                });
            }
        });
    }
    delete(id: number) {
        this.dialog.open(ConfirmationComponent, {
            data: { message: '¿Desea eliminar el proyecto?' },
            height: '250px',
            width: '400px'
        }).afterClosed().subscribe(resA => {
            if (resA) {
                this.wlsProyectS.delete(id).subscribe(resD => {
                    if (resD.message === 'OK') {
                        if (resD.object != 0) {
                            this.alertS.open('Proyecto eliminado!', 'success');
                            this.loading1 = true;
                            this.wlsProyectS.list().subscribe(res => {
                                if (res.message === 'OK') {
                                    this.dataSource1 = new MatTableDataSource(res.object);
                                    this.dataSource1.paginator = this.paginatorProyect;
                                    this.loading1 = false;
                                } else {
                                    this.alertS.open(res.message, 'error');
                                }
                            }, err => {
                                this.alertS.open(err.message, 'error');
                            });
                        } else {
                            this.alertS.open('Error al eliminar el proyecto!', 'error');
                        }
                    } else {
                        this.alertS.open(resD.message, 'error');
                    }
                }), err => {
                    this.alertS.open(err.message, 'error');
                };
            }
        });
    }
    syncronize() {
        this.syncing = !this.syncing;
    }
    upload() {
        this.uploading = !this.uploading;
    }
}