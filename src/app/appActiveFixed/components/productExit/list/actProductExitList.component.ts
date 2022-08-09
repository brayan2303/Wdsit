import { Component, Inject, OnInit, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTable, MatTableDataSource } from "@angular/material/table";
import { AlertService } from 'src/app/shared/services/alert.service';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActiveFixedExitService } from "src/app/appActiveFixed/services/activeFixedExit.service";



@Component({
    selector: 'app-actProductExitList',
    templateUrl: './actProductExitList.component.html',
    styleUrls: ['./actProductExitList.component.css']
})

export class ActProductExitListComponent implements OnInit {

    loading: boolean;
    columns: string[];
    id: number;
    dataSource = new MatTableDataSource<any>();
    @ViewChild(MatTable) table: MatTable<any>;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @Inject(MAT_DIALOG_DATA) public data: any
    @ViewChild(MatSort) sort: MatSort;
    unibytes: Uint8Array = null;
    form: any;
    constructor(private activeFixedExitS: ActiveFixedExitService, private alertS: AlertService) {
        this.loading = false;
        this.columns = ['identification', 'name', 'area', 'position', 'equipment', 'serial', 'personExit','creationDate', 'observation'];
        this.dataSource = new MatTableDataSource([]);
    }

    ngOnInit(): void {
        this.loading = true,
            this.list();
    }
    list() {
        this.activeFixedExitS.list().subscribe(res => {
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
}


