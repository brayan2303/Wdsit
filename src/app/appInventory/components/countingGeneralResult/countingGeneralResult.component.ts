import { MatTableDataSource, MatTable } from '@angular/material/table';
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
import { InvCountingResultComponent } from '../../modals/invCountingResult/invCountingResult.component';
import { InvCountingSerialResultComponent } from '../../modals/invCountingSerialResult/invCountingSerialResult.component';
import { InvGeneralGoodLogService } from '../../services/invGeneralGoodLog.service';
import { InvGeneralDeftLogService } from '../../services/invGeneralDeftLog.service';
import { InvPartNumberResultComponent } from '../../modals/invPartNumberResult/invPartNumberResult.component';

@Component({
    selector: 'app-countingGeneralResult',
    templateUrl: './countingGeneralResult.component.html',
    styleUrls: ['./countingGeneralResult.component.css']
})

export class CountingGeneralResultComponent implements OnInit {
    loading: boolean;
    columns: string[];
    columnsDeft: string[];
    @Input() formId: number;
    dataSource = new MatTableDataSource<any>();
    @ViewChild(MatTable) table: MatTable<any>;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    dataSourceSerial = new MatTableDataSource<any>();
  @ViewChild(MatSort) sortSerial: MatSort;
  @ViewChild('paginator') paginatorSerial: MatPaginator;

    customerId: number;
    genPersonEntity: GenPersonEntity;
    customerList: GenCustomerEntity[];
    InvGeneralParametriList: InvGeneralParametriEntity[];
    form: FormGroup;
    countingType:string;
    inventory:boolean
    InvGeneralInitEntity:InvGeneralInitEntity;
    
    constructor(private InvGeneralDeftLogS:InvGeneralDeftLogService,private InvGeneralGoodLogS: InvGeneralGoodLogService, private invGeneralInitS:InvGeneralInitService, private fb: FormBuilder, private invGeneralParametriS: InvGeneralParametriService, private dialog: MatDialog, private alertS: AlertService) {
        this.loading = false;
        this.dataSource = new MatTableDataSource([]);
        this.dataSourceSerial = new MatTableDataSource([]);
        this.customerId = 0;
        this.customerList = [];
        this.InvGeneralParametriList = [];
        this.formId = 0;
        this.columns = ['countingType', 'goodDeft','tipo','parametrizacion','type','userName','creationDate','active', 'Acciones'];
        this.columnsDeft = ['countingType', 'goodDeft', 'tipo', 'parametrizacion', 'type', 'userName', 'creationDate', 'active', 'Acciones'];
        this.countingType=null;
        this.inventory = false;
        this.InvGeneralInitEntity = new InvGeneralInitEntity();
    }

    ngOnInit(): void {
        this.genPersonEntity = JSON.parse(localStorage.getItem('user'));
        this.search();
        this.searchDeft();

    }
    search(){
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

    filterDeft(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSourceSerial.filter = filterValue.trim();

        if (this.dataSourceSerial.paginator) {
            this.dataSourceSerial.paginator.firstPage();
        }
    }

    serial(id:number) {

        this.dialog.open(InvCountingSerialResultComponent, {
            width: '100%',
            data: {id: id}
        });
    }

    counting(id:number) {
        this.dialog.open(InvCountingResultComponent, {
            width: '100%',
            data: {id: id}
        });
    }

    searchDeft() {
        this.invGeneralInitS.listDeft().subscribe(resM => {
            if (resM.message === 'OK') {
                this.loading = false;
                this.dataSourceSerial = new MatTableDataSource<any>(resM.object);
                this.dataSourceSerial.paginator = this.paginatorSerial;
                this.dataSourceSerial.sort = this.sortSerial;
            } else {
                this.alertS.open(resM.message, 'error');
            }
        }, err => {
            this.alertS.open(err.message, 'error');
        });


    }

    deleteDeft(value: number, tipo:string, parametrizacion:string, goodDeft:string) {
        this.dialog.open(ConfirmationComponent, {
            data: { message: '¿ Desea eliminar el registro ?' },
            height: '250px',
            width: '400px'
        }).afterClosed().subscribe(res => {
            if (res) {
                this.InvGeneralDeftLogS.create(this.genPersonEntity.id,tipo,parametrizacion,goodDeft).subscribe(resC =>{
                 if(resC.message === 'OK'){
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
            }else{
                this.alertS.open(resC.message, 'error');
            }
            })
            }
        }, err => {
            this.alertS.open(err.message, 'error');
        });
    }

    partNumber(id: number) {
        this.dialog.open(InvPartNumberResultComponent, {
            width: '100%',
            data: { id: id }
        }).afterClosed().subscribe(res => {
        
        })
    }
}