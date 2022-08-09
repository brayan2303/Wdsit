import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: 'app-genPlantEdit',
    templateUrl: './genPlantEdit.component.html',
    styleUrls: ['./genPlantEdit.component.css']
})
export class GenPlantEditComponent implements OnInit{
    genPlantformId:number;
    status:boolean;
    
    constructor(public dialogRef: MatDialogRef<GenPlantEditComponent>,@Inject(MAT_DIALOG_DATA) public data: any){
        this.status=false;
        dialogRef.disableClose = true;
    }
    ngOnInit(): void {
        this.genPlantformId=this.data.genPlantformId;
    }
    onClose(){
        this.status=true;
        this.dialogRef.close(this.status);
    }
}