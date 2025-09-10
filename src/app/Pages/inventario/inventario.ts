import { Component, computed, inject, signal } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Producto } from '../../Models/Producto';
import { AlmacenServicio } from '../../Service/almacen';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-inventario',
  imports: [CommonModule],
  templateUrl: './inventario.html',
  styleUrl: './inventario.css'
})
export class InventarioComponent  {
  
  private inventarioServicio = inject(AlmacenServicio);
  lista = signal<any|undefined>(undefined);
  public listaInventario = computed(()=>this.lista());


  obtenerInventario(){
    this.inventarioServicio.listaInventario().subscribe({
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
    this.obtenerInventario();
  }

  salidaProducto(objeto:Producto){
    this.router.navigate(['/producto-salida',objeto.idProducto]);
  }
}
