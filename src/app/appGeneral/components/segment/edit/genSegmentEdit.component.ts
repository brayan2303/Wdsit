import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: 'app-genSegmentEdit',
    templateUrl: './genSegmentEdit.component.html',
    styleUrls: ['./genSegmentEdit.component.css']
})
export class GenSegmentEditComponent implements OnInit{
    segmentId:number;
    status:boolean;
    
    constructor(public dialogRef: MatDialogRef<GenSegmentEditComponent>,@Inject(MAT_DIALOG_DATA) public data: any){
        this.status=false;
        dialogRef.disableClose = true;
    }
    ngOnInit(): void {
        this.segmentId=this.data.segmentId;
    }
    onClose(){
        this.status=true;
        this.dialogRef.close(this.status);
    }
}