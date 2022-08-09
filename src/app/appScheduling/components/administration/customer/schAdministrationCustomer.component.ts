import { Component, OnInit, ViewChild } from "@angular/core";
import { AlertService } from 'src/app/shared/services/alert.service';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ConfirmationComponent } from 'src/app/shared/components/confirmation/confirmation.component';
import { SchPaisEntity } from 'src/app/appScheduling/entities/schPais.entity';
import { SchPaisService } from 'src/app/appScheduling/services/schPais.service';
import { SchClienteService } from 'src/app/appScheduling/services/schCliente.service';
import { SchClienteEntity } from 'src/app/appScheduling/entities/schCliente.entity';

@Component({
    selector: 'app-schAdministrationCustomer',
    templateUrl: './schAdministrationCustomer.component.html',
    styleUrls: ['./schAdministrationCustomer.component.css']
})
export class SchAdministrationCustomerComponent implements OnInit {
    loading: boolean;
    editing: number;
    columns: string[];
    dataSource = new MatTableDataSource<any>();
    @ViewChild(MatTable) table: MatTable<any>;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    form = new FormGroup({
        id: new FormControl(''),
        nombre: new FormControl('', Validators.required),
        sigla: new FormControl('', Validators.required),
        paisId: new FormControl('', Validators.required),
        telefono: new FormControl(''),
        correo: new FormControl(''),
        pie1: new FormControl(''),
        pie2: new FormControl(''),
        chat: new FormControl(''),
        whatsapp: new FormControl(''),
        color: new FormControl(''),
        publicidad: new FormControl(''),
        politicaDato: new FormControl(''),
        urlPolitica: new FormControl(''),
        urlTyC: new FormControl(''),
        envioInformacion: new FormControl(''),
        envioNotificacion: new FormControl(''),
        tipoCampana: new FormControl(''),
        campana: new FormControl(''),
        activo: new FormControl('')
    });
    paisList: SchPaisEntity[];

