import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { AlertService } from 'src/app/shared/services/alert.service';
import { GenPlantCountryService } from "../../services/genPlantCountry.service";

@Component({
    selector: 'modal-plantCountry',
    templateUrl: 'plantCountry.modal.html',
    styleUrls: ['./plantCountry.modal.css']
})
export class PlantCountryModal {
    columns: string[];
    dataSource: MatTableDataSource<any>;

    constructor(private GenPlantCountryS: GenPlantCountryService, private alertS: AlertService,
        public dialogRef: MatDialogRef<PlantCountryModal>,
        @Inject(MAT_DIALOG_DATA) public data: any) {
        dialogRef.disableClose = true;
        this.columns = ['description', 'asignar'];
        this.dataSource = new MatTableDataSource([]);
    }
    ngOnInit(): void {
        this.GenPlantCountryS.findAll(this.data.plantId).subscribe(res => {
            this.dataSource = res.object;
        }, err => {
            this.alertS.open(err.message, 'error');
        });
    }
    close(): void {
        this.dialogRef.close();
    }
    checked(input: HTMLInputElement, countryId: number, active: boolean) {
        console.log(active)
        if (input.checked) {
            if(!active){
            this.GenPlantCountryS.create(this.data.plantId, countryId).subscribe(res => {
                this.GenPlantCountryS.findAll(this.data.plantId).subscribe(res => {
                    this.dataSource = new MatTableDataSource(res.object);
                }, err => {
                    this.alertS.open(err.message, 'error');
                });
            }, err => {
                this.alertS.open(err.message, 'error');
            });
        }
        } else {
            if (active) {
                this.GenPlantCountryS.delete(this.data.plantId, countryId).subscribe(res => {
                    this.GenPlantCountryS.findAll(this.data.plantId).subscribe(res => {
                        this.dataSource = new MatTableDataSource(res.object);
                    }, err => {
                        this.alertS.open(err.message, 'error');
                    });
                }, err => {
                    this.alertS.open(err.message, 'error');
                });
            } else {
                this.GenPlantCountryS.delete(this.data.plantId, countryId).subscribe(res => {
                    this.GenPlantCountryS.findAll(this.data.plantId).subscribe(res => {
                        this.dataSource = new MatTableDataSource(res.object);
                    }, err => {
                        this.alertS.open(err.message, 'error');
                    });
                }, err => {
                    this.alertS.open(err.message, 'error');
                });
            }
        }
    }
}