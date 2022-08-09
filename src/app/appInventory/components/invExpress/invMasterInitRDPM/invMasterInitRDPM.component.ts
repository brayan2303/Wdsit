import { MatTableDataSource, MatTable } from '@angular/material/table';
import { ViewChild, Component, OnInit, Output, Input, Inject } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AlertService } from 'src/app/shared/services/alert.service';
import { GenCustomerEntity } from 'src/app/appGeneral/entities/genCustomer.entity';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GenPersonEntity } from 'src/app/appGeneral/entities/genPerson.entity';
import { MatSort } from '@angular/material/sort';
import { InvMasterTypeModal } from 'src/app/appInventory/modals/invMasterType/invMasterType.modal';
import { InvMasterInitService } from 'src/app/appInventory/services/invMasterInit.service';
import { InvMasterModel } from 'src/app/appInventory/models/invMaster.model';
import { InvSerialExpressComponent } from 'src/app/appInventory/modals/invSerialExpress/invSerialExpress.component';
import { ConfirmationComponent } from 'src/app/shared/components/confirmation/confirmation.component';
import { InvMasterSerialEntity } from 'src/app/appInventory/entities/invMasterSerial.entity';
import { InvMasterSerialsLogService } from 'src/app/appInventory/services/invMasterSerialsLog.service';
import { InvSerialExpressRDPMComponent } from 'src/app/appInventory/modals/invSerialExpressRDPM/invSerialExpressRDPM.component';
@Component({
    selector: 'app-invMasterInitRDPM',
    templateUrl: './invMasterInitRDPM.component.html',
    styleUrls: ['./invMasterInitRDPM.component.css']
})

export class InvMasterInitRDPMComponent implements OnInit {
    loading: boolean;
    columns: string[];
    @Input() formId: number;
    dataSource = new MatTableDataSource<any>();
    @ViewChild(MatTable) table: MatTable<any>;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @Inject(MAT_DIALOG_DATA) public data: any
    @ViewChild(MatSort) sort: MatSort;
    unibytes: Uint8Array = null;
    customerId: number;
    genPersonEntity: GenPersonEntity;
    customerList: GenCustomerEntity[];
    form: FormGroup;
    countingType: string;
    inventory: boolean
    validation: string;
    type: string;
    location: string;
    codigoSap: string;
    typology: string;
    code: string;
    pallet: string;
    InvMasterM: InvMasterModel;
    InvMasterSerialEntity: InvMasterSerialEntity;

    constructor(private fb: FormBuilder, private InvMasterSerialsLogS:InvMasterSerialsLogService, private InvMasterInitS: InvMasterInitService, private dialog: MatDialog, private alertS: AlertService) {
        this.loading = false;
        this.dataSource = new MatTableDataSource([]);
        this.customerId = 0;
        this.customerList = [];
        this.formId = 0;
        this.columns = ['pallet', 'codigoSap', 'location', 'typology', 'creationDate', 'userCreation', 'userUpdate', 'status', 'active', 'Acciones'];
        this.countingType = null;
        this.inventory = false;
        this.validation = '';
        this.type = null;
        this.location = '';
        this.codigoSap = '';
        this.typology = '';
        this.code = '';
        this.pallet = '';
        this.InvMasterM = new InvMasterModel();
        this.InvMasterSerialEntity = new InvMasterSerialEntity();
    }

    ngOnInit(): void {

        this.genPersonEntity = JSON.parse(localStorage.getItem('user'));
        this.formBuilders();
        this.search();
    }
    search() {
        this.InvMasterInitS.list(this.genPersonEntity.id).subscribe(res => {
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

    formBuilders() {
        this.form = this.fb.group({
            pallet: [, [Validators.required]],
            codigoSap: [, [Validators.required]],
            typology: [, [Validators.required]],
            //[,[Validators.required]],
        })
    }
    save() {
        if (this.formId === 0) {
            this.form.markAllAsTouched();
            if (this.form.invalid) {
                return;
            }
            this.InvMasterInitS.create(this.form.value, this.genPersonEntity.id).subscribe(resL => {
                if (resL.message === 'OK') {
                    if (resL.object != 0) {
                        this.alertS.open('Registro creado!', 'success');
                        this.search();
                        this.form.reset();
                    } else {
                        this.alertS.open(resL.message, 'error');
                        this.form.reset();
                    }
                } else {
                    this.alertS.open(resL.message, 'error');
                }
            }, err => {
                this.alertS.open(err.message, 'error');
            });
        }
    }
    getTipology() {
        this.dialog.open(InvMasterTypeModal, {
            width: '100%',
            data: { type: 'TIPOLOGIA' }
        }).afterClosed().subscribe(res => {
            if (res['code'] != '') {
                this.typology = res['code'];
            }
            this.search();
        })
    }
    getCodigoSap() {
        this.dialog.open(InvMasterTypeModal, {
            width: '100%',
            data: { type: 'CODIGOSAP' }
        }).afterClosed().subscribe(res => {
            if (res['code'] != '') {
                this.codigoSap = res['code'];
            }
            this.search();
        })
    }

    
    getPallet() {
        this.InvMasterInitS.pallet(this.genPersonEntity.id).subscribe(resP => {
            if (resP.message === 'OK') {
                this.InvMasterM = resP.object;
                this.pallet = this.InvMasterM.pallet;
            } else {
                this.alertS.open(resP.message, 'error');
            }
        }, err => {
            this.alertS.open(err.message, 'error');
        });
    }

    serial(id: number, codigoSap: string) {
        this.dialog.open(InvSerialExpressRDPMComponent, {
            width: '100%',
            data: { id: id, codigoSap: codigoSap }
        }).afterClosed().subscribe(res => {
            this.search();
        })
    }

    delete(value: number, pallet:string) {
        this.dialog.open(ConfirmationComponent, {
            data: { message: '¿ Desea eliminar el registro ?' },
            height: '250px',
            width: '400px'
        }).afterClosed().subscribe(res => {
            if (res) {
                this.InvMasterInitS.validationPallet(value).subscribe(resF => {
                    if (resF.message === 'OK') {
                        this.InvMasterSerialEntity = resF.object;
                        if (this.InvMasterSerialEntity.validation != 'NO') {
                            this.InvMasterInitS.delete(value).subscribe(res => {
                                if (res.message === 'OK') {
                                    if (res.object != 0) {
                                        this.alertS.open('Registro eliminado!', 'success');
                                        this.InvMasterSerialsLogS.create(this.genPersonEntity.id,pallet).subscribe(resI =>{
                                            if(resI.message === 'OK'){
                                                if(resI.object !=0){
                                                }else{
                                                    this.alertS.open(resI.message, 'error');
                                                }
                                            }else{
                                                this.alertS.open(resI.message,'error');
                                            }
                                        },err =>{
                                            this.alertS.open(err.message, 'error');
                                        })
                                        this.InvMasterInitS.list(this.genPersonEntity.id).subscribe(res => {
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
                            this.alertS.open('El pallet tiene seriales regitrados', 'warning')
                        }
                    } else {
                        this.alertS.open(resF.message, 'error');
                    }
                }, err => {
                    this.alertS.open(err.message, 'error');
                })
            }
        }, err => {
            this.alertS.open(err.message, 'error');
        });
    }
}