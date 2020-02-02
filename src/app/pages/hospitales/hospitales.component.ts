import { Component, OnInit } from '@angular/core';
import { Hospital } from 'src/app/models/hospitales.model';
import { HospitalService } from '../../services/service.index';
import { ModalUploadService } from 'src/app/components/modal-upload/modal-upload.service';

declare var swal:any;
@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styleUrls: ['./hospitales.component.css']
})
export class HospitalesComponent implements OnInit {

  hospitales: Hospital[] = [];
  desde: number=0;

  totalRegistros: number=0;
  cargando: boolean=true;
  
  constructor(
    public _hospitalService: HospitalService,
    public _modalUploadService: ModalUploadService
  ) { }

  ngOnInit() {
    this.cargarHospitales();

    this._modalUploadService.notificacion
                  .subscribe(()=> this.cargarHospitales());
  }


  cargarHospitales()
  {
    this.cargando=true;

    this._hospitalService.cargarHospitales(this.desde)
        .subscribe((resp:any) =>
          {
            this.totalRegistros=resp.total;
            this.hospitales=resp.hospitales;
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
    this.cargarHospitales();

  }

  buscarHospital( termino: string)
  {

    if(termino.length<= 0)
    {
      this.cargarHospitales();
      return;
    }


    this._hospitalService.buscarHospital(termino)
            .subscribe(hospitales => this.hospitales=hospitales);
  }

  guardarHospital(hospital: Hospital)
  {
    this._hospitalService.actualizarHospital(hospital)
                  .subscribe(() =>
                  {

                  })
  }

  borrarHospital(hospital: Hospital)
  {
    this._hospitalService.borrarHospital(hospital._id)
                .subscribe();
  }

  crearHospital()
  {
    swal(
      {
        title:"Crear hospital",
        text: "Ingrese el nombre del hospital",
        content: "input",
        buttons: true,
        dangerMode: true
      }
    ).then((valor:string)=>
      {
        if(!valor || valor.length===0)
        {
          return;
        }

        this._hospitalService.crearHospital(valor)
                .subscribe(()=>this.cargarHospitales());
      });
  }

  actualizarImagen(hospital:Hospital)
  {
    this._modalUploadService.mostrarModal("hospitales", hospital._id);
  }

}
