import { ProductoEdicionComponent } from './pages/producto/producto-edicion/producto-edicion.component';
import { PersonaComponent } from './pages/persona/persona.component';
import { ProductoComponent } from './pages/producto/producto.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
{path:'producto', component:ProductoComponent,children:[
  {path:'nuevo',component:ProductoEdicionComponent},
  {path:'edicion/:id',component:ProductoEdicionComponent}

]
},
{path:'persona', component:PersonaComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
