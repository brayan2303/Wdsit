import { Component, ElementRef, Inject, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Params } from '@angular/router';
import { GenPersonEntity } from 'src/app/appGeneral/entities/genPerson.entity';
import { AlertService } from 'src/app/shared/services/alert.service';
import { ScpAuditSerialService } from '../../components/services/scpAuditSerial.service';
import { ScpMotifEntity } from '../../entities/scpMotif.entity';
import { ScpAuditSerialModel } from '../../models/scpAuditSerial.model';

@Component({
    selector: 'serialAudit',
    templateUrl: 'serialAudit.modal.html',
    styleUrls: ['./serialAudit.modal.css']
})
export class SerialAuditModal implements OnInit {
    @Input() inputs: number;
    title: string;
    form: FormGroup;
    groupId: number;
    genPersonEntity: GenPersonEntity;
    public loading: boolean;
    formId: number;
    ScpMotifList: ScpMotifEntity[];
    ScpList: ScpAuditSerialModel[]
    @ViewChild('serials') searchElement: ElementRef;
    item: string[]
    hello: string[]
    fileList: File[];
    state: string;
    valueOption:string | boolean;
    option:string;

    constructor(private scpAuditSerialS: ScpAuditSerialService, private params: ActivatedRoute, private fb: FormBuilder, private alertS: AlertService, public dialogRef: MatDialogRef<SerialAuditModal>, @Inject(MAT_DIALOG_DATA) public data: any) {
        dialogRef.disableClose = true;
        this.title = '';
        this.groupId = 0;
        this.formId = 0;
        this.ScpMotifList = [];
        this.ScpList = [];
        this.item = [];
        this.inputs = 0;
        this.fileList = [];
        this.state = '';
        this.valueOption = '' || false;
        this.option = 'seleccione una opcion';
    }
    ngOnInit(): void {
        this.hello = []
        this.genPersonEntity = JSON.parse(localStorage.getItem('user'));
        this.formBuilders();
        this.scpAuditSerialS.listMotif().subscribe(res => {
            if (res.message === 'OK') {
                this.ScpMotifList = res.object;
            } else {
                this.alertS.open(res.message, 'error');
            }
        }, err => {
            this.alertS.open(err.message, 'error');
        });
    }
    formBuilders() {
        this.form = this.fb.group({
            id: [, []],
            serial: [, [Validators.required]],
            mac: [, [Validators.required]],
            sapCode: [, [Validators.required]],
            description: [, [Validators.required]],
            technical: [, [Validators.required]],
            repairDate: [, [Validators.required]],
            scrapMotif: [, [Validators.required]],
            stateMotif: [, []],
            state: [, [Validators.required]],

            //[,[Validators.required]],
        })
    }
    save() {
        var serial = this.form.get('serial').value;

        if (this.formId === 0) {
            this.form.markAllAsTouched();
            if (this.form.invalid) {
                return;
            }
            this.scpAuditSerialS.create(this.data.id, this.form.controls.serial.value, this.form.controls.mac.value,
                this.form.controls.sapCode.value, this.form.controls.description.value, this.form.controls.technical.value,
                this.form.controls.repairDate.value, this.form.controls.scrapMotif.value, this.form.controls.state.value,
                this.form.controls.stateMotif.value, this.genPersonEntity.id).subscribe(res => {
                    if (res.message === 'OK') {
                        if (res.object != 0) {
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
            this.loadFile(this.data.id,serial);
        }
    }

    close(status: boolean): void {
        this.dialogRef.close(status);
    }

    search(event) {
        if (event.key === 'Tab') {
            if (event.key === 'Tab') {
                event.preventDefault();
            }
            this.scpAuditSerialS.listSearch(this.form.get('serial').value).subscribe(res => {
                if (res.message === 'OK') {
                    if (res.object != null) {
                        this.form.get('mac').setValue(res.object.mac);
                        this.form.get('sapCode').setValue(res.object.codigoSap);
                        this.form.get('description').setValue(res.object.descripcion)
                        this.form.get('repairDate').setValue(res.object.fechaReparacion)
                        this.form.get('technical').setValue(res.object.usuario);
                        this.form.get('scrapMotif').setValue(res.object.motivoScrap);

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

    addFile(file: FileList) {
        if (file != undefined) {
            for (let i = 0; i < file.length; i++) {
                this.fileList.push(file[i]);
            }
        }
    }
    removeFile(i: number) {
        this.fileList.splice(i, 1);
    }
    loadFile(id:number,serial: string) {
        this.scpAuditSerialS.loadFile(id,serial, this.fileList).subscribe(res => {
            if (res.message === 'OK') {
                if (res.object != 0) {
                    this.fileList = [];
                } else {
                    this.alertS.open('Error al cargar el archivo!', 'error');
                }
            } else {
                this.alertS.open(res.message, 'error');
            }
        }, err => {
            this.alertS.open(err.message, 'error');
        });
    }



    habilitar()
    {
        
        if(this.valueOption=='Aprobado' || this.valueOption==false)
        {
            // habilitamos
         (document.getElementById("input") as HTMLButtonElement).disabled=true;
        }else if(this.valueOption=='Rechazado' || this.valueOption==true){
            // deshabilitamos
            (document.getElementById("input") as HTMLButtonElement).disabled=false;
        }
    }

}