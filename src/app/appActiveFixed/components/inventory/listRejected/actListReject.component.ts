import { Component, Inject, OnInit, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTable, MatTableDataSource } from "@angular/material/table";
import { AlertService } from 'src/app/shared/services/alert.service';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActAnswerModal } from "src/app/appActiveFixed/modals/answer/actProdAnswer.modal";
import { ActiveFixedInventoryService } from "src/app/appActiveFixed/services/ActiveFixedInventoty.service";



@Component({
    selector: 'app-actListReject',
    templateUrl: './actListReject.component.html',
    styleUrls: ['./actListReject.component.css']
})

export class ActListRejectComponent implements OnInit {

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
    constructor(private activeFixedAprovS: ActiveFixedInventoryService, private dialog: MatDialog, private alertS: AlertService) {
        this.loading = false;
        this.columns = ['identification', 'name', 'product', 'serial', 'personRes', 'answer', 'approvedRejected'];
        this.dataSource = new MatTableDataSource([]);
    }

    ngOnInit(): void {
        this.loading = true,
            this.listAnswer();
    }

    listAnswer() {
        this.activeFixedAprovS.listRejected().subscribe(res => {
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


