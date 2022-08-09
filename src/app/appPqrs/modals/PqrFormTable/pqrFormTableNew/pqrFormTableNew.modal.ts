import { Component, EventEmitter, Inject, Input, Output } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PqrFormTableEntity } from "src/app/appPqrs/entities/PqrFormTable.entity";
import { PqrLanguageEntity } from "src/app/appPqrs/entities/pqrLanguage.entity";
import { PqrFormTableService } from "src/app/appPqrs/services/pqrFormTable.service";
import { PqrLanguageFormService } from "src/app/appPqrs/services/pqrLanguageForm.service";
import { PqrPageClientInitService } from "src/app/appPqrs/services/pqrPageClientInit.service";
import { AlertService } from 'src/app/shared/services/alert.service';
@Component({
    selector: 'modal-pqrFormTableNew',
    templateUrl: 'pqrFormTableNew.modal.html',
    styleUrls: ['./pqrFormTableNew.modal.css']
})
export class PqrFormTableNewModal {
    public loading: boolean;
    @Input() formId: number;
    @Output() closeDialog = new EventEmitter<any>();
    title: string;
    form: FormGroup;
    pqrFormTableEntity:PqrFormTableEntity;
    languageList: PqrLanguageEntity[];
    status:boolean;

    constructor(private fb: FormBuilder, private alertS: AlertService, private PqrLanguageS: PqrLanguageFormService, private pqrFormTableS:PqrFormTableService,
        public dialogRef: MatDialogRef<PqrFormTableNewModal>,
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
            this.pqrFormTableS.findById(this.data.formId).subscribe(res => {
                if (res.message === 'OK') {
                    this.pqrFormTableEntity = res.object;
                    this.form.setValue(
                        {
                            'id': this.pqrFormTableEntity.id,
                            'titleTable': this.pqrFormTableEntity.titleTable,
                            'columnOne': this.pqrFormTableEntity.columnOne,
                            'columnTwo': this.pqrFormTableEntity.columnTwo,
                            'columnTheer': this.pqrFormTableEntity.columnTheer,
                            'columnFour': this.pqrFormTableEntity.columnFour,
                            'columnFive': this.pqrFormTableEntity.columnFive,
                            'buttonOne': this.pqrFormTableEntity.buttonOne,
                            'buttonTwo': this.pqrFormTableEntity.buttonTwo,
                            'languageId': this.pqrFormTableEntity.languageId,
                            'active': this.pqrFormTableEntity.active,
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
            titleTable: [, [Validators.required]],
            columnOne: [, [Validators.required]],
            columnTwo:[,[Validators.required]],
            columnTheer:[,[Validators.required]],
            columnFour:[,[Validators.required]],
            columnFive:[,[Validators.required]],
            buttonOne:[,[Validators.required]],
            buttonTwo:[,[Validators.required]],
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
            this.pqrFormTableS.create(this.form.value, Number(localStorage.getItem('countryId'))).subscribe(res => {
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
            this.pqrFormTableS.update(this.form.value).subscribe(res => {
                if (res.message === 'OK') {
                    if (res.object != 0) {
                        this.alertS.open('Registro actualizado!', 'success');
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

