import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { GenPersonEntity } from 'src/app/appGeneral/entities/genPerson.entity';
import { AlertService } from 'src/app/shared/services/alert.service';
import { PqrCustomerEntity } from '../../entities/pqrCustomer.entity';
import { PqrFomModalEntity } from '../../entities/pqrFomModal.entity';
import { PqrMasterEntity } from '../../entities/pqrMaster.entity';
import { PqrFomModalService } from '../../services/pqrFomModal.service';
import { PqrPersonMasterService } from '../../services/pqrPersonMaster.service';
import { PqrsClientSerialService } from '../../services/pqrsClientSerial.service';

@Component({
    selector: 'serialNew',
    templateUrl: 'serialNew.modal.html',
    styleUrls: ['./serialNew.modal.css']
})
export class SerialNewModal implements OnInit {
    title: string;
    form: FormGroup;
    fileList: File[];
    groupId: number;
    genPersonEntity: GenPersonEntity;
    personId: number;
    dataSource: MatTableDataSource<any>;
    @ViewChild('paginator') paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    public loading: boolean;
    customerId: number
    pqrFomModalE:PqrFomModalEntity;
    pqrMasterList:PqrMasterEntity[];
    constructor(private fb: FormBuilder, private pqrPersonMasterS:PqrPersonMasterService,private meeSupportS: PqrsClientSerialService,private pqrFomModalS:PqrFomModalService, private alertS: AlertService, public dialogRef: MatDialogRef<SerialNewModal>, @Inject(MAT_DIALOG_DATA) public data: any) {
        dialogRef.disableClose = true;
        this.title = '';
        this.fileList = [];
        this.groupId = 0;
        this.personId = 0;
        this.customerId = 0;
        this.pqrFomModalE = new PqrFomModalEntity();
        this.pqrMasterList = []  
    }
    ngOnInit(): void {
        
        this.genPersonEntity = JSON.parse(localStorage.getItem('user'));
        this.formBuilders();
        this.pqrFomModalS.findByUserId((JSON.parse(localStorage.getItem("user"))["id"]),Number(localStorage.getItem('countryId'))).subscribe(res => {
            if (res.message === 'OK') {
               this.pqrFomModalE = res.object;
            } else {
                this.alertS.open(res.message, 'error');
            }
        }, err => {
            this.alertS.open(err.message, 'error');
        });
        this.pqrPersonMasterS.categoryUserId((JSON.parse(localStorage.getItem("user"))["id"])).subscribe(res => {
            if (res.message === 'OK') {
               this.pqrMasterList = res.object;
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
            type: [, []],
            serial: [, [Validators.required]],
            description: [, [Validators.required]],
            phoneMovil: [, [Validators.required]],
            identification: [, [Validators.required]],
            imei: [, [Validators.required]],
            userId: [, []],
            categoryId:[,[Validators.required]],
        })
    }
    save() {
        
        this.meeSupportS.create(this.data.userId, this.form.controls.type.value, this.form.controls.serial.value,
            this.form.controls.phoneMovil.value, this.form.controls.identification.value, this.form.controls.imei.value,
            this.form.controls.description.value,this.data.ticket, this.form.controls.categoryId.value,Number(localStorage.getItem('countryId'))).subscribe(res => {
                if (res.message === 'OK') {
                    if (res.object != '') {
                        if (this.fileList.length > 0) {
                            this.loadFile(res.object.toString());
                        }
                        this.close(true);
                        this.form.reset()
                    } else {
                        this.alertS.open('Error al crear el registro!', 'error');
                    }
                } else {
                    this.alertS.open(res.message, 'error');
                }
            }, err => {
                this.alertS.open(err.message, 'error');
            });
    }

    close(status: boolean): void {
        this.dialogRef.close(status);
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
    loadFile(number: string) {
        this.meeSupportS.loadFile(number, 'INICIO', this.fileList).subscribe(res => {
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
}