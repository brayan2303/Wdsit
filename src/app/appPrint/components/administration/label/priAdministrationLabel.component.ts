import { MatTableDataSource, MatTable } from '@angular/material/table';
import { ViewChild, Component, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { AlertService } from 'src/app/shared/services/alert.service';
import { ConfirmationComponent } from 'src/app/shared/components/confirmation/confirmation.component';
import { PriLabelService } from 'src/app/appPrint/services/priLabel.service';
import { CodePrnModal } from 'src/app/appPrint/modals/codePrn/codePrn.modal';
import { FieldModal } from 'src/app/appPrint/modals/field/field.modal';
import { MatSort } from '@angular/material/sort';
import { PriLabelEntity } from 'src/app/appPrint/entities/priLabel.entity';
import { AdministrationLabelModal } from 'src/app/appPrint/modals/administrationLabel/administrationLabel.modal';
import { FieldParameterizationModal } from 'src/app/appPrint/modals/fieldParameterization/fieldParameterization.modal';

@Component({
    selector: 'app-priAdministrationLabel',
    templateUrl: './priAdministrationLabel.component.html',
    styleUrls: ['./priAdministrationLabel.component.css']
})
export class PriAdministrationLabelComponent implements OnInit {
    loading: boolean;
    columns: string[];
    dataSource = new MatTableDataSource<any>();
    @ViewChild(MatTable) table: MatTable<any>;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    constructor(private priLabelS: PriLabelService, private dialog: MatDialog, private alertS: AlertService) {
        this.loading = false;
        this.columns = ['name', 'printCount', 'link', 'customer', 'section', 'active', 'actions'];
        this.dataSource = new MatTableDataSource([]);
    }

    ngOnInit(): void {
        this.loading = true;
        this.priLabelS.list().subscribe(res => {
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
    create(labelEntity: PriLabelEntity) {
        const dialogRef = this.dialog.open(AdministrationLabelModal, {
            data: { labelEntity: labelEntity }
        });
        dialogRef.afterClosed().subscribe(resA => {
            if (resA) {
                this.priLabelS.list().subscribe(res => {
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
        }, err => {
            this.alertS.open(err.message, 'error');
        });
    }
    delete(value: number) {
        this.dialog.open(ConfirmationComponent, {
            data: { message: '¿ Desea eliminar la etiqueta ?' },
            height: '250px',
            width: '400px'
        }).afterClosed().subscribe(res => {
            if (res) {
                this.priLabelS.delete(value).subscribe(res => {
                    if (res.message === 'OK') {
                        if (res.object != 0) {
                            this.alertS.open('Etiqueta eliminada!', 'success');
                            this.priLabelS.list().subscribe(res => {
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
    getCodePrn(value: number) {
        this.dialog.open(CodePrnModal, {
            data: { 'labelId': value },
            width: '600px'
        });
    }
    getField(value: number) {
        this.dialog.open(FieldModal, {
            data: { 'labelId': value },
            width: '600px'
        });
    }
    getFieldParametirezation(value: number) {
        this.dialog.open(FieldParameterizationModal, {
            data: { 'labelId': value },
            width: '600px'
        });
    }
}