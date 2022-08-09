import { MatTableDataSource, MatTable } from '@angular/material/table';
import { ViewChild, Component, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { GenProfileService } from 'src/app/appGeneral/services/genProfile.service';
import { MatDialog } from '@angular/material/dialog';
import { GenProfileEditComponent } from '../edit/genProfileEdit.component';
import { AlertService } from 'src/app/shared/services/alert.service';
import { ConfirmationComponent } from 'src/app/shared/components/confirmation/confirmation.component';
import { SectionModal } from 'src/app/appGeneral/modals/section/section.modal';
import { ModuleModal } from 'src/app/appGeneral/modals/module/module.modal';
import { MatSort } from '@angular/material/sort';

@Component({
    selector: 'app-genProfileList',
    templateUrl: './genProfileList.component.html',
    styleUrls: ['./genProfileList.component.css']
})
export class GenProfileListComponent implements OnInit {
    loading: boolean;
    columns: string[];
    dataSource = new MatTableDataSource<any>();
    @ViewChild(MatTable) table: MatTable<any>;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    constructor(private genProfileS: GenProfileService, private dialog: MatDialog, private alertS: AlertService) {
        this.loading = false;
        this.columns = ['name','application', 'active', 'actions'];
        this.dataSource = new MatTableDataSource([]);
    }

    ngOnInit(): void {
        this.loading = true;
        this.genProfileS.findAll().subscribe(res => {
            if (res.message === 'OK') {
                this.loading = false;
                this.dataSource = new MatTableDataSource<any>(res.object);
                this.dataSource.paginator = this.paginator;
                this.dataSource.sort=this.sort;
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
    edit(value: number) {
        const dialogRef = this.dialog.open(GenProfileEditComponent, {
            data: { profileId: value }
        });
        dialogRef.afterClosed().subscribe(resA => {
            this.genProfileS.findAll().subscribe(resF => {
                if (resF.message === 'OK') {
                    this.loading = false;
                    this.dataSource = new MatTableDataSource<any>(resF.object);
                    this.dataSource.paginator = this.paginator;
                    this.dataSource.sort=this.sort;
                } else {
                    this.alertS.open(resF.message, 'error');
                }
            }, err => {
                this.alertS.open(err.message, 'error');
            });
        }, err => {
            this.alertS.open(err.message, 'error');
        });
    }
    delete(value: number) {
        this.dialog.open(ConfirmationComponent,{
            data:{message:'¿Desea eliminar el perfil?'},
            height:'250px',
            width:'400px'
        }).afterClosed().subscribe(resA => {
            if (resA) {
                this.genProfileS.delete(value).subscribe(resD => {
                    if (resD.message === 'OK') {
                        if (resD.object != 0) {
                            this.alertS.open('Perfil eliminado!', 'success');
                            this.genProfileS.findAll().subscribe(resF => {
                                if(resF.message==='OK'){
                                    this.loading = false;
                                    this.dataSource = new MatTableDataSource<any>(resF.object);
                                    this.dataSource.paginator = this.paginator;
                                    this.dataSource.sort=this.sort;
                                }else{
                                    this.alertS.open(resF.message,'error');
                                }
                            }, err => {
                                this.alertS.open(err, 'error');
                            });
                        }else{
                            this.alertS.open('Error al eliminar el perfil!', 'error');
                        }
                    } else {
                        this.alertS.open(resD.message, 'error');
                    }
                }, err => {
                    this.alertS.open(err.message, 'error');
                });
            }
        }, err => {
            this.alertS.open(err.message, 'error');
        });
    }
    getSection(applicationName:string,id:number) {
        this.dialog.open(SectionModal, {
            data: { 'applicationName':applicationName,'profileId': id },
            width: '600px'
        });
    }
    getModule(applicationName:string,id: number) {
        this.dialog.open(ModuleModal, {
            data: { 'applicationName':applicationName,'profileId': id },
            width: '600px'
        });
    }
}