import { MatTableDataSource, MatTable } from '@angular/material/table';
import { ViewChild, Component, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { AlertService } from 'src/app/shared/services/alert.service';
import { ConfirmationComponent } from 'src/app/shared/components/confirmation/confirmation.component';
import { MatSort } from '@angular/material/sort';
import { GenPositionEditComponent } from '../edit/genPositionEdit.component';
import { GenPositionService } from 'src/app/appGeneral/services/genPosition.service';

@Component({
    selector: 'app-genPositionList',
    templateUrl: './genPositionList.component.html',
    styleUrls: ['./genPositionList.component.css']
})
export class GenPositionListComponent implements OnInit {
    loading: boolean;
    columns: string[];
    dataSource = new MatTableDataSource<any>();
    @ViewChild(MatTable) table: MatTable<any>;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    constructor(private genPositionS: GenPositionService, private dialog: MatDialog, private alertS: AlertService) {
        this.loading = false;
        this.columns = ['code','description', 'active', 'Acciones'];
        this.dataSource = new MatTableDataSource([]);
    }

    ngOnInit(): void {
        this.loading = true;
        this.genPositionS.list().subscribe(res => {
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
        const dialogRef = this.dialog.open(GenPositionEditComponent, {
            data: { positionId: value }
        });
        dialogRef.afterClosed().subscribe(resA => {
            this.genPositionS.list().subscribe(resL => {
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
            data:{message:'¿Desea eliminar el cargo?'},
            height:'250px',
            width:'400px'
        }).afterClosed().subscribe(resA => {
            if (resA) {
                this.genPositionS.delete(value).subscribe(resD => {
                    if (resD.message === 'OK') {
                        if (resD.object != 0) {
                            this.alertS.open('Cargo eliminado!', 'success');
                            this.genPositionS.list().subscribe(resL => {
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
                            this.alertS.open('Error al eliminar el cargo!', 'error');
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