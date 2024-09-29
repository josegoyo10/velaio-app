import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TareaService } from 'src/app/services/tarea.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'tarea',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
  templateUrl: './tarea.component.html',
  styleUrls: ['./tarea.component.css'],
})
export class TareaComponent {
  form!: FormGroup;
  submitted: boolean = false;

  constructor(private fb: FormBuilder, private tareaService: TareaService) { }

  ngOnInit() {
    this.buildForm();
    this.nuevaPersona();
  }

  buildForm() {
    this.form = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      fecha: [''],
      persons: this.fb.array([]),
    });
  }

  get persons(): FormArray {
    return this.form.get('persons') as FormArray;
  }

  get f() {
    return this.form.controls;
  }

  skills(index: number): FormArray {
    return this.persons.at(index).get('skills') as FormArray;
  }

  nuevaPersona(): FormGroup {
    return this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(5)]],
      edad: ['', [Validators.required, Validators.min(18)]],
      skills: this.fb.array([this.fb.control('', Validators.required)]),
    });
  }

  removeHabilidad(personaIndex: number, habilidadIndex: number) {
    this.skills(personaIndex).removeAt(habilidadIndex);
  }

  addHabilidad(index: number) {
    console.log('index:', index);
    this.skills(index).push(this.fb.control('', Validators.required));
    console.log('habilidades add', this.skills);
  }

  addPerson() {
    this.persons.push(this.nuevaPersona());
    console.log('Add persona:', this.persons);
  }

  savingTask() {
    this.submitted = true;

    if (this.form.valid && this.form.value.persons.length > 0) {
      if (this.form.value.persons[0].skills.length > 0) {
        console.log('tarea agregada:', this.form.value);
        this.tareaService.addTasks(this.form.value);
        console.log('tarea service:', this.tareaService);

        Swal.fire({
          icon: 'success',
          title: 'Tarea agregada exitosamente',
          showConfirmButton: true,
          timer: 3000,
        });
        this.submitted = false;
        this.form.reset();
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Debe agregar al menos 1 habilidad a cada persona',
          showConfirmButton: true,
          timer: 4000,
        });
        this.submitted = false;
        this.form.reset();
      }
    } else if (this.form.value.persons.length === 0) {
      console.log('Formulario inválido');
      Swal.fire({
        icon: 'error',
        title: 'Debe agregar al menos 1 persona obligatoriamente',
        showConfirmButton: true,
        timer: 4000,
      });
      this.submitted = false;
      this.form.reset();
    }
  }
}