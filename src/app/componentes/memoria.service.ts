import { Injectable } from '@angular/core';
import { Variables } from '../modelos/variables';

@Injectable({
  providedIn: 'root'
})
export class MemoriaService {
  memoriaDatos: number[] = new Array(8).fill(0);
  variables = Object.keys(Variables).filter(key => isNaN(Number(key)));
  constructor() { }

  obtenerDireccion = (entrada: number | Variables): number => {
      if (typeof entrada === 'string') {
        const direccion = Object.values(Variables).indexOf(entrada);
        return direccion;
      } else {
        return entrada;
      }
    };

  obtenerDato(dato: number | Variables): number {
    const direccion = this.obtenerDireccion(dato);
    return this.memoriaDatos[direccion];
  }

  guardarDato(variable: number | Variables, dato: number | Variables): void {     
    try {
      const direccionAGuardar = this.obtenerDireccion(variable);
      const valorAGuardar = typeof dato === 'string' ? this.memoriaDatos[this.obtenerDireccion(dato)] : dato;  
      this.memoriaDatos[direccionAGuardar] = valorAGuardar;
    } catch (error) {
      console.error(error);
    }
  }
}
