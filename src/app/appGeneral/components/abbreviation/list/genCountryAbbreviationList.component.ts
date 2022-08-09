import { MatTableDataSource, MatTable } from '@angular/material/table';
import { ViewChild, Component, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AlertService } from 'src/app/shared/services/alert.service';
import { ConfirmationComponent } from 'src/app/shared/components/confirmation/confirmation.component';
import { MatSort } from '@angular/material/sort';
import { GenCityService } from 'src/app/appGeneral/services/genCity.service';
import { GenCountryAbbreviationEditComponent } from '../edit/genCountryAbbreviationEdit.component';
import { GenCountryAbbreviationService } from 'src/app/appGeneral/services/genCountryAbbreviation.service';

@Component({
    selector: 'app-genCountryAbbreviationList',
    templateUrl: './genCountryAbbreviationList.component.html',
    styleUrls: ['./genCountryAbbreviationList.component.css']
})
export class GenCountryAbbreviationListComponent implements OnInit {
    loading: boolean;
    columns: string[];
    dataSource = new MatTableDataSource<any>();
    @ViewChild(MatTable) table: MatTable<any>;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    constructor(private genCityS: GenCityService,private GenCountryAbbreviationS:GenCountryAbbreviationService, private dialog: MatDialog, private alertS: AlertService) {
        this.loading = false;
        this.columns = ['name','abbreviation', 'active', 'Acciones'];
        this.dataSource = new MatTableDataSource([]);
    }

    ngOnInit(): void {
        this.loading = true;
        this.GenCountryAbbreviationS.list().subscribe(res => {
            if (res.message === 'OK') {
                this.loading = false;
                this.dataSource = new MatTableDataSource<any>(res.object);
                this.dataSource.paginator = this.paginator;
                this.dataSource.sort=this.sort;
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
        const dialogRef = this.dialog.open(GenCountryAbbreviationEditComponent, {
            data: { formId: value }
        });
        dialogRef.afterClosed().subscribe(resA => {
            this.GenCountryAbbreviationS.list().subscribe(resL => {
                if (resL.message === 'OK') {
                    this.loading = false;
                    this.dataSource = new MatTableDataSource<any>(resL.object);
                    this.dataSource.paginator = this.paginator;
                    this.dataSource.sort=this.sort;
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
            data:{message:'¿Desea eliminar la ciudad?'},
            height:'250px',
            width:'400px'
        }).afterClosed().subscribe(resA => {
            if (resA) {
                this.GenCountryAbbreviationS.delete(value).subscribe(resD => {
                    if (resD.message === 'OK') {
                        if (resD.object != 0) {
                            this.alertS.open('Ciudad eliminada!', 'success');
                            this.GenCountryAbbreviationS.list().subscribe(resL => {
                                if(resL.message==='OK'){
                                    this.loading = false;
                                    this.dataSource = new MatTableDataSource<any>(resL.object);
                                    this.dataSource.paginator = this.paginator;
                                    this.dataSource.sort=this.sort;
                                }else{
                                    this.alertS.open(resL.message,'error');
                                }
                            }, err => {
                                this.alertS.open(err, 'error');
                            });
                        }else{
                            this.alertS.open('Error al eliminar la ciudad!', 'error');
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
}