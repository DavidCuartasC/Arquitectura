import { Operaciones } from "./operaciones";

export interface Instruccion {
    operacion: Operaciones,
    operando1: number,
    operando2?: number,
    operando3?: number,
    textoInstruccion: string
}