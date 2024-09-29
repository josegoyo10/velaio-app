import { Component } from '@angular/core';
import { Tarea, TareaService } from 'src/app/services/tarea.service';

@Component({
  selector: 'app-list-tasks',
  templateUrl: './list-tasks.component.html',
  styleUrls: ['./list-tasks.component.css']
})
export class ListTasksComponent {
  tareas!: any;
  filtroActual: 'todas' | 'completadas' | 'pendientes' = 'todas';

  constructor(
    private tareaService: TareaService,
  ) {

  };

  ngOnInit() {

  }

  onfilter(opc: string) {
    console.log("opc:", opc);
    // this.tareaService.filtrarTareas(opc);
    // console.log("tarea service:", this.tareaService);
  }

  // Filtrar las tareas
  filtrarTareas(estado: 'todas' | 'completadas' | 'pendientes') {
    this.filtroActual = estado;
    this.actualizarTareas();
  }

  actualizarTareas() {
    this.tareas = this.tareaService.filtrarTareas(this.filtroActual);
    console.log("tareas actualizadas:", this.tareas);
  }

  toggleTarea(tarea: Tarea) {
    this.tareaService.actualizarTarea(tarea.id, !tarea.completada);
    this.actualizarTareas();
  }



}
