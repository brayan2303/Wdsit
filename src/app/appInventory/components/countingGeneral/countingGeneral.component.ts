import { MatTableDataSource, MatTable } from '@angular/material/table';
import { MatRadioModule } from '@angular/material/radio';
import { ViewChild, Component, OnInit, Output, Input } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { AlertService } from 'src/app/shared/services/alert.service';
import { ConfirmationComponent } from 'src/app/shared/components/confirmation/confirmation.component';
import { GenCustomerEntity } from 'src/app/appGeneral/entities/genCustomer.entity';
import { InvGeneralParametriService } from '../../services/invGeneralParametri.service';
import { InvGeneralParametriEntity } from '../../entities/invGeneralParametri.entity';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EventEmitter } from 'protractor';
import { InvGeneralInitService } from '../../services/invGeneralInit.service';
import { GenPersonEntity } from 'src/app/appGeneral/entities/genPerson.entity';
import { MatSort } from '@angular/material/sort';
import { InvCountingComponent } from '../../modals/invCounting/invCounting.component';
import { InvSerialComponent } from '../../modals/invSerial/invSerial.component';
import { InvGeneralInitEntity } from '../../entities/InvGeneralInit.entity';
import { InvCountingSerialComponent } from '../../modals/invCountingSerial/invCountingSerial.component';
import { PartNumberModal } from '../../modals/partNumber/partNumber.modal';
import { InvGeneralGoodLogService } from '../../services/invGeneralGoodLog.service';

@Component({
    selector: 'app-countingGeneral',
    templateUrl: './countingGeneral.component.html',
    styleUrls: ['./countingGeneral.component.css']
})

export class CountingGeneralComponent implements OnInit {
    loading: boolean;
    columns: string[];
    @Input() formId: number;
    dataSource = new MatTableDataSource<any>();
    @ViewChild(MatTable) table: MatTable<any>;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    customerId: number;
    genPersonEntity: GenPersonEntity;
    customerList: GenCustomerEntity[];
    InvGeneralParametriList: InvGeneralParametriEntity[];
    form: FormGroup;
    countingType: string;
    inventory: boolean
    invGeneralInitE: InvGeneralInitEntity;
    validation: string;
    type: string;
    storeList: InvGeneralInitEntity[];
    partNumberList: InvGeneralInitEntity[];
    locationList: InvGeneralInitEntity[];
    goodDeft: string;
    locationNumber: string;
    partNumbers: string;
    loadingSave: boolean;

    constructor(private InvGeneralGoodLogS: InvGeneralGoodLogService, private invGeneralInitS: InvGeneralInitService, private fb: FormBuilder, private invGeneralParametriS: InvGeneralParametriService, private dialog: MatDialog, private alertS: AlertService) {
        this.loading = false;
        this.dataSource = new MatTableDataSource([]);
        this.customerId = 0;
        this.customerList = [];
        this.InvGeneralParametriList = [];
        this.formId = 0;
        this.columns = ['countingType', 'goodDeft', 'tipo', 'parametrizacion', 'type', 'userName', 'creationDate', 'active', 'Acciones'];
        this.countingType = null;
        this.inventory = false;
        this.invGeneralInitE = new InvGeneralInitEntity();
        this.validation = '';
        this.type = null;
        this.storeList = [];
        this.partNumberList = [];
        this.goodDeft = '';
        this.locationList = [];
        this.partNumbers = '';
        this.locationNumber = '';
        this.loadingSave = true;
    }

