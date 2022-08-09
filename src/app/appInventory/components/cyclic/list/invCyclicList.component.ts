import { MatTableDataSource, MatTable } from '@angular/material/table';
import { ViewChild, Component, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { AlertService } from 'src/app/shared/services/alert.service';
import { ConfirmationComponent } from 'src/app/shared/components/confirmation/confirmation.component';
import { InvCyclicService } from 'src/app/appInventory/services/invCyclic.service';
import { InvCyclicEditComponent } from '../edit/invCyclicEdit.component';
import { CyclicSamplingModal } from 'src/app/appInventory/modals/cyclicSampling/cyclicSampling.modal';
import { CyclicPersonModal } from 'src/app/appInventory/modals/cyclicPerson/cyclicPerson.modal';
import { GenCustomerEntity } from 'src/app/appGeneral/entities/genCustomer.entity';
import { GenCountryCustomerService } from 'src/app/appGeneral/services/genCountryCustomer.service';

@Component({
    selector: 'app-invCyclicList',
    templateUrl: './invCyclicList.component.html',
    styleUrls: ['./invCyclicList.component.css']
})
export class InvCyclicListComponent implements OnInit {
    loading: boolean;
    columns: string[];
    dataSource = new MatTableDataSource<any>();
    @ViewChild(MatTable) table: MatTable<any>;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    customerId:number;
    customerList:GenCustomerEntity[];

    constructor(private invCyclicS:InvCyclicService,private genCountryCustomerS:GenCountryCustomerService, private dialog: MatDialog, private alertS: AlertService) {
        this.loading = false;
        this.columns = ['name', 'typeSampling','sampling','total','system','crossSap','crossWms','crossBase','creationDate','status','customer','active', 'Acciones'];
        this.dataSource = new MatTableDataSource([]);
        this.customerId=0;
        this.customerList=[];
    }

    ngOnInit(): void {
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
    getCyclic(){
        this.loading = true;
        this.invCyclicS.list(this.customerId,0,'0').subscribe(res => {
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
    edit(value: number) {
        const dialogRef = this.dialog.open(InvCyclicEditComponent, {
            data: { cyclicId: value }
        });
        dialogRef.afterClosed().subscribe(resA => {
            this.invCyclicS.list(this.customerId,0,'0').subscribe(res => {
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
        }, err => {
            this.alertS.open(err.message, 'error');
        });
    }
    delete(value: number) {
        this.dialog.open(ConfirmationComponent,{
            data:{message:'¿Desea eliminar el ciclico?'},
            height:'250px',
            width:'400px'
        }).afterClosed().subscribe(res => {
            if (res) {
                this.invCyclicS.delete(value).subscribe(res => {
                    if (res.message === 'OK') {
                        if (res.object != 0) {
                            this.alertS.open('Ciclico eliminado!', 'success');
                            this.invCyclicS.list(this.customerId,0,'0').subscribe(res => {
                                this.loading = false;
                                this.dataSource = new MatTableDataSource<any>(res.object);
                                this.dataSource.paginator = this.paginator;
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
    getSampling(cyclicId: number,system:string,typeSampling:string,customer:string) {
        this.dialog.open(CyclicSamplingModal, {
            data: { cyclicId:cyclicId,system:system,typeSampling:typeSampling,customer:customer },
            width: '800px'
        });
    }
    getAuditer(cyclicId: number) {
        this.dialog.open(CyclicPersonModal, {
            data: { cyclicId:cyclicId,type:'Auditor'},
            width: '800px'
        });
    }
}