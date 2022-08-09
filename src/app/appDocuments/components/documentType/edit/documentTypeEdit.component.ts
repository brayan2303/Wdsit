import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
    selector: 'app-documentTypeEdit',
    templateUrl: './documentTypeEdit.component.html',
    styleUrls: ['./documentTypeEdit.component.css']
})
export class DocumentsTypeEditComponent implements OnInit {
    docTypeformId: number;
    status: boolean;

    constructor(public dialogRef: MatDialogRef<DocumentsTypeEditComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
        this.status = false;
        dialogRef.disableClose = true;
    }
    ngOnInit(): void {
        this.docTypeformId = this.data.docTypeformId;
    }
    onClose() {
        this.status = true;
        this.dialogRef.close(this.status);
    }
}