import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from 'src/app/config/config';
import {Medico} from "../../models/medico.model";
import { MedicoService } from 'src/app/services/service.index';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: []
})
export class MedicosComponent implements OnInit {

  medicos:Medico[]=[];
  desde: number=0;

  totalRegistros: number=0;
  cargando: boolean=true;

  constructor(
    public _medicoService:MedicoService
  ) { }

  ngOnInit() {
    this.cargarMedicos();
  }

  cargarMedicos()
  {
    this.cargando=true;

    this._medicoService.cargarMedicos(this.desde)
                .subscribe((medicos:any)=>
                {
                  this.totalRegistros=medicos.length+1;
                  this.medicos=medicos;
                  this.cargando=false; 
                });
  }

  cambiarDesde(valor: number)
  {
    let desde= this.desde + valor;
    
    if( desde >= this.totalRegistros)
    {
      return;
    }

    if( desde < 0)
    {
      return;
    }

    this.desde += valor;
    this.cargarMedicos();

  }

  buscarMedico(termino: string)
  {

    if(termino.length<=0)
    {
      this.cargarMedicos();
      return;
    }
    this._medicoService.buscarMedicos(termino)
              .subscribe(medicos=> this.medicos= medicos);
  }

  borrarMedico(medico:Medico)
  {
    this._medicoService.borrarMedico(medico._id)
              .subscribe(()=> this.cargarMedicos());
  }

}
