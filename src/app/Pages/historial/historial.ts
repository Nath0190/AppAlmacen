import { Component, computed, inject,signal } from '@angular/core';
import { AlmacenServicio } from '../../Service/almacen';
import { Historial } from '../../Models/Historial';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-historial',
  imports: [],
  templateUrl: './historial.html'
  
})
export class HistorialComponent {
  private historialServicio = inject(AlmacenServicio);
  lista = signal<any|undefined>(undefined);
  public listadoHistorial = computed(()=>this.lista());

  
  constructor(private router:Router){
    //this.obtenerHistorial();
  }

  obtenerSelect(event: Event){
    const valorSeleccionado = (event.target as HTMLSelectElement).value;
    this.obtenerHistorial(valorSeleccionado);
  }

  obtenerHistorial(param:string){
    this.historialServicio.listaHistorial(param).subscribe({
      next:(data)=>{
        if(data.length>0){
          this.lista.set(data);
          console.log(data);
        }else{
          this.lista.set('');
        }
      },
      error:(err)=>{
        console.log(err.message)
      }
    }) 
  }

}
