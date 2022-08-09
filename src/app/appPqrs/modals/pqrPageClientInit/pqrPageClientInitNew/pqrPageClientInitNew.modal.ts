import { Component, EventEmitter, Inject, Input, Output } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PqrLanguageEntity } from "src/app/appPqrs/entities/pqrLanguage.entity";
import { PqrPageClientInitEntity } from "src/app/appPqrs/entities/pqrPageClientInit.entity";
import { PqrLanguageFormService } from "src/app/appPqrs/services/pqrLanguageForm.service";
import { PqrPageClientInitService } from "src/app/appPqrs/services/pqrPageClientInit.service";
import { AlertService } from 'src/app/shared/services/alert.service';
@Component({
    selector: 'modal-pqrPageClientInitNew',
    templateUrl: 'pqrPageClientInitNew.modal.html',
    styleUrls: ['./pqrPageClientInitNew.modal.css']
})
export class PqrPageClientInitNewModal {
    public loading: boolean;
    @Input() formId: number;
    @Output() closeDialog = new EventEmitter<any>();
    title: string;
    form: FormGroup;
    PqrPageClientInitEntity: PqrPageClientInitEntity;
    languageList: PqrLanguageEntity[];
    status:boolean;

    constructor(private fb: FormBuilder, private alertS: AlertService, private PqrLanguageS: PqrLanguageFormService, private PqrPageClientInitService:PqrPageClientInitService,
        public dialogRef: MatDialogRef<PqrPageClientInitNewModal>,
        @Inject(MAT_DIALOG_DATA) public data: any) {
            this.status=false;
            dialogRef.disableClose = true;
            this.languageList = [];
     
    }

    ngOnInit(): void {
        this.formBuilders();
        this.getLanguage();
        if (this.data.formId != 0) {
            this.title = "Editar Registro";
            this.PqrPageClientInitService.findById(this.data.formId).subscribe(res => {
                if (res.message === 'OK') {
                    this.PqrPageClientInitEntity = res.object;
                    this.form.setValue(
                        {
                            'id': this.PqrPageClientInitEntity.id,
                            'nameLastName': this.PqrPageClientInitEntity.nameLastName,
                            'nameLastNameFunction': this.PqrPageClientInitEntity.nameLastNameFunction,
                            'email': this.PqrPageClientInitEntity.email,
                            'emailFunction': this.PqrPageClientInitEntity.emailFunction,
                            'emailAnex': this.PqrPageClientInitEntity.emailAnex,
                            'emailAnexFuntion': this.PqrPageClientInitEntity.emailAnexFuntion,
                            'detailGeneral': this.PqrPageClientInitEntity.detailGeneral,
                            'detailGeneralFunction': this.PqrPageClientInitEntity.detailGeneralFunction,
                            'documentsAnex': this.PqrPageClientInitEntity.documentsAnex,
                            'documentsAnexFuntion': this.PqrPageClientInitEntity.documentsAnexFuntion,
                            'titlePrincipal': this.PqrPageClientInitEntity.titlePrincipal,
                            'paragraphTitle': this.PqrPageClientInitEntity.paragraphTitle,
                            'languageId': this.PqrPageClientInitEntity.languageId,
                            'active': this.PqrPageClientInitEntity.active,

                       
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
            nameLastName: [, [Validators.required]],
            nameLastNameFunction: [, [Validators.required]],
            email:[,[Validators.required]],
            emailFunction:[,[Validators.required]],
            emailAnex:[,[Validators.required]],
            emailAnexFuntion:[,[Validators.required]],
            detailGeneral:[,[Validators.required]],
            detailGeneralFunction:[,[Validators.required]],
            documentsAnex:[,[Validators.required]],
            documentsAnexFuntion:[,[Validators.required]],
            titlePrincipal:[,[Validators.required]],
            paragraphTitle:[,[Validators.required]],
            languageId:[,[Validators.required]],
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
            this.PqrPageClientInitService.create(this.form.value,Number(localStorage.getItem('countryId'))).subscribe(res => {
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
            this.PqrPageClientInitService.update(this.form.value).subscribe(res => {
                if (res.message === 'OK') {
                    if (res.object != 0) {
                        this.alertS.open('Registro actualizado!', 'success');
                        this.form.setValue({
                            'id': 0,
                            'nameLastName': '',
                            'nameLastNameFunction': '',
                            'email': '',
                            'emailFunction': '',
                            'emailAnex': '',
                            'emailAnexFuntion': '',
                            'detailGeneral': '',
                            'detailGeneralFunction': '',
                            'documentsAnex': '',
                            'documentsAnexFuntion': '',
                            'titlePrincipal': '',
                            'paragraphTitle': '',
                            'languageId': '',
                            'active': '',
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

