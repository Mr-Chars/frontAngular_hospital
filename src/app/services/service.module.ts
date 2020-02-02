import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { 
  SettingService,
  SidebarService,
  SharedService, 
  UsuarioService, 
  LoginGuardGuard,
  SubirArchivoService,
  MedicoService,
  HospitalService } from './service.index';
import { ModalUploadService } from '../components/modal-upload/modal-upload.service';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers:[
    SettingService,
    SidebarService,
    SharedService,
    UsuarioService,
    LoginGuardGuard,
    SubirArchivoService,
    ModalUploadService,
    HospitalService,
    MedicoService
  ]
})
export class ServiceModule { }
