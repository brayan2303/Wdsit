import { Component, OnInit, ViewChild } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { GenPersonEntity } from "src/app/appGeneral/entities/genPerson.entity";
import { MasAccountEntity } from "src/app/appMassiveMail/entities/masAccount.entity";
import { MasAccountService } from "src/app/appMassiveMail/services/masAccount.service";
import { ConfirmationComponent } from "src/app/shared/components/confirmation/confirmation.component";
import { AlertService } from "src/app/shared/services/alert.service";
import { SettingAccountModal } from "../../modals/settingAccount/settingAccount.modal";

@Component({
    selector: 'app-masSettingAccount',
    templateUrl: './masSettingAccount.component.html',
    styleUrls: ['./masSettingAccount.component.css']
})
export class MasSettingAccountComponent implements OnInit {
    loading: boolean;
    columns: string[];
    dataSource: MatTableDataSource<any>;
    @ViewChild('paginator') paginator: MatPaginator;
    person: GenPersonEntity;

    constructor(private masAccountS:MasAccountService, private alertS: AlertService, private dialog: MatDialog) {
        this.loading = false;
        this.columns = ['mail','name','position', 'provider','port', 'creationDate', 'creationUser', 'active', 'actions'];
        this.dataSource = new MatTableDataSource([]);
    }
    ngOnInit(): void {
        this.person = JSON.parse(localStorage.getItem('user'));
        this.loading = true;
        this.masAccountS.list().subscribe(res => {
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
    create(masAccount: MasAccountEntity) {
        this.dialog.open(SettingAccountModal, {
            data: { masAccount: masAccount },
            width: '100%'
        }).afterClosed().subscribe(resA => {
            if (resA) {
                this.loading = true;
                this.masAccountS.list().subscribe(res => {
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
            data: { message: '¿Desea eliminar la cuenta?' },
            width: '400px',
            height: '250px'
        }).afterClosed().subscribe(resA => {
            if (resA) {
                this.masAccountS.delete(id).subscribe(resD => {
                    if (resD.message === 'OK') {
                        if (resD.object != 0) {
                            this.alertS.open('Cuenta eliminada!', 'success');
                            this.loading = true;
                            this.masAccountS.list().subscribe(res => {
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
                            this.alertS.open('Error al eliminar la cuenta!', 'error');
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