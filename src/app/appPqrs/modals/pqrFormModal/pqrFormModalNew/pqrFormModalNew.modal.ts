import { Component, EventEmitter, Inject, Input, Output } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PqrFomModalEntity } from "src/app/appPqrs/entities/pqrFomModal.entity";
import { PqrLanguageEntity } from "src/app/appPqrs/entities/pqrLanguage.entity";
import { PqrFomModalService } from "src/app/appPqrs/services/pqrFomModal.service";
import { PqrLanguageFormService } from "src/app/appPqrs/services/pqrLanguageForm.service";
import { AlertService } from 'src/app/shared/services/alert.service';
@Component({
    selector: 'modal-pqrFormModalNew',
    templateUrl: 'pqrFormModalNew.modal.html',
    styleUrls: ['./pqrFormModalNew.modal.css']
})
export class PqrFormModalNewModal {
    public loading: boolean;
    @Input() formId: number;
    @Output() closeDialog = new EventEmitter<any>();
    title: string;
    form: FormGroup;
    pqrFomModalEntity:PqrFomModalEntity;
    languageList: PqrLanguageEntity[];
    status:boolean;

    constructor(private fb: FormBuilder, private alertS: AlertService, private PqrLanguageS: PqrLanguageFormService, private pqrFomModalS:PqrFomModalService,
        public dialogRef: MatDialogRef<PqrFormModalNewModal>,
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
            this.pqrFomModalS.findById(this.data.formId).subscribe(res => {
                if (res.message === 'OK') {
                    this.pqrFomModalEntity = res.object;
                    this.form.setValue(
                        {
                            'id': this.pqrFomModalEntity.id,
                            'titleModal': this.pqrFomModalEntity.titleModal,
                            'paragraphTitleModal': this.pqrFomModalEntity.paragraphTitleModal,
                            'identification': this.pqrFomModalEntity.identification,
                            'identificationFunction': this.pqrFomModalEntity.identificationFunction,
                            'serial': this.pqrFomModalEntity.serial,
                            'serialFunction': this.pqrFomModalEntity.serialFunction,
                            'imei': this.pqrFomModalEntity.imei,
                            'imeiFunction': this.pqrFomModalEntity.imeiFunction,
                            'movil':this.pqrFomModalEntity.movil,
                            'movilFunction':this.pqrFomModalEntity.movilFunction,
                            'description': this.pqrFomModalEntity.description,
                            'descriptionFunction': this.pqrFomModalEntity.descriptionFunction,
                            'filesAttachments': this.pqrFomModalEntity.filesAttachments,
                            'filesAttachmentsFuntion': this.pqrFomModalEntity.filesAttachmentsFuntion,
                            'filesAttachmentsButton': this.pqrFomModalEntity.filesAttachmentsButton,
                            'buttonOne': this.pqrFomModalEntity.buttonOne,
                            'languegeId': this.pqrFomModalEntity.languegeId,
                            'active': this.pqrFomModalEntity.active,
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
            titleModal: [, [Validators.required]],
            paragraphTitleModal: [, [Validators.required]],
            identification:[,[Validators.required]],
            identificationFunction:[,[Validators.required]],
            serial:[,[Validators.required]],
            serialFunction:[,[Validators.required]],
            imei:[,[Validators.required]],
            imeiFunction:[,[Validators.required]],
            movil:[,[Validators.required]],
            movilFunction:[,[Validators.required]],
            description:[,[Validators.required]],
            descriptionFunction:[,[Validators.required]],
            filesAttachments:[,[Validators.required]],
            filesAttachmentsFuntion:[,[Validators.required]],
            filesAttachmentsButton:[,[Validators.required]],
            buttonOne:[,[Validators.required]],
            languegeId:[,[Validators.required]],
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
            this.pqrFomModalS.create(this.form.value,Number(localStorage.getItem('countryId'))).subscribe(res => {
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
            this.pqrFomModalS.update(this.form.value).subscribe(res => {
                if (res.message === 'OK') {
                    if (res.object != 0) {
                        this.alertS.open('Registro actualizado!', 'success');
                        this.form.reset();
                        this.form.setValue({
                            'id': 0,
                            'titleTable': '',
                            'columnOne': '',
                            'columnTwo': '',
                            'columnTheer': '',
                            'columnFour': '',
                            'columnFive': '',
                            'buttonOne': '',
                            'buttonTwo': '',
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

