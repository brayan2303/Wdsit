import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AlertService } from 'src/app/shared/services/alert.service';
import { ConfirmationComponent } from 'src/app/shared/components/confirmation/confirmation.component';
import { ActivatedRoute, Params } from '@angular/router';
import { TasActivityService } from 'src/app/appTask/services/tasActivity.service';
import { TasActivityEntity } from 'src/app/appTask/entities/tasActivity.entity';
import { DevActivityModel } from 'src/app/appTask/models/devActivity.model';
import { TasActivityEditComponent } from '../edit/tasActivityEdit.component';

@Component({
    selector: 'app-tasActivityList',
    templateUrl: './tasActivityList.component.html',
    styleUrls: ['./tasActivityList.component.css']
})
export class TasActivityListComponent implements OnInit {
    loading: boolean;
    taskId: number;
    activityList: TasActivityEntity[];
    fileList: DevActivityModel[];

    constructor(private params: ActivatedRoute, private dialog: MatDialog, private tasActivityS: TasActivityService, private alertS: AlertService) {
        this.loading = false;
        this.fileList = [];
        this.activityList = [];
    }

    ngOnInit(): void {
        this.params.paramMap.subscribe((p: Params) => {
            this.loading = true;
            this.taskId = p.get('taskId');
            this.tasActivityS.list(this.taskId).subscribe(res => {
                if (res.message === 'OK') {
                    this.activityList = res.object;
                    this.loading = false;
                } else {
                    this.alertS.open(res.message, 'error');
                }
            }, err => {
                this.alertS.open(err.message, 'error');
            });
            this.tasActivityS.listFile(this.taskId).subscribe(res => {
                if (res.message === 'OK') {
                    this.fileList = res.object;
                } else {
                    this.alertS.open(res.message, 'error');
                }
            }, err => {
                this.alertS.open(err.message, 'error');
            });
        });
    }
    edit(value: number) {
        const dialogRef = this.dialog.open(TasActivityEditComponent, {
            data: { activityId: value, taskId: this.taskId }
        });
        dialogRef.afterClosed().subscribe(res => {
            this.loading = true;
            this.tasActivityS.list(this.taskId).subscribe(res => {
                if (res.message === 'OK') {
                    this.activityList = res.object;
                    this.loading = false;
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
    delete(activityId:string) {
        this.dialog.open(ConfirmationComponent,{
            data:{message:'¿ Desea eliminar la actividad ?'},
            height:'250px',
            width:'400px'
        }).afterClosed().subscribe(res => {
            if (res) {
                this.tasActivityS.delete(Number(activityId)).subscribe(res => {
                    if (res.message === 'OK') {
                        if (res.object != 0) {
                            this.tasActivityS.deleteFileByActivityId(String(this.taskId),activityId).subscribe(res => {
                                if (res.message != 'OK') {
                                    this.alertS.open(res.message, 'error');
                                } else {
                                    if (res.object === 0) {
                                        this.alertS.open('Error eliminando archivos!', 'error');
                                    }
                                }
                            }, err => {
                                this.alertS.open(err.message, 'error');
                            });
                            this.alertS.open('Actividad eliminada!', 'success');
                            this.loading = true;
                            this.tasActivityS.list(this.taskId).subscribe(res => {
                                this.activityList = res.object;
                                this.loading = false;
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
    attach(activityId: string, files: File[]) {
        if (files != undefined) {
            this.tasActivityS.loadFile(String(this.taskId), activityId, files).subscribe(res => {
                if (res.message === 'OK') {
                    this.tasActivityS.listFile(this.taskId).subscribe(res => {
                        if (res.message === 'OK') {
                            this.fileList = res.object;
                        } else {
                            this.alertS.open(res.message, 'error');
                        }
                    }, err => {
                        this.alertS.open(err.message, 'error');
                    });
                } else {
                    this.alertS.open(res.message, 'error');
                }
            }, err => {
                this.alertS.open(err.message, 'error');
            });
        }
    }
    downloadFile(file: DevActivityModel) {
        let downloadLink = document.createElement("a");
        downloadLink.setAttribute("href", "data:image/png;base64," + file.file);
        downloadLink.setAttribute("download", file.name);
        downloadLink.style.visibility = "hidden";
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
    }
    deleteFile(activityId:string,file: string) {
        this.tasActivityS.deleteFile(String(this.taskId),activityId,file).subscribe(res => {
            if (res.message === 'OK') {
                if (res.object != 0) {
                    this.alertS.open('Archivo eliminado!', 'success');
                    this.tasActivityS.listFile(this.taskId).subscribe(res => {
                        if (res.message === 'OK') {
                            this.fileList = res.object;
                        } else {
                            this.alertS.open(res.message, 'error');
                        }
                    }, err => {
                        this.alertS.open(err.message, 'error');
                    });
                } else {
                    this.alertS.open('Error al eliminar el archivo', 'error');
                }
            } else {
                this.alertS.open(res.message, 'error');
            }
        }, err => {
            this.alertS.open(err.message, 'error');
        });
    }
    add() {
        const dialogRef = this.dialog.open(TasActivityEditComponent, {
            data: { activityId: 0, taskId: this.taskId }
        });
        dialogRef.afterClosed().subscribe(res => {
            this.loading = true;
            this.tasActivityS.list(this.taskId).subscribe(res => {
                if (res.message === 'OK') {
                    this.activityList = res.object;
                    this.loading = false;
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
    close(activityId: number, status: string) {
        if (status === 'Pendiente') {
            this.tasActivityS.close(activityId).subscribe(res => {
                if (res.message === 'OK') {
                    if (res.object > 0) {
                        this.alertS.open('Actividad cerrada!', 'success');
                        this.loading = true;
                        this.tasActivityS.list(this.taskId).subscribe(res => {
                            if (res.message === 'OK') {
                                this.activityList = res.object;
                                this.loading = false;
                            } else {
                                this.alertS.open(res.message, 'error');
                            }
                        }, err => {
                            this.alertS.open(err.message, 'error');
                        });
                    } else {
                        this.alertS.open('Error al cerrar la actividad', 'error');
                    }
                } else {
                    this.alertS.open(res.message, 'error');
                }
            }, err => {
                this.alertS.open(err.message, 'error');
            });
        } else {
            this.alertS.open('La actividad ya esta terminada!', 'warning');
        }
    }
}