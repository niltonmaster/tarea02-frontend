import { GenericService } from './generic.service';
import { Persona } from './../_model/persona';
import { environment } from './../../environments/environment';

import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class PersonaService extends GenericService<Persona>  {

  personaCambio= new Subject<Persona[]>();
  mensajeCambio =new Subject<string>();


  //url: string=`${environment.HOST}/personas`;

  constructor(protected http : HttpClient) {
    super(
      http,
      `${environment.HOST}/personas`
    );

   }

  // listar(){
  //   return  this.http.get<Persona[]>(this.url);
  // }

  // listarPorId(id:number){
  //   return this.http.get<Persona>(`${this.url}/${id}`)
  // }

  // registrar(persona:Persona){
  //  return this.http.post(this.url,persona); 
  // }

  // modificar(persona:Persona){
  //   return this.http.put(this.url,persona);
  // }

  // eliminar(id:number){
  //   return this.http.delete(`${this.url}/${id}`)
  // }

}
