import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

// export interface Tarea {
//   id: number;
//   nombre: string;
//   fechaLimite: string;
//   completada: boolean;
//   personas: any[]; // Personas asociadas, puede ser un arreglo con los atributos correspondientes
// }

export interface Tarea {
  id: number;
  nombre: string;
  fecha: string;
  completada: boolean;
  personas: Persona[]
}

export interface Persona {
  nombre: string
  edad: string
  habilidades: string[]
}

@Injectable({
  providedIn: 'root'
})

export class TareaService {

  constructor() { }
  private tasks: any[] = [];




  addTasks(tarea: Tarea) {
    //console.log("Tarea push:", tarea);
    //console.log("Tarea push:" + JSON.stringify(tarea));
    const id = Math.floor(Math.random() * 1000) + 1;
    tarea.id = id;
    tarea.completada = false;
    this.tasks.push(tarea);
    console.log("tarea push:" + JSON.stringify(this.tasks));
    this.tareasSource.next(this.tasks);

  }

  private tareasSource = new BehaviorSubject<Tarea[]>(
    this.tasks
  );

  tareas$ = this.tareasSource.asObservable();

  obtenerTareas(): Tarea[] {
    return this.tareasSource.value;
  }

  actualizarTarea(id: number, completada: boolean) {
    const tareas = this.tareasSource.value.map(tarea =>
      tarea.id === id ? { ...tarea, completada } : tarea);
    console.log("tareas update:" + JSON.stringify(tareas));
    this.tareasSource.next(tareas);
  }

  filtrarTareas(estado: 'todas' | 'completadas' | 'pendientes'): Tarea[] {
    const tareas = this.obtenerTareas();
    if (estado === 'completadas') {
      return tareas.filter(tarea => tarea.completada);
    } else if (estado === 'pendientes') {
      return tareas.filter(tarea => !tarea.completada);
    }
    return tareas;
  }



  // obtenerTareas() {
  //   return this.tasks;
  // }

  // filtrarTareas(estado: string) {
  //   if (estado === 'completadas') {
  //     //return this.tasks.filter(tarea => tarea.completada);
  //   } else if (estado === 'pendientes') {
  //     //return this.tasks.filter(tarea => !tarea.completada);
  //   }
  //   return this.tasks;
  // }

  getTarea$() {
    return this.tasks;
  }
}
