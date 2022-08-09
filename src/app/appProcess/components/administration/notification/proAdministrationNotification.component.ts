import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { ProNotificationService } from 'src/app/appProcess/services/proNotification.service';
import { ConfirmationComponent } from 'src/app/shared/components/confirmation/confirmation.component';
import { NotificationComponent } from 'src/app/shared/components/notification/notification.component';
import { AlertService } from 'src/app/shared/services/alert.service';

@Component({
    selector: 'app-proAdministrationNotification',
    templateUrl: './proAdministrationNotification.component.html',
    styleUrls: ['./proAdministrationNotification.component.css']
})
export class ProAdministrationNotificationComponent implements OnInit {
    loading: boolean;
    editing: number;
    columns: string[];
    dataSource = new MatTableDataSource<any>();
    @ViewChild(MatTable) table: MatTable<any>;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    config: AngularEditorConfig;
    form = new FormGroup({
        id: new FormControl(''),
        name: new FormControl('', Validators.required),
        message: new FormControl('', Validators.required),
        variables: new FormControl('', Validators.required),
        active: new FormControl('')
    });

    constructor(private proNotificationS: ProNotificationService,private dialog: MatDialog, private alertS: AlertService) {
        this.loading = false;
        this.editing = 0;
        this.columns = ['id', 'name', 'variables', 'active', 'actions'];
        this.dataSource = new MatTableDataSource([]);
    }

    ngOnInit() {
        this.config = {
            editable: true,
            spellcheck: true,
            height: 'auto',
            minHeight: 'auto',
            maxHeight: 'auto',
            width: 'auto',
            minWidth: '0',
            translate: 'yes',
            enableToolbar: true,
            showToolbar: true,
            placeholder: 'Ingrese el mensage',
            defaultParagraphSeparator: '',
            defaultFontName: '',
            defaultFontSize: '',
            fonts: [
                { class: 'arial', name: 'Arial' },
                { class: 'times-new-roman', name: 'Times New Roman' },
                { class: 'calibri', name: 'Calibri' },
                { class: 'comic-sans-ms', name: 'Comic Sans MS' },
                { class: 'Roboto', name: 'Roboto' }
            ],
            sanitize: true,
            toolbarPosition: 'top',
        };
        this.proNotificationS.list().subscribe(res => {
            if (res.message === 'OK') {
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
    onClick() {
        if (this.editing === 0) {
            this.proNotificationS.create(this.form.value).subscribe(res => {
                if (res.message === 'OK') {
                    if (res.object != 0) {
                        this.alertS.open('Notificacion creada!', 'success');
                        this.loading = true;
                        this.proNotificationS.list().subscribe(res => {
                            if (res.message === 'OK') {
                                this.loading = false;
                                this.dataSource = new MatTableDataSource<any>(res.object);
                                this.dataSource.paginator = this.paginator;
                                this.dataSource.sort = this.sort;
                                this.form.setValue({
                                    'id': '',
                                    'name': '',
                                    'message': '',
                                    'variables': '',
                                    'active': ''
                                });
                            } else {
                                this.alertS.open(res.message, 'error');
                            }
                        }, err => {
                            this.alertS.open(err.message, 'error');
                        });
                    } else {
                        this.alertS.open('Error al crear la notificacion', 'error');
                    }
                } else {
                    this.alertS.open(res.message, 'error');
                }
            }, err => {
                this.alertS.open(err.message, 'error');
            });
        } else {
            this.proNotificationS.update(this.form.value).subscribe(res => {
                if (res.message === 'OK') {
                    if (res.object != 0) {
                        this.alertS.open('Notificacion actualizada!', 'success');
                        this.loading = true;
                        this.proNotificationS.list().subscribe(res => {
                            if (res.message === 'OK') {
                                this.loading = false;
                                this.dataSource = new MatTableDataSource<any>(res.object);
                                this.dataSource.paginator = this.paginator;
                                this.dataSource.sort = this.sort;
                                this.form.setValue({
                                    'id': '',
                                    'name': '',
                                    'message': '',
                                    'variables': '',
                                    'active': ''
                                });
                                this.editing=0;
                            } else {
                                this.alertS.open(res.message, 'error');
                            }
                        }, err => {
                            this.alertS.open(err.message, 'error');
                        });
                    } else {
                        this.alertS.open('Error al actualizar la notificacion!', 'error');
                    }
                } else {
                    this.alertS.open(res.message, 'error');
                }
            }, err => {
                this.alertS.open(err.message, 'error');
            });
        }
    }
    delete(mailId: number) {
        this.dialog.open(ConfirmationComponent,{
            data:{message:'¿Desea eliminar la notificacion?'},
            height:'250px',
            width:'400px'
        }).afterClosed().subscribe(res => {
            if (res) {
                this.proNotificationS.delete(mailId).subscribe(resD => {
                    if (resD.message === 'OK') {
                        if (resD.object != 0) {
                            this.alertS.open('Notificacion eliminada!', 'success');
                            this.loading = true;
                            this.proNotificationS.list().subscribe(res => {
                                if (res.message === 'OK') {
                                    this.loading = false;
                                    this.dataSource = new MatTableDataSource<any>(res.object);
                                    this.dataSource.paginator = this.paginator;
                                    this.dataSource.sort = this.sort;
                                    this.form.setValue({
                                        'id': '',
                                        'name': '',
                                        'message': '',
                                        'variables': '',
                                        'active': ''
                                    });
                                } else {
                                    this.alertS.open(res.message, 'error');
                                }
                            }, err => {
                                this.alertS.open(err.message, 'error');
                            });
                        } else {
                            this.alertS.open('Error al eliminar la notificacion!', 'error');
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
    edit(id: number, name: string, message: string, variables: number, active: boolean) {
        this.editing = id;
        this.form.setValue(
            {
                'id': id,
                'name': name,
                'message': message,
                'variables': variables,
                'active': active
            }
        );
    }
    closeEditing() {
        this.editing = 0;
        this.form.setValue(
            {
                'id': '',
                'name': '',
                'message': '',
                'variables': '',
                'active': ''
            }
        );
    }
    getUser(value: number) {
        this.dialog.open(NotificationComponent, {
            data: { type:'Bsc',mailId: value },
            width: '800px'
        });
    }
}