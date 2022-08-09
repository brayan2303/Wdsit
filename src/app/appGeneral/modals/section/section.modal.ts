import { Component, Inject, ViewChild } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import { AlertService } from 'src/app/shared/services/alert.service';
import { GenSectionService } from '../../services/genSection.service';
import { GenApplicationService } from '../../services/genApplication.service';

@Component({
    selector: 'modal-section',
    templateUrl: 'section.modal.html',
    styleUrls: ['./section.modal.css']
})
export class SectionModal {
    sectionList: number;
    columns: string[];
    dataSource: any[];
    @ViewChild(MatTable) table: MatTable<any>;

    constructor(private genApplicationS: GenApplicationService, private genSectionS: GenSectionService, private alertS: AlertService,
        public dialogRef: MatDialogRef<SectionModal>,
        @Inject(MAT_DIALOG_DATA) public data: any) {
        dialogRef.disableClose = true;
        this.columns = ['name', 'asignar'];
        this.dataSource = [];
    }
    ngOnInit(): void {
        this.genSectionS.findAll(this.data.applicationName, this.data.profileId).subscribe(res => {
            if (res.message === 'OK') {
                this.dataSource = res.object;
                this.table.renderRows();
            } else {
                this.alertS.open(res.message, 'error');
            }
        }, err => {
            this.alertS.open(err.message, 'error');
        });
    }
    
    checked(input: HTMLInputElement, sectionId: number) {
        if (input.checked) {
            this.genSectionS.add(this.data.profileId, sectionId).subscribe(res => {
                if (res.message === 'OK') {
                    if(res.object!=0){
                        this.genSectionS.findAll(this.data.applicationName, this.data.profileId).subscribe(res => {
                            if(res.message==='OK'){
                                this.dataSource = res.object;
                                this.table.renderRows();
                            }else{
                                this.alertS.open(res.message,'error');
                            }                            
                        }, err => {
                            this.alertS.open(err.message, 'error');
                        });
                    }else{
                        this.alertS.open('Error al guardar', 'error');
                    }                 
                } else {
                    this.alertS.open(res.message, 'error');
                }
            }, err => {
                this.alertS.open(err.message, 'error');
            });
        } else {
            this.genSectionS.remove(this.data.profileId, sectionId).subscribe(res => {
                if(res.message==='OK'){
                    if(res.object!=0){
                        this.genSectionS.findAll(this.data.applicationName, this.data.profileId).subscribe(res => {
                            if(res.message==='OK'){
                                this.dataSource = res.object;
                                this.table.renderRows();
                            }else{
                                this.alertS.open(res.message,'error');
                            }                         
                        }, err => {
                            this.alertS.open(err.message, 'error');
                        });
                    }else{
                        this.alertS.open('Error al eliminar','error');
                    }               
                }else{
                    this.alertS.open(res.message,'error');
                }             
            }, err => {
                this.alertS.open(err.message, 'error');
            });
        }
    }
    close(): void {
        this.dialogRef.close(this.sectionList);
    }
}