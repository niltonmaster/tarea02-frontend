import { MaterialModule } from './material/material.module';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PersonaComponent } from './pages/persona/persona.component';
import { ProductoComponent } from './pages/producto/producto.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProductoEdicionComponent } from './pages/producto/producto-edicion/producto-edicion.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {MatDialogModule} from '@angular/material/dialog';
import { PersonaDialogoComponent } from './pages/persona/persona-dialogo/persona-dialogo.component';

@NgModule({
  declarations: [
    AppComponent,
    PersonaComponent,
    ProductoComponent,
    ProductoEdicionComponent,
    PersonaDialogoComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    MatDialogModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
