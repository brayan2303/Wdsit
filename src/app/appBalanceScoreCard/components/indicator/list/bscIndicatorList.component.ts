import { MatTableDataSource, MatTable } from '@angular/material/table';
import { ViewChild, Component, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { AlertService } from 'src/app/shared/services/alert.service';
import { MatSort } from '@angular/material/sort';
import { BscIndicatorService } from 'src/app/appBalanceScoreCard/services/bscIndicator.service';
import { BscPerspectiveService } from 'src/app/appBalanceScoreCard/services/bscPerspective.service';
import { BscStrategicObjetiveService } from 'src/app/appBalanceScoreCard/services/bscStrategicObjetive.service';
import { BscPerspectiveEntity } from 'src/app/appBalanceScoreCard/entities/bscPerspective.entity';
import { GenPersonEntity } from 'src/app/appGeneral/entities/genPerson.entity';
import { BscStrategicObjetiveEntity } from 'src/app/appBalanceScoreCard/entities/bscStrategicObjetive.entity';

@Component({
    selector: 'app-bscIndicatorList',
    templateUrl: './bscIndicatorList.component.html',
    styleUrls: ['./bscIndicatorList.component.css']
})
export class BscIndicatorListComponent implements OnInit {
    indicatorId: number;
    loading: boolean;
    columns: string[];
    dataSource = new MatTableDataSource<any>();
    @ViewChild(MatTable) table: MatTable<any>;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    genPersonEntity: GenPersonEntity;
    year: number;
    perspectiveId: number;
    strategicObjetiveId: number;
    yearList: number[];
    perspectiveList: BscPerspectiveEntity[];
    strategicObjetiveList: BscStrategicObjetiveEntity[];

    constructor(private bscPerspectiveS: BscPerspectiveService, private bscStrategicObjetiveS: BscStrategicObjetiveService, private bscIndicatorS: BscIndicatorService, private alertS: AlertService) {
        this.indicatorId = 0;
        this.loading = false;
        this.columns = ['id', 'name', 'direction', 'perspective', 'strategicObjetive'];
        this.dataSource = new MatTableDataSource([]);
        this.year = 0;
        this.perspectiveId = 0;
        this.strategicObjetiveId = 0;
        this.yearList = [];
        this.perspectiveList = [];
        this.strategicObjetiveList = [];
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
            if (res.message === 'OK') {
                this.strategicObjetiveList = res.object;
            } else {
                this.alertS.open(res.message, 'error');
            }
        }, err => {
            this.alertS.open(err.message, 'error');
        });
    }
    getIndicator() {
        this.bscIndicatorS.listActive(this.strategicObjetiveId).subscribe(res => {
            if (res.message === 'OK') {
                this.loading = true;
                if (res.message === 'OK') {
                    this.loading = false;
                    this.dataSource = new MatTableDataSource<any>(res.object);
                    this.dataSource.paginator = this.paginator;
                    this.dataSource.sort = this.sort;
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
    getMeasurement(indicatorId: number) {
        this.indicatorId = indicatorId;
    }
}