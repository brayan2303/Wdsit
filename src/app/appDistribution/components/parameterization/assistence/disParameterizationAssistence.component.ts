import { Component, OnInit, ViewChild } from "@angular/core";
import { AlertService } from 'src/app/shared/services/alert.service';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { DisMonthService } from 'src/app/appDistribution/services/disMonth.service';
import { DisMonthModel } from 'src/app/appDistribution/models/disMonth.model';
import { DisHeadCountEntity } from 'src/app/appDistribution/entities/disHeadCount.entity';
import { DisHeadCountService } from 'src/app/appDistribution/services/disHeadCount.service';
import { DisMonthDayService } from 'src/app/appDistribution/services/disMonthDay.service';
import { DisAssistenceService } from 'src/app/appDistribution/services/disAssistence.service';
import { DisAssistenceEntity } from 'src/app/appDistribution/entities/disAssistence.entity';
import { DisMonthDayModel } from 'src/app/appDistribution/models/disMonthDay.model';

@Component({
    selector: 'app-disParameterizationAssistence',
    templateUrl: './disParameterizationAssistence.component.html',
    styleUrls: ['./disParameterizationAssistence.component.css']
})
export class DisParameterizationAssistenceComponent implements OnInit {
    loading: boolean;
    columns: string[];
    dataSource = new MatTableDataSource<any>();
    @ViewChild(MatTable) table: MatTable<any>;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    disMonthModel: DisMonthModel;
    yearList: number[];
    monthList: DisMonthModel[];
    headCountList: DisHeadCountEntity[];
    monthDayList: DisMonthDayModel[];
    assistenceList: DisAssistenceEntity[];
    year: number;

    constructor(private disAssistenceS: DisAssistenceService, private disMonthS: DisMonthService, private disMonthDayS: DisMonthDayService, private disHeadCountS: DisHeadCountService, public dialog: MatDialog, private alertS: AlertService) {
        this.loading = false;
        this.columns = [];
        this.dataSource = new MatTableDataSource([]);
        this.disMonthModel = new DisMonthModel();
        this.yearList = [];
        this.monthList = [];
        this.headCountList = [];
        this.assistenceList = [];
        this.year = 0;
    }
    ngOnInit(): void {
        for (let i = 2000; i < 2051; i++) {
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
    search() {
        this.disMonthS.listAll(this.year).subscribe(res => {
            if (res.message === 'OK') {
                this.monthList = res.object;
            } else {
                this.alertS.open(res.message, 'error');
            }
        }, err => {
            this.alertS.open(err.message, 'error');
        });
    }
    selectMonth(item: DisMonthModel) {
        this.disMonthModel = item;
        this.columns=[];
        this.columns.push('identification');
        this.columns.push('name');
        this.disHeadCountS.findByYearMonth(this.year, item.monthId).subscribe(resF => {
            if (resF.message === 'OK') {
                this.headCountList = resF.object;
                this.disAssistenceS.list(this.disMonthModel.id).subscribe(resL => {
                    if (resL.message === 'OK') {
                        this.assistenceList = resL.object;
                        this.disMonthDayS.list(this.disMonthModel.id,this.year,this.disMonthModel.monthId).subscribe(resD => {
                            let find: boolean;
                            if (resD.message === 'OK') {
                                this.monthDayList = resD.object;
                                /*for (let i = 1; i < (this.disMonthModel.days + 1); i++) {
                                    find = false;
                                    this.monthDayList.find((x) => {
                                        if (i === x) {
                                            find = true;
                                        }
                                    });
                                    if (!find) {
                                        this.columns.push('D '+String(i));
                                    }
                                }*/
                                for(let i=0;i<this.monthDayList.length;i++){
                                    if(this.monthDayList[i].active){
                                        this.columns.push('D '+String(this.monthDayList[i].day));
                                    }
                                }
                                var isDay:boolean=false;
                                var listDay: any[] = [];
                                var list: any[] = [];
                                for (let i = 0; i < this.headCountList.length; i++) {
                                    for (let j = 2; j < this.columns.length; j++) {
                                        for (let f = 0; f < this.assistenceList.length; f++) {
                                            if (this.headCountList[i].id === this.assistenceList[f].headCountId && Number(this.columns[j].split(' ',2)[1]) === this.assistenceList[f].day) {
                                                isDay=true;
                                            }
                                        }
                                        if(isDay){
                                            listDay.push({ 'day': this.columns[j], 'value': '1' });
                                        }else{
                                            listDay.push({ 'day': this.columns[j], 'value': '0' });
                                        }
                                        isDay=false;
                                    }
                                    var json: {}={};
                                    json['identification']=this.headCountList[i].identification;
                                    json['name'] = this.headCountList[i].name;
                                    json['headCountId'] = this.headCountList[i].id;
                                    for (let k = 0; k < listDay.length; k++) {
                                        json[String(listDay[k].day)] = String(listDay[k].value);
                                    }
                                    list.push(json);
                                }
                                this.dataSource=new MatTableDataSource(list);
                            } else {
                                this.alertS.open(resD.message, 'error');
                            }
                        }, err => {
                            this.alertS.open(err.message, 'error');
                        });
                    } else {
                        this.alertS.open(resL.message, 'error');
                    }
                }, err => {
                    this.alertS.open(err.message, 'error');
                });
            } else {
                this.alertS.open(resF.message, 'error');
            }
        }, err => {
            this.alertS.open(err.message, 'error');
        });
    }
    addRemove(headCountId:number,day:string,value:string){
        if(value==='0'){
            this.disAssistenceS.create(this.disMonthModel.id,headCountId,Number(day.split(' ',2)[1])).subscribe(resC=>{
                if(resC.message==='OK'){
                    if(resC.object!=0){
                        this.alertS.open('Asistencia creada!','success');
                        this.selectMonth(this.disMonthModel);
                    }else{
                        this.alertS.open('Error al crear la asistencia!','error');
                    }
                }else{
                    this.alertS.open(resC.message,'error');
                }
            },err=>{
                this.alertS.open(err.message,'error');
            });
        }else{
            this.disAssistenceS.delete(this.disMonthModel.id,headCountId,Number(day.split(' ',2)[1])).subscribe(resD=>{
                if(resD.message==='OK'){
                    if(resD.object!=0){
                        this.alertS.open('Asistencia eliminada!','success');
                        this.selectMonth(this.disMonthModel);
                    }else{
                        this.alertS.open('Error al eliminar la asistencia!','error');
                    }
                }else{
                    this.alertS.open(resD.message,'error');
                }
            },err=>{
                this.alertS.open(err.message,'error');
            });
        }
    }
}