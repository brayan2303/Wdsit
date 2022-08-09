import { MatTableDataSource, MatTable } from '@angular/material/table';
import { ViewChild, Component, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { AlertService } from 'src/app/shared/services/alert.service';
import { ConfirmationComponent } from 'src/app/shared/components/confirmation/confirmation.component';
import { MatSort } from '@angular/material/sort';
import { GenPersonEntity } from 'src/app/appGeneral/entities/genPerson.entity';
import { TasActivityService } from 'src/app/appTask/services/tasActivity.service';
import { TasTaskService } from 'src/app/appTask/services/tasTask.service';
import { TasTaskEditComponent } from '../edit/tasTaskEdit.component';
import { TasActivityEditComponent } from '../../activity/edit/tasActivityEdit.component';

@Component({
    selector: 'app-tasTaskList',
    templateUrl: './tasTaskList.component.html',
    styleUrls: ['./tasTaskList.component.css']
})
export class TasTaskListComponent implements OnInit {
    loading: boolean;
    columns: string[];
    genPersonEntity: GenPersonEntity;
    dataSource = new MatTableDataSource<any>();
    @ViewChild(MatTable) table: MatTable<any>;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    constructor(private dialog: MatDialog, private tasTaskS: TasTaskService, private tasActivityS: TasActivityService, private alertS: AlertService) {
        this.loading = false;
        this.columns = ['title', 'priority', 'status', 'type', 'startDate', 'endDate', 'requestPerson', 'assignedPerson', 'Acciones'];
        this.dataSource = new MatTableDataSource([]);
    }

    ngOnInit(): void {
        this.genPersonEntity = JSON.parse(localStorage.getItem('user'));
        this.loading = true;
        this.tasTaskS.list(this.genPersonEntity.id).subscribe(res => {
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
    edit(value: number) {
        const dialogRef = this.dialog.open(TasTaskEditComponent, {
            data: { taskId: value }
        });
        dialogRef.afterClosed().subscribe(res => {
            this.loading = true;
            this.tasTaskS.list(this.genPersonEntity.id).subscribe(res => {
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
        }, err => {
            this.alertS.open(err.message, 'error');
        });
    }
    delete(value: number) {
        this.dialog.open(ConfirmationComponent,{
            data:{message:'¿ Desea eliminar la tarea ?'},
            height:'250px',
            width:'400px'
        }).afterClosed().subscribe(res => {
            if (res) {
                this.tasTaskS.delete(value).subscribe(res => {
                    if (res.message === 'OK') {
                        if (res.object != 0) {
                            this.tasActivityS.deleteFileByTaskId(String(value)).subscribe(res => {
                                if (res.message != 'OK') {
                                    this.alertS.open(res.message, 'error');
                                } else {
                                    if (res.object === 0) {
                                        this.alertS.open('Error al eliminar los archivos!', 'error');
                                    }
                                }
                            }, err => {
                                this.alertS.open(err.message, 'error');
                            });
                            this.alertS.open('Tarea eliminada!', 'success');
                            this.loading = true;
                            this.tasTaskS.list(this.genPersonEntity.id).subscribe(res => {
                                if (res.message === 'OK') {
                                    this.loading = false;
                                    this.dataSource = new MatTableDataSource<any>(res.object);
                                    this.dataSource.paginator = this.paginator;
                                    this.dataSource.sort = this.sort;
                                } else {
                                    this.alertS.open(res.message, 'error');
                                }
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
    addActivity(taskId: number) {
        this.dialog.open(TasActivityEditComponent, {
            data: { activityId: 0, taskId: taskId }
        });
    }
    close(taskId: number, status: string) {
        if (status === 'Pendiente') {
            this.tasActivityS.findClose(taskId).subscribe(res => {
                if (res.message === 'OK') {
                    if (res.object === 0) {
                        this.tasTaskS.close(taskId).subscribe(res => {
                            if (res.message === 'OK') {
                                if (res.object > 0) {
                                    this.loading = true;
                                    this.alertS.open('Tarea cerrada!', 'success');
                                    this.tasTaskS.list(this.genPersonEntity.id).subscribe(res => {
                                        if (res.message === 'OK') {
                                            this.loading = false;
                                            this.dataSource = new MatTableDataSource<any>(res.object);
                                            this.dataSource.paginator = this.paginator;
                                            this.dataSource.sort = this.sort;
                                        } else {
                                            this.alertS.open(res.message, 'error');
                                        }
                                    }, err => {
                                        this.alertS.open(err, 'error');
                                    });
                                } else {
                                    this.alertS.open('Error al cerrar la tarea!', 'error');
                                }
                            } else {
                                this.alertS.open(res.message, 'error');
                            }
                        }, err => {
                            this.alertS.open(err.message, 'error');
                        });
                    } else {
                        this.alertS.open('La tarea aun tiene actividades pendientes!', 'warning');
                    }
                } else {
                    this.alertS.open(res.message, 'error');
                }
            }, err => {
                this.alertS.open(err.message, 'error');
            });
        } else {
            this.alertS.open('La tarea ya esta terminada!', 'warning');
        }
    }
}