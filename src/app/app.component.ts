import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { AluComponent } from "./componentes/alu/alu.component";
import { MemoriaService } from './componentes/memoria.service';
import { MemoriaComponent } from "./componentes/memoria/memoria.component";
import { UnidadControlComponent } from './componentes/unidad-control/unidad-control.component';
import { Instruccion } from './modelos/instruccion';
import { Operaciones } from './modelos/operaciones';
import { Variables } from './modelos/variables';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [CommonModule, RouterOutlet, ReactiveFormsModule, MemoriaComponent, UnidadControlComponent, AluComponent]
})
export class AppComponent {
  title = 'Arquitectura';
  variables = Object.keys(Variables).filter(key => isNaN(Number(key)));
  public operacionALU!: Instruccion;
  public respuestaALU!: number;
  public setInstrucciones: string[] = [];
  fGroup: FormGroup = new FormGroup({});

  constructor(private fb: FormBuilder,
    public memoria: MemoriaService
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

  cargarYEjecutarInstrucciones() {
    this.guardarInstruccionesEnMemoria();
  }

  public guardarInstruccionesEnMemoria() {
    this.setInstrucciones = this.getSetInstrucciones.split('\n');
  }

  public pasarInstruccion(instruccion: Instruccion) {
    setTimeout(() => {
      if (instruccion.operacion == Operaciones.MOVE && instruccion.operando2) {
        this.memoria.guardarDato(instruccion.operando1, instruccion.operando2);
      } else {
        this.operacionALU = instruccion;
      }
    }, 1000);
  }

  public respuestaDeALU(valor: number) {
    this.respuestaALU = valor;
  }

  get getSetInstrucciones() {
    return this.fGroup?.get('setInstrucciones')?.value || '';
  }


}
