import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
    selector: 'app-documentLevelAccessEdit',
    templateUrl: './documentLevelAccessEdit.component.html',
    styleUrls: ['./documentLevelAccessEdit.component.css']

})
export class DocumentLevelAccessEditComponent implements OnInit {
    docLevelformId: number;
    status: boolean;

    constructor(public dialogRef: MatDialogRef<DocumentLevelAccessEditComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
        this.status = false;
        dialogRef.disableClose = true;
    }
    ngOnInit(): void {
        this.docLevelformId = this.data.docLevelformId;
    }
    onClose() {
        this.status = true;
        this.dialogRef.close(this.status);
    }
}

