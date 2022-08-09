import { Component, OnInit } from "@angular/core";
import { AlertService } from 'src/app/shared/services/alert.service';
import { ActivatedRoute, Params } from '@angular/router';
import { ConControlPanelEntity } from '../../entities/conControlPanel.entity';
import { ConControlPanelService } from '../../services/conControlPanel.service';
import { ConLogService } from '../../services/conLog.service';
import { GenPersonEntity } from 'src/app/appGeneral/entities/genPerson.entity';

@Component({
    selector: 'app-conControlPanel',
    templateUrl: './conControlPanel.component.html',
    styleUrls: ['./conControlPanel.component.css']
})
export class ConControlPanelComponent implements OnInit {
    loading: boolean;
    genPersonEntity: GenPersonEntity;
    conControlPanelEntity: ConControlPanelEntity;

    constructor(private params: ActivatedRoute, private conControlPanelS: ConControlPanelService, private conLogS: ConLogService, private alertS: AlertService) {
        this.conControlPanelEntity = new ConControlPanelEntity();
    }
    ngOnInit() {
        this.genPersonEntity = (JSON.parse(localStorage.getItem('user')));
        this.params.paramMap.subscribe((p: Params) => {
            this.conControlPanelEntity = new ConControlPanelEntity();
            this.conControlPanelS.findById(p.get('controlPanelId')).subscribe(res => {
                if (res.message === 'OK') {
                    this.conControlPanelEntity = res.object;
                    this.conLogS.create(this.conControlPanelEntity.id, this.genPersonEntity.id).subscribe(res => {
                        if (res.object === 0 || res.message != 'OK') {
                            this.alertS.open(res.message, 'error');
                        }
                    }, err => {
                        this.alertS.open(err.message, 'error');
                    });
                } else {
                    this.alertS.open(res.message, 'error');
                }
            }, err => {
                this.alertS.open(err.message, 'error');
            });
        });
    }
}