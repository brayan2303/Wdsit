import { Component, ViewChild, Inject, OnInit } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { AlertService } from 'src/app/shared/services/alert.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PriFieldService } from '../../services/priField.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { calculationFormModal } from '../calculation/calculationForm.modal';

@Component({
    selector: 'modal-fieldParameterization',
    templateUrl: 'fieldParameterization.modal.html',
    styleUrls: ['./fieldParameterization.modal.css']
})
export class FieldParameterizationModal implements OnInit {
    editing: number;
    columns: string[];
    dataSource: any[];
    @ViewChild(MatTable) table: MatTable<any>;

    constructor(private dialog: MatDialog,private priFieldS: PriFieldService, private alertS: AlertService,
        public dialogRef: MatDialogRef<FieldParameterizationModal>,
        @Inject(MAT_DIALOG_DATA) public data: any) {
        dialogRef.disableClose = true;
        this.editing = 0;
        this.columns = ['name', 'code', 'position', 'Acciones'];
        this.dataSource = [];
    }
    ngOnInit(): void {
        this.priFieldS.listAutomatic(this.data.labelId).subscribe(res => {
            if (res.message === 'OK') {
                this.dataSource = res.object;
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
    calculate(id:number, labelId:number) {
        this.dialog.open(calculationFormModal, {
            data: { 'formulaId': id, 'labelId': labelId },
            width: '100%'
        });
    }
  
}