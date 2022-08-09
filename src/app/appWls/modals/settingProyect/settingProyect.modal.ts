import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AlertService } from 'src/app/shared/services/alert.service';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { WlsProyectService } from "../../services/wlsProyect.service";
import { GenCountryEntity } from "src/app/appGeneral/entities/genCountry.entity";
import { GenCountryCustomerEntity } from "src/app/appGeneral/entities/genCountryCustomer.entity";
import { WlsServerEntity } from "../../entities/wlsServer.entity";
import { WlsServerDataBaseModel } from "../../models/wlsServerDataBase.model";
import { GenCountryService } from "src/app/appGeneral/services/genCountry.service";
import { GenCountryCustomerService } from "src/app/appGeneral/services/genCountryCustomer.service";
import { WlsServerService } from "../../services/wlsServer.service";
import { GenPersonEntity } from "src/app/appGeneral/entities/genPerson.entity";

@Component({
    selector: 'settingProyect',
    templateUrl: 'settingProyect.modal.html',
    styleUrls: ['./settingProyect.modal.css']
})
export class SettingProyectModal {
    title: string;
    serverIp: string;
    connection: string;
    form = new FormGroup({
        id: new FormControl(''),
        name: new FormControl('', Validators.required),
        prefix: new FormControl('', Validators.required),
        countryId: new FormControl('', Validators.required),
        customerId: new FormControl('', Validators.required),
        serverId: new FormControl('', Validators.required),
        dataBaseName: new FormControl('', Validators.required),
        creationUserId: new FormControl(''),
        active: new FormControl('')
    });
    personEntity: GenPersonEntity;
    countryList: GenCountryEntity[];
    customerList: GenCountryCustomerEntity[];
    serverList: WlsServerEntity[];
    dataBaseList: WlsServerDataBaseModel[];

    constructor(private wlsProyectS: WlsProyectService, private genCountryS: GenCountryService, private genCountryCustomerS: GenCountryCustomerService, private wlsServerS: WlsServerService, private alertS: AlertService,
        public dialogRef: MatDialogRef<SettingProyectModal>,
        @Inject(MAT_DIALOG_DATA) public data: any) {
        dialogRef.disableClose = true;
        this.title = '';
        this.serverIp = '';
        this.countryList = [];
        this.customerList = [];
        this.serverList = [];
        this.dataBaseList = [];
    }
    ngOnInit(): void {
        this.personEntity = JSON.parse(localStorage.getItem('user'));
        this.genCountryS.listActive().subscribe(res => {
            if (res.message === 'OK') {
                this.countryList = res.object;
            } else {
                this.alertS.open(res.message, 'error');
            }
        }, err => {
            this.alertS.open(err.message, 'error');
        });
        this.wlsServerS.list().subscribe(res => {
            if (res.message === 'OK') {
                this.serverList = res.object;
            } else {
                this.alertS.open(res.message, 'error');
            }
        }, err => {
            this.alertS.open(err.message, 'error');
        });
        if (this.data.proyectEntity != null) {
            this.title = "Editar Proyecto";
            this.form.setValue(
                {
                    'id': this.data.proyectEntity.id,
                    'name': this.data.proyectEntity.name,
                    'prefix': this.data.proyectEntity.prefix,
                    'countryId': this.data.proyectEntity.countryId,
                    'customerId': this.data.proyectEntity.customerId,
                    'serverId': this.data.proyectEntity.serverId,
                    'dataBaseName': this.data.proyectEntity.dataBaseName,
                    'creationUserId': this.data.proyectEntity.creationUserId,
                    'active': this.data.proyectEntity.active
                }
            );
            this.serverIp = this.data.proyectEntity.server;
            this.getCustomer();
            this.getDataBase(null);
        } else {
            this.title = "Crear Proyecto";
        }
    }
    getCustomer() {
        this.genCountryCustomerS.listCustomer(this.form.value.countryId).subscribe(res => {
            if (res.message === 'OK') {
                this.customerList = res.object;
            } else {
                this.alertS.open(res.message, 'error');
            }
        }, err => {
            this.alertS.open(err.message, 'error');
        });
    }
    getDataBase(select: HTMLSelectElement) {
        if (select != null) {
            this.serverIp = select.options[select.selectedIndex].textContent;
        }
        this.connection = '';
        this.wlsServerS.dataBase(this.serverIp).subscribe(res => {
            if (res.message === 'OK') {
                this.dataBaseList = res.object;
            } else {
                this.alertS.open(res.message, 'error');
            }
        }, err => {
            this.alertS.open(err.message, 'error');
        });
    }
    save() {
        if (this.data.proyectEntity === null) {
            this.form.value.creationUserId.setValue(this.personEntity.id);
            this.wlsProyectS.create(this.form.value).subscribe(res => {
                if (res.message === 'OK') {
                    if (res.object != 0) {
                        this.alertS.open('Proyecto creado!', 'success');
                        this.close(true);
                    } else {
                        this.alertS.open('Error al crear el proyecto!', 'error');
                    }
                } else {
                    this.alertS.open(res.message, 'error');
                }
            });
        } else {
            this.wlsProyectS.update(this.form.value).subscribe(res => {
                if (res.message === 'OK') {
                    if (res.object != 0) {
                        this.alertS.open('Proyecto actualizado!', 'success');
                        this.close(true);
                    } else {
                        this.alertS.open('Error al actualizar el proyecto!', 'error');
                    }
                } else {
                    this.alertS.open(res.message, 'error');
                }
            }, err => {
                this.alertS.open(err.message, 'error');
            });
        }
    }
    testConnection() {
        this.wlsServerS.testConnection(this.serverIp, this.form.value.dataBaseName).subscribe(res => {
            if (res.message === 'OK') {
                if (res.object != 0) {
                    this.connection = 'Prueba exitosa!';
                } else {
                    this.connection = 'Error en la conexion!';
                }
            } else {
                this.alertS.open(res.message, 'error');
            }
        }, err => {
            this.alertS.open(err.message, 'error');
        });
    }
    close(status: boolean): void {
        this.dialogRef.close(status);
    }
}