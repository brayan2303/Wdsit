import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
    selector: 'app-documentLoadEdit',
    templateUrl: './documentLoadEdit.component.html',
    styleUrls: ['./documentLoadEdit.component.css']

})
export class DocumentLoadEditComponent implements OnInit{
    docLoadformId: number;
    status: boolean;

    constructor(public dialogRef: MatDialogRef<DocumentLoadEditComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
        this.status = false;
        dialogRef.disableClose = true;
    }
    ngOnInit(): void {
        this.docLoadformId = this.data.docLoadformId;
    }
    onClose() {
        this.status = true;
        this.dialogRef.close(this.status);
    }
}

