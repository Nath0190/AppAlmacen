export interface Producto{
    idProducto: number;
    estatus: number;
    nombre : string;
    nombreEstatus : string;
    cantidad: number;
    precio: number;
    idUsuarioModificacion:number;
    fechaModificacion:Date
}