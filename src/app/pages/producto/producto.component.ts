import { switchMap } from 'rxjs/operators';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { Producto } from './../../_model/producto';
import { ProductoService } from './../../_service/producto.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatSnackBarConfig, MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit {

  // productos: Producto[];
  displayedColumns = ['idProducto', 'nombre', 'marca','acciones'];
  dataSource: MatTableDataSource<Producto>;
  @ViewChild(MatPaginator) paginator: MatPaginator;//@vewchil quiero capturar aquello que sea de tipo
  @ViewChild(MatSort) sort: MatSort;
  //producto: Producto[];

  constructor(private productoService: ProductoService,
    private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.productoService.productoCambio.subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });

    this.productoService.mensajeCambio.subscribe(data => {//ladata es el mensaje
      this.snackBar.open(data, 'AVISO', {
        duration: 2000
      })

    });


    this.productoService.listar().subscribe(data=>{
      // this.productos = data;
      console.log(data)
      this.dataSource=new MatTableDataSource(data);
      this.dataSource.paginator=this.paginator;//paginacion 1-3 of 3
      this.dataSource.sort=this.sort;//flechita de ordenamiento en cada colmna
    });

  }

  filtrar(valor:string){
    this.dataSource.filter=valor.trim().toLocaleLowerCase();

  }

  eliminar(idPaciente:number){
    this.productoService.eliminar(idPaciente).pipe(switchMap( ()=>{
      return this.productoService.listar();
    })).subscribe(data=>{
      this.productoService.productoCambio.next(data);
    this.productoService.mensajeCambio.next('SE ELIMINO')
  
    });
  }

  mostrarMas(e:any){}
}
