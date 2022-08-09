import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { GenPersonEntity } from 'src/app/appGeneral/entities/genPerson.entity';
import { GenSectionEntity } from 'src/app/appGeneral/entities/genSection.entity';
import { GenModuleEntity } from 'src/app/appGeneral/entities/genModule.entity';
import { GenSectionService } from 'src/app/appGeneral/services/genSection.service';
import { GenModuleService } from 'src/app/appGeneral/services/genModule.service';
import { AlertService } from 'src/app/shared/services/alert.service';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { GenPersonService } from 'src/app/appGeneral/services/genPerson.service';
import { MatPaginator } from '@angular/material/paginator';
import { UtilService } from '../../services/util.service';
import { GenApplicationEntity } from 'src/app/appGeneral/entities/genApplication.entity';
import { GenApplicationService } from 'src/app/appGeneral/services/genApplication.service';
import { MatSort } from '@angular/material/sort';
import { GenProfileEntity } from 'src/app/appGeneral/entities/genProfile.entity';
import { GenApplicationPersonProfileService } from 'src/app/appGeneral/services/genApplicationPersonProfile.service';
import { MatDialog } from '@angular/material/dialog';
import { UpdatePasswordComponent } from 'src/app/shared/components/updatePassword/updatePassword.component';

@Component({
  selector: 'app-loadPrincipal',
  templateUrl: './loadPrincipal.component.html',
  styleUrls: ['./loadPrincipal.component.css']
})

export class LoadPrinciplaComponent implements OnInit {
  isOpen: boolean = true;
  open: string = '';
  height: string;
  photo: string;
  @ViewChild('sidenavContent') scroll: ElementRef;
  genPersonEntity: GenPersonEntity;
  genProfileEntity: GenProfileEntity;
  applicationList: GenApplicationEntity[];
  sectionList: GenSectionEntity[];
  moduleList: GenModuleEntity[];
  public columns: Array<any>;
  public displayedColumns: String[];
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatTable) table: MatTable<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(private router: Router,
    private render: Renderer2,
    private genApplicationS: GenApplicationService,
    private genApplicationPersonProfileS: GenApplicationPersonProfileService,
    private genPersonS: GenPersonService,
    private genSectionS: GenSectionService,
    private genModuleS: GenModuleService,
    private alertS: AlertService,
    private _tableService: UtilService,
    private dialog:MatDialog
  ) {
    this.isOpen = true;
    this.photo = "./assets/images/Photo_1.png";
    this.columns = [
      { field: 'clienteId', header: 'ID Cliente' },
      { field: 'serial', header: 'Serial' },
      { field: 'flagNovedad', header: 'Novedad' },
      { field: 'flagEstado', header: 'Estado' },
      { field: 'flagGarantia', header: 'Garantia' },
      { field: 'resultado', header: 'Resultado' },
    ];
    this.displayedColumns = this.columns.map(column => column.field);
    this.dataSource = new MatTableDataSource([]);
  }

  ngOnInit() {
    window.document.title = 'Cargues';
    window.addEventListener('storage', function (e) {
      if (e.key === 'user' && e.newValue === null) {
        window.location.href = "";
      } else if (e.key === 'token' && e.newValue === null) {
        window.location.href = "";
      }
    });
    this.genPersonEntity = (JSON.parse(localStorage.getItem('user')));
    this.findImage();
    this.genApplicationPersonProfileS.listProfile(this.genPersonEntity.id, 'CARGUES').subscribe(res => {
      if (res.message === 'OK') {
        this.genProfileEntity = res.object;
        this.genSectionS.findByProfileId(this.genProfileEntity.id).subscribe(res => {
          if (res.message === 'OK') {
            this.sectionList = res.object;
          } else {
            this.alertS.open(res.message, 'error');
          }
        }, err => {
          this.alertS.open(err.message, 'error');
        });
        this.genModuleS.findByProfileId(this.genProfileEntity.id, 'CARGUES').subscribe(res => {
          if (res.message === 'OK') {
            this.moduleList = res.object;
          } else {
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
    this.genApplicationS.findByPersonId(this.genPersonEntity.id).subscribe(res => {
      if (res.message === 'OK') {
        this.applicationList = res.object;
      } else {
        this.alertS.open(res.message, 'error');
      }
    }, err => {
      this.alertS.open(err.message, 'error');
    });
    this.getInterpretData();
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
    this.router.navigate(['']);
  }
  updatePassword(){
    this.dialog.open(UpdatePasswordComponent,{
      data:{id:this.genPersonEntity.id}
    });
  }
  getInterpretData() {
    this._tableService.getInterpretdata().subscribe(
      response => {
        this.dataSource = new MatTableDataSource<any>(response.object);
        this.table.renderRows();
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error => {
        console.log(<any>error);
      }
    );
  }
  filter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}