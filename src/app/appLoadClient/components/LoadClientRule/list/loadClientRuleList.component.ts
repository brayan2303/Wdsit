import { Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTable, MatTableDataSource } from "@angular/material/table";
import { AlertService } from 'src/app/shared/services/alert.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationComponent } from 'src/app/shared/components/confirmation/confirmation.component';
import { ActiveFixedSupplierService } from "src/app/appActiveFixed/services/activeFixedSupplier.service";
import { LoadClientRuleEditComponent } from "../edit/loadClientRuleEdit.component";
import { LoadClientRuleInitService } from "src/app/appLoadClient/services/loadClientRule.service";
import { LoadFieldRuleModal } from "../../modal/fieldRule/loadFieldRule.modal";





@Component({
    selector: 'app-loadClientRuleList',
    templateUrl: './loadClientRuleList.component.html',
    styleUrls: ['./loadClientRuleList.component.css']
})

export class LoadClientRuleListComponent implements OnInit {
    
    loading: boolean;
    columns: string[];
    id:number;  
    dataSource = new MatTableDataSource<any>();
    @ViewChild(MatTable) table: MatTable<any>;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    unibytes: Uint8Array = null;
    form: any;
    constructor(private LoadClientRuleInitS:LoadClientRuleInitService, private dialog: MatDialog, private alertS: AlertService) {
        this.loading = false;   
        this.columns = ['name', 'description','parameterization','active', 'Acciones'];
        this.dataSource = new MatTableDataSource([]);
    }

    ngOnInit(): void {
        this.loading = true,
            this.search();
    }

    search(){
        this.LoadClientRuleInitS.list().subscribe(res => {
            if (res.message === 'OK') {
                this.loading = false;
                console.log(res.object)
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
    edit(value: number) {
        const dialogRef = this.dialog.open(LoadClientRuleEditComponent, {
            data: { formId: value }
        });
        dialogRef.afterClosed().subscribe(resA => {
            this.LoadClientRuleInitS.list().subscribe(resL => {
                if (resL.message === 'OK') {
                    this.loading = false;

                    this.dataSource = new MatTableDataSource<any>(resL.object);
                    this.dataSource.paginator = this.paginator;
                    this.dataSource.sort = this.sort;
                } else {
                    this.alertS.open(resL.message, 'error');
                }
            }, err => {
                this.alertS.open(err.message, 'error');
            });
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

    delete(value:number) {
        this.dialog.open(ConfirmationComponent, {
            data: { message: '¿ Desea eliminar el registro ?' },
            height: '250px',
            width: '400px'
        }).afterClosed().subscribe(res => {
            if (res) {
                this.LoadClientRuleInitS.delete(value).subscribe(res => {
                    if (res.message === 'OK') {
                        if (res.object != 0) {
                            this.alertS.open('Registro eliminado!', 'success');
                            this.LoadClientRuleInitS.list().subscribe(res => {
                                this.loading = false;
                                this.dataSource = new MatTableDataSource<any>(res.object);
                                this.dataSource.paginator = this.paginator;
                                this.dataSource.sort = this.sort;
                            }, err => {
                                this.alertS.open(err, 'error');
                            });
                        } else {
                            this.alertS.open(res.message, 'error');
                        }
                    } else {
                        this.alertS.open(res.message, 'error');
                    }
                }, err => {
                    this.alertS.open(err.message, 'error');
                });
            }
        }, err => {
            this.alertS.open(err.message, 'error');
        });
    }

    fields(id:number, parameterizationId:number) {
        this.dialog.open(LoadFieldRuleModal, {
            width: '100%',
            data: {id: id, parameterizationId:parameterizationId}
        });
    }


    

}