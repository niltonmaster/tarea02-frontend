import { GenericService } from './generic.service';
import { Persona } from './../_model/persona';
import { Producto } from './../_model/producto';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { ɵangular_packages_core_testing_testing_a } from '@angular/core/testing';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductoService extends GenericService<Producto>{

  productoCambio= new Subject<Producto[]>();
  mensajeCambio =new Subject<string>();


  url: string=`${environment.HOST}/productos`;

  constructor(protected http : HttpClient) {
    super(http,
      `${environment.HOST}/productos`);
   }

//   listar(){
//     return  this.http.get<Producto[]>(this.url);
//   }

//   listarPorId(id:number){
//     return this.http.get<Producto>(`${this.url}/${id}`)
//   }

//   registrar(producto:Producto){
//    return this.http.post(this.url,producto); 
//   }


//   modificar(producto:Producto){
//       return this.http.put(this.url,producto);
//   }

//   eliminar(id:number){
// return this.http.delete(`${this.url}/${id}`)

//   }



}
