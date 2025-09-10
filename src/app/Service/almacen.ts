import { HttpClient } from '@angular/common/http';
import { Injectable, Resource, inject } from '@angular/core';
import { appsettings } from '../Settings/appsettting';
import { Producto } from '../Models/Producto';
import { Historial } from '../Models/Historial';
import { ResponseApi } from '../Models/ResposeApi';
import { Resp } from '../Models/Resp';

@Injectable({
  providedIn: 'root'
})
export class AlmacenServicio {
  private http= inject(HttpClient);
  private apiUrl:string= appsettings.apiUrl+"Inventario";
  private apiUrlSalida:string= appsettings.apiUrl+"SalidaInventario";
  private apiUrlHistorial:string= appsettings.apiUrl+"Historial";
  constructor(){
  }
  nuevoProducto(objeto:Producto){
    return this.http.post<ResponseApi>(this.apiUrl,objeto);
  }
  
  obtenerProducto(id:number){
    return this.http.get<Producto>(`${this.apiUrl}/${id}`);
  }
  
  listaProducto(){
    return this.http.get<Producto[]>(this.apiUrl);
  }

  listaProductoActivo(){
    return this.http.get<Producto[]>(this.apiUrlSalida);
  }

  listaHistorial(movimiento: string){
    //return this.http.get<Historial[]>(this.apiUrlHistorial);
    return this.http.get<Historial[]>(`${this.apiUrlHistorial}/${movimiento}`);
  }

  listaInventario(){
    return this.http.get<Producto[]>(this.apiUrlSalida);
  }

  cambiarEstatus(obj:Resp, id:number ){
    return this.http.put<ResponseApi>(`${this.apiUrl}/${id}`,obj); //`/${idProducto}/${estatus}/${idUsuario}/${movimiento}`
  }

  cambiarCantidad(obj:Producto ){
    return this.http.put<ResponseApi>(this.apiUrlSalida,obj); 
  }

  SalidaProducto(obj:Producto, movimiento:string ){
    return this.http.put<ResponseApi>(`${this.apiUrlSalida}/${movimiento}`,obj); 
  }
  
}
