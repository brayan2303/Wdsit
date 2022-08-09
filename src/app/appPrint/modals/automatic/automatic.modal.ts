import { Component, ViewChild, Inject, OnInit } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { AlertService } from 'src/app/shared/services/alert.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PriFieldService } from '../../services/priField.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { calculationFormModal } from '../calculation/calculationForm.modal';

@Component({
    selector: 'modal-automatic',
    templateUrl: 'automatic.modal.html',
    styleUrls: ['./automatic.modal.css']
})
export class AutomaticModal implements OnInit {
    editing: number;
    columns: string[];
    dataSource = new MatTableDataSource<any>();
    @ViewChild(MatTable) table: MatTable<any>;

    constructor(private dialog: MatDialog,private priFieldS: PriFieldService, private alertS: AlertService,
        public dialogRef: MatDialogRef<AutomaticModal>,
        @Inject(MAT_DIALOG_DATA) public data: any) {
        dialogRef.disableClose = true;
        this.editing = 0;
        this.columns = ['id','name'];
        this.dataSource = new MatTableDataSource([]);
    }
    ngOnInit(): void {
        
        this.priFieldS.listAutomaticSmall(this.data.formulaId).subscribe(res => {
            if (res.message === 'OK') {
                this.dataSource = res.object;
            } else {
                this.alertS.open(res.message, 'error');
            }
        }, err => {
            this.alertS.open(err.message, 'error');
        });
    }
    close(id:number,name:string): void {
        this.dialogRef.close({'id':id,'name':name});
    }
  
}