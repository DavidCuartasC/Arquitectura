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

    switch (instruccion) {
      case 1:
        return this.add(dato1, dato2);
      case 10:
        return this.sub(dato1, dato2);
      case 0:
        return this.mul(dato1, dato2);
      case 11:
        return this.div(dato1, dato2);
      case 101:
        return this.exp(dato1, dato2);
      case 110:
        return this.xor(dato1, dato2)
      case 111:
        return this.and(dato1, dato2);
      case 1000:
        return this.or(dato1, dato2);
      case 1001:
        return this.cmp(dato1, dato2);
      default:
        return 0;
    }
  }

  private add(dato1: number, dato2: number): number {
    return dato1 + dato2;
  }

  private sub(dato1: number, dato2: number): number {
    return dato1 - dato2;
  }

  private mul(dato1: number, dato2: number): number {
    return dato1 * dato2;
  }

  private div(dato1: number, dato2: number): number {
    if (dato2 !== 0) {
      return dato1 / dato2;
    } else {
      return 0;
    }
  }

  private xor(dato1: number, dato2:number): number {
    if (dato1 == dato2) {
      return 0;
    } else {
      return 1;
    }
  }

  private and(dato1: number, dato2: number): number {
    if (dato1 == 1 && dato2 == 1) {
      return 1;
    } else {
      return 0;
    }
  }

  private or(dato1: number, dato2: number): number {
    if (dato1 == 0 && dato2 == 0) {
      return 0;
    } else {
      return 1;
    }
  }

  private cmp(dato1: number, dato2: number): number {
    if (dato1 == dato2) {
      return 0;
    } else if (dato1 > dato2) {
      return 1;
    } else {
      return -1;
    }
  }

  private exp(dato1: number, dato2: number): number {
     return  Math.pow(dato1, dato2);
  }

}
