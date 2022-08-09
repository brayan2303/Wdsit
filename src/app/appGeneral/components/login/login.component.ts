import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { GenPersonService } from '../../services/genPerson.service';
import { Router } from '@angular/router';
import { GenLogService } from '../../services/genLog.service';
import { GenCountryEntity } from '../../entities/genCountry.entity';
import { GenPersonCountryService } from '../../services/genPersonCountry.service';
import { GenCountryService } from '../../services/genCountry.service';
import { AlertService } from 'src/app/shared/services/alert.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  hide = true;
  loading: boolean;
  loginForm = new FormGroup({
    userName: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    countryId: new FormControl('', Validators.required)
  });
  countryList: GenCountryEntity[];
  personCountryList: GenCountryEntity[];

  constructor(private genPersonS: GenPersonService, private genLogS: GenLogService, private genCountryS: GenCountryService, private genPersonCountryS: GenPersonCountryService, private route: Router, private alertS: AlertService) {
    this.countryList = [];
    this.personCountryList = [];
  }

  ngOnInit(): void {
      this.genCountryS.listActive().subscribe(res => {
        if (res.message === 'OK') {
          this.countryList = res.object;
        } else {
          this.alertS.open(res.message, 'error');
        }
      }, err => {
        this.alertS.open(err.message, 'error');
      });
  }
  login() {
    this.loading = true;
    if (this.loginForm.valid) {
      this.genPersonS.login(this.loginForm.value.userName, this.loginForm.value.password, this.loginForm.value.countryId).subscribe(resL => {
        if (resL.message == 'OK') {
          localStorage.clear();
          sessionStorage.clear();
          localStorage.setItem('token', resL.token);
            localStorage.setItem('user', JSON.stringify(resL.object));
            localStorage.setItem('countryId', this.loginForm.controls.countryId.value);
            this.loading = false;
            this.genLogS.create(resL.object['id']).subscribe(resC => {
              if (resC.message != 'OK') {
                this.alertS.open(resC.message, 'error');
                this.loading = false;
              }
            }, err => {
              this.alertS.open(err.message, 'error');
              this.loading = false;
            });
            this.alertS.open('Inicio de sesión exitoso', 'success');
            this.route.navigate(['principal']);
        } else {
          this.alertS.open(resL.message, 'error');
          this.loading = false;
        }
      },
        err => {
          this.alertS.open(err.message, 'error');
          this.loading = false;
        }
      )
    }
  }
}
