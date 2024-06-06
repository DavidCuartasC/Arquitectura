import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RvuService {
  public RVU: number[] = new Array(8).fill(0);

  public variableMap: { [key: string]: number } = {
    "A": 0,
    "B": 1,
    "C": 2,
    "D": 3,
    "E": 4,
    "F": 5,
    "G": 6,
    "H": 7
  };  
  
  constructor() { }

  public getValor(variable: string): number {
    const direccion =  this.getDireccion(variable);
    return this.RVU[direccion];
  }

  public getDireccion(variable: string): number {     
    if (variable in this.variableMap) {
      return this.variableMap[variable];
    } else {
      throw new Error(`No conozco a esa variable ${variable}`);
    }
  }

  public  setDato(direccion: number, dato: number) {
    this.RVU[direccion] = dato;
  }

}


