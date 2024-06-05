import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MARMBRService {
  public memoria: number[] = new Array(20).fill(0);

  constructor() { }

  public operacionMap: { [key: string]: number } = {
    "MUL": 0,
    "ADD": 1,
    "SUB": 10,
    "DIV": 11,
    "MOVE": 100,
    "INC": 101,
    "NOT": 110,
    "AND": 111,
    "OR": 1000,
    "CMP": 1001,
    "JMP": 1010,
    "JNE": 1011
  };

  public async getIntruccion(operacion: string): Promise<number> {
    await new Promise(resolve => setTimeout(resolve, 1000));    

    if (operacion in this.operacionMap) {
      return this.operacionMap[operacion];
    } else {
      throw new Error("No conozco de eso");
    }

  }

  private variableMap: { [key: string]: number } = {
    "A": 0,
    "B": 1,
    "C": 2,
    "D": 3,
    "E": 4,
    "F": 5,
    "G": 6,
    "H": 7
  };

  public async getDato(dato: string): Promise<number> {
    await new Promise(resolve => setTimeout(resolve, 1000));
    if (dato in this.variableMap) {
      return this.memoria[this.variableMap[dato]];
    } else {
      const numero = Number(dato);
      if (!isNaN(numero)) {
        return numero;
      }
      throw new Error(`No conozco a ese tal ${dato}`);
    }
  }

  public async getDireccion(variable: string): Promise<number> {
    await new Promise(resolve => setTimeout(resolve, 1000));
    if (variable in this.variableMap) {
      return this.variableMap[variable];
    } else {
      throw new Error(`No conozco a esa variable ${variable}`);
    }
  }

  public async setDato(direccion: number, dato: number) {
    await new Promise(resolve => setTimeout(resolve, 1000));
    this.memoria[direccion] = dato;
  }
}
