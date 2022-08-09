import { Component, OnInit, ElementRef, ViewChild, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/shared/services/alert.service';
import { GenPersonEntity } from 'src/app/appGeneral/entities/genPerson.entity';
import { GenSectionEntity } from 'src/app/appGeneral/entities/genSection.entity';
import { GenSectionService } from 'src/app/appGeneral/services/genSection.service';
import { GenModuleService } from 'src/app/appGeneral/services/genModule.service';
import { GenModuleEntity } from 'src/app/appGeneral/entities/genModule.entity';
import { GenPersonService } from 'src/app/appGeneral/services/genPerson.service';
import { GenApplicationService } from 'src/app/appGeneral/services/genApplication.service';
import { GenApplicationEntity } from 'src/app/appGeneral/entities/genApplication.entity';
import { GenProfileEntity } from 'src/app/appGeneral/entities/genProfile.entity';
import { GenApplicationPersonProfileService } from 'src/app/appGeneral/services/genApplicationPersonProfile.service';
import { MatDialog } from '@angular/material/dialog';
import { UpdatePasswordComponent } from 'src/app/shared/components/updatePassword/updatePassword.component';


@Component({
  selector: 'app-proPrincipal',
  templateUrl: './proPrincipal.component.html',
  styleUrls: ['./proPrincipal.component.css']
})
export class ProPrincipalComponent implements OnInit {
  isOpen: boolean;
  isAdmin: boolean;
  open: string = '';
  height: string;
  photo: string;
  @ViewChild('sidenavContent') scroll: ElementRef;
  genPersonEntity: GenPersonEntity;
  genProfileEntity: GenProfileEntity;
  applicationList: GenApplicationEntity[];
  sectionList: GenSectionEntity[];
  moduleList: GenModuleEntity[];

  constructor(private render: Renderer2, private route: Router, private genPersonS: GenPersonService, private genApplicationS: GenApplicationService, private genApplicationPersonProfileS: GenApplicationPersonProfileService, private genSectionS: GenSectionService, private genModuleS: GenModuleService, private alertS: AlertService,private dialog:MatDialog) {
    this.isOpen = true;
    this.photo = "./assets/images/Photo_2.png";
    this.sectionList = [];
    this.moduleList = [];
  }

  ngOnInit(): void {
    window.document.title = 'GESTION DE PROCESOS';
    window.addEventListener('storage', function (e) {
      if (e.key === 'user' && e.newValue === null) {
        window.location.href = "";
      } else if (e.key === 'token' && e.newValue === null) {
        window.location.href = "";
      }
    });
    this.genPersonEntity = JSON.parse(localStorage.getItem('user'));
    this.findImage();
    this.genApplicationPersonProfileS.listProfile(this.genPersonEntity.id, 'GESTION DE PROCESOS').subscribe(res => {
      if (res.message === 'OK') {
        this.genProfileEntity = res.object;
        if (this.genProfileEntity != null) {
          this.genSectionS.findByProfileId(this.genProfileEntity.id).subscribe(res => {
            if (res.message === 'OK') {
              this.sectionList = res.object;
            } else {
              this.alertS.open(res.message, 'error');
            }
          }, err => {
            this.alertS.open(err.message, 'error');
          });
          this.genModuleS.findByProfileId(this.genProfileEntity.id, 'GESTION DE PROCESOS').subscribe(res => {
            if (res.message === 'OK') {
              this.moduleList = res.object;
            } else {
              this.alertS.open(res.message, 'error');
            }
          }, err => {
            this.alertS.open(err.message, 'error');
          });
        }
      } else {
        this.alertS.open(res.message, 'error');
      }
    }, err => {
      this.alertS.open(err.message, 'error');
    });
    this.genApplicationS.findByPersonId(this.genPersonEntity.id).subscribe(res => {
      if (res.message === 'OK') {
        this.applicationList = res.object;
      } else {
        this.alertS.open(res.message, 'error');
      }
    }, err => {
      this.alertS.open(err.message, 'error');
    });
  }
  goWoden() {
    window.location.href = 'https://www.woden.com.co/';
  }
  onToogle() {
    this.isOpen = !this.isOpen;
  }
  enableScroll() {
    this.render.setStyle(this.scroll.nativeElement, 'overflow-y', 'auto');
  }
  disableScroll() {
    setTimeout(() => {
      this.render.setStyle(this.scroll.nativeElement, 'overflow-y', 'hidden');
    }, 500);
  }
  onClick(value) {
    this.height = (document.getElementById('module_' + value).children.length * 40) + 'px';
    if (this.open === '' || this.open != value) {
      this.open = value;
    } else if (this.open === value) {
      this.open = '';
    }
  }
  loadImage(image: FileList) {
    this.genPersonS.loadImage(this.genPersonEntity.id, image[0]).subscribe(res => {
      if (res.message === 'OK') {
        this.findImage();
      } else {
        this.alertS.open(res.message, 'error');
      }
    }, err => {
      this.alertS.open(err.message, 'error');
    });
  }
  findImage() {
    this.genPersonS.findImage(this.genPersonEntity.id).subscribe(res => {
      if (res.message === "OK") {
        if (res.object != null) {
          this.photo = "data:image/png;base64," + res.object;
        }
      } else {
        this.alertS.open(res.message, 'error');
      }
    }, err => {
      this.alertS.open(err.message, 'error');
    });
  }
  logout() {
    this.genPersonS.logOut().subscribe(res => {
      if (res.message== "OK") {
        this.alertS.open('Salida Exitosa', 'success');
      } else {
        this.alertS.open('Error al cerrar sesión', 'error');
      }
    }, err => {
      this.alertS.open(err.message, 'error');
    });
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('customerId');
    localStorage.removeItem('tokenSap');
    localStorage.removeItem('countryId');
    localStorage.removeItem('proyect');
    this.route.navigate(['']);
  }
  updatePassword(){
    this.dialog.open(UpdatePasswordComponent,{
      data:{id:this.genPersonEntity.id}
    });
  }
  ngOnDestroy(): void {
    clearTimeout();
  }
}
