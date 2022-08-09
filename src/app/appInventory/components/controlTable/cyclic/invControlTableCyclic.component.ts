import { MatTableDataSource, MatTable } from '@angular/material/table';
import { ViewChild, Component, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { AlertService } from 'src/app/shared/services/alert.service';
import { InvCyclicService } from 'src/app/appInventory/services/invCyclic.service';
import { GenCustomerEntity } from 'src/app/appGeneral/entities/genCustomer.entity';
import { GenCountryCustomerService } from 'src/app/appGeneral/services/genCountryCustomer.service';

@Component({
    selector: 'app-invControlTableCyclic',
    templateUrl: './invControlTableCyclic.component.html',
    styleUrls: ['./invControlTableCyclic.component.css']
})
export class InvControlTableCyclicComponent implements OnInit {
    loading: boolean;
    columns: string[];
    dataSource = new MatTableDataSource<any>();
    @ViewChild(MatTable) table: MatTable<any>;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    customerId:number;
    customerList:GenCustomerEntity[];

    constructor(private invCyclicS: InvCyclicService,private genCountryCustomerS:GenCountryCustomerService, private alertS: AlertService) {
        this.loading = false;
        this.columns = ['name', 'typeSampling', 'sampling', 'total', 'crossCustomer', 'crossWms', 'creationDate', 'startDate', 'endDate', 'status', 'active', 'customer', 'Acciones'];
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
        this.invCyclicS.list(this.customerId,0, '0').subscribe(res => {
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
    approveReject(cyclicId: number, statusFinal: string) {
        this.invCyclicS.approveReject(cyclicId, statusFinal).subscribe(resA => {
            if (resA.message === 'OK') {
                if (resA.object != 0) {
                    this.alertS.open('Ciclico actualizado!', 'success');
                    this.loading = true;
                    this.invCyclicS.list(this.customerId,0, '0').subscribe(resL => {
                        if (resL.message === 'OK') {
                            this.loading = false;
                            this.dataSource = new MatTableDataSource<any>(resL.object);
                            this.dataSource.paginator = this.paginator;
                        } else {
                            this.alertS.open(resL.message, 'error');
                        }
                    }, err => {
                        this.alertS.open(err.message, 'error');
                    });
                } else {
                    this.alertS.open('Error al actualizar el ciclico!', 'error');
                }
            } else {
                this.alertS.open(resA.message, 'error');
            }
        }, err => {
            this.alertS.open(err.message, 'error');
        });
    }
}