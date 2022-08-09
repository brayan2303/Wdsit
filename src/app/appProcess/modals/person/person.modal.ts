import { Component, Inject, ViewChild } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { AlertService } from 'src/app/shared/services/alert.service';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { ProPerspectivePersonService } from '../../services/proPerspectivePerson.service';

@Component({
    selector: 'modal-person',
    templateUrl: 'person.modal.html',
    styleUrls: ['./person.modal.css']
})
export class PersonModal {
    loading: boolean;
    columns: string[];
    dataSource = new MatTableDataSource<any>();
    @ViewChild(MatTable) table: MatTable<any>;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    constructor(private proPerspectivePersonS: ProPerspectivePersonService, private alertS: AlertService,
        public dialogRef: MatDialogRef<PersonModal>,
        @Inject(MAT_DIALOG_DATA) public data: any) {
        dialogRef.disableClose = true;
        this.loading = false;
        this.columns = ['id', 'firstName', 'lastName', 'asignar'];
        this.dataSource = new MatTableDataSource([]);
    }
    ngOnInit(): void {
        this.loading = true;
        this.proPerspectivePersonS.list(this.data.id).subscribe(res => {
            if (res.message === 'OK') {
                this.loading = false;
                this.dataSource = new MatTableDataSource<any>(res.object);
                this.dataSource.paginator = this.paginator;
                this.dataSource.sort = this.sort;
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
    close(): void {
        this.dialogRef.close();
    }
    checked(input: HTMLInputElement, personId: number) {
        if (input.checked) {
            this.proPerspectivePersonS.create(this.data.id, personId).subscribe(resC => {
                if (resC.message === 'OK') {
                    if (resC.object != 0) {
                        this.alertS.open('Usuario agregado!', 'success');
                        this.loading = true;
                        this.proPerspectivePersonS.list(this.data.id).subscribe(resL => {
                            this.loading = false;
                            this.dataSource = new MatTableDataSource<any>(resL.object);
                            this.dataSource.paginator = this.paginator;
                        }, err => {
                            this.alertS.open(err.message, 'error');
                        });
                    } else {
                        this.alertS.open('Error al agregar el usuario!', 'error');
                    }
                } else {
                    this.alertS.open(resC.message, 'error');
                }
            }, err => {
                this.alertS.open(err.message, 'error');
            });
        } else {
            this.proPerspectivePersonS.delete(this.data.id, personId).subscribe(resD => {
                if (resD.message === 'OK') {
                    if (resD.object != 0) {
                        this.alertS.open('Usuario eliminado!', 'success');
                        this.loading = true;
                        this.proPerspectivePersonS.list(this.data.id).subscribe(res => {
                            this.loading = false;
                            this.dataSource = new MatTableDataSource<any>(res.object);
                            this.dataSource.paginator = this.paginator;
                        }, err => {
                            this.alertS.open(err.message, 'error');
                        });
                    } else {
                        this.alertS.open('Error al eliminar el usuario!', 'error');
                    }
                } else {
                    this.alertS.open(resD.message, 'error');
                }
            }, err => {
                this.alertS.open(err.message, 'error');
            });
        }
    }
}