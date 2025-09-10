import { Component, inject, Input, input, OnInit } from '@angular/core';
import { FormGroup,FormBuilder ,ReactiveFormsModule,FormControl, Validators} from '@angular/forms';
import { AlmacenServicio } from '../../Service/almacen';
import { Router } from '@angular/router';
import { Producto } from '../../Models/Producto';

@Component({
  selector: 'app-producto',
  imports: [ReactiveFormsModule],
  templateUrl: './producto.html',
  styleUrl: './producto.css'
})
export class ProductoComponent implements OnInit {
  
    @Input('id') idProducto! : number;
    //public idProducto= input.required<string>();
    public formBuild = inject(FormBuilder);
    private almacenService = inject(AlmacenServicio);
    public title ="";
    
    public formProducto:FormGroup = this.formBuild.group({
        nombre : [''],
        estatus : ['0'],
        cantidad : ['0'],
        precio : ['0'],
    });
  
  constructor( private router:Router){ 
    
  }

  ngOnInit(): void {
    
    this.title = this.idProducto != 0 ? "Editar Cantidad":"Nuevo Producto";
    
    if(this.idProducto != 0){
      
      this.formProducto = this.formBuild.group({
        nombre : new FormControl({value: '', disabled: true}, Validators.required),
        estatus : new FormControl({value: '', disabled: true}, Validators.required),
        cantidad : new FormControl({value: '', disabled: false}, Validators.required),
        precio : new FormControl({value: '', disabled: true}, Validators.required), 
    });
      this.almacenService.obtenerProducto(this.idProducto ).subscribe({
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
      cantidad:this.formProducto.value.cantidad,
      precio:this.formProducto.value.precio,
      idUsuarioModificacion:1,
      fechaModificacion: new Date()
    }
    if (this.idProducto==0){
      this.almacenService.nuevoProducto(obj).subscribe({
        next:(data)=>{
          if(data.isSuccess){
            this.router.navigate(["/"]);
          }else{
            alert("Error al crear")
          }
        }, 
        error:(err) =>{
        console.log(err.message)
        }
      })
    }else{
      this.almacenService.cambiarCantidad(obj).subscribe({
        next:(data) =>{
          if(data.isSuccess){
            this.router.navigate(["/"]);
          }else{
            alert("Error al cambiar cantidad")
          }
        },
        error:(err) =>{
          console.log(err.message)
        }
      })
    }
  }

  
}
