import { Component, OnInit } from '@angular/core';
import { FileService } from '../../services/file.service';
import { GenCustomerService } from '../../../appGeneral/services/genCustomer.service';
import { GenCustomerEntity } from 'src/app/appGeneral/entities/genCustomer.entity';
import { AlertService } from 'src/app/shared/services/alert.service';

@Component({
    selector: 'app-firstAlert',
    templateUrl: './firstAlert.component.html',
    styleUrls: ['./firstAlert.component.css']
})
export class FirstAlertComponent implements OnInit {
    public listCustomers: GenCustomerEntity[];
    public loading: boolean;
    public fileToUpload: File = null;
    public customer: Number;
    constructor(
        private _fileService: FileService,
        private _customerService: GenCustomerService,
        private _alertService: AlertService,
    ) {
        this.customer = 0;
    }
    ngOnInit() {
        this.getCustomers();
    }
    getCustomers() {
        this._customerService.findAll().subscribe(
            response => {
                if (response.message === 'OK') {
                    this.listCustomers = response.object;
                } else {
                    this._alertService.open(response.message, 'error');
                }
            },
            error => {
                this._alertService.open(error.message, 'error');
            }
        );
    }
    loadfileIq(files: FileList) {
        this.loading = true;
        this.fileToUpload = files.item(0);
        this._fileService.loadFileIQ09(this.fileToUpload, this.customer).subscribe(
            response => {
                this.loading = false;
                console.log(response.object);
                if (response.statusCode === '200 OK') {
                    this._alertService.open(response.statusCode, 'success');
                    location.reload();
                } else {
                    this._alertService.open(response.statusCode, 'error');
                }
            },
            error => {
                this._alertService.open(error.statusCode, 'error');
                console.log(<any>error);
            }
        );
    }
}