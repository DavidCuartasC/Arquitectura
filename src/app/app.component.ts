import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { MemoriaComponent } from "./componentes/memoria/memoria.component";
import { UnidadControlComponent } from './componentes/unidad-control/unidad-control.component';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [CommonModule, RouterOutlet, ReactiveFormsModule, MemoriaComponent, UnidadControlComponent]
})
export class AppComponent {
  title = 'Arquitectura';
  public enEjecucion = false;
  public setInstrucciones: string[] = [];
  fGroup: FormGroup = new FormGroup({});

  constructor(private fb: FormBuilder
  ) {
  }

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.fGroup = this.fb.group({
      setInstrucciones: ['', [Validators.required]]
    })
  }

  public cargarInstrucciones() {
    this.setInstrucciones = this.getSetInstrucciones.split('\n');
    this.enEjecucion = true
  }

  get getSetInstrucciones() {
    return this.fGroup?.get('setInstrucciones')?.value || '';
  }

  reloadPage() {
    window.location.reload();
  }


}
