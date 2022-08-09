import { Component, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { GenPersonService } from 'src/app/appGeneral/services/genPerson.service';
import { IncIncomeControlService } from '../../services/incIncomeControl.service';
import { GenPersonEntity } from 'src/app/appGeneral/entities/genPerson.entity';
import { IncIncomeControlEntity } from '../../entities/incIncomeControl.entity';

@Component({
    selector: 'app-incSearchForm',
    templateUrl: './incSearchForm.component.html',
    styleUrls: ['./incSearchForm.component.css']
})
export class IncSearchFormComponent {
    @Output() searchEmit1 = new EventEmitter();
    @Output() searchEmit2 = new EventEmitter();
    genPersonEntity: GenPersonEntity;
    incIncomeControlEntity: IncIncomeControlEntity;
    exist:boolean;
    keyboard: boolean;
    inputText: string;

    form1 = new FormGroup({
        identification: new FormControl('', Validators.required)
    });

    constructor(private genPersonS: GenPersonService, private incIncomeControlS: IncIncomeControlService) {
        this.inputText='';
        this.exist=true;
     }

    search(form: FormGroup) {
        if (form.valid) {
            this.genPersonS.findByIdentification(form.value.identification).subscribe(res => {
                if (res.object != null) {
                    this.genPersonEntity = res.object;
                    this.searchEmit1.emit(this.genPersonEntity);
                    this.incIncomeControlS.findLast(this.genPersonEntity.id).subscribe(res => {
                        if (res.object != null) {
                            this.incIncomeControlEntity = res.object;
                            if (this.incIncomeControlEntity.initialDate === null || this.incIncomeControlEntity.initialDate != null && this.incIncomeControlEntity.finalDate != null) {
                                this.searchEmit2.emit(true);
                            } else {
                                this.searchEmit2.emit(false);
                            }
                        } else {
                            this.searchEmit2.emit(true);
                        }
                    }, err => {
                        console.log(err);
                    })
                }else{
                    this.exist=false;
                }
            },
                err => {
                    console.log(err);
                }
            )
        }
    }
    onFocus() {
        this.keyboard = true;
    }
    onPressed(input: HTMLInputElement) {
        if (input.textContent === "Borrar") {
            this.form1.controls['identification'].setValue(this.form1.value.identification.substring(0, this.form1.value.identification.length - 1));
        } else {
            this.form1.controls['identification'].setValue(this.form1.value.identification + input.textContent);
        }
    }
    onReturn(){
        this.exist=true;
    }
}