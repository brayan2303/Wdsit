import { MatTableDataSource, MatTable } from '@angular/material/table';
import { ViewChild, Component, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { AlertService } from 'src/app/shared/services/alert.service';
import { ConfirmationComponent } from 'src/app/shared/components/confirmation/confirmation.component';
import { MatSort } from '@angular/material/sort';
import { GenModuleEditComponent } from '../edit/genModuleEdit.component';
import { GenModuleService } from 'src/app/appGeneral/services/genModule.service';

@Component({
    selector: 'app-genModuleList',
    templateUrl: './genModuleList.component.html',
    styleUrls: ['./genModuleList.component.css']
})
export class GenModuleListComponent implements OnInit {
    loading: boolean;
    columns: string[];
    dataSource = new MatTableDataSource<any>();
    @ViewChild(MatTable) table: MatTable<any>;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    constructor(private genModuleS: GenModuleService, private dialog: MatDialog, private alertS: AlertService) {
        this.loading = false;
        this.columns = ['name','link', 'section','active', 'Acciones'];
        this.dataSource = new MatTableDataSource([]);
    }

    ngOnInit(): void {
        this.loading = true;
        this.genModuleS.list().subscribe(res => {
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
        const dialogRef = this.dialog.open(GenModuleEditComponent, {
            data: { moduleId: value }
        });
        dialogRef.afterClosed().subscribe(resA => {
            this.genModuleS.list().subscribe(resL => {
                if (resL.message === 'OK') {
                    if(resL.message==='OK'){
                        this.loading = false;
                        this.dataSource = new MatTableDataSource<any>(resL.object);
                        this.dataSource.paginator = this.paginator;
                        this.dataSource.sort=this.sort;
                    }else{
                        this.alertS.open(resL.message,'error');
                    }
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
            data:{message:'¿Desea eliminar el modulo?'},
            height:'250px',
            width:'400px'
        }).afterClosed().subscribe(resA => {
            if (resA) {
                this.genModuleS.delete(value).subscribe(resD => {
                    if (resD.message === 'OK') {
                        if (resD.object != 0) {
                            this.alertS.open('Modulo eliminado!', 'success');
                            this.genModuleS.list().subscribe(resL => {
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
                            this.alertS.open('Error al eliminar el modulo!', 'error');
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