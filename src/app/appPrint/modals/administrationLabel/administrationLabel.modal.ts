import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AlertService } from 'src/app/shared/services/alert.service';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { GenCountryCustomerEntity } from "src/app/appGeneral/entities/genCountryCustomer.entity";
import { GenCountryCustomerService } from "src/app/appGeneral/services/genCountryCustomer.service";
import { GenSectionEntity } from "src/app/appGeneral/entities/genSection.entity";
import { PriLabelService } from "../../services/priLabel.service";
import { GenSectionService } from "src/app/appGeneral/services/genSection.service";

@Component({
    selector: 'administrationLabel',
    templateUrl: 'administrationLabel.modal.html',
    styleUrls: ['./administrationLabel.modal.css']
})
export class AdministrationLabelModal {
    title: string;
    form = new FormGroup({
        id: new FormControl(''),
        name: new FormControl('', Validators.required),
        printCount: new FormControl('', Validators.required),
        link: new FormControl('', Validators.required),
        customerId: new FormControl('', Validators.required),
        sectionId: new FormControl('', Validators.required),
        active: new FormControl('')
    });
    customerList: GenCountryCustomerEntity[];
    sectionList:GenSectionEntity[];

    constructor(private priLabelS: PriLabelService, private genCountryCustomerS: GenCountryCustomerService,private genSectionS:GenSectionService,private alertS: AlertService,
        public dialogRef: MatDialogRef<AdministrationLabelModal>,
        @Inject(MAT_DIALOG_DATA) public data: any) {
        dialogRef.disableClose = true;
        this.title = '';
        this.customerList = [];
        this.sectionList=[];
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
        this.genSectionS.list('IMPRESION').subscribe(res=>{
          if(res.message==='OK'){
            this.sectionList=res.object;
          }else{
            this.alertS.open(res.message,'error');
          }
        },err=>{
          this.alertS.open(err.message,'error');
        });
        if (this.data.labelEntity != null) {
            this.title = "Editar Etiqueta";
            this.form.setValue(
                {
                    'id': this.data.labelEntity.id,
                    'name': this.data.labelEntity.name,
                    'printCount': this.data.labelEntity.printCount,
                    'link': this.data.labelEntity.link,
                    'customerId': this.data.labelEntity.customerId,
                    'sectionId':this.data.labelEntity.sectionId,
                    'active': this.data.labelEntity.active
                }
            );
        } else {
            this.title = "Crear Etiqueta";
        }
    }
    save() {
        if (this.data.labelEntity === null) {
            this.priLabelS.create(this.form.value).subscribe(res => {
                if (res.message === 'OK') {
                    if (res.object != 0) {
                        this.alertS.open('Etiqueta creada!', 'success');
                        this.close(true);
                    } else {
                        this.alertS.open('Error al crear la etiqueta!', 'error');
                    }
                } else {
                    this.alertS.open(res.message, 'error');
                }
            });
        } else {
            this.priLabelS.update(this.form.value).subscribe(res => {
                if (res.message === 'OK') {
                    if (res.object != 0) {
                        this.alertS.open('Etiqueta actualizada!', 'success');
                        this.close(true);
                    } else {
                        this.alertS.open('Error al actualizar la etiqueta!', 'error');
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