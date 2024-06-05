import { Operaciones } from "./operaciones";
import { Variables } from "./variables";

export interface Instruccion {
    instruccion: number,
    direccion: number,
    dato1: number,
    dato2?: number
}