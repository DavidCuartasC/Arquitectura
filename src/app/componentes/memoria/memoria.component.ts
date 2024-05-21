import { Component, Input } from '@angular/core';
import { Instruccion } from '../../modelos/instruccion';
import { Variables } from '../../modelos/variables';
import { Operaciones } from '../../modelos/operaciones';
import { CommonModule } from '@angular/common';
import { DatosAGuardar } from '../../modelos/datosAGuardar';

@Component({
  selector: 'app-memoria',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './memoria.component.html',
  styleUrl: './memoria.component.css'
})
export class MemoriaComponent {
  memoriaDatos: number[] = new Array(8).fill(0);
  variables = Object.keys(Variables).filter(key => isNaN(Number(key)));
  private _datos!: DatosAGuardar;
  operacion?: Operaciones
  operando1?: number;
  operando2?: number;

  @Input()
  set datos(value: DatosAGuardar) {
    this._datos = value; {
      if (this.datos && this.datos.dato1 &&
        this.datos.dato2) {
        this.guardarDato(this.datos.dato1, this.datos.dato2);
      }
    }
  }

  //@Output() respuestaEmmiter = new EventEmitter<number>();

  get datos(): DatosAGuardar {
    return this._datos;
  }

  obtenerDato(direccion: number): number {
    return this.memoriaDatos[direccion];
  }

  guardarDato(variable: Variables, dato: number | Variables): void {
    if (dato in Variables) {
      this.memoriaDatos[variable] = this.memoriaDatos[dato];
    } else {
      this.memoriaDatos[variable] = dato;
    }
  }

}
