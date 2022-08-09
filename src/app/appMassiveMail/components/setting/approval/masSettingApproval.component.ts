import { Component, OnInit, ViewChild } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { GenPersonEntity } from "src/app/appGeneral/entities/genPerson.entity";
import { MasApprovalEntity } from "src/app/appMassiveMail/entities/masApproval.entity";
import { MasApprovalService } from "src/app/appMassiveMail/services/masApproval.service";
import { ConfirmationComponent } from "src/app/shared/components/confirmation/confirmation.component";
import { AlertService } from "src/app/shared/services/alert.service";
import { SettingApprovalModal } from "../../modals/settingApproval/settingApproval.modal";

@Component({
    selector: 'app-masSettingApproval',
    templateUrl: './masSettingApproval.component.html',
    styleUrls: ['./masSettingApproval.component.css']
})
export class MasSettingApprovalComponent implements OnInit {
    loading: boolean;
    columns: string[];
    dataSource: MatTableDataSource<any>;
    @ViewChild('paginator') paginator: MatPaginator;
    person: GenPersonEntity;

    constructor(private masApprovalS:MasApprovalService, private alertS: AlertService, private dialog: MatDialog) {
        this.loading = false;
        this.columns = ['mail','approvalUser','active', 'actions'];
        this.dataSource = new MatTableDataSource([]);
    }
    ngOnInit(): void {
        this.person = JSON.parse(localStorage.getItem('user'));
        this.loading = true;
        this.masApprovalS.list().subscribe(res => {
            if (res.message === 'OK') {
                this.dataSource = new MatTableDataSource(res.object);
                this.dataSource.paginator = this.paginator;
                this.loading = false;
            } else {
                this.alertS.open(res.message, 'error');
            }
        }, err => {
            this.alertS.open(err.message, 'error');
        });
    }
    create(masApproval: MasApprovalEntity) {
        this.dialog.open(SettingApprovalModal, {
            data: { masApproval: masApproval },
            width: '100%'
        }).afterClosed().subscribe(resA => {
            if (resA) {
                this.loading = true;
                this.masApprovalS.list().subscribe(res => {
                    if (res.message === 'OK') {
                        this.dataSource = new MatTableDataSource(res.object);
                        this.dataSource.paginator = this.paginator;
                        this.loading = false;
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
            data: { message: '¿Desea eliminar la aprobacion?' },
            width: '400px',
            height: '250px'
        }).afterClosed().subscribe(resA => {
            if (resA) {
                this.masApprovalS.delete(id).subscribe(resD => {
                    if (resD.message === 'OK') {
                        if (resD.object != 0) {
                            this.alertS.open('Aprobacion eliminada!', 'success');
                            this.loading = true;
                            this.masApprovalS.list().subscribe(res => {
                                if (res.message === 'OK') {
                                    this.dataSource = new MatTableDataSource(res.object);
                                    this.dataSource.paginator = this.paginator;
                                    this.loading = false;
                                } else {
                                    this.alertS.open(res.message, 'error');
                                }
                            }, err => {
                                this.alertS.open(err.message, 'error');
                            });
                        } else {
                            this.alertS.open('Error al eliminar la aprobacion!', 'error');
                        }
                    } else {
                        this.alertS.open(resD.message, 'error');
                    }
                }, err => {
                    this.alertS.open(err.message, 'error');
                });
            }
        });
    }
}