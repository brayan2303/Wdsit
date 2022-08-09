import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { GenPersonEntity } from 'src/app/appGeneral/entities/genPerson.entity';
import { AlertService } from 'src/app/shared/services/alert.service';
import { ActiveFixedAssigmentEntity } from '../../entities/activeFixedAssigment.entity';
import { ActiveFixedAssigmentService } from '../../services/activeFixedAssigment.service';

@Component({
    selector: 'dates',
    templateUrl: 'dates.modal.html',
    styleUrls: ['./dates.modal.css']
})
export class DateModal implements OnInit {
    title: string;
    form: FormGroup;
    fileList: File[];
    groupId: number;
    genPersonEntity: GenPersonEntity;
    personId: number;
    date: boolean;
    dataSource: MatTableDataSource<any>;
    @ViewChild('paginator') paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    public loading: boolean;
    customerId: number
    activeFixedAssigmentE: ActiveFixedAssigmentEntity;
    constructor(private fb: FormBuilder, private ActiveFixedAssigmentS: ActiveFixedAssigmentService, private alertS: AlertService, public dialogRef: MatDialogRef<DateModal>, @Inject(MAT_DIALOG_DATA) public data: any) {
        dialogRef.disableClose = true;
        this.title = '';
        this.fileList = [];
        this.groupId = 0;
        this.personId = 0;
        this.customerId = 0;  
    }
    ngOnInit(): void {
        this.genPersonEntity = JSON.parse(localStorage.getItem('user'));
        this.formBuilders();
        if (this.groupId === 0) {
            this.ActiveFixedAssigmentS.dateById(this.data.id).subscribe(res => {
              if (res.message === 'OK') {
                this.activeFixedAssigmentE = res.object;
                this.form.setValue(
                  {
                    'exitDate': this.activeFixedAssigmentE.exitDate,
                    'entryDate': this.activeFixedAssigmentE.entryDate,
                  }
                );
              } else {
                this.alertS.open(res.message, 'error');
              }
            }, err => {
              this.alertS.open(err.message, 'error');
            });
          } else {
            this.alertS.open('Sin registros', 'warning')
          }
    }


    formBuilders() {
        this.form = this.fb.group({
         
            exitDate: [, [Validators.required]],
            entryDate: [, [Validators.required]],
            //[,[Validators.required]],
        })
    }
    save() {
        
        this.ActiveFixedAssigmentS.updateDate(this.data.id, this.form.controls.exitDate.value, this.form.controls.entryDate.value).subscribe(res => {
                if (res.message === 'OK') {
                    if (res.object != '') {
                        this.form.reset()
                        this.alertS.open('Fechas registradas', 'success')
                    } else {
                        this.alertS.open('Error al crear el registro!', 'error');
                    }
                } else {
                    this.alertS.open(res.message, 'error');
                }
            }, err => {
                this.alertS.open(err.message, 'error');
            });
    }

    close(status: boolean): void {
        this.dialogRef.close(status);
    }
    getToday(): string {
        return new Date().toISOString().split('T')[0]
      }
      toggleShow() {
        this.date = ! this.date;
        }
    
   
}