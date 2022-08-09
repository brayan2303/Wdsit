
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from '../shared/services/authGuard.service';
import { CertificatesPrincipalComponent } from './components/certPrincipal/certificates.component';
import { CertificateYearNewComponent } from './components/certYear/new/YearNew.component';
import { CertificateYearListComponent } from './components/certYear/list/certYearList.component';
import { CertificatePeriodicityListComponent } from './components/certPeriodicity/list/certPerodicityList.component';
import { NgModule } from '@angular/core';
import { CertificatePeriodicityNewComponent } from './components/certPeriodicity/new/certPeriodicityNew.component';
import { CertificateCertNewComponent } from './components/certCert/new/certCertNew.component';
import { CertificateCertListComponent } from './components/certCert/list/certCertList.component';
import { CertificateCertPersonListComponent } from './components/certPerson/list/certCertPersonList.component';
import { CertificateMonthsNewComponent } from './components/certMonths/new/CertMonths.component';
import { CertificateMonthListComponent } from './components/certMonths/list/certMonthList.component';
import { CertificateCertSearchComponent } from './components/certCert/search/certCertSearch.component';


const routes: Routes = [
  {
    path: 'certs', component: CertificatesPrincipalComponent, canActivate: [AuthGuardService],
    children: [
      { path: 'year/new', component: CertificateYearNewComponent },
      { path: 'year/list', component: CertificateYearListComponent },
      { path: 'periodicity/new', component: CertificatePeriodicityNewComponent },
      { path: 'periodicity/list', component: CertificatePeriodicityListComponent },
      { path: 'cert/new', component: CertificateCertNewComponent },
      { path: 'cert/list', component: CertificateCertListComponent },
      { path: 'person/list', component: CertificateCertPersonListComponent },
      { path: 'month/new', component: CertificateMonthsNewComponent },
      { path: 'month/list', component: CertificateMonthListComponent },
      { path: 'cert/search', component: CertificateCertSearchComponent }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppCertificatesRoutingModule { }
