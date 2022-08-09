import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AlertService } from 'src/app/shared/services/alert.service';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { GenCountryCustomerEntity } from "src/app/appGeneral/entities/genCountryCustomer.entity";
import { GenCountryCustomerService } from "src/app/appGeneral/services/genCountryCustomer.service";
import { PriPrinterService } from "../../services/priPrinter.service";

@Component({
    selector: 'administrationPrinter',
    templateUrl: 'administrationPrinter.modal.html',
    styleUrls: ['./administrationPrinter.modal.css']
})
export class AdministrationPrinterModal {
    title: string;
    form = new FormGroup({
        id: new FormControl(''),
        name: new FormControl('', Validators.required),
        ip: new FormControl('', Validators.required),
        location: new FormControl('', Validators.required),
        customerId: new FormControl('', Validators.required),
        active: new FormControl('')
    });
    customerList: GenCountryCustomerEntity[];

    constructor(private priPrinterS: PriPrinterService, private genCountryCustomerS: GenCountryCustomerService,private alertS: AlertService,
        public dialogRef: MatDialogRef<AdministrationPrinterModal>,
        @Inject(MAT_DIALOG_DATA) public data: any) {
        dialogRef.disableClose = true;
        this.title = '';
        this.customerList = [];
    }
    ngOnInit(): void {
        this.genCountryCustomerS.listCustomer(Number(localStorage.getItem('countryId'))).subscribe(res => {
            if (res.message === 'OK') {
                this.customerList = res.object;
            } else {
                this.alertS.open(res.message, 'error');
            }
        }, err => {
            this.alertS.open(err.message, 'error');
        });
        if (this.data.printerEntity != null) {
            this.title = "Editar Impresora";
            this.form.setValue(
                {
                    'id': this.data.printerEntity.id,
                    'name': this.data.printerEntity.name,
                    'ip': this.data.printerEntity.ip,
                    'location': this.data.printerEntity.location,
                    'customerId': this.data.printerEntity.customerId,
                    'active': this.data.printerEntity.active
                }
            );
        } else {
            this.title = "Crear Impresora";
        }
    }
    save() {
        if (this.data.printerEntity === null) {
            this.priPrinterS.create(this.form.value).subscribe(res => {
                if (res.message === 'OK') {
                    if (res.object != 0) {
                        this.alertS.open('Impresora creada!', 'success');
                        this.close(true);
                    } else {
                        this.alertS.open('Error al crear la impresora!', 'error');
                    }
                } else {
                    this.alertS.open(res.message, 'error');
                }
            });
        } else {
            this.priPrinterS.update(this.form.value).subscribe(res => {
                if (res.message === 'OK') {
                    if (res.object != 0) {
                        this.alertS.open('Impresora actualizada!', 'success');
                        this.close(true);
                    } else {
                        this.alertS.open('Error al actualizar la impresora!', 'error');
                    }
                } else {
                    this.alertS.open(res.message, 'error');
                }
            }, err => {
                this.alertS.open(err.message, 'error');
            });
        }
    }
    close(status: boolean): void {
        this.dialogRef.close(status);
    }
}