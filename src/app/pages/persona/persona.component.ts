import { switchMap } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PersonaDialogoComponent } from './persona-dialogo/persona-dialogo.component';
import { ProductoService } from './../../_service/producto.service';
import { ProductoEdicionComponent } from './../producto/producto-edicion/producto-edicion.component';
import { MatPaginator } from '@angular/material/paginator';
import { Persona } from './../../_model/persona';
import { MatTableDataSource } from '@angular/material/table';
import { PersonaService } from './../../_service/persona.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-persona',
  templateUrl: './persona.component.html',
  styleUrls: ['./persona.component.css']
})
export class PersonaComponent implements OnInit {

  displayedColumns=['idPersona','nombres','apellidos','acciones']
  dataSource: MatTableDataSource<Persona>;
  @ViewChild(MatPaginator) paginator: MatPaginator;//@vewchil quiero capturar aquello que sea de tipo
  @ViewChild(MatSort) sort: MatSort;

  constructor(private personaService: PersonaService,
    private dialog:MatDialog ,
    private snackBar: MatSnackBar
    ) { }

  ngOnInit(): void {
    // this.productoService.productoCambio.subscribe(data => {
    //   this.dataSource = new MatTableDataSource(data);
    //   this.dataSource.paginator = this.paginator;
    //   this.dataSource.sort = this.sort;
    // });

    // this.productoService.mensajeCambio.subscribe(data => {//ladata es el mensaje
    //   this.snackBar.open(data, 'AVISO', {
    //     duration: 2000
    //   })

    // });
    this.personaService.personaCambio.subscribe(data=>{
      this.dataSource=new MatTableDataSource(data);
      this.dataSource.paginator=this.paginator;
      this.dataSource.sort=this.sort;
    })

    this.personaService.mensajeCambio.subscribe(data=>{
      this.snackBar.open(data,'AVISO',{
        duration:2000
      })
    })

    this.personaService.listar().subscribe(data=>{
      // this.productos = data;
      //console.log(data)
      this.dataSource=new MatTableDataSource(data);
      this.dataSource.paginator=this.paginator;//paginacion 1-3 of 3
      this.dataSource.sort=this.sort;//flechita de ordenamiento en cada colmna
    });
  
  }

  filtrar(valor:string){
    this.dataSource.filter=valor.trim().toLocaleLowerCase();

  }

  eliminar(persona:Persona){
    this.personaService.eliminar(persona.idPersona).pipe(switchMap( ()=>{
      return this.personaService.listar();
    })).subscribe(data=>{
      this.personaService.personaCambio.next(data);
    this.personaService.mensajeCambio.next('SE ELIMINO');
  
    });
  }

  abrirDialogo(persona? :Persona){
    let per= persona != null ? persona: new Persona();//evalua para saber que le esta mandando al componente dialog
    this.dialog.open(PersonaDialogoComponent,{
      width:'250px',
      data:per
    });

  }

  mostrarMas(e:any){}



}
