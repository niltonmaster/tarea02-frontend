import { Producto } from './../../../_model/producto';
import { ProductoService } from './../../../_service/producto.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router, Params } from '@angular/router';
import {switchMap} from 'rxjs/operators'

@Component({
  selector: 'app-producto-edicion',
  templateUrl: './producto-edicion.component.html',
  styleUrls: ['./producto-edicion.component.css']
})
export class ProductoEdicionComponent implements OnInit {
  form: FormGroup;
  id: number;
  edicion: boolean;

  constructor(private route: ActivatedRoute,
     private router:   Router,      
    private productoService: ProductoService) {
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      'id': new FormControl(0),
      'nombre': new FormControl(''),
      'marca': new FormControl(''),
      // 'dni': new FormControl(''),
      // 'telefono': new FormControl(''),
      // 'direccion': new FormControl(''),
    })

    //como yo ya se que la data son parametros entonces indico data x Parama
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];//nomre id del mismo que esta en el codigo
      console.log(this.id);
      this.edicion = params['id'] != null;
      //console.log(this.id);
      this.intiForm();
    });
  }

  intiForm() {
    if(this.edicion){
      this.productoService.listarPorId(this.id).subscribe(data => {
        // console.log(data.idProducto);
        this.form = new FormGroup({
          'id': new FormControl(data.idProducto),
          'nombre': new FormControl(data.nombre),
          'marca': new FormControl(data.marca)
          // 'dni': new FormControl(data.dni),
          // 'telefono': new FormControl(data.telefono),
          // 'direccion': new FormControl(data.direccion)
        });
      });
    }
  }


  operar() {
    //recuperar los valores del formulario.
    let producto = new Producto();
    producto.idProducto=this.form.value['id'];
    producto.nombre=this.form.value['nombre'];
    producto.marca=this.form.value['marca'];
    // paciente.dni=this.form.value['dni'];
    // paciente.telefono=this.form.value['telefono'];
    // paciente.direccion=this.form.value['direccion'];
    // paciente.nombres=this.form.value['nombres'];

     console.log(producto.nombre);

    if(this.edicion){
      //forma comun
      this.productoService.modificar(producto).subscribe(() =>{
        this.productoService.listar().subscribe(data=>{ //obtenego la lista refrescada despues de la modificacion , ahora mi idea es pasarla al otro componente que ha habdo un cambio
          this.productoService.productoCambio.next(data);
          this.productoService.mensajeCambio.next('SE MODIFICO');
        }); 
      });      
    }else{
      // this.pacienteService.registrar(paciente).subscribe( ()=>{
      //   this.pacienteService.listar().subscribe(data=>{
      //     this.pacienteService.pacienteCambio.next(data);
      //   })
      // });
      this.productoService.registrar(producto).pipe(switchMap(()=>{
        return this.productoService.listar();
      })).subscribe(data=> {
        this.productoService.productoCambio.next(data);//.next(data);
        this.productoService.mensajeCambio.next('SE REGISTRO');

      })
    }
     this.router.navigate(['producto']);
  }



}
