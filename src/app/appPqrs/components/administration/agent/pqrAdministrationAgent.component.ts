import { Component, OnInit, ViewChild } from "@angular/core";
import { AlertService } from 'src/app/shared/services/alert.service';
import { MatDialog } from '@angular/material/dialog';
import { PersonModal } from 'src/app/appGeneral/modals/person/person.modal';
import { PqrAgentService } from 'src/app/appPqrs/services/pqrAgent.service';
import { GenPersonEntity } from 'src/app/appGeneral/entities/genPerson.entity';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ConfirmationComponent } from 'src/app/shared/components/confirmation/confirmation.component';
import { PersonCountryModal } from "src/app/appPqrs/modals/person/personCountry.modal";

@Component({
    selector: 'app-pqrAdministrationAgent',
    templateUrl: './pqrAdministrationAgent.component.html',
    styleUrls: ['./pqrAdministrationAgent.component.css']
})
export class PqrAdministrationAgentComponent implements OnInit {
    personId: number;
    person: string;
    loading: boolean;
    columns: string[];
    genPersonEntity: GenPersonEntity;
    dataSource = new MatTableDataSource<any>();
    @ViewChild(MatTable) table: MatTable<any>;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    countryId:number;
    countryIdLocal:string;

    constructor(private pqrAgentS: PqrAgentService, private dialog: MatDialog, private alertS: AlertService) {
        this.personId = 0;
        this.person = '';
        this.loading = false;
        this.columns = ['firstName', 'lastName', 'mail', 'Acciones'];
        this.dataSource = new MatTableDataSource([]);
        this.countryId = 0;
        this.countryIdLocal = '';
    }
    ngOnInit(): void {
        this.loading = true;
        this.countryIdLocal=localStorage.getItem('countryId');
        this.pqrAgentS.list(Number(this.countryIdLocal)).subscribe(res => {
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
    onClick() {
        if (this.person != '') {
            this.pqrAgentS.create(this.personId, this.countryId, Number(localStorage.getItem('countryId'))).subscribe(resC => {
                if (resC.message === 'OK') {
                    if (resC.object != 0) {
                        this.alertS.open('Agente creado!', 'success');
                        this.personId = 0;
                        this.person = '';
                        this.loading = true;
                        this.pqrAgentS.list(Number(this.countryIdLocal)).subscribe(resL => {
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
                        this.alertS.open('Error al crear el agente!', 'error');
                    }
                } else {
                    this.alertS.open(resC.message, 'error');
                }
            }, err => {
                this.alertS.open(err.message, 'error');
            });
        } else {
            this.alertS.open('Seleccione un usuario!', 'warning');
        }
    }
    delete(agentId: number) {
        this.dialog.open(ConfirmationComponent,{
            data:{message:'¿ Desea eliminar el agente?'},
            height:'250px',
            width:'400px'
        }).afterClosed().subscribe(resA => {
            if (resA) {
                this.pqrAgentS.delete(agentId).subscribe(resD => {
                    if (resD.message === 'OK') {
                        if (resD.object != 0) {
                            this.alertS.open('Agente eliminado!', 'success');
                            this.loading = true;
                            this.pqrAgentS.list(Number(this.countryIdLocal)).subscribe(resL => {
                                if (resL.message === 'OK') {
                                    this.loading = false;
                                    this.dataSource = new MatTableDataSource<any>(resL.object);
                                    this.dataSource.paginator = this.paginator;
                                    this.dataSource.sort = this.sort;
                                } else {
                                    this.alertS.open(resL.message, 'error');
                                }
                            }, err => {
                                this.alertS.open(err, 'error');
                            });
                        } else {
                            this.alertS.open('Error al eliminar el agente!', 'error');
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
    getPerson() {
        const dialogRef = this.dialog.open(PersonCountryModal, {
            width: '800px'
        });
        dialogRef.afterClosed().subscribe(res => {
            if (res['id'] != 0) {
                this.personId = res['id'];
                this.person = res['person'];
                this.countryId = res['countryId'];
            }
        });
    }
}