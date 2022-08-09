import { Component, OnInit } from "@angular/core";
import { AlertService } from 'src/app/shared/services/alert.service';
import { ActiveFixedInventory } from "../../../models/ActiveFixedInventoty.model";
import { ActiveFixedInventoryService } from "../../../services/ActiveFixedInventoty.service";


@Component({
    selector: 'app-activeFixedInventory',
    templateUrl: './activeFixedInventory.component.html',
    styleUrls: ['./activeFixedInventory.component.css']
})
export class ActiveFixedInventoryComponent implements OnInit {
    loading1: boolean;
    loading2: boolean;
    loading3: boolean;
    loading4: boolean;
    loading5: boolean;
    loading6: boolean;
    loading7: boolean;
    loading8: boolean;
    loading9: boolean;
    loading10: boolean;
    
    columns1: string[];
    columns2: string[];
    columns3: string[];
    noAudited: number;
    activeEntity: ActiveFixedInventory;
    total:number;
    totalexits:number;
    totalcompanys: number;
    totalAnswer: number;
    totalreject: number;
    totalflow: number;
    totalays: number;
    totalalqui: number;
    totalrenta: number;
    totalwoden: number;
  

    constructor(private activeFixedInventoryS: ActiveFixedInventoryService, private alertS: AlertService) {
        this.loading1 = false;
        this.loading2 = false;
        this.loading3 = false; 
        this.loading4 = false;
        this.loading5 = false;  
        this.loading6 = false;
        this.loading7 = false;
        this.loading8 = false;
        this.loading9 = false;
        this.loading10 = false;

      
    }
    ngOnInit(): void {
        this.loading1 = true,
        this.loading2 = true,
        this.loading3 = true
        this.loading4 = true,
        this.loading5 = true,
        this.loading6 = true,
        this.loading7 = true,
        this.loading8 = true,
        this.loading9 = true,
        this.loading10 = true,
        this.search();
        this.totalcompany();
        this.totalexit();
        this.totalAnswerAproved();
        this.totalAnswerRejected();
        this.totalFlow();
        this.totalAys();
        this.totalAlqui();
        this.totalRenta();
        this.totalWoden();
    }

    search(){
        this.loading1 = true;
        this.activeFixedInventoryS.listEntryTotal().subscribe(res => {
            if (res.message === 'OK') {
                this.total = res.object;
                this.loading1 = false;
            } else {
                this.alertS.open(res.message, 'error');
            }
        }, err => {
            this.alertS.open(err.message, 'error');
        });
    }
    totalexit(){
        this.loading2 = true;
        this.activeFixedInventoryS.listEntryExit().subscribe(res => {
            if (res.message === 'OK') {
                this.totalexits = res.object;
                this.loading2 = false;
            } else {
                this.alertS.open(res.message, 'error');
            }
        }, err => {
            this.alertS.open(err.message, 'error');
        });
    }
    totalcompany(){
        this.loading3 = true;
        this.activeFixedInventoryS.listEntry().subscribe(res => {
            if (res.message === 'OK') {
                this.totalcompanys = res.object;
                this.loading3 = false;
            } else {
                this.alertS.open(res.message, 'error');
            }
        }, err => {
            this.alertS.open(err.message, 'error');
        });
    }
    totalAnswerAproved(){
        this.loading4 = true;
        this.activeFixedInventoryS.listAnswerAproved().subscribe(res => {
            if (res.message === 'OK') {
                this.totalAnswer = res.object;
                this.loading4 = false;
            } else {
                this.alertS.open(res.message, 'error');
            }
        }, err => {
            this.alertS.open(err.message, 'error');
        });
    }
    totalAnswerRejected(){
        this.loading5 = true;
        this.activeFixedInventoryS.listAnswerRejected().subscribe(res => {
            if (res.message === 'OK') {
                this.totalreject = res.object;
                this.loading5 = false;
            } else {
                this.alertS.open(res.message, 'error');
            }
        }, err => {
            this.alertS.open(err.message, 'error');
        });
    }
    totalFlow(){
        this.loading6 = true;
        this.activeFixedInventoryS.listFlow().subscribe(res => {
            if (res.message === 'OK') {
                this.totalflow = res.object;
                this.loading6 = false;
            } else {
                this.alertS.open(res.message, 'error');
            }
        }, err => {
            this.alertS.open(err.message, 'error');
        });
    }
    totalAys(){
        this.loading7 = true;
        this.activeFixedInventoryS.countAys().subscribe(res => {
            if (res.message === 'OK') {
                this.totalays = res.object;
                this.loading6 = false;
            } else {
                this.alertS.open(res.message, 'error');
            }
        }, err => {
            this.alertS.open(err.message, 'error');
        });
    } totalAlqui(){
        this.loading8 = true;
        this.activeFixedInventoryS.countAlqui().subscribe(res => {
            if (res.message === 'OK') {
                this.totalalqui = res.object;
                this.loading6 = false;
            } else {
                this.alertS.open(res.message, 'error');
            }
        }, err => {
            this.alertS.open(err.message, 'error');
        });
    } totalRenta(){
        this.loading9 = true;
        this.activeFixedInventoryS.countRenta().subscribe(res => {
            if (res.message === 'OK') {
                this.totalrenta = res.object;
                this.loading6 = false;
            } else {
                this.alertS.open(res.message, 'error');
            }
        }, err => {
            this.alertS.open(err.message, 'error');
        });
    } totalWoden(){
        this.loading10 = true;
        this.activeFixedInventoryS.countWoden().subscribe(res => {
            if (res.message === 'OK') {
                this.totalwoden = res.object;
                this.loading6 = false;
            } else {
                this.alertS.open(res.message, 'error');
            }
        }, err => {
            this.alertS.open(err.message, 'error');
        });
    }
    

    
}
