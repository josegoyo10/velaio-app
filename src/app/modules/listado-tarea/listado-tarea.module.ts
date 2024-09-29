import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListadoTareaRoutingModule } from './listado-tarea-routing.module';
import { ListTasksComponent } from './list-tasks/list-tasks.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ListTasksComponent
  ],
  imports: [
    CommonModule,
    ListadoTareaRoutingModule,
    ReactiveFormsModule,

  ]
})
export class ListadoTareaModule { }
