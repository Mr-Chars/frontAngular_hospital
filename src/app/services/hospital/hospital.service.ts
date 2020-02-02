import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from 'src/app/config/config';
import { HttpClient } from '@angular/common/http';

declare var swal:any;
import { UsuarioService } from '../usuario/usuario.service';
import { Hospital } from 'src/app/models/hospitales.model';

@Injectable()

export class HospitalService {

  constructor( public http: HttpClient, public _usuarioService: UsuarioService) { }



  cargarHospitales(desde: number=0)
  {
    let url = URL_SERVICIOS+"/hospital?desde="+desde;

    return this.http.get(url);
  }

  obtenerHospital(id:string)
  {
    let url = URL_SERVICIOS+"/hospital/"+id;

    return this.http.get(url)
                  .map((resp:any) => resp.hospital);
  }

  borrarHospital(id:string)
  {
    let url = URL_SERVICIOS+"/hospital/"+id+"?token="+this._usuarioService.token;

    //return  this.http.delete(url);

    return  this.http.delete(url)
                  .map(resp => 
                    {
                      swal("Hospital borrado", "Eliminado correctamente", "success");
                      return true;
                    });
  }

  crearHospital(nombre: string)
  {
    let url = URL_SERVICIOS+"/hospital?token="+this._usuarioService.token;

     return this.http.post(url, {nombre:nombre})
                  .map((resp: any)=> resp.hospital);
  }

  buscarHospital(termino: string)
  {
    let url=URL_SERVICIOS+ "/busqueda/coleccion/hospital/"+termino;
    
    return this.http.get(url)
    .map((resp: any) => resp.hospital);
  }

  actualizarHospital(hospital: Hospital)
  {
    let url = URL_SERVICIOS+"/hospital/"+ hospital._id+"?token="+this._usuarioService.token;

    return this.http.put(url, hospital)
                  .map((resp:any)=>
                   {
                     
                    swal("Hospital Actualizado",hospital.nombre, "success");
                    
                    return resp.hospital;
                    }
                   );
  }

  


}