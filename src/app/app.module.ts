
import { AppCovidModule } from './appCovid/appCovid.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppGeneralModule } from './appGeneral/appGeneral.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AppIncomeControlModule } from './appIncomeControl/appIncomeControl.module';
import { AppRoutingModule } from './app-routing.module';
import { AppReportModule } from './appReport/appReport.module';
import { AppPrintModule } from './appPrint/appPrint.module';
import { AlertComponent } from './shared/components/alert/alert.component';
import { MaterialModule } from './material.module';
import { ConfirmationComponent } from './shared/components/confirmation/confirmation.component';
import { AppLoadModule } from './appLoad/appLoad.module';
import { AppControlPanelModule } from './appControlPanel/appControlPanel.module';
import { AppTaskModule } from './appTask/appTask.module';
import { AppPqrsModule } from './appPqrs/appPqrs.module';
import { AppTracingModule } from './appTracing/appTracing.module';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
import { MomentDateModule, MomentDateAdapter } from '@angular/material-moment-adapter';
import { AppInventoryModule } from './appInventory/appInventory.module';
import { AppProjectModule } from './appProject/appProject.module';
import { AppWlsModule } from './appWls/appWls.module';
import { AppSchedulingModule } from './appScheduling/appScheduling.module';
import { AppBalanceScoreCardModule } from './appBalanceScoreCard/appBalanceScoreCard.module';
import { ChartsModule } from 'ng2-charts';
import { AppDistributionModule } from './appDistribution/appDistribution.module';
import { InterceptorService } from './shared/services/interceptor.service';
import { AppFileModule } from './appFile/appFile.module';
import { InformationComponent } from './shared/components/information/information.component';
import { AppDailyOperationModule } from './appDailyOperation/appDailyOperation.module';
import { ErrorPageComponent } from './shared/components/errorPage/errorPage.component';
import { ToastrModule } from 'ngx-toastr';
import { UpdatePasswordComponent } from './shared/components/updatePassword/updatePassword.component';
import { AppMassiveMailModule } from './appMassiveMail/appMassiveMail.module';
import { AppCovidSegModule } from './appTracingDay/appCovid.module';
import { AppActiveFixedModule } from './appActiveFixed/appActiveFixed.module';
import { AppMeetingModule } from './appMeeting/appMeeting.module';
import { AppLoadClientdModule } from './appLoadClient/appLoadClient.module';
import { AppDownloadFilesModule } from './appDownloadFiles/appDownloadFiles.module';
import { AppCertificatesModule } from './appCertificates/appCertificates.module';
import { AppProcessModule } from './appProcess/appProcess.module';
import { AppPdfModule } from './appPdf/appCovid.module';
import { AppComCommodityEntryModule } from './appComodityEntry/appComodityEntry.module';
import { AppDryIceModule } from './appDryIce/appDryIce.module';
import { AppRepWolkBoxModule } from './appRepWolkbox/appRepWolkbox.module';
import { AppReportCovidModule } from './appReportCovid/appCovidReport.module';
import { AppScrapModule } from './appScrap/appScrap.module';
import { AppDocumentsModule } from './appDocuments/appDocuments.module';
import { AppDashBoardClientModule} from './appDashboard/appDashboardClient.module';
import { AppMapModule } from './appMap/appMap.module';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { AppLoadValidateReportModule } from './appLoadValidateReport/appLoadValidateReport.module';
import { InformationInvComponent } from './shared/components/informationInv/informationInv.component';
import { AppReceptionRoutingModule } from './appReception/appReceptionRouting.module';
import { AppReceptionModule } from './appReception/appReception.module';


export const DateFormat = {
  parse: {
    dateInput: 'input',
  },
  display: {
    dateInput: 'YYYY-MM-DD',
    monthYearLabel: 'MMMM YYYY',
    dateA11yLabel: 'YYYY-MM-DD',
    monthYearA11yLabel: 'MMMM YYYY',
  }
};
@NgModule({
  declarations: [
    AppComponent,
    AlertComponent,
    ConfirmationComponent,
    InformationComponent,
    ErrorPageComponent,
    UpdatePasswordComponent,
    InformationInvComponent,
  ],
  imports: [
    ChartsModule,
    MaterialModule,
    AppGeneralModule,
    AppIncomeControlModule,
    AppInventoryModule,
    AppControlPanelModule,
    AppReportModule,
    AppPrintModule,
    AppProjectModule,
    AppLoadModule,
    AppPqrsModule,
    AppTaskModule,
    AppTracingModule,
    AppWlsModule,
    AppSchedulingModule,
    AppBalanceScoreCardModule,
    AppDistributionModule,
    AppDailyOperationModule,
    AppFileModule,
    AppMassiveMailModule,
    AppMeetingModule,
    AppCovidModule,
    AppReportCovidModule,
    AppCovidSegModule,
    AppActiveFixedModule,
    AppLoadClientdModule,
    AppDownloadFilesModule,
    AppCertificatesModule,
    AppProcessModule,
    AppComCommodityEntryModule,
    AppDryIceModule,
    AppPdfModule,
    AppRepWolkBoxModule,
    AppScrapModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule,
    MomentDateModule,
    AppDocumentsModule,
    AppDashBoardClientModule,
    AppMapModule,
    AppLoadValidateReportModule,
    AppReceptionModule,
    LeafletModule,
    ToastrModule.forRoot({
      timeOut: 6000,
      positionClass: 'toast-top-center',
      preventDuplicates: true,
    })
  ],
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: DateFormat },
    { provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
