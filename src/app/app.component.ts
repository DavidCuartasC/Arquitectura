import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Instruccion } from './modelos/instruccion';
import { MemoriaComponent } from "./componentes/memoria/memoria.component";
import { UnidadControlComponent } from './componentes/unidad-control/unidad-control.component';
import { AluComponent } from "./componentes/alu/alu.component";
import { Operaciones } from './modelos/operaciones';
import { DatosAGuardar } from './modelos/datosAGuardar';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [CommonModule, RouterOutlet, ReactiveFormsModule, MemoriaComponent, UnidadControlComponent, AluComponent]
})
export class AppComponent {
  title = 'Arquitectura';
  public operacionALU!: Instruccion;
  public respuestaALU!: number;
  public guardarEnMemoria!: DatosAGuardar;
  public setInstrucciones: string[] = [];
  fGroup: FormGroup = new FormGroup({});

  constructor(private fb: FormBuilder) {
  }

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.fGroup = this.fb.group({
      setInstrucciones: ['', [Validators.required]]
    })
  }

  cargarYEjecutarInstrucciones() {
    this.guardarInstruccionesEnMemoria();
  }

  public guardarInstruccionesEnMemoria() {
    this.setInstrucciones = this.getSetInstrucciones.split('\n');
  }

  public pasarInstruccion(instruccion: Instruccion) {
    if (instruccion.operacion == Operaciones.MOVE) {
      const datos = {
        dato1: instruccion.operando1,
        dato2: instruccion.operando2
      } as DatosAGuardar
      this.guardarEnMemoria = datos;
    } else {
      this.operacionALU = instruccion;
      const datos = {
        dato1: instruccion.operando1,
        dato2: this.respuestaALU
      } as DatosAGuardar
      this.guardarEnMemoria = datos;
    }

  }

  public respuestaDeALU(valor: number) {
    this.respuestaALU = valor;
  }

  get getSetInstrucciones() {
    return this.fGroup?.get('setInstrucciones')?.value || '';
  }


}
