import { Component, Inject, ViewChild } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { AlertService } from 'src/app/shared/services/alert.service';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { RepMailPersonService } from 'src/app/appReport/services/repMailPerson.service';
import { PqrMailPersonService } from 'src/app/appPqrs/services/pqrMailPerson.service';
import { BscNotificationUserService } from "src/app/appBalanceScoreCard/services/bscNotificationUser.service";

@Component({
    selector: 'modal-notification',
    templateUrl: 'notification.component.html',
    styleUrls: ['./notification.component.css']
})
export class NotificationComponent {
    loading: boolean;
    columns: string[];
    dataSource = new MatTableDataSource<any>();
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    constructor(private repMailPersonS: RepMailPersonService, private pqrMailPersonS: PqrMailPersonService,private bscNotificationUserS:BscNotificationUserService, private alertS: AlertService,
        public dialogRef: MatDialogRef<NotificationComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any) {
        dialogRef.disableClose = true;
        this.loading = false;
        this.columns = ['firstName', 'lastName', 'userName', 'mail', 'Asignar'];
        this.dataSource = new MatTableDataSource([]);
    }
    ngOnInit(): void {
        this.loading = true;
        if (this.data.type === 'Reportes') {
            this.repMailPersonS.findAll(this.data.mailId).subscribe(res => {
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
        } else if(this.data.type==='Pqrs') {
            this.pqrMailPersonS.findAll(this.data.mailId).subscribe(res => {
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
        }else if(this.data.type==='Bsc'){
            this.bscNotificationUserS.findAll(this.data.mailId).subscribe(res=>{
                if (res.message === 'OK') {
                    this.loading = false;
                    this.dataSource = new MatTableDataSource<any>(res.object);
                    this.dataSource.paginator = this.paginator;
                    this.dataSource.sort = this.sort;
                } else {
                    this.alertS.open(res.message, 'error');
                }
            },err=>{
                this.alertS.open(err.message,'error');
            });
        }
    }
    filter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim();

        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    }
    checked(input: HTMLInputElement, personId: number, mail: string) {
        if (input.checked) {
            if (mail != null) {
                if (this.data.type === 'Reportes') {
                    this.repMailPersonS.create(this.data.mailId, personId).subscribe(resC => {
                        if (resC.message === 'OK') {
                            if (resC.object != 0) {
                                this.loading = true;
                                this.repMailPersonS.findAll(this.data.mailId).subscribe(res => {
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
                            } else {
                                this.alertS.open('Error al guardar', 'error');
                            }
                        } else {
                            this.alertS.open(resC.message, 'error');
                        }
                    }, err => {
                        this.alertS.open(err.message, 'error');
                    });
                } else if(this.data.type==='Pqrs') {
                    this.pqrMailPersonS.create(this.data.mailId, personId).subscribe(resC => {
                        if (resC.message === 'OK') {
                            if (resC.object != 0) {
                                this.loading = true;
                                this.pqrMailPersonS.findAll(this.data.mailId).subscribe(res => {
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
                            } else {
                                this.alertS.open('Error al guardar', 'error');
                            }
                        } else {
                            this.alertS.open(resC.message, 'error');
                        }
                    }, err => {
                        this.alertS.open(err.message, 'error');
                    });
                }else if(this.data.type==='Bsc'){
                    this.bscNotificationUserS.create(this.data.mailId, personId).subscribe(resC => {
                        if (resC.message === 'OK') {
                            if (resC.object != 0) {
                                this.loading = true;
                                this.bscNotificationUserS.findAll(this.data.mailId).subscribe(res => {
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
                            } else {
                                this.alertS.open('Error al guardar', 'error');
                            }
                        } else {
                            this.alertS.open(resC.message, 'error');
                        }
                    }, err => {
                        this.alertS.open(err.message, 'error');
                    });
                }
            } else {
                this.alertS.open('El usuario no tiene una cuenta de correo', 'warning');
                input.checked = false;
            }
        } else {
            if (this.data.type === 'Reportes') {
                this.repMailPersonS.delete(this.data.mailId, personId).subscribe(resD => {
                    if (resD.message === 'OK') {
                        if (resD.object != 0) {
                            this.loading = true;
                            this.repMailPersonS.findAll(this.data.mailId).subscribe(res => {
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
                        } else {
                            this.alertS.open('Error al eliminar', 'error');
                        }
                    } else {
                        this.alertS.open(resD.message, 'error');
                    }
                }, err => {
                    this.alertS.open(err.message, 'error');
                });
            } else if(this.data.type==='Pqrs') {
                this.pqrMailPersonS.delete(this.data.mailId, personId).subscribe(resD => {
                    if (resD.message === 'OK') {
                        if (resD.object != 0) {
                            this.loading = true;
                            this.pqrMailPersonS.findAll(this.data.mailId).subscribe(res => {
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
                        } else {
                            this.alertS.open('Error al eliminar', 'error');
                        }
                    } else {
                        this.alertS.open(resD.message, 'error');
                    }
                }, err => {
                    this.alertS.open(err.message, 'error');
                });
            }else if(this.data.type==='Bsc'){
                this.bscNotificationUserS.delete(this.data.mailId, personId).subscribe(resD => {
                    if (resD.message === 'OK') {
                        if (resD.object != 0) {
                            this.loading = true;
                            this.bscNotificationUserS.findAll(this.data.mailId).subscribe(res => {
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
                        } else {
                            this.alertS.open('Error al eliminar', 'error');
                        }
                    } else {
                        this.alertS.open(resD.message, 'error');
                    }
                }, err => {
                    this.alertS.open(err.message, 'error');
                });
            }
        }
    }
    close(): void {
        this.dialogRef.close();
    }
}