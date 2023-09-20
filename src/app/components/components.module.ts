import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComponentsRoutingModule } from './components-routing.module';
import { HomeComponent } from './home/home.component';
import { InsertComponent } from './pages/insert/insert.component';
import { UpdateComponent } from './pages/update/update.component';
import { MaterialModule } from '../material/material.module';
import { TableComponent } from './pages/table/table.component';
import { DialogComponent } from './dialog/dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    HomeComponent,
    InsertComponent,
    UpdateComponent,
    TableComponent,
    DialogComponent,
  ],
  imports: [
    CommonModule,
    ComponentsRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ComponentsModule { }
