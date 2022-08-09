import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BscActionEntity } from 'src/app/appBalanceScoreCard/entities/bscAction.entity';
import { BscActionService } from 'src/app/appBalanceScoreCard/services/bscAction.service';
import { GenPersonEntity } from 'src/app/appGeneral/entities/genPerson.entity';
import { GenPersonService } from 'src/app/appGeneral/services/genPerson.service';
import { AlertService } from 'src/app/shared/services/alert.service';
import * as moment from 'moment';

@Component({
    selector: 'app-bscActionNew',
    templateUrl: './bscActionNew.component.html',
    styleUrls: ['./bscActionNew.component.css']
})
export class BscActionNewComponent implements OnInit {
    title:string;
    bscActionEntity:BscActionEntity;
    form = new FormGroup({
        id: new FormControl(''),
        name: new FormControl('', Validators.required),
        deliverables: new FormControl(''),
        endDate: new FormControl(''),
        actionPlanId: new FormControl(''),
        responsibleUserId: new FormControl('', Validators.required),
    });
    responsibleUserList:GenPersonEntity[];

    constructor(private bscActionS: BscActionService,private genPersonS:GenPersonService, private alertS: AlertService, private dialogRef: MatDialogRef<BscActionNewComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
        dialogRef.disableClose = true;
        this.title='';
    }
    ngOnInit(): void {
        this.genPersonS.list().subscribe(res=>{
            if(res.message==='OK'){
                this.responsibleUserList=res.object;
            }else{
                this.alertS.open(res.message,'error');
            }
        },err=>{
            this.alertS.open(err.message,'error');
        });
        if (this.data.actionId != 0) {
            this.title='Editar Accion';
            this.bscActionS.findById(this.data.actionId).subscribe(res=>{
                if(res.message==='OK'){
                    this.bscActionEntity=res.object;
                    this.form.setValue({
                        'id':this.bscActionEntity.id,
                        'name':this.bscActionEntity.name,
                        'deliverables':this.bscActionEntity.deliverables,
                        'endDate':this.bscActionEntity.endDate,
                        'actionPlanId':this.bscActionEntity.actionPlanId,
                        'responsibleUserId':this.bscActionEntity.responsibleUserId
                    });
                }else{
                    this.alertS.open(res.message,'error');
                }
            },err=>{
                this.alertS.open(err.message,'error');
            });
        }else{
            this.title='Nueva Accion';
        }
    }
    save() {
        this.form.controls.actionPlanId.setValue(this.data.actionPlanId);
        this.form.controls.endDate.setValue(moment(this.form.controls.endDate.value).format('YYYY-MM-DD'));
        if(this.data.actionId===0){
            this.bscActionS.create(this.form.value).subscribe(res=>{
                if(res.message==='OK'){
                    if(res.object!=0){
                        this.alertS.open('Accion creada!','success');
                        this.close(true);
                    }else{
                        this.alertS.open('Error al crear la accion!','error');
                    }
                }else{
                    this.alertS.open(res.message,'error');
                }
            },err=>{
                this.alertS.open(err.message,'error');
            });
        }else{
            this.bscActionS.update(this.form.value).subscribe(res=>{
                if(res.message==='OK'){
                    if(res.object!=0){
                        this.alertS.open('Accion actualizada!','success');
                        this.close(true);
                    }else{
                        this.alertS.open('Error al actualizar la accion!','error');
                    }
                }else{
                    this.alertS.open(res.message,'error');
                }
            },err=>{
                this.alertS.open(err.message,'error');
            });
        }
    }
    close(status:boolean) {
        this.dialogRef.close(status);
    }
}