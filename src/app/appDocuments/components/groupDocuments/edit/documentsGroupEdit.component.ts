import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
    selector: 'app-documentsGroupEdit',
    templateUrl: './documentsGroupEdit.component.html',
    styleUrls: ['./documentsGroupEdit.component.css']
})
export class DocumentsGroupEditComponent implements OnInit {
    docGroupformId: number;
    status: boolean;

    constructor(public dialogRef: MatDialogRef<DocumentsGroupEditComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
        this.status = false;
        dialogRef.disableClose = true;
    }
    ngOnInit(): void {
        this.docGroupformId = this.data.docGroupformId;
    }
    onClose() {
        this.status = true;
        this.dialogRef.close(this.status);
    }
}

