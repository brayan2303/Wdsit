import { MatTableDataSource, MatTable } from '@angular/material/table';
import { ViewChild, Component, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { AlertService } from 'src/app/shared/services/alert.service';
import { MatSort } from '@angular/material/sort';
import { GenPersonEntity } from 'src/app/appGeneral/entities/genPerson.entity';
import { ChartService } from 'src/app/shared/chart/services/chart.service';
import { ProPerspectivePersonService } from 'src/app/appProcess/services/proPerspectivePerson.service';

@Component({
    selector: 'app-proPerspectiveList',
    templateUrl: './proPerspectiveList.component.html',
    styleUrls: ['./proPerspectiveList.component.css']
})
export class ProPerspectiveListComponent implements OnInit {
    year:number;
    loading: boolean;
    columns: string[];
    dataSource = new MatTableDataSource<any>();
    @ViewChild(MatTable) table: MatTable<any>;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    genPersonEntity: GenPersonEntity;
    yearList: number[];

    constructor(private proPerspectivePersonS: ProPerspectivePersonService, private chartS: ChartService, private alertS: AlertService) {
        this.year=0;
        this.loading = false;
        this.columns = ['code', 'name', 'objetive', 'country', 'leader'];
        this.dataSource = new MatTableDataSource([]);
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
    getPerspective(){
        this.loading = true;
        this.proPerspectivePersonS.listActive(this.year,this.genPersonEntity.id, Number(localStorage.getItem('countryId'))).subscribe(res => {
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