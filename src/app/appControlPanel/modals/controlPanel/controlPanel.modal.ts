import { Component, ViewChild, Inject, OnInit } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { AlertService } from 'src/app/shared/services/alert.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ConControlPanelService } from 'src/app/appControlPanel/services/conControlPanel.service';

@Component({
    selector: 'modal-controlPanel',
    templateUrl: 'controlPanel.modal.html',
    styleUrls: ['./controlPanel.modal.css']
})
export class ControlPanelModal implements OnInit {
    columns: string[];
    dataSource: any[];
    @ViewChild(MatTable) table: MatTable<any>;

    constructor(private conControlPanelS: ConControlPanelService, private alertS: AlertService,
        public dialogRef: MatDialogRef<ControlPanelModal>,
        @Inject(MAT_DIALOG_DATA) public data: any) {
        dialogRef.disableClose = true;
        this.columns = ['Id', 'Nombre', 'Asignar'];
        this.dataSource = [];
    }
    ngOnInit(): void {
        this.conControlPanelS.findAll(this.data.personId).subscribe(res => {
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
    checked(input: HTMLInputElement, powerBiId: number) {
        if (input.checked) {
            this.conControlPanelS.add(this.data.personId, powerBiId).subscribe(res => {
                if (res.message === 'OK') {
                    this.conControlPanelS.findAll(this.data.personId).subscribe(res => {
                        if (res.message === 'OK') {
                            this.dataSource = res.object;
                            this.table.renderRows();
                        } else {
                            this.alertS.open(res.message, 'error');
                        }
                    }, err => {
                        this.alertS.open(err.message, 'error');
                    });
                } else {
                    this.alertS.open(res.message, 'error');
                }
            }, err => {
                this.alertS.open(err.message, 'error');
            });
        } else {
            this.conControlPanelS.remove(this.data.personId, powerBiId).subscribe(res => {
                if (res.message === 'OK') {
                    this.conControlPanelS.findAll(this.data.personId).subscribe(res => {
                        if (res.message === 'OK') {
                            this.dataSource = res.object;
                            this.table.renderRows();
                        } else {
                            this.alertS.open(res.message, 'error');
                        }
                    }, err => {
                        this.alertS.open(err.message, 'error');
                    });
                } else {
                    this.alertS.open(res.message, 'error');
                }
            }, err => {
                this.alertS.open(err.message, 'error');
            });
        }
    }
}