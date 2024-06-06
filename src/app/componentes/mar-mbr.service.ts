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

  public getDato(direccion: number): number {
    return this.memoria[direccion];
  }

  public async setDato(direccion: number, dato: number) {
    await new Promise(resolve => setTimeout(resolve, 1000));
    this.memoria[direccion] = dato;
  }
}
