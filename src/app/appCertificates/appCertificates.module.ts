import { NgModule } from '@angular/core';
import { MaterialModule } from '../material.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AppCertificatesRoutingModule } from './appCertificatesRouting.module';
import { CertificatesPrincipalComponent } from './components/certPrincipal/certificates.component';
import { CertificateYearNewComponent } from './components/certYear/new/YearNew.component';
import { CertificateYearListComponent } from './components/certYear/list/certYearList.component';
import { CertificateYearEditComponent } from './components/certYear/edit/certYearEdit.component';
import { CertificatePeriodicityListComponent } from './components/certPeriodicity/list/certPerodicityList.component';
import { CertificatePeriodicityEditComponent } from './components/certPeriodicity/edit/certPeriodicityEdit.component';
import { CertificatePeriodicityNewComponent } from './components/certPeriodicity/new/certPeriodicityNew.component';
import { CertificateCertNewComponent } from './components/certCert/new/certCertNew.component';
import { CertificateCertListComponent } from './components/certCert/list/certCertList.component';
import { CertificateCertEditComponent } from './components/certCert/edit/certCertEdit.component';
import { CertPeriodicityModal } from './modals/periodicity/certCertPeriodicity.modal';
import { CertCertPersonModal } from './modals/person/certCertPerson.modal';
import { CertificateCertPersonListComponent } from './components/certPerson/list/certCertPersonList.component';
import { CertificateMonthsNewComponent } from './components/certMonths/new/CertMonths.component';
import { CertificateMonthListComponent } from './components/certMonths/list/certMonthList.component';
import { CertificateMonthEditComponent } from './components/certMonths/edit/certMonthEdit.component';
import { CertMonthModal } from './modals/month/certPeriodicityMonth.modal';
import { CertificateCertSearchComponent } from './components/certCert/search/certCertSearch.component';


@NgModule({
  declarations: [
    //Colocar Componenetes
    CertificatesPrincipalComponent,
    CertificateYearNewComponent,
    CertificateYearListComponent,
    CertificateYearEditComponent,
    CertificatePeriodicityNewComponent,
    CertificatePeriodicityListComponent,
    CertificatePeriodicityEditComponent,
    CertificateCertNewComponent,
    CertificateCertListComponent,
    CertificateCertEditComponent,
    CertPeriodicityModal,
    CertificateCertPersonListComponent,
    CertCertPersonModal,
    CertificateMonthsNewComponent,
    CertificateMonthListComponent,
    CertificateMonthEditComponent,
    CertMonthModal,
    CertificateCertSearchComponent

  ],
  imports: [
    CommonModule,
    AppCertificatesRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
    FormsModule,
  ],
})
export class AppCertificatesModule { }