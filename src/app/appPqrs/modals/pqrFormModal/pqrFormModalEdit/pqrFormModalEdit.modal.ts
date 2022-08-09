import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: 'modal-pqrFormModalEdit',
    templateUrl: 'pqrFormModalEdit.modal.html',
    styleUrls: ['./pqrFormModalEdit.modal.css']
})
export class PqrFormModalEditComponent implements OnInit{
    formId:number;
    status:boolean;
    
    constructor(public dialogRef: MatDialogRef<PqrFormModalEditComponent>,@Inject(MAT_DIALOG_DATA) public data: any){
        this.status=false;
        dialogRef.disableClose = true;
    }
    ngOnInit(): void {
        this.formId=this.data.formId;
    }
    onClose(){
        this.status=true;
        this.dialogRef.close(this.status);
    }
}