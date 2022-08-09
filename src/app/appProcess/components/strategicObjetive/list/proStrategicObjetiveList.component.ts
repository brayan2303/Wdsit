import { MatTableDataSource, MatTable } from '@angular/material/table';
import { ViewChild, Component, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { AlertService } from 'src/app/shared/services/alert.service';
import { MatSort } from '@angular/material/sort';
import { GenPersonEntity } from 'src/app/appGeneral/entities/genPerson.entity';
import { ChartService } from 'src/app/shared/chart/services/chart.service';
import { ProPerspectiveEntity } from 'src/app/appProcess/entities/proPerspective.entity';
import { ProPerspectiveService } from 'src/app/appProcess/services/proPerspective.service';
import { ProStrategicObjetiveService } from 'src/app/appProcess/services/proStrategicObjetive.service';

@Component({
    selector: 'app-proStrategicObjetiveList',
    templateUrl: './proStrategicObjetiveList.component.html',
    styleUrls: ['./proStrategicObjetiveList.component.css']
})
export class ProStrategicObjetiveListComponent implements OnInit {
    loading: boolean;
    columns: string[];
    dataSource = new MatTableDataSource<any>();
    @ViewChild(MatTable) table: MatTable<any>;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    perspectiveId: number;
    genPersonEntity: GenPersonEntity;
    perspectiveList: ProPerspectiveEntity[];
    year: number;
    yearList: number[];

    constructor(private proPerspectiveS: ProPerspectiveService, private proStrategicObjetiveS: ProStrategicObjetiveService,
         private chartS: ChartService, private alertS: AlertService) {
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