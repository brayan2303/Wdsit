import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AlertService } from 'src/app/shared/services/alert.service';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { WlsServerService } from "../../services/wlsServer.service";

@Component({
    selector: 'logisticPrealert',
    templateUrl: 'logisticPrealert.modal.html',
    styleUrls: ['./logisticPrealert.modal.css']
})
export class LogisticPrealertModal {
    title:string;
    form = new FormGroup({
        id: new FormControl(''),
        name: new FormControl('', Validators.required),
        proyectId: new FormControl('', Validators.required),
        originTypeId: new FormControl('', Validators.required),
        originId: new FormControl('', Validators.required),
        creationUserId: new FormControl(''),
        active: new FormControl('')
    });

    constructor(private wlsServerS:WlsServerService, private alertS: AlertService,
        public dialogRef: MatDialogRef<LogisticPrealertModal>,
        @Inject(MAT_DIALOG_DATA) public data: any) {
        dialogRef.disableClose = true;
        this.title='';
    }
    ngOnInit(): void {
        if (this.data.prealertEntity != null) {
            this.title="Editar Prealerta";
            this.form.setValue(
                {
                    'id': this.data.prealertEntity.id,
                    'name':this.data.prealertEntity.name,
                    'proyectId':this.data.prealertEntity.proyectId,
                    'originTypeId': this.data.prealertEntity.originTypeId,
                    'originId': this.data.prealertEntity.originId,
                    'creationUserId':this.data.prealertEntity.creationUserId,
                    'active': this.data.prealertEntity.active
                }
            );
        }else{
            this.title="Crear Prealerta";
        }
    }
    save(){
        if(this.data.creationUserId===null){
            this.wlsServerS.create(this.form.value).subscribe(res=>{
                if(res.message==='OK'){
                    if(res.object!=0){
                        this.alertS.open('Prealerta creada!','success');
                        this.close(true);
                    }else{
                        this.alertS.open('Error al crear la prealerta!','error');
                    }
                }else{
                    this.alertS.open(res.message,'error');
                }
            });
        }else{
            this.wlsServerS.update(this.form.value).subscribe(res=>{
                if(res.message==='OK'){
                    if(res.object!=0){
                        this.alertS.open('Prealerta actualizada!','success');
                        this.close(true);
                    }else{
                        this.alertS.open('Error al actualizar la prealerta!','error');
                    }
                }else{
                    this.alertS.open(res.message,'error');
                }
            },err=>{
                this.alertS.open(err.message,'error');
            });
        }
    }
    close(status:boolean): void {
        this.dialogRef.close(status);
    }
}