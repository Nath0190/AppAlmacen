import { Component,computed,inject, signal } from '@angular/core';
import {AlmacenServicio } from '../../Service/almacen';
import { Producto } from '../../Models/Producto';
import { Route, Router } from '@angular/router';
import { Resp } from '../../Models/Resp';

@Component({
  selector: 'app-inicio',
  imports: [],
  templateUrl: './inicio.html'
  
})
export class InicioComponent {
  private productoServicio = inject(AlmacenServicio);
  lista = signal<any|undefined>(undefined);
  public listaProductos = computed(()=>this.lista());

  obtenerProductos(){
    this.productoServicio.listaProducto().subscribe({
      next:(data)=>{
        if(data.length>0){
          this.lista.set(data);
          console.log(data);
        }
      },
      error:(err)=>{
        console.log(err.message)
      }
    })
  }
  
  constructor(private router:Router){
    this.obtenerProductos();
  }

  nuevoProducto(){
    this.router.navigate(['/producto',0]);
  }

  editarEstatus(objeto:Producto){
    if(confirm("Desea cambiar de estatus el producto : " + objeto.nombre)){
      let nestatus = objeto.nombreEstatus == 'ALTA' ? 'BAJA' :'ALTA';
      let estatus = objeto.nombreEstatus == 'ALTA' ? 2 :1;
      const obj : Resp = {
        estatus:estatus,
        idUsuario:1,
        tipoMovimiento:nestatus
      }
      this.productoServicio.cambiarEstatus(obj,objeto.idProducto, ).subscribe({
        next:(data)=>{
          if(data.isSuccess){
            this.obtenerProductos();
          }else{
            alert("no se pudo eliminar")
          }
        },
        error:(err)=>{
          console.log(err.message)
        }
      })
    }
  }
  
  agregarProducto(objeto:Producto){ 
    this.router.navigate(['/producto',objeto.idProducto]);
  }

  
}
