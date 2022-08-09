import { MatTableDataSource, MatTable } from '@angular/material/table';
import { ViewChild, Component, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { AlertService } from 'src/app/shared/services/alert.service';
import { MatSort } from '@angular/material/sort';
import { GenPersonEntity } from 'src/app/appGeneral/entities/genPerson.entity';
import { ProPerspectiveEntity } from 'src/app/appProcess/entities/proPerspective.entity';
import { ProStrategicObjetiveEntity } from 'src/app/appProcess/entities/proStrategicObjetive.entity';
import { ProPerspectiveService } from 'src/app/appProcess/services/proPerspective.service';
import { ProStrategicObjetiveService } from 'src/app/appProcess/services/proStrategicObjetive.service';
import { ProIndicatorService } from 'src/app/appProcess/services/proIndicator.service';

@Component({
    selector: 'app-proIndicatorList',
    templateUrl: './proIndicatorList.component.html',
    styleUrls: ['./proIndicatorList.component.css']
})
export class ProIndicatorListComponent implements OnInit {
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
    perspectiveList: ProPerspectiveEntity[];
    strategicObjetiveList: ProStrategicObjetiveEntity[];

    constructor(private proPerspectiveS: ProPerspectiveService, private proStrategicObjetiveS: ProStrategicObjetiveService,
         private proIndicatorS: ProIndicatorService, private alertS: AlertService) {
        
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
        this.proPerspectiveS.listActive(this.year, this.genPersonEntity.id, Number(localStorage.getItem('countryId'))).subscribe(res => {
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
        this.proStrategicObjetiveS.listActive(this.perspectiveId).subscribe(res => {
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
        this.proIndicatorS.listActive(this.strategicObjetiveId).subscribe(res => {
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