import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { StatusModal } from 'src/app/appPqrs/modals/status/status.modal';
import { PqrMailService } from 'src/app/appPqrs/services/pqrMail.service';
import { ConfirmationComponent } from 'src/app/shared/components/confirmation/confirmation.component';
import { NotificationComponent } from 'src/app/shared/components/notification/notification.component';
import { AlertService } from 'src/app/shared/services/alert.service';

@Component({
    selector: 'app-pqrAdministrationNotification',
    templateUrl: './pqrAdministrationNotification.component.html',
    styleUrls: ['./pqrAdministrationNotification.component.css']
})
export class PqrAdministrationNotificationComponent implements OnInit {
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
        subject: new FormControl('', Validators.required),
        message: new FormControl('', Validators.required),
        variables: new FormControl('', Validators.required),
        active: new FormControl('')
    });

    constructor(private pqrMailS: PqrMailService,private dialog: MatDialog, private alertS: AlertService) {
        this.loading = false;
        this.editing = 0;
        this.columns = ['id', 'subject', 'variables', 'active', 'Acciones'];
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
        this.pqrMailS.list().subscribe(res => {
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
            this.pqrMailS.create(this.form.value).subscribe(res => {
                if (res.message === 'OK') {
                    if (res.object != 0) {
                        this.alertS.open('Notificacion creada!', 'success');
                        this.loading = true;
                        this.pqrMailS.list().subscribe(res => {
                            if (res.message === 'OK') {
                                this.loading = false;
                                this.dataSource = new MatTableDataSource<any>(res.object);
                                this.dataSource.paginator = this.paginator;
                                this.dataSource.sort = this.sort;
                                this.form.setValue({
                                    'id': '',
                                    'subject': '',
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
            this.pqrMailS.update(this.form.value).subscribe(res => {
                if (res.message === 'OK') {
                    if (res.object != 0) {
                        this.alertS.open('Notificacion actualizada!', 'success');
                        this.loading = true;
                        this.pqrMailS.list().subscribe(res => {
                            if (res.message === 'OK') {
                                this.loading = false;
                                this.dataSource = new MatTableDataSource<any>(res.object);
                                this.dataSource.paginator = this.paginator;
                                this.dataSource.sort = this.sort;
                                this.form.setValue({
                                    'id': '',
                                    'subject': '',
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
            data:{message:'¿ Desea eliminar la notificacion?'},
            height:'250px',
            width:'400px'
        }).afterClosed().subscribe(res => {
            if (res) {
                this.pqrMailS.delete(mailId).subscribe(resD => {
                    if (resD.message === 'OK') {
                        if (resD.object != 0) {
                            this.alertS.open('Notificacion eliminada!', 'success');
                            this.loading = true;
                            this.pqrMailS.list().subscribe(res => {
                                if (res.message === 'OK') {
                                    this.loading = false;
                                    this.dataSource = new MatTableDataSource<any>(res.object);
                                    this.dataSource.paginator = this.paginator;
                                    this.dataSource.sort = this.sort;
                                    this.form.setValue({
                                        'id': '',
                                        'subject': '',
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
    edit(id: number, subject: string, message: string, variables: number, active: boolean) {
        this.editing = id;
        this.form.setValue(
            {
                'id': id,
                'subject': subject,
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
                'subject': '',
                'message': '',
                'variables': '',
                'active': ''
            }
        );
    }
    getStatus(mailId:number){
        this.dialog.open(StatusModal, {
            data: { mailId: mailId },
            width: '800px'
        });
    }
    getPerson(value: number) {
        this.dialog.open(NotificationComponent, {
            data: { type:'Pqrs',mailId: value },
            width: '800px'
        });
    }
}