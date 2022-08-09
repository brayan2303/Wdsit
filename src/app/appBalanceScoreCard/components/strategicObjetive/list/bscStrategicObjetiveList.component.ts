import { MatTableDataSource, MatTable } from '@angular/material/table';
import { ViewChild, Component, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { AlertService } from 'src/app/shared/services/alert.service';
import { MatSort } from '@angular/material/sort';
import { BscStrategicObjetiveService } from 'src/app/appBalanceScoreCard/services/bscStrategicObjetive.service';
import { BscPerspectiveEntity } from 'src/app/appBalanceScoreCard/entities/bscPerspective.entity';
import { BscPerspectiveService } from 'src/app/appBalanceScoreCard/services/bscPerspective.service';
import { GenPersonEntity } from 'src/app/appGeneral/entities/genPerson.entity';
import { ChartService } from 'src/app/shared/chart/services/chart.service';

@Component({
    selector: 'app-bscStrategicObjetiveList',
    templateUrl: './bscStrategicObjetiveList.component.html',
    styleUrls: ['./bscStrategicObjetiveList.component.css']
})
export class BscStrategicObjetiveListComponent implements OnInit {
    loading: boolean;
    columns: string[];
    dataSource = new MatTableDataSource<any>();
    @ViewChild(MatTable) table: MatTable<any>;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    perspectiveId: number;
    genPersonEntity: GenPersonEntity;
    perspectiveList: BscPerspectiveEntity[];
    year: number;
    yearList: number[];

    constructor(private bscPerspectiveS: BscPerspectiveService, private bscStrategicObjetiveS: BscStrategicObjetiveService, private chartS: ChartService, private alertS: AlertService) {
        this.loading = false;
        this.columns = ['name', 'percentage', 'perspective'];
        this.dataSource = new MatTableDataSource([]);
        this.perspectiveId = 0;
        this.year = 0;
        this.yearList = [];
    }

    ngOnInit(): void {
        this.genPersonEntity = JSON.parse(localStorage.getItem('user'));
        for (let i = 2020; i < 2026; i++) {
            this.yearList.push(i);
        }
    }
    filter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim();

        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    }
    getPerspective() {
        this.dataSource = new MatTableDataSource([]);
        this.dataSource.paginator = this.paginator;
        this.bscPerspectiveS.listActive(this.year, this.genPersonEntity.id, Number(localStorage.getItem('countryId'))).subscribe(res => {
            if (res.message === 'OK') {
                this.perspectiveList = res.object;
            } else {
                this.alertS.open(res.message, 'error');
            }
        }, err => {
            this.alertS.open(err.message, 'error');
        });
    }
    getStrategicObjetive() {
        this.bscStrategicObjetiveS.listActive(this.perspectiveId).subscribe(res => {
            this.loading = true;
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
}