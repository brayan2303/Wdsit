import { Component, Inject, OnInit, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTable, MatTableDataSource } from "@angular/material/table";
import { AlertService } from 'src/app/shared/services/alert.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActiveFixedInventoryService } from "src/app/appActiveFixed/services/ActiveFixedInventoty.service";


@Component({
    selector: 'app-actListAlquila',
    templateUrl: './actListAlquila.component.html',
    styleUrls: ['./actListAlquila.component.css']
})

export class ActListAlquilaComponent implements OnInit {

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
    constructor(private activeFixedAprovS: ActiveFixedInventoryService, private alertS: AlertService) {
        this.loading = false;
        this.columns = ['identification', 'name', 'product', 'serial'];
        this.dataSource = new MatTableDataSource([]);
    }

    ngOnInit(): void {
        this.loading = true,
            this.listAnswer();
    }

    listAnswer() {
        this.activeFixedAprovS.listRent().subscribe(res => {
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


