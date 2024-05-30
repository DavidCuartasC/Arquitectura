import { Injectable } from '@angular/core';
import { Variables } from '../modelos/variables';

@Injectable({
  providedIn: 'root'
})
export class MemoriaService {
  memoriaDatos: number[] = new Array(8).fill(0);
  variables = Object.keys(Variables).filter(key => isNaN(Number(key)));
  constructor() { }

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
