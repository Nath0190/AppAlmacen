import { Routes } from '@angular/router';
import { InicioComponent } from './Pages/inicio/inicio';
import { InventarioComponent } from './Pages/inventario/inventario';
import { ProductoComponent } from './Pages/producto/producto';
import { HistorialComponent } from './Pages/historial/historial';
import { SalidaProductoComponent } from './Pages/salida-producto/salida-producto';

export const routes: Routes = [
    {path:'',component:InicioComponent},
    {path:'inicio',component:InicioComponent},
    {path:'inventario',component:InventarioComponent},
    {path:'producto/:id',component:ProductoComponent},
    {path:'producto-salida/:id',component:SalidaProductoComponent},
    {path:'historial',component:HistorialComponent},
    // {path:'Inventario/:id',component:InventarioComponent},
];
