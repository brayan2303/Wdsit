import { Component, OnInit, ViewChild } from "@angular/core";
import { AlertService } from 'src/app/shared/services/alert.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ConfirmationComponent } from 'src/app/shared/components/confirmation/confirmation.component';
import { BscFormulaService } from 'src/app/appBalanceScoreCard/services/bscFormula.service';
import { BscFormulaEntity } from 'src/app/appBalanceScoreCard/entities/bscFormula.entity';
import { CalculationModal } from 'src/app/appBalanceScoreCard/modals/calculation/calculation.modal';

@Component({
    selector: 'app-bscAdministrationFormula',
    templateUrl: './bscAdministrationFormula.component.html',
    styleUrls: ['./bscAdministrationFormula.component.css']
})
export class BscAdministrationFormulaComponent implements OnInit {
    loading: boolean;
    editing: number;
    columns: string[];
    dataSource = new MatTableDataSource<any>();
    @ViewChild(MatTable) table: MatTable<any>;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    form = new FormGroup({
        id: new FormControl(0),
        name: new FormControl('', Validators.required),
        active: new FormControl('')
    });

    constructor(private bscFormulaS: BscFormulaService, private dialog: MatDialog, private alertS: AlertService) {
        this.loading = false;
        this.editing = 0;
        this.columns = ['id', 'name', 'active', 'acciones'];
        this.dataSource = new MatTableDataSource([]);
    }
    ngOnInit(): void {
        this.loading = true;
        this.bscFormulaS.list().subscribe(res => {
            if (res.message === 'OK') {
                this.loading = false;
                this.dataSource = new MatTableDataSource<any>(res.object);
                this.dataSource.paginator = this.paginator;
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
        if (this.editing === 0) {
            this.bscFormulaS.create(this.form.value).subscribe(resC => {
                if (resC.message === 'OK') {
                    if (resC.object != 0) {
                        this.alertS.open('Formula creada!', 'success');
                        this.loading = true;
                        this.bscFormulaS.list().subscribe(resL => {
                            if (resL.message === 'OK') {
                                this.loading = false;
                                this.dataSource = new MatTableDataSource<any>(resL.object);
                                this.dataSource.paginator = this.paginator;
                                this.form.setValue({
                                    'id': 0,
                                    'name': '',
                                    'active': ''
                                });
                            } else {
                                this.alertS.open(resL.message, 'error');
                            }
                        }, err => {
                            this.alertS.open(err.message, 'error');
                        });
                    } else {
                        this.alertS.open('Error al crear la formula!', 'error');
                    }
                } else {
                    this.alertS.open(resC.message, 'error');
                }
            }, err => {
                this.alertS.open(err.message, 'error');
            });
        } else {
            this.bscFormulaS.update(this.form.value).subscribe(res => {
                if (res.message === 'OK') {
                    if (res.object != 0) {
                        this.alertS.open('Formula actualizada!', 'success');
                        this.loading = true;
                        this.bscFormulaS.list().subscribe(res => {
                            if (res.message === 'OK') {
                                this.loading = false;
                                this.dataSource = new MatTableDataSource<any>(res.object);
                                this.dataSource.paginator = this.paginator;
                                this.form.setValue({
                                    'id': 0,
                                    'name': '',
                                    'active': ''
                                });
                                this.editing = 0;
                            } else {
                                this.alertS.open(res.message, 'error');
                            }
                        }, err => {
                            this.alertS.open(err.message, 'error');
                        });
                    } else {
                        this.alertS.open('Error al actualizar la formula!', 'error');
                    }
                } else {
                    this.alertS.open(res.message, 'error');
                }
            }, err => {
                this.alertS.open(err.message, 'error');
            });
        }
    }
    edit(item: BscFormulaEntity) {
        this.editing = item.id;
        this.form.setValue(
            {
                'id': item.id,
                'name': item.name,
                'active': item.active
            }
        );
    }
    delete(id: number) {
        this.dialog.open(ConfirmationComponent,{
            data:{message:'¿Desea eliminar la formula?'},
            height:'250px',
            width:'400px'
        }).afterClosed().subscribe(res => {
            if (res) {
                this.bscFormulaS.delete(id).subscribe(resD => {
                    if (resD.message === 'OK') {
                        if (resD.object != 0) {
                            this.alertS.open('Formula eliminada!', 'success');
                            this.loading = true;
                            this.bscFormulaS.list().subscribe(res => {
                                if (res.message === 'OK') {
                                    this.loading = false;
                                    this.dataSource = new MatTableDataSource<any>(res.object);
                                    this.dataSource.paginator = this.paginator;
                                    this.form.setValue({
                                        'id': 0,
                                        'name': '',
                                        'active': ''
                                    });
                                } else {
                                    this.alertS.open(res.message, 'error');
                                }
                            }, err => {
                                this.alertS.open(err.message, 'error');
                            });
                        } else {
                            this.alertS.open('Error al eliminar la formula!', 'error');
                        }
                    } else {
                        this.alertS.open(resD.message, 'error');
                    }
                }, err => {
                    this.alertS.open(err.message, 'error');
                });
            }
        })
    }
    closeEditing() {
        this.editing = 0;
        this.form.setValue(
            {
                'id': 0,
                'name': '',
                'active': ''
            }
        );
    }
    calculate(id:number) {
        this.dialog.open(CalculationModal, {
            data: { 'formulaId': id },
            width: '100%'
        });
    }
}