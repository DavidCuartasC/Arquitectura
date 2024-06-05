import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AluService {
  public instruccion: number = 0;
  public datos1: number = 0;
  public datos2: number = 0;
  constructor() { }  

  public ejecutarOperacion(
    instruccion: number,
    dato1: number,
    dato2: number
  ): number {
    this.instruccion = instruccion;
    this.datos1 = dato1;
    this.datos2 =  dato2;

    switch (instruccion) {
      case 1:
        return this.sumar(dato1, dato2);
      case 10:
        return this.restar(dato1, dato2);
      case 0:
        return this.multiplicar(dato1, dato2);
      case 11:
        return this.dividir(dato1, dato2);
      case 101:
        return this.incrementar(dato1);
      case 110:
        return this.negar(dato1)
      case 111:
        return this.conjuncion(dato1, dato2);
      case 1000:
        return this.disyuncion(dato1, dato2);
      case 1001:
        return this.comparar(dato1, dato2);
      default:
        return 0;
    }
  }

  private sumar(dato1: number, dato2: number): number {
    return dato1 + dato2;
  }

  private restar(dato1: number, dato2: number): number {
    return dato1 - dato2;
  }

  private multiplicar(dato1: number, dato2: number): number {
    return dato1 * dato2;
  }

  private dividir(dato1: number, dato2: number): number {
    if (dato2 !== 0) {
      return dato1 / dato2;
    } else {
      return 0;
    }
  }

  private incrementar(dato1: number): number {
    if (dato1 == undefined || dato1 == null || dato1 == 0) {
      dato1 = 1;
    }
    return dato1++;
  }

  private negar(dato1: number): number {
    if (dato1 == 0) {
      return 1;
    } else if (dato1 == 1) {
      return 0;
    } else {
      return dato1 * -1;
    }
  }

  private conjuncion(dato1: number, dato2: number): number {
    if (dato1 == 1 && dato2 == 1) {
      return 1;
    } else {
      return 0;
    }
  }

  private disyuncion(dato1: number, dato2: number): number {
    if (dato1 == 0 && dato2 == 0) {
      return 0;
    } else {
      return 1;
    }
  }

  private comparar(dato1: number, dato2: number): number {
    if (dato1 == dato2) {
      return 0;
    } else if (dato1 > dato2) {
      return 1;
    } else {
      return -1;
    }
  }
}
