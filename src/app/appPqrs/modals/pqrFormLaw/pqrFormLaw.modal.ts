import { Component, EventEmitter, Inject, Input, Output } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AlertService } from 'src/app/shared/services/alert.service';
import { PqrFormLawEntity } from "../../entities/PqrFormLaw.entity";
import { PqrLanguageEntity } from "../../entities/pqrLanguage.entity";
import { pqrFormLawService } from "../../services/pqrFormLaw.service";
import { PqrLanguageFormService } from "../../services/pqrLanguageForm.service";

@Component({
    selector: 'modal-pqrFormLaw',
    templateUrl: 'pqrFormLaw.modal.html',
    styleUrls: ['./pqrFormLaw.modal.css']
})
export class PqrFormLawModal {
    public loading: boolean;
    @Input() formId: number;
    @Output() closeDialog = new EventEmitter<any>();
    title: string;
    form: FormGroup;
    PqrFormLawEntity: PqrFormLawEntity;
    languageList: PqrLanguageEntity[];
    status:boolean;

    constructor(private fb: FormBuilder, private alertS: AlertService, private PqrLanguageS: PqrLanguageFormService, private pqrFormLawS:pqrFormLawService,
        public dialogRef: MatDialogRef<PqrFormLawModal>,
        @Inject(MAT_DIALOG_DATA) public data: any) {
            this.status=false;
            dialogRef.disableClose = true;
     
    }

    ngOnInit(): void {
        this.formBuilders();
        this.getLanguage();
        if (this.data.formId != 0) {
            this.title = "Editar Registro";
            this.pqrFormLawS.findById(this.data.formId).subscribe(res => {
                if (res.message === 'OK') {
                    this.PqrFormLawEntity = res.object;
                    this.form.setValue(
                        {
                            'id': this.PqrFormLawEntity.id,
                            'descriptionLaw': this.PqrFormLawEntity.descriptionLaw,
                            'languageId': this.PqrFormLawEntity.languageId,
                            'active': this.PqrFormLawEntity.active,
                       
                        }
                    );
                } else {
                    this.alertS.open(res.message, 'error');
                }
            }, err => {
                this.alertS.open(err.message, 'error');
            });
        } else {
            this.title = "Nuevo registro";
        }
    }

    formBuilders() {
        this.form = this.fb.group({
            id: [, []],
            descriptionLaw: [, [Validators.required]],
            languageId: [, [Validators.required]],
            active: [, []]
            //:[,[Validators.required]],
        })

    }

    save() {
        if (this.data.formId === 0) {
            this.form.markAllAsTouched();
            if (this.form.invalid) {
                return;
            }
            this.pqrFormLawS.create(this.form.value, Number(localStorage.getItem('countryId'))).subscribe(res => {
                if (res.message === 'OK') {
                    if (res.object != 0) {
                        this.closeDialog.emit();
                        this.form.reset();
                        this.alertS.open('Registro creado!', 'success');
                    } else {
                        this.alertS.open(res.message, 'error');
                    }
                } else {
                    this.alertS.open(res.message, 'error');
                }
            }, err => {
                this.alertS.open(err.message, 'error');
            });
        } else {
            this.pqrFormLawS.update(this.form.value).subscribe(res => {
                if (res.message === 'OK') {
                    if (res.object != 0) {
                        this.alertS.open('Registro actualizado!', 'success');
                        this.form.setValue({
                            'id': 0,
                            'descriptionLaw': '',
                            'languageId': '',
                            'active': ''
                        });
                        this.closeDialog.emit();
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
    }

    getLanguage() {
        this.PqrLanguageS.findAll(Number(localStorage.getItem('countryId'))).subscribe(res => {
            if (res.message === 'OK') {
                this.languageList = res.object;
            } else {
                this.alertS.open(res.message, 'error');
            }
        }, err => {
            this.alertS.open(err.message, 'error');
        });
    }

    close(): void {
        this.dialogRef.close();
    }
}

