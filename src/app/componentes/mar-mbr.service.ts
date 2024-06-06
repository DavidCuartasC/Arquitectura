import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MARMBRService {
  public memoria: number[] = new Array(20).fill(0);
  public pideInstruccion = false;

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
    this.pideInstruccion = true
    await new Promise(resolve => setTimeout(resolve, 1000));
    this.pideInstruccion = false;
    if (operacion in this.operacionMap) {
      return this.operacionMap[operacion];
    } else {
      throw new Error("No conozco de eso");
    }

  }

  public getDato(direccion: number): number {
    return this.memoria[direccion];
  }

  public setDato(direccion: number, dato: number) {
    this.memoria[direccion] = dato;
  }
}