    constructor(private schPaisS: SchPaisService, private schClienteS: SchClienteService, private dialog: MatDialog, private alertS: AlertService) {
        this.loading = false;
        this.editing = 0;
        this.columns = ['id', 'nombre', 'sigla', 'pais', 'telefono', 'correo', 'chat', 'whatsapp', 'color', 'publicidad', 'politicaDato', 'urlPolitica', 'urlTyC', 'envioInformacion', 'envioNotificacion', 'tipoCampana', 'campana', 'activo', 'acciones'];
        this.dataSource = new MatTableDataSource([]);
        this.paisList = [];
    }
    ngOnInit(): void {
        this.loading = true;
        this.schClienteS.list().subscribe(res => {
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
        this.schPaisS.list().subscribe(res => {
            if (res.message === 'OK') {
                this.paisList = res.object;
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
            this.schClienteS.create(this.form.value).subscribe(res => {
                if (res.message === 'OK') {
                    if (res.object != 0) {
                        this.alertS.open('Cliente creado!', 'success');
                        this.loading = true;
                        this.schClienteS.list().subscribe(res => {
                            if (res.message === 'OK') {
                                this.loading = false;
                                this.dataSource = new MatTableDataSource<any>(res.object);
                                this.dataSource.paginator = this.paginator;
                                this.dataSource.sort = this.sort;
                                this.form.setValue({
                                    'id': '',
                                    'nombre': '',
                                    'sigla': '',
                                    'paisId': '',
                                    'telefono': '',
                                    'correo': '',
                                    'pie1': '',
                                    'pie2': '',
                                    'chat': '',
                                    'whatsapp': '',
                                    'color': '',
                                    'publicidad': '',
                                    'politicaDato': '',
                                    'urlPolitica': '',
                                    'urlTyC': '',
                                    'envioInformacion': '',
                                    'envioNotificacion': '',
                                    'tipoCampana': '',
                                    'campana': '',
                                    'activo': ''
                                });
                            } else {
                                this.alertS.open(res.message, 'error');
                            }
                        }, err => {
                            this.alertS.open(err.message, 'error');
                        });
                    } else {
                        this.alertS.open('Error al crear el cliente', 'error');
                    }
                } else {
                    this.alertS.open(res.message, 'error');
                }
            }, err => {
                this.alertS.open(err.message, 'error');
            });
        } else {
            this.schClienteS.update(this.form.value).subscribe(res => {
                if (res.message === 'OK') {
                    if (res.object != 0) {
                        this.alertS.open('Cliente actualizado!', 'success');
                        this.loading = true;
                        this.schClienteS.list().subscribe(res => {
                            if (res.message === 'OK') {
                                this.loading = false;
                                this.dataSource = new MatTableDataSource<any>(res.object);
                                this.dataSource.paginator = this.paginator;
                                this.dataSource.sort = this.sort;
                                this.form.setValue({
                                    'id': '',
                                    'nombre': '',
                                    'sigla': '',
                                    'paisId': '',
                                    'telefono': '',
                                    'correo': '',
                                    'pie1': '',
                                    'pie2': '',
                                    'chat': '',
                                    'whatsapp': '',
                                    'color': '',
                                    'publicidad': '',
                                    'politicaDato': '',
                                    'urlPolitica': '',
                                    'urlTyC': '',
                                    'envioInformacion': '',
                                    'envioNotificacion': '',
                                    'tipoCampana': '',
                                    'campana': '',
                                    'activo': ''
                                });
                            } else {
                                this.alertS.open(res.message, 'error');
                            }
                        }, err => {
                            this.alertS.open(err.message, 'error');
                        });
                    } else {
                        this.alertS.open('Error al actualizar el cliente!', 'error');
                    }
                } else {
                    this.alertS.open(res.message, 'error');
                }
            }, err => {
                this.alertS.open(err.message, 'error');
            });
        }
    }
    edit(item: SchClienteEntity) {
        this.editing = item.id;
        this.form.setValue(
            {
                'id': item.id,
                'nombre': item.nombre,
                'sigla': item.sigla,
                'paisId': item.paisId,
                'telefono': item.telefono,
                'correo': item.correo,
                'pie1': item.pie1,
                'pie2': item.pie2,
                'chat': item.chat,
                'whatsapp': item.whatsapp,
                'color': item.color,
                'publicidad': item.publicidad,
                'politicaDato': item.politicaDato,
                'urlPolitica': item.urlPolitica,
                'urlTyC': item.urlTyC,
                'envioInformacion': item.envioInformacion,
                'envioNotificacion': item.envioNotificacion,
                'tipoCampana': item.tipoCampana,
                'campana': item.campana,
                'activo': item.activo
            }
        );
    }
    delete(id: number) {
        this.dialog.open(ConfirmationComponent,{
            data:{message:'¿ Desea eliminar el cliente ?'},
            height:'250px',
            width:'400px'
        }).afterClosed().subscribe(res => {
            if (res) {
                this.schClienteS.delete(id).subscribe(resD => {
                    if (resD.message === 'OK') {
                        if (resD.object != 0) {
                            this.alertS.open('Listado eliminado!', 'success');
                            this.loading = true;
                            this.schClienteS.list().subscribe(res => {
                                if (res.message === 'OK') {
                                    this.loading = false;
                                    this.dataSource = new MatTableDataSource<any>(res.object);
                                    this.dataSource.paginator = this.paginator;
                                    this.dataSource.sort = this.sort;
                                    this.form.setValue({
                                        'id': '',
                                        'nombre': '',
                                        'sigla': '',
                                        'paisId': '',
                                        'telefono': '',
                                        'correo': '',
                                        'pie1': '',
                                        'pie2': '',
                                        'chat': '',
                                        'whatsapp': '',
                                        'color': '',
                                        'publicidad': '',
                                        'politicaDato': '',
                                        'urlPolitica': '',
                                        'urlTyC': '',
                                        'envioInformacion': '',
                                        'envioNotificacion': '',
                                        'tipoCampana': '',
                                        'campana': '',
                                        'activo': ''
                                    });
                                } else {
                                    this.alertS.open(res.message, 'error');
                                }
                            }, err => {
                                this.alertS.open(err.message, 'error');
                            });
                        } else {
                            this.alertS.open('Error al eliminar el listado!', 'error');
                        }
                    } else {
                        this.alertS.open(resD.message, 'error');
                    }
                }, err => {
                    this.alertS.open(err.message, 'error');
                });
            }
        })
    }
    closeEditing() {
        this.editing = 0;
        this.form.setValue(
            {
                'id': '',
                'nombre': '',
                'sigla': '',
                'paisId': '',
                'telefono': '',
                'correo': '',
                'pie1': '',
                'pie2': '',
                'chat': '',
                'whatsapp': '',
                'color': '',
                'publicidad': '',
                'politicaDato': '',
                'urlPolitica': '',
                'urlTyC': '',
                'envioInformacion': '',
                'envioNotificacion': '',
                'tipoCampana': '',
                'campana': '',
                'activo': ''
            }
        );
    }
}