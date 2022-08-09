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
import { InvGeneralInitService } from '../../services/invGeneralInit.service';
import { GenPersonEntity } from 'src/app/appGeneral/entities/genPerson.entity';
import { MatSort } from '@angular/material/sort';
import { InvGeneralInitEntity } from '../../entities/InvGeneralInit.entity';
import { InvPartNumberComponent } from '../../modals/invPartNumber/invPartNumber.component';
import { InvGeneralDeftLogService } from '../../services/invGeneralDeftLog.service';

@Component({
    selector: 'app-countingGeneralDeft',
    templateUrl: './countingGeneralDeft.component.html',
    styleUrls: ['./countingGeneralDeft.component.css']
})

export class CountingGeneralDeftComponent implements OnInit {
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
    partNumbers: string;
    locationNumber: string;

    constructor(private InvGeneralDeftLogS: InvGeneralDeftLogService, private invGeneralInitS: InvGeneralInitService, private fb: FormBuilder, private invGeneralParametriS: InvGeneralParametriService, private dialog: MatDialog, private alertS: AlertService) {
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
        this.invGeneralInitS.listDeft().subscribe(res => {
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
                this.InvGeneralDeftLogS.create(this.genPersonEntity.id, tipo, parametrizacion, goodDeft).subscribe(resC => {
                    if (resC.message === 'OK') {
                        this.invGeneralInitS.delete(value).subscribe(res => {
                            if (res.message === 'OK') {
                                if (res.object != 0) {
                                    this.alertS.open('Registro eliminado!', 'success');
                                    this.invGeneralInitS.listDeft().subscribe(res => {
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
            parameterizationId: [, [Validators.required]]
            //[,[Validators.required]],
        })

    }
    save() {
        if (this.formId === 0) {
            this.form.markAllAsTouched();
            if (this.form.invalid) {
                return;
            }
            this.invGeneralInitS.create(this.form.value, this.genPersonEntity.id).subscribe(resL => {
                if (resL.message === 'OK') {
                    if (resL.object != 0) {
                        this.alertS.open('Registro creado!', 'success');
                        this.search()
                        this.partNumber(resL.object);
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

    partNumber(id: number) {
        this.dialog.open(InvPartNumberComponent, {
            width: '100%',
            data: { id: id }
        }).afterClosed().subscribe(res => {
            this.search();
        })
    }

    store() {
        this.invGeneralInitS.listWarehouseDeft().subscribe(res => {
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




}