    ngOnInit(): void {

        this.genPersonEntity = JSON.parse(localStorage.getItem('user'));
        this.formBuilders();
        this.search();
        this.store();
        this.invGeneralParametriS.listAll().subscribe(res => {
            if (res.message === 'OK') {
                this.InvGeneralParametriList = res.object;
            } else {
                this.alertS.open(res.message, 'error');
            }
        }, err => {
            this.alertS.open(err.message, 'error');
        });

    }
    search() {
        this.invGeneralInitS.list().subscribe(res => {
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
    delete(value: number, tipo: string, parametrizacion: string, goodDeft: string) {
        this.dialog.open(ConfirmationComponent, {
            data: { message: '¿ Desea eliminar el registro ?' },
            height: '250px',
            width: '400px'
        }).afterClosed().subscribe(res => {
            if (res) {
                this.InvGeneralGoodLogS.create(this.genPersonEntity.id, tipo, parametrizacion, goodDeft).subscribe(resC => {
                    if (resC.message === 'OK') {
                        this.invGeneralInitS.delete(value).subscribe(res => {
                            if (res.message === 'OK') {
                                if (res.object != 0) {
                                    this.alertS.open('Registro eliminado!', 'success');
                                    this.invGeneralInitS.list().subscribe(res => {
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
                    } else {
                        this.alertS.open(resC.message, 'error');
                    }
                })
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


    init() {
        this.inventory = false;
        this.dialog.open(ConfirmationComponent, {
            data: { message: '¿ Desea iniciar el conteo ?' },
            height: '250px',
            width: '400px'
        }).afterClosed().subscribe(res => {
            this.inventory = res;
        }, err => {
            this.alertS.open(err.message, 'error');
        });
    }

    formBuilders() {
        this.form = this.fb.group({
            id: [, []],
            countingType: [, [Validators.required]],
            goodDeft: [, [Validators.required]],
            parameterizationId: [, [Validators.required]],
            store: [, [Validators.required]],
            active: [, []]
            //[,[Validators.required]],
        })

    }
    save() {
        this.loadingSave = false;
        if (this.formId === 0) {
            this.form.markAllAsTouched();
            if (this.form.invalid) {
                return;
            }
            this.invGeneralInitS.create(this.form.value, this.genPersonEntity.id).subscribe(resL => {
                if (resL.message === 'OK') {
                    if (resL.object != 0) {
                        this.alertS.open('Registro creado!', 'success');
                        this.invGeneralInitS.findByIdCondition(resL.object).subscribe(resM => {
                            if (resM.message === 'OK') {
                                this.invGeneralInitE = resM.object;
                                if (this.invGeneralInitE.condition != null) {
                                    if (this.invGeneralInitE.condition == 'Serializado') {
                                        this.serial(resL.object);
                                        this.loadingSave = true;
                                        this.form.controls.store.reset();
                                        this.search();
                                    } else {
                                        this.loadingSave = true;
                                        this.counting(resL.object);
                                        this.form.controls.store.reset();
                                        this.search();
                                    }
                                }
                                else {
                                    this.alertS.open('Por favor asignar el serializado o el conteo al part number PN', 'warning')
                                    this.invGeneralInitS.delete(resL.object).subscribe(res => {
                                        if (res.message === 'OK') {
                                            if (res.object != 0) {
                                                this.invGeneralInitS.list().subscribe(res => {
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
                            } else {
                                this.alertS.open(resM.message, 'error')
                            }
                        })
                    } else {
                        this.alertS.open(resL.message, 'error');
                    }
                } else {
                    this.alertS.open(resL.message, 'error');
                }
            }, err => {
                this.alertS.open(err.message, 'error');
            });
        }


    }

    serial(id: number) {
        this.dialog.open(InvCountingSerialComponent, {
            width: '100%',
            data: { id: id }
        }).afterClosed().subscribe(res => {
            this.search();
        })
    }

    counting(id: number) {
        this.dialog.open(InvCountingComponent, {
            width: '100%',
            data: { id: id }

        }).afterClosed().subscribe(res => {
            this.search();
        })
        this.search();
    }

    store() {
        this.invGeneralInitS.listWarehouse().subscribe(res => {
            if (res.message === 'OK') {
                this.storeList = res.object;
            } else {
                this.alertS.open(res.message, 'error');
            }
        }, err => {
            this.alertS.open(err.message, 'error');
        });
    }

    location() {
        this.invGeneralInitS.listLocation(this.goodDeft).subscribe(res => {
            if (res.message === 'OK') {
                this.locationList = res.object;
            } else {
                this.alertS.open(res.message, 'error');
            }
        }, err => {
            this.alertS.open(err.message, 'error');
        });
    }

    partNumber() {
        this.invGeneralInitS.listPartNumber().subscribe(res => {
            if (res.message === 'OK') {
                this.partNumberList = res.object;
            } else {
                this.alertS.open(res.message, 'error');
            }
        }, err => {
            this.alertS.open(err.message, 'error');
        });
    }

    getPartNumber() {
        const dialogRef = this.dialog.open(PartNumberModal, {
            width: '800px',
            data: { locationNumber: this.locationNumber, countingType: this.countingType, goodDeft: this.goodDeft, locationNumberS: this.locationNumber }
        });
        dialogRef.afterClosed().subscribe(res => {
            if (res['partNumbers'] != '') {
                this.partNumbers = res['partNumbers'];
            }
        });
    }
}