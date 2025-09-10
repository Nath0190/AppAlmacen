import { Component, inject, Input , OnInit} from '@angular/core';
import { FormGroup,FormBuilder ,ReactiveFormsModule,FormControl, Validators } from '@angular/forms';
import { AlmacenServicio } from '../../Service/almacen';
import { Router } from '@angular/router';
import { Producto } from '../../Models/Producto';

@Component({
  selector: 'app-salida-producto',
  imports: [ReactiveFormsModule],
  templateUrl: './salida-producto.html',
  styleUrl: './salida-producto.css'
})
export class SalidaProductoComponent  implements OnInit{
    @Input('id') idProducto! : number;
    //public idProducto= input.required<string>();
    public formBuild = inject(FormBuilder);
    private inventarioServicio = inject(AlmacenServicio);
    public formProducto:FormGroup = this.formBuild.group({
        nombre : [''],
        estatus : ['0'],
        cantidad : ['0'],
        precio : ['0'],
    });

    constructor( private router:Router){ }

    ngOnInit(): void {
      if(this.idProducto != 0){
        this.formProducto = this.formBuild.group({
          nombre : new FormControl({value: '', disabled: true}, Validators.required),
          estatus : new FormControl({value: '', disabled: true}, Validators.required),
          cantidad : new FormControl({value: '', disabled: true}, Validators.required),
          cantidadSalir : new FormControl({value: '', disabled: false}, Validators.required),
          precio : new FormControl({value: '', disabled: true}, Validators.required), 
      });
        this.inventarioServicio.obtenerProducto(this.idProducto ).subscribe({
          next:(data) =>{
            this.formProducto.patchValue({
              idProducto: data.idProducto,
              nombre:data.nombre,
              estatus:data.estatus,
              nombreEstatus:data.nombreEstatus,
              cantidad:data.cantidad,
              precio:data.precio
            })
            console.log(data);
          },
          error:(err) =>{
            console.log(err.message)
          }
        })
      }
    }

    onSubmit(){
      const obj : Producto = {
        idProducto :this.idProducto,
        nombre: this.formProducto.value.nombre,
        estatus: this.formProducto.value.estatus,
        nombreEstatus : this.formProducto.value.estatus,
        cantidad:this.formProducto.value.cantidadSalir,
        precio:this.formProducto.value.precio,
        idUsuarioModificacion:2,
        fechaModificacion: new Date()
      }
      
      this.inventarioServicio.SalidaProducto(obj,'SALIDA').subscribe({
        next:(data) =>{
          if(data.isSuccess){
            this.router.navigate(["/inventario"]);
          }else{
            alert("Cantidad insuficiente")
          }
        },
        error:(err) =>{
          console.log(err.message)
        }
      })
    }
    

}
