import { Component, ViewChild, OnInit } from "@angular/core";
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { GenPersonService } from 'src/app/appGeneral/services/genPerson.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { GenUserEditComponent } from '../edit/genUserEdit.component';
import { ConfirmationComponent } from 'src/app/shared/components/confirmation/confirmation.component';
import { ReportModal } from 'src/app/appReport/modals/report/report.modal';
import { AlertService } from 'src/app/shared/services/alert.service';
import { MatSort } from '@angular/material/sort';
import { ApplicationModal } from 'src/app/appGeneral/modals/application/application.modal';
import { ControlPanelModal } from 'src/app/appControlPanel/modals/controlPanel/controlPanel.modal';
import { CountryModal } from 'src/app/appGeneral/modals/country/country.modal';
import { ApplicationPersonProfileModal } from "src/app/appGeneral/modals/applicationPersonProfile/applicationPersonProfile.modal";
import { PersonCustomerModal } from "src/app/appGeneral/modals/personCustomer/personCustomer.modal";
import { GenPlantPersonnModal } from "src/app/appGeneral/modals/genPlantPerson/genPlantPerson.modal";

@Component({
    selector: 'app-genUserList',
    templateUrl: './genUserList.component.html',
    styleUrls: ['./genUserList.component.css']
})
export class GenUserListComponent implements OnInit {
    loading: boolean;
    columns: string[];
    dataSource = new MatTableDataSource<any>();
    @ViewChild(MatTable) table: MatTable<any>;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    constructor(private genPersonS: GenPersonService, private alertS: AlertService, private dialog: MatDialog) {
        this.loading = false;
        this.columns = ['identification', 'firstName', 'lastName', 'userName','mail', 'creationDate', 'centerCost', 'position', 'city', 'active', 'actions'];
        this.dataSource = new MatTableDataSource([]);
    }
    ngOnInit(): void {
        this.loading = true;
        this.genPersonS.list().subscribe(res => {
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
    edit(value: number) {
        const dialogRef = this.dialog.open(GenUserEditComponent, {
            data: { personId: value }
        });
        dialogRef.afterClosed().subscribe(resA => {
            this.loading=true;
            this.genPersonS.list().subscribe(resL => {
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
    delete(value: number, action: boolean) {
        this.dialog.open(ConfirmationComponent,{
            data:{message:action ? '¿ Desea activar el usuario ?' : '¿ Desea inactivar el usuario ?'},
            height:'250px',
            width:'400px'
        }).afterClosed().subscribe(resA => {
            if (resA) {
                this.genPersonS.delete(value, action).subscribe(resD => {
                    if (resD.message === 'OK') {
                        if (resD.object != 0) {
                            this.alertS.open(action ? 'Usuario activo!' : 'Usuario inactivo!', 'success');
                            this.loading=true;
                            this.genPersonS.list().subscribe(resL => {
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
                        } else {
                            this.alertS.open(action?'Error al activar el usuario!':'Error al inactivar el usuario!', 'error');
                        }
                    } else {
                        this.alertS.open(resD.message, 'error');
                    }
                }, err => {
                    this.alertS.open(err.message, 'error');
                });
            }
        }, err => {
            this.alertS.open(err.message, 'error');
        });
    }
    getCountry(value:number){
        this.dialog.open(CountryModal, {
            data: { 'personId': value },
            width: '600px'
        });
    }
    getApplication(value: number) {
        this.dialog.open(ApplicationModal, {
            data: { 'personId': value },
            width: '600px'
        });
    }
    getReport(value: number) {
        this.dialog.open(ReportModal, {
            data: { 'personId': value },
            width: '600px'
        });
    }
    getControlPanel(value: number) {
        this.dialog.open(ControlPanelModal, {
            data: { 'personId': value },
            width: '600px'
        });
    }
    getProfile(id:number){
        this.dialog.open(ApplicationPersonProfileModal, {
            data: { 'personId': id },
            width: '600px'
        });
    }
    getCustomer(id:number){
        this.dialog.open(PersonCustomerModal, {
            data: { 'personId': id },
            width: '600px'
        });
    }
    getPlant(id:number){
        this.dialog.open(GenPlantPersonnModal, {
            data: { 'personId': id },
            width: '600px'
        });
    }
}