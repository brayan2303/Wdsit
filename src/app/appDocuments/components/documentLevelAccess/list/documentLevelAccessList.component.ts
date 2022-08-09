import { Component, OnInit, ViewChild } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { DocumentLevelAccessService } from "src/app/appDocuments/services/DocumentLevelAccess.Service";
import { ConfirmationComponent } from "src/app/shared/components/confirmation/confirmation.component";
import { AlertService } from "src/app/shared/services/alert.service";
import { DocumentLevelAccessEditComponent } from "../edit/documentLevelAccessEdit.component";



@Component({
    selector: 'app-documentLevelAccessList',
    templateUrl: './documentLevelAccessList.component.html',
    styleUrls: ['./documentLevelAccessList.component.css']
})


export class DocumentLevelAccessListComponent implements OnInit {
    loading: boolean;
    id: number;
    columns: string[];
    @ViewChild(MatPaginator) paginator: MatPaginator;
    dataSource = new MatTableDataSource<any>();
    form: any;
    constructor(private documentLevelA: DocumentLevelAccessService, private dialog: MatDialog, private alertS: AlertService) {
        this.loading = false;
        this.columns = ['code', 'description', 'active', 'Acciones'];
        this.dataSource = new MatTableDataSource([]);
    }

    ngOnInit(): void {
        this.loading = true;
        this.search();
    }

    search() {
        this.loading = true;
        this.documentLevelA.list().subscribe(res => {
            if (res.message == 'OK') {
                this.loading = false;
                this.dataSource.paginator = this.paginator;
                this.dataSource = new MatTableDataSource<any>(res.object);
            } else {
                this.alertS.open(res.message, 'error');
            }
        }, err => {
            this.alertS.open(err.message, 'error');
        });
    }

    edit(value: number) {
        const dialogRef = this.dialog.open(DocumentLevelAccessEditComponent, {
            data: { docLevelformId: value }
        });
        dialogRef.afterClosed().subscribe(resA => {
            this.documentLevelA.list().subscribe(resL => {
                if (resL.message === 'OK') {
                    this.loading = false;
                    this.dataSource = new MatTableDataSource<any>(resL.object);
                    this.dataSource.paginator = this.paginator;
                } else {
                    this.alertS.open(resL.message, 'error');
                }
            })
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

    delete(value: number) {
        this.dialog.open(ConfirmationComponent, {
            data: { message: '¿ Desea eliminar el registro ?' },
            height: '250px',
            width: '400px'
        }).afterClosed().subscribe(res => {
            if (res) {
                this.documentLevelA.delete(value).subscribe(res => {
                    if (res.message === 'OK') {
                        if (res.object != 0) {
                            this.alertS.open('Registro eliminado!', 'success');
                            this.search();
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
}
