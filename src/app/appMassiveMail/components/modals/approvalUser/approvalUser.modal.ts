import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { GenPersonEntity } from 'src/app/appGeneral/entities/genPerson.entity';
import { GenPersonService } from 'src/app/appGeneral/services/genPerson.service';
import { AlertService } from 'src/app/shared/services/alert.service';

@Component({
    selector: 'approvalUser',
    templateUrl: 'approvalUser.modal.html',
    styleUrls: ['./approvalUser.modal.css']
})
export class ApprovalUserModal implements OnInit {
    loading: boolean;
    columns: string[];
    dataSource: MatTableDataSource<any>;
    @ViewChild('paginator') paginator: MatPaginator;

    constructor(private genPersonS: GenPersonService, private alertS: AlertService,
        public dialogRef: MatDialogRef<ApprovalUserModal>,
        @Inject(MAT_DIALOG_DATA) public data: any) {
        dialogRef.disableClose = true;
        this.columns = ['firstName', 'lastName', 'userName', 'mail'];
        this.dataSource = new MatTableDataSource([]);
    }
    ngOnInit(): void {
        this.loading = true;
        this.genPersonS.list().subscribe(res => {
            if (res.message === 'OK') {
                this.dataSource = new MatTableDataSource(res.object);
                this.dataSource.paginator = this.paginator;
                this.loading = false;
            } else {
                this.alertS.open(res.message, 'error');
            }
        }, err => {
            this.alertS.open(err.message, 'error');
        });
    }
    filter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim();

        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    }
    select(user: GenPersonEntity) {
        if(user.mail!=null){
            this.close(user);
        }else{
            this.alertS.open('El usuario no tiene un correo asociado!','warning');
        }
    }
    close(user: GenPersonEntity): void {
        this.dialogRef.close(user);
    }
}