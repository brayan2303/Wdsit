import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { forkJoin } from 'rxjs';
import { GenCustomerEntity } from 'src/app/appGeneral/entities/genCustomer.entity';
import { GenPersonEntity } from 'src/app/appGeneral/entities/genPerson.entity';
import { GenCountryCustomerService } from 'src/app/appGeneral/services/genCountryCustomer.service';
import { InvBaseEntity } from 'src/app/appInventory/entities/invBase.entity';
import { InvCoutingEntity } from 'src/app/appInventory/entities/invCouting.entity';
import { InvCyclicEntity } from 'src/app/appInventory/entities/invCyclic.entity';
import { InvSerialEntity } from 'src/app/appInventory/entities/invSerial.entity';
import { ValidatePalletModal } from 'src/app/appInventory/modals/validatePallet/validatePallet.modal';
import { InvSerialModel } from 'src/app/appInventory/models/invSerial.model';
import { InvBaseService } from 'src/app/appInventory/services/invBase.service';
import { InvCoutingService } from 'src/app/appInventory/services/invCouting.service';
import { InvCyclicService } from 'src/app/appInventory/services/invCyclic.service';
import { InvSerialService } from 'src/app/appInventory/services/invSerial.service';
import { ConfirmationComponent } from 'src/app/shared/components/confirmation/confirmation.component';
import { InformationComponent } from 'src/app/shared/components/information/information.component';
import { AlertService } from 'src/app/shared/services/alert.service';

@Component({
    selector: 'app-invCoutingProcess',
    templateUrl: './invCoutingProcess.component.html',
    styleUrls: ['./invCoutingProcess.component.css']
})
export class InvCoutingProcessComponent implements OnInit {
    loading: boolean;
    loadingIncome: boolean;
    qr: boolean;
    count: boolean;
    customerId: number;
    cyclicId: number;
    quantity: number;
    coutingList: InvCoutingEntity[];
    genPersonEntity: GenPersonEntity;
    invCyclicEntity: InvCyclicEntity;
    coutingEntity: InvCoutingEntity;
    countCross: number;
    customerList: GenCustomerEntity[];
    cyclicList: InvCyclicEntity[];
    columns1: string[];
    columns2: string[];
    columns3: string[];
    dataSource1 = new MatTableDataSource<any>();
    dataSource2 = new MatTableDataSource<any>();
    dataSource3 = new MatTableDataSource<any>();
    @ViewChild(MatPaginator) paginator1: MatPaginator;
    @ViewChild(MatPaginator) paginator2: MatPaginator;

    constructor(private invCoutingS: InvCoutingService, private genCountryCustomerS: GenCountryCustomerService, private invCyclicS: InvCyclicService, private invSerialS: InvSerialService, private invBaseS: InvBaseService, private dialog: MatDialog, private alertS: AlertService) {
        this.loading = false;
        this.loadingIncome = false;
        this.qr = false;
        this.count = false;
        this.customerId = 0;
        this.cyclicId = 0;
        this.quantity = 0;
        this.countCross = 0;
        this.customerList = [];
        this.cyclicList = [];
        this.coutingList = [];
        this.invCyclicEntity = new InvCyclicEntity();
        this.coutingEntity = new InvCoutingEntity();
        this.coutingEntity.pallet = '';
        this.columns1 = ['serial', 'sapCode', 'sapCodeSap', 'sapCodeWms', 'sapCodeBase', 'status', 'statusSap', 'statusWms', 'statusBase', 'pallet', 'palletSap', 'palletWms', 'adjustment', 'acciones'];
        this.columns2 = ['quantity', 'acciones'];
        this.columns3 = ['serial', 'sapCode', 'sapCodeSap', 'sapCodeWms', 'sapCodeBase', 'status', 'statusSap', 'statusWms', 'statusBase', 'pallet', 'palletSap', 'palletWms'];
        this.dataSource1 = new MatTableDataSource([]);
        this.dataSource2 = new MatTableDataSource([]);
        this.dataSource3 = new MatTableDataSource([]);
    }

    ngOnInit(): void {
        this.genPersonEntity = (JSON.parse(localStorage.getItem('user')));
        this.genCountryCustomerS.listCustomer(Number(localStorage.getItem('countryId'))).subscribe(res => {
            if (res.message === 'OK') {
                this.customerList = res.object;
            } else {
                this.alertS.open(res.message, 'error');
            }
        }, err => {
            this.alertS.open(err.message, 'error');
        });
    }
    getCyclic() {
        this.invCyclicS.listByCustomerId(this.customerId).subscribe(res => {
            if (res.message === 'OK') {
                this.cyclicList = res.object;
            } else {
                this.alertS.open(res.message, 'error');
            }
        }, err => {
            this.alertS.open(err.message, 'error');
        });
    }
    getCouting() {
        this.invCoutingS.list(this.customerId, this.genPersonEntity.id).subscribe(res => {
            if (res.message === 'OK') {
                this.coutingList = res.object;
                for (let c of this.coutingList) {
                    if (c.status === 'Iniciado') {
                        this.coutingEntity = c;
                        this.count = true;
                        this.invCyclicS.findById(c.cyclicId).subscribe(resF => {
                            if (resF.message === 'OK') {
                                this.invCyclicEntity = resF.object;
                                if (this.invCyclicEntity.crossSap) {
                                    this.countCross = this.countCross + 1;
                                }
                                if (this.invCyclicEntity.crossWms) {
                                    this.countCross = this.countCross + 1;
                                }
                                if (this.invCyclicEntity.crossBase) {
                                    this.countCross = this.countCross + 1;
                                }
                            } else {
                                this.alertS.open(resF.message, 'error');
                            }
                        }, err => {
                            this.alertS.open(err.message, 'error');
                        });
                        if (this.coutingEntity.type === 'Contar') {
                            this.invCoutingS.findQuantity(this.coutingEntity.id).subscribe(resQ => {
                                if (resQ.message === 'OK') {
                                    this.dataSource2 = new MatTableDataSource<any>(resQ.object);
                                } else {
                                    this.alertS.open(resQ.message, 'error');
                                }
                            }, err => {
                                this.alertS.open(err.message, 'error');
                            });
                        } else if (this.coutingEntity.type === 'Serializar') {
                            this.loading = true;
                            this.invSerialS.list(this.coutingEntity.id, this.coutingEntity.coutingType).subscribe(resL => {
                                if (resL.message === 'OK') {
                                    this.dataSource1 = new MatTableDataSource<any>(resL.object);
                                    this.dataSource1.paginator = this.paginator1;
                                    this.dataSource1.paginator.pageIndex = this.dataSource1.data.length - 1;
                                    this.loading = false;
                                } else {
                                    this.alertS.open(resL.message, 'error');
                                }
                            }, err => {
                                this.alertS.open(err.message, 'error');
                            });
                        } else if (this.coutingEntity.type === 'Validar Pallet') {
                            this.loading = true;
                            this.invSerialS.list(this.coutingEntity.id, this.coutingEntity.coutingType).subscribe(resL => {
                                if (resL.message === 'OK') {
                                    this.dataSource3 = new MatTableDataSource<any>(resL.object);
                                    this.dataSource3.paginator = this.paginator2;
                                    this.dataSource3.paginator.pageIndex = this.dataSource3.data.length - 1;
                                    this.loading = false;
                                } else {
                                    this.alertS.open(resL.message, 'error');
                                }
                            }, err => {
                                this.alertS.open(err.message, 'error');
                            });
                        }
                        break;
                    }
                }
            } else {
                this.alertS.open(res.message, 'error');
            }
        }, err => {
            this.alertS.open(err.message, 'error');
        });
    }
    startEnd(c: InvCoutingEntity, status: string) {
        if (status === 'Iniciado') {
            if (!this.count) {
                this.invCyclicS.findById(c.cyclicId).subscribe(resF => {
                    if (resF.message === 'OK') {
                        this.invCyclicEntity = resF.object;
                        if (this.invCyclicEntity.crossSap) {
                            this.countCross = this.countCross + 1;
                        }
                        if (this.invCyclicEntity.crossWms) {
                            this.countCross = this.countCross + 1;
                        }
                        if (this.invCyclicEntity.crossBase) {
                            this.countCross = this.countCross + 1;
                        }
                        this.invCoutingS.startEnd(c.id, status).subscribe(res => {
                            if (res.message === 'OK') {
                                if (res.object != 0) {
                                    this.alertS.open('Conteo iniciado!', 'success');
                                    this.coutingEntity = c;
                                    this.invCoutingS.list(this.customerId, this.genPersonEntity.id).subscribe(res => {
                                        if (res.message === 'OK') {
                                            this.coutingList = res.object;
                                            this.count = true;
                                            if (c.type === 'Contar') {
                                                this.invCoutingS.findQuantity(this.coutingEntity.id).subscribe(resQ => {
                                                    if (resQ.message === 'OK') {
                                                        this.dataSource2 = new MatTableDataSource<any>(resQ.object);
                                                    } else {
                                                        this.alertS.open(resQ.message, 'error');
                                                    }
                                                }, err => {
                                                    this.alertS.open(err.message, 'error');
                                                });
                                            } else if (c.type === 'Serializar') {
                                                this.invSerialS.list(this.coutingEntity.id, this.coutingEntity.coutingType).subscribe(resL => {
                                                    if (resL.message === 'OK') {
                                                        this.dataSource1 = new MatTableDataSource<any>(resL.object);
                                                        this.dataSource1.paginator = this.paginator1;
                                                        this.dataSource1.paginator.pageIndex = this.dataSource1.data.length - 1;
                                                        this.loading = false;
                                                    } else {
                                                        this.alertS.open(resL.message, 'error');
                                                    }
                                                }, err => {
                                                    this.alertS.open(err.message, 'error');
                                                });
                                            } else if (c.type === 'Validar Pallet') {
                                                this.invSerialS.list(this.coutingEntity.id, this.coutingEntity.coutingType).subscribe(resL => {
                                                    if (resL.message === 'OK') {
                                                        this.dataSource3 = new MatTableDataSource<any>(resL.object);
                                                        this.dataSource3.paginator = this.paginator2;
                                                        this.dataSource3.paginator.pageIndex = this.dataSource3.data.length - 1;
                                                        this.loading = false;
                                                    } else {
                                                        this.alertS.open(resL.message, 'error');
                                                    }
                                                }, err => {
                                                    this.alertS.open(err.message, 'error');
                                                });
                                            }
                                        } else {
                                            this.alertS.open(res.message, 'error');
                                        }
                                    }, err => {
                                        this.alertS.open(err.message, 'error');
                                    });
                                } else {
                                    this.alertS.open('Error al iniciar el conteo!', 'error');
                                }
                            } else {
                                this.alertS.open(res.message, 'error');
                            }
                        }, err => {
                            this.alertS.open(err.message, 'error');
                        });
                    } else {
                        this.alertS.open(resF.message, 'error');
                    }
                }, err => {
                    this.alertS.open(err.message, 'error');
                });
            } else {
                this.alertS.open('Ya tienes un conteo iniciado!', 'warning');
            }
        } else {
            this.invCoutingS.startEnd(this.coutingEntity.id, status).subscribe(res => {
                if (res.message === 'OK') {
                    if (res.object != 0) {
                        this.alertS.open('Conteo terminado!', 'success');
                        this.coutingEntity = new InvCoutingEntity();
                        this.coutingEntity.pallet = '';
                        this.invCyclicEntity = new InvCyclicEntity();
                        this.count = false;
                        this.invCoutingS.list(this.customerId, this.genPersonEntity.id).subscribe(res => {
                            if (res.message === 'OK') {
                                this.coutingList = res.object;
                                this.dataSource1 = new MatTableDataSource([]);
                                this.dataSource1.paginator = this.paginator1;
                                this.dataSource2 = new MatTableDataSource([]);
                                this.dataSource2.paginator = this.paginator1;
                            } else {
                                this.alertS.open(res.message, 'error');
                            }
                        }, err => {
                            this.alertS.open(err.message, 'error');
                        });
                    } else {
                        this.alertS.open('Error al terminar el conteo!', 'error');
                    }
                } else {
                    this.alertS.open(res.message, 'error');
                }
            }, err => {
                this.alertS.open(err.message, 'error');
            });
        }
    }
    focusMac(event) {
        if (event.key === 'Enter' || event.key === 'Tab') {
            if (event.key === 'Tab') {
                event.preventDefault();
            }
            if (this.qr) {
                var serialQr = (document.getElementById('serial') as HTMLInputElement).value;
                if (serialQr.split(';').length > 1) {
                    (document.getElementById('serial') as HTMLInputElement).value = serialQr.split(';')[serialQr.split(';').length - 1];
                    (document.getElementById('mac') as HTMLInputElement).value = serialQr.split(';')[serialQr.split(';').length - 2];
                } else {
                    (document.getElementById('mac') as HTMLInputElement).value = (document.getElementById('serial') as HTMLInputElement).value;
                }
                this.addSerial(event);
            } else {
                document.getElementById('mac').focus();
            }
        }
    }
    addSerial(event) {
        if (event.key === 'Enter' || event.key === 'Tab') {
            if (event.key === 'Tab') {
                event.preventDefault();
            }
            if ((document.getElementById('serial') as HTMLInputElement).value.replace(/[^-A-Za-z0-9]+/g, '').trim() != '' ){//&& (document.getElementById('mac') as HTMLInputElement).value.replace(/[^-A-Za-z0-9]+/g, '').trim() != '') {
                this.invSerialS.find(this.coutingEntity.id, this.coutingEntity.coutingType, (document.getElementById('serial') as HTMLInputElement).value.replace(/[^-A-Za-z0-9]+/g, '').trim()).subscribe(resF => {
                    if (resF.message === 'OK') {
                        if (resF.object === null) {
                            var crossSap: InvSerialModel;
                            var crossWms: InvSerialModel;
                            var crossBase: InvBaseEntity;
                            var query = [];
                            var array: any[] = [];
                            if (this.invCyclicEntity.crossSap) {
                                query.push(this.invSerialS.findSap((document.getElementById('serial') as HTMLInputElement).value.replace(/[^-A-Za-z0-9]+/g, '').trim(), this.coutingEntity.customer));
                            }
                            if (this.invCyclicEntity.crossWms) {
                                query.push(this.invSerialS.findWms((document.getElementById('serial') as HTMLInputElement).value.replace(/[^-A-Za-z0-9]+/g, '').trim(), this.coutingEntity.customer));
                            }
                            if (this.invCyclicEntity.crossBase) {
                                query.push(this.invBaseS.findSerial((document.getElementById('serial') as HTMLInputElement).value.replace(/[^-A-Za-z0-9]+/g, '').trim(), this.coutingEntity.customer));
                            }
                            if (query.length > 0) {
                                forkJoin(query).subscribe(resQ => {
                                    array = resQ;
                                    for (let i = 0; i < array.length; i++) {
                                        if (array[i].message.split('_', 2)[1] === 'SAP') {
                                            crossSap = array[i].object;
                                        } else if (array[i].message.split('_', 2)[1] === 'WMS') {
                                            crossWms = array[i].object;
                                        } else if (array[i].message.split('_', 2)[1] === 'BASE') {
                                            crossBase = array[i].object;
                                        }
                                    }
                                    var invSerialEntity: InvSerialEntity = new InvSerialEntity();
                                    invSerialEntity.coutingId = this.coutingEntity.id;
                                    invSerialEntity.serial = (document.getElementById('serial') as HTMLInputElement).value.replace(/[^-A-Za-z0-9]+/g, '').trim();
                                    invSerialEntity.mac = '';// (document.getElementById('mac') as HTMLInputElement).value.replace(/[^-A-Za-z0-9]+/g, '').trim();
                                    invSerialEntity.status = 'ALMACENAMIENTO';
                                    invSerialEntity.pallet = this.coutingEntity.pallet;
                                    invSerialEntity.sapCode = this.coutingEntity.sapCode;
                                    invSerialEntity.adjustment = '';
                                    invSerialEntity.creationUserId = this.genPersonEntity.id;
                                    if (this.countCross === 0) {
                                        invSerialEntity.sapCodeSap = 'NO APLICA';
                                        invSerialEntity.sapCodeWms = 'NO APLICA';
                                        invSerialEntity.sapCodeBase = 'NO APLICA';
                                        invSerialEntity.statusSap = 'NO APLICA';
                                        invSerialEntity.statusWms = 'NO APLICA';
                                        invSerialEntity.statusBase = 'NO APLICA';
                                        invSerialEntity.palletSap = 'NO APLICA';
                                        invSerialEntity.palletWms = 'NO APLICA';
                                    } else if (this.countCross === 1) {
                                        if (this.invCyclicEntity.principalSystem === 'SAP') {
                                            if (crossSap != null) {
                                                invSerialEntity.sapCodeSap = crossSap.sapCode;
                                                invSerialEntity.statusSap = crossSap.status;
                                                invSerialEntity.palletSap = crossSap.pallet;
                                            } else {
                                                invSerialEntity.sapCodeSap = 'NO EXISTE EN SAP';
                                                invSerialEntity.statusSap = 'NO EXISTE EN SAP';
                                                invSerialEntity.palletSap = 'NO EXISTE EN SAP';
                                            }
                                            invSerialEntity.sapCodeWms = 'NO APLICA';
                                            invSerialEntity.sapCodeBase = 'NO APLICA';
                                            invSerialEntity.statusWms = 'NO APLICA';
                                            invSerialEntity.statusBase = 'NO APLICA';
                                            invSerialEntity.palletWms = 'NO APLICA';
                                        } else if (this.invCyclicEntity.principalSystem === 'WMS') {
                                            if (crossWms != null) {
                                                invSerialEntity.sapCodeWms = crossWms.sapCode;
                                                invSerialEntity.statusWms = crossWms.status;
                                                invSerialEntity.palletWms = crossWms.pallet;
                                            } else {
                                                invSerialEntity.sapCodeWms = 'NO EXISTE EN WMS';
                                                invSerialEntity.statusWms = 'NO EXISTE EN WMS';
                                                invSerialEntity.palletWms = 'NO EXISTE EN WMS';
                                            }
                                            invSerialEntity.sapCodeSap = 'NO APLICA';
                                            invSerialEntity.sapCodeBase = 'NO APLICA';
                                            invSerialEntity.statusSap = 'NO APLICA';
                                            invSerialEntity.statusBase = 'NO APLICA';
                                            invSerialEntity.palletSap = 'NO APLICA';
                                        } else if (this.invCyclicEntity.principalSystem === 'BASE') {
                                            if (crossBase != null) {
                                                invSerialEntity.sapCodeBase = crossBase.sapCode;
                                                invSerialEntity.statusBase = crossBase.status;
                                            } else {
                                                invSerialEntity.sapCodeBase = 'NO EXISTE EN LA BASE';
                                                invSerialEntity.statusBase = 'NO EXISTE EN LA BASE';
                                            }
                                            invSerialEntity.sapCodeSap = 'NO APLICA';
                                            invSerialEntity.sapCodeWms = 'NO APLICA';
                                            invSerialEntity.statusSap = 'NO APLICA';
                                            invSerialEntity.statusWms = 'NO APLICA';
                                            invSerialEntity.palletSap = 'NO APLICA';
                                            invSerialEntity.palletWms = 'NO APLICA';
                                        }
                                    } else {
                                        if (this.invCyclicEntity.crossSap) {
                                            if (crossSap != null) {
                                                invSerialEntity.sapCodeSap = crossSap.sapCode;
                                                invSerialEntity.statusSap = crossSap.status;
                                                invSerialEntity.palletSap = crossSap.pallet;
                                            } else {
                                                invSerialEntity.sapCodeSap = 'NO EXISTE EN SAP';
                                                invSerialEntity.statusSap = 'NO EXISTE EN SAP';
                                                invSerialEntity.palletSap = 'NO EXISTE EN SAP';
                                            }
                                        } else {
                                            invSerialEntity.sapCodeSap = 'NO APLICA';
                                            invSerialEntity.statusSap = 'NO APLICA';
                                            invSerialEntity.palletSap = 'NO APLICA';
                                        }
                                        if (this.invCyclicEntity.crossWms) {
                                            if (crossWms != null) {
                                                invSerialEntity.sapCodeWms = crossWms.sapCode;
                                                invSerialEntity.statusWms = crossWms.status;
                                                invSerialEntity.palletWms = crossWms.pallet;
                                            } else {
                                                invSerialEntity.sapCodeWms = 'NO EXISTE EN WMS';
                                                invSerialEntity.statusWms = 'NO EXISTE EN WMS';
                                                invSerialEntity.palletWms = 'NO EXISTE EN WMS';
                                            }
                                        } else {
                                            invSerialEntity.sapCodeWms = 'NO APLICA';
                                            invSerialEntity.statusWms = 'NO APLICA';
                                            invSerialEntity.palletWms = 'NO APLICA';
                                        }
                                        if (this.invCyclicEntity.crossBase) {
                                            if (crossBase != null) {
                                                invSerialEntity.sapCodeBase = crossBase.sapCode;
                                                invSerialEntity.statusBase = crossBase.status;
                                            } else {
                                                invSerialEntity.sapCodeBase = 'NO EXISTE EN LA BASE';
                                                invSerialEntity.statusBase = 'NO EXISTE EN LA BASE';
                                            }
                                        } else {
                                            invSerialEntity.sapCodeBase = 'NO APLICA';
                                            invSerialEntity.statusBase = 'NO APLICA';
                                        }
                                        if (this.invCyclicEntity.principalSystem === 'SAP') {
                                            if (crossSap != null) {
                                                invSerialEntity.sapCodeSap = crossSap.sapCode;
                                                invSerialEntity.status = crossSap.status;
                                                invSerialEntity.palletSap = crossSap.pallet;
                                            } else {
                                                invSerialEntity.sapCodeSap = 'NO EXISTE EN SAP';
                                                invSerialEntity.statusSap = 'NO EXISTE EN SAP';
                                                invSerialEntity.palletSap = 'NO EXISTE EN SAP';
                                            }
                                        } else if (this.invCyclicEntity.principalSystem === 'WMS') {
                                            if (crossWms != null) {
                                                invSerialEntity.sapCodeWms = crossWms.sapCode;
                                                invSerialEntity.statusWms = crossWms.status
                                                invSerialEntity.palletWms = crossWms.pallet;
                                            } else {
                                                invSerialEntity.sapCodeWms = 'NO EXISTE EN WMS';
                                                invSerialEntity.statusWms = 'NO EXISTE EN WMS';
                                                invSerialEntity.palletWms = 'NO EXISTE EN WMS';
                                            }
                                        } else if (this.invCyclicEntity.principalSystem === 'BASE') {
                                            if (crossBase != null) {
                                                invSerialEntity.sapCodeBase = crossBase.sapCode;
                                                invSerialEntity.statusBase = crossBase.status;
                                            } else {
                                                invSerialEntity.sapCodeBase = 'NO EXISTE EN LA BASE';
                                                invSerialEntity.statusBase = 'NO EXISTE EN LA BASE';
                                            }
                                        }
                                    }
                                    this.invSerialS.create(this.coutingEntity.coutingType, invSerialEntity).subscribe(resC => {
                                        if (resC.message === 'OK') {
                                            if (resC.object != 0) {
                                                invSerialEntity.id = resC.object;
                                                this.dataSource1.data.push(invSerialEntity);
                                                this.dataSource1.paginator = this.paginator1;
                                                this.dataSource1.paginator.pageIndex = this.dataSource1.data.length - 1;
                                                (document.getElementById('serial') as HTMLInputElement).value = '';
                                                //(document.getElementById('mac') as HTMLInputElement).value = '';
                                                document.getElementById('serial').focus();
                                            } else {
                                                this.alertS.open('Error al guardar el serial!', 'error');
                                                (document.getElementById('serial') as HTMLInputElement).value = '';
                                                //(document.getElementById('mac') as HTMLInputElement).value = '';
                                                document.getElementById('serial').focus();
                                            }
                                        } else {
                                            this.alertS.open(resC.message, 'error');
                                            (document.getElementById('serial') as HTMLInputElement).value = '';
                                            //(document.getElementById('mac') as HTMLInputElement).value = '';
                                            document.getElementById('serial').focus();
                                        }
                                    }, err => {
                                        this.alertS.open(err.message, 'error');
                                        (document.getElementById('serial') as HTMLInputElement).value = '';
                                        //(document.getElementById('mac') as HTMLInputElement).value = '';
                                        document.getElementById('serial').focus();
                                    });
                                }, err => {
                                    this.alertS.open(err.message, 'error');
                                });
                            } else {
                                var invSerialEntity: InvSerialEntity = new InvSerialEntity();
                                invSerialEntity.coutingId = this.coutingEntity.id;
                                invSerialEntity.serial = (document.getElementById('serial') as HTMLInputElement).value.replace(/[^-A-Za-z0-9]+/g, '').trim();
                                invSerialEntity.mac = '';//(document.getElementById('mac') as HTMLInputElement).value.replace(/[^-A-Za-z0-9]+/g, '').trim();
                                invSerialEntity.status = 'ALMACENAMIENTO';
                                invSerialEntity.pallet = this.coutingEntity.pallet;
                                invSerialEntity.sapCode = this.coutingEntity.sapCode;
                                invSerialEntity.adjustment = '';
                                invSerialEntity.creationUserId = this.genPersonEntity.id;
                                if (this.countCross === 0) {
                                    invSerialEntity.sapCodeSap = 'NO APLICA';
                                    invSerialEntity.sapCodeWms = 'NO APLICA';
                                    invSerialEntity.sapCodeBase = 'NO APLICA';
                                    invSerialEntity.statusSap = 'NO APLICA';
                                    invSerialEntity.statusWms = 'NO APLICA';
                                    invSerialEntity.statusBase = 'NO APLICA';
                                    invSerialEntity.palletSap = 'NO APLICA';
                                    invSerialEntity.palletWms = 'NO APLICA';
                                } else if (this.countCross === 1) {
                                    if (this.invCyclicEntity.principalSystem === 'SAP') {
                                        if (crossSap != null) {
                                            invSerialEntity.sapCodeSap = crossSap.sapCode;
                                            invSerialEntity.statusSap = crossSap.status;
                                            invSerialEntity.palletSap = crossSap.pallet;
                                        } else {
                                            invSerialEntity.sapCodeSap = 'NO EXISTE EN SAP';
                                            invSerialEntity.statusSap = 'NO EXISTE EN SAP';
                                            invSerialEntity.palletSap = 'NO EXISTE EN SAP';
                                        }
                                        invSerialEntity.sapCodeWms = 'NO APLICA';
                                        invSerialEntity.sapCodeBase = 'NO APLICA';
                                        invSerialEntity.statusWms = 'NO APLICA';
                                        invSerialEntity.statusBase = 'NO APLICA';
                                        invSerialEntity.palletWms = 'NO APLICA';
                                    } else if (this.invCyclicEntity.principalSystem === 'WMS') {
                                        if (crossWms != null) {
                                            invSerialEntity.sapCodeWms = crossWms.sapCode;
                                            invSerialEntity.statusWms = crossWms.status;
                                            invSerialEntity.palletWms = crossWms.pallet;
                                        } else {
                                            invSerialEntity.sapCodeWms = 'NO EXISTE EN WMS';
                                            invSerialEntity.statusWms = 'NO EXISTE EN WMS';
                                            invSerialEntity.palletWms = 'NO EXISTE EN WMS';
                                        }
                                        invSerialEntity.sapCodeSap = 'NO APLICA';
                                        invSerialEntity.sapCodeBase = 'NO APLICA';
                                        invSerialEntity.statusSap = 'NO APLICA';
                                        invSerialEntity.statusBase = 'NO APLICA';
                                        invSerialEntity.palletSap = 'NO APLICA';
                                    } else if (this.invCyclicEntity.principalSystem === 'BASE') {
                                        if (crossBase != null) {
                                            invSerialEntity.sapCodeBase = crossBase.sapCode;
                                            invSerialEntity.statusBase = crossBase.status;
                                        } else {
                                            invSerialEntity.sapCodeBase = 'NO EXISTE EN LA BASE';
                                            invSerialEntity.statusBase = 'NO EXISTE EN LA BASE';
                                        }
                                        invSerialEntity.sapCodeSap = 'NO APLICA';
                                        invSerialEntity.sapCodeWms = 'NO APLICA';
                                        invSerialEntity.statusSap = 'NO APLICA';
                                        invSerialEntity.statusWms = 'NO APLICA';
                                        invSerialEntity.palletSap = 'NO APLICA';
                                        invSerialEntity.palletWms = 'NO APLICA';
                                    }
                                } else {
                                    if (this.invCyclicEntity.crossSap) {
                                        if (crossSap != null) {
                                            invSerialEntity.sapCodeSap = crossSap.sapCode;
                                            invSerialEntity.statusSap = crossSap.status;
                                            invSerialEntity.palletSap = crossSap.pallet;
                                        } else {
                                            invSerialEntity.sapCodeSap = 'NO EXISTE EN SAP';
                                            invSerialEntity.statusSap = 'NO EXISTE EN SAP';
                                            invSerialEntity.palletSap = 'NO EXISTE EN SAP';
                                        }
                                    } else {
                                        invSerialEntity.sapCodeSap = 'NO APLICA';
                                        invSerialEntity.statusSap = 'NO APLICA';
                                        invSerialEntity.palletSap = 'NO APLICA';
                                    }
                                    if (this.invCyclicEntity.crossWms) {
                                        if (crossWms != null) {
                                            invSerialEntity.sapCodeWms = crossWms.sapCode;
                                            invSerialEntity.statusWms = crossWms.status;
                                            invSerialEntity.palletWms = crossWms.pallet;
                                        } else {
                                            invSerialEntity.sapCodeWms = 'NO EXISTE EN WMS';
                                            invSerialEntity.statusWms = 'NO EXISTE EN WMS';
                                            invSerialEntity.palletWms = 'NO EXISTE EN WMS';
                                        }
                                    } else {
                                        invSerialEntity.sapCodeWms = 'NO APLICA';
                                        invSerialEntity.statusWms = 'NO APLICA';
                                        invSerialEntity.palletWms = 'NO APLICA';
                                    }
                                    if (this.invCyclicEntity.crossBase) {
                                        if (crossBase != null) {
                                            invSerialEntity.sapCodeBase = crossBase.sapCode;
                                            invSerialEntity.statusBase = crossBase.status;
                                        } else {
                                            invSerialEntity.sapCodeBase = 'NO EXISTE EN LA BASE';
                                            invSerialEntity.statusBase = 'NO EXISTE EN LA BASE';
                                        }
                                    } else {
                                        invSerialEntity.sapCodeBase = 'NO APLICA';
                                        invSerialEntity.statusBase = 'NO APLICA';
                                    }
                                    if (this.invCyclicEntity.principalSystem === 'SAP') {
                                        if (crossSap != null) {
                                            invSerialEntity.sapCodeSap = crossSap.sapCode;
                                            invSerialEntity.status = crossSap.status;
                                            invSerialEntity.palletSap = crossSap.pallet;
                                        } else {
                                            invSerialEntity.sapCodeSap = 'NO EXISTE EN SAP';
                                            invSerialEntity.statusSap = 'NO EXISTE EN SAP';
                                            invSerialEntity.palletSap = 'NO EXISTE EN SAP';
                                        }
                                    } else if (this.invCyclicEntity.principalSystem === 'WMS') {
                                        if (crossWms != null) {
                                            invSerialEntity.sapCodeWms = crossWms.sapCode;
                                            invSerialEntity.statusWms = crossWms.status
                                            invSerialEntity.palletWms = crossWms.pallet;
                                        } else {
                                            invSerialEntity.sapCodeWms = 'NO EXISTE EN WMS';
                                            invSerialEntity.statusWms = 'NO EXISTE EN WMS';
                                            invSerialEntity.palletWms = 'NO EXISTE EN WMS';
                                        }
                                    } else if (this.invCyclicEntity.principalSystem === 'BASE') {
                                        if (crossBase != null) {
                                            invSerialEntity.sapCodeBase = crossBase.sapCode;
                                            invSerialEntity.statusBase = crossBase.status;
                                        } else {
                                            invSerialEntity.sapCodeBase = 'NO EXISTE EN LA BASE';
                                            invSerialEntity.statusBase = 'NO EXISTE EN LA BASE';
                                        }
                                    }
                                }
                                this.invSerialS.create(this.coutingEntity.coutingType, invSerialEntity).subscribe(resC => {
                                    if (resC.message === 'OK') {
                                        if (resC.object != 0) {
                                            invSerialEntity.id = resC.object;
                                            this.dataSource1.data.push(invSerialEntity);
                                            this.dataSource1.paginator = this.paginator1;
                                            this.dataSource1.paginator.pageIndex = this.dataSource1.data.length - 1;
                                            (document.getElementById('serial') as HTMLInputElement).value = '';
                                            (document.getElementById('mac') as HTMLInputElement).value = '';
                                            document.getElementById('serial').focus();
                                        } else {
                                            this.alertS.open('Error al guardar el serial!', 'error');
                                            (document.getElementById('serial') as HTMLInputElement).value = '';
                                            //(document.getElementById('mac') as HTMLInputElement).value = '';
                                            document.getElementById('serial').focus();
                                        }
                                    } else {
                                        this.alertS.open(resC.message, 'error');
                                        (document.getElementById('serial') as HTMLInputElement).value = '';
                                        //(document.getElementById('mac') as HTMLInputElement).value = '';
                                        document.getElementById('serial').focus();
                                    }
                                }, err => {
                                    this.alertS.open(err.message, 'error');
                                    (document.getElementById('serial') as HTMLInputElement).value = '';
                                    //(document.getElementById('mac') as HTMLInputElement).value = '';
                                    document.getElementById('serial').focus();
                                });
                            }
                        } else {
                            var information = this.dialog.open(InformationComponent, {
                                data: { message: 'El serial esta duplicado, pallet: ' + resF.object.pallet },
                            });
                            information.afterClosed().subscribe(res => {
                                (document.getElementById('serial') as HTMLInputElement).value = '';
                                //(document.getElementById('mac') as HTMLInputElement).value = '';
                                document.getElementById('serial').focus();
                            });
                        }
                    } else {
                        this.alertS.open(resF.message, 'error');
                    }
                }, err => {
                    this.alertS.open(err.message, 'error');
                });
            } else {
                var information = this.dialog.open(InformationComponent, {
                    data: { message: 'Ingrese un serial!' },
                });
                information.afterClosed().subscribe(res => {
                    (document.getElementById('serial') as HTMLInputElement).value = '';
                    //(document.getElementById('mac') as HTMLInputElement).value = '';
                    document.getElementById('serial').focus();
                });
            }
        }
    }
    addQuantity(event) {
        if (event.key === 'Enter' || event.key === 'Tab') {
            if (event.key === 'Tab') {
                event.preventDefault();
            }
            if (this.dataSource2.data.length === 0) {
                this.invCoutingS.addQuantity(this.coutingEntity.id, this.quantity).subscribe(resQ => {
                    if (resQ.message === 'OK') {
                        if (resQ.object != 0) {
                            this.invCoutingS.findQuantity(this.coutingEntity.id).subscribe(resF => {
                                if (resF.message === 'OK') {
                                    this.dataSource2 = new MatTableDataSource<any>(resF.object);
                                    this.quantity = 0;
                                } else {
                                    this.alertS.open(resF.message, 'error');
                                }
                            }, err => {
                                this.alertS.open(err.message, 'error');
                            });
                        } else {
                            this.alertS.open('Error al agregar la cantidad!', 'error');
                        }
                    } else {
                        this.alertS.open(resQ.message, 'error');
                    }
                }, err => {
                    this.alertS.open(err.message, 'error');
                });
            } else {
                this.alertS.open('Este conteo ya tiene una cantidad!', 'warning');
            }
        }
    }
    validatePallet() {
        let validatePallet = this.dialog.open(ValidatePalletModal, {
            data: { cyclicId: this.invCyclicEntity.id, pallet: this.coutingEntity.pallet,coutingEntity:this.coutingEntity },
            width: '100%'
        });
        validatePallet.afterClosed().subscribe(resA => {
            if (resA) {
                this.invSerialS.list(this.coutingEntity.id, this.coutingEntity.coutingType).subscribe(resL => {
                    if (resL.message === 'OK') {
                        this.dataSource3 = new MatTableDataSource<any>(resL.object);
                        this.dataSource3.paginator = this.paginator2;
                        this.dataSource3.paginator.pageIndex = this.dataSource3.data.length - 1;
                        this.loading = false;
                    } else {
                        this.alertS.open(resL.message, 'error');
                    }
                }, err => {
                    this.alertS.open(err.message, 'error');
                });
            }
        });
    }
    removeSerial(id: number) {
        this.dialog.open(ConfirmationComponent,{
            data:{message:'¿Desea eliminar el serial?'},
            height:'250px',
            width:'400px'
        }).afterClosed().subscribe(resA => {
            if (resA) {
                this.invSerialS.delete(this.coutingEntity.coutingType,id).subscribe(resD => {
                    if (resD.message === 'OK') {
                        if (resD.object != 0) {
                            this.alertS.open('Serial eliminado!', 'success');
                            this.loading = true;
                            this.invSerialS.list(this.coutingEntity.id, this.coutingEntity.coutingType).subscribe(resL => {
                                if (resL.message === 'OK') {
                                    this.dataSource1 = new MatTableDataSource<any>(resL.object);
                                    this.dataSource1.paginator = this.paginator1;
                                    this.dataSource1.paginator.pageIndex = this.dataSource1.data.length - 1;
                                    this.loading = false;
                                } else {
                                    this.alertS.open(resL.message, 'error');
                                }
                            }, err => {
                                this.alertS.open(err.message, 'error');
                            });
                        } else {
                            this.alertS.open('Error al eliminar el serial!', 'error');
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
    removeQuantity() {
        this.dialog.open(ConfirmationComponent,{
            data:{message:'¿Desea eliminar la cantidad?'},
            height:'250px',
            width:'400px'
        }).afterClosed().subscribe(resA => {
            if (resA) {
                this.invCoutingS.deleteQuantity(this.coutingEntity.id).subscribe(resD => {
                    if (resD.message === 'OK') {
                        if (resD.object != 0) {
                            this.alertS.open('Cantidad removida!', 'success');
                            this.invCoutingS.findQuantity(this.coutingEntity.id).subscribe(resF => {
                                if (resF.message === 'OK') {
                                    this.dataSource2 = new MatTableDataSource<any>(resF.object);
                                    this.quantity = 0;
                                } else {
                                    this.alertS.open(resF.message, 'error');
                                }
                            }, err => {
                                this.alertS.open(err.message, 'error');
                            });
                        } else {
                            this.alertS.open('Error al remover la cantidad!', 'error');
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
