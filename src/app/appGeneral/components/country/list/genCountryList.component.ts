import { MatTableDataSource, MatTable } from '@angular/material/table';
import { ViewChild, Component, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { AlertService } from 'src/app/shared/services/alert.service';
import { ConfirmationComponent } from 'src/app/shared/components/confirmation/confirmation.component';
import { GenCountryEditComponent } from '../edit/genCountryEdit.component';
import { GenCountryService } from 'src/app/appGeneral/services/genCountry.service';
import { CountryCustomerModal } from 'src/app/appGeneral/modals/countryCustomer/countryCustomer.modal';

@Component({
    selector: 'app-genCountryList',
    templateUrl: './genCountryList.component.html',
    styleUrls: ['./genCountryList.component.css']
})
export class GenCountryListComponent implements OnInit {
    loading: boolean;
    columns: string[];
    dataSource = new MatTableDataSource<any>();
    @ViewChild(MatTable) table: MatTable<any>;
    @ViewChild(MatPaginator) paginator: MatPaginator;

    constructor(private genCountryS: GenCountryService, private dialog: MatDialog, private alertS: AlertService) {
        this.loading = false;
        this.columns = ['name', 'active', 'acciones'];
        this.dataSource = new MatTableDataSource([]);
    }

    ngOnInit(): void {
        this.loading = true;
        this.genCountryS.list().subscribe(res => {
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
        const dialogRef = this.dialog.open(GenCountryEditComponent, {
            data: { countryId: value },
            width:'100%'
        });
        dialogRef.afterClosed().subscribe(resA => {
            this.genCountryS.list().subscribe(resL => {
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
        }, err => {
            this.alertS.open(err.message, 'error');
        });
    }
    delete(value: number) {
        this.dialog.open(ConfirmationComponent,{
            data:{message:'¿Desea eliminar el pais?'},
            height:'250px',
            width:'400px'
        }).afterClosed().subscribe(resA => {
            if (resA) {
                this.genCountryS.delete(value).subscribe(resD => {
                    if (resD.message === 'OK') {
                        if (resD.object != 0) {
                            this.alertS.open('Pais eliminado!', 'success');
                            this.genCountryS.list().subscribe(resL => {
                                if(resL.message==='OK'){
                                    this.loading = false;
                                    this.dataSource = new MatTableDataSource<any>(resL.object);
                                    this.dataSource.paginator = this.paginator;
                                }else{
                                    this.alertS.open(resL.message,'error');
                                }
                            }, err => {
                                this.alertS.open(err, 'error');
                            });
                        }else{
                            this.alertS.open('Error al eliminar el pais!', 'error');
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
    getCustomer(value:number){
        this.dialog.open(CountryCustomerModal, {
            data: { countryId: value },
            width:'100%'
        });
    }
}