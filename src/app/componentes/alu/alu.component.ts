import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Operaciones } from '../../modelos/operaciones';
import { Instruccion } from '../../modelos/instruccion';

@Component({
  selector: 'app-alu',
  standalone: true,
  imports: [],
  templateUrl: './alu.component.html',
  styleUrl: './alu.component.css'
})

export class AluComponent {
  private _instruccion!: Instruccion;
  operacion?: Operaciones
  operando1?: number;
  operando2?: number;
  
  @Input()
  set instruccion(value: Instruccion) {
    this._instruccion = value; {
      if(this.instruccion && this.instruccion.operacion && 
        this.instruccion.operando2 && this.instruccion.operando3){
       const resultado =  this.ejecutarOperacion(this.instruccion.operacion, 
        this.instruccion.operando2, this.instruccion.operando3);
        this.respuestaEmmiter.emit(resultado)
      }
  }
}

  @Output() respuestaEmmiter = new EventEmitter<number>();

  get instruccion(): Instruccion {
    return this._instruccion;
  } 

  ejecutarOperacion(
    operacion: Operaciones,
    operando1: number,
    operando2: number
  ): number {
    this.operacion = operacion;
    this.operando1 = operando1;
    this.operando2 = operando2;

    switch (operacion) {
      case Operaciones.ADD:
        return this.sumar(operando1, operando2);
      case Operaciones.SUB:
        return this.restar(operando1, operando2);
      case Operaciones.MUL:
        return this.multiplicar(operando1, operando2);
      case Operaciones.DIV:
        return this.dividir(operando1, operando2);
      case Operaciones.INC:
        return this.incrementar(operando1);
      case Operaciones.NOT:
        return this.negar(operando1)
      case Operaciones.AND:
        return this.conjuncion(operando1, operando2);
      case Operaciones.OR:
        return this.disyuncion(operando1, operando2);
      case Operaciones.CMP:
        return this.comparar(operando1, operando2);
      default:
        return 0;
    }
  }

  private sumar(operando1: number, operando2: number): number {
    return operando1 + operando2;
  }

  private restar(operando1: number, operando2: number): number {
    return operando1 - operando2;
  }

  private multiplicar(operando1: number, operando2: number): number {
    return operando1 * operando2;
  }

  private dividir(operando1: number, operando2: number): number {
    if (operando2 !== 0) {
      return operando1 / operando2;
    } else {
      return 0;
    }
  }

  private incrementar(operando1: number): number {
    if (operando1 == undefined || operando1 == null || operando1 == 0) {
      operando1 = 1;
    }
    return operando1 ++;
  }
  
  private negar(operando1: number): number {
    if (operando1 == 0) {
      return 1;
    } else if (operando1 == 1) {
      return 0;
    } else {
      return operando1 * -1;
    }
  }

  private conjuncion(operando1: number, operando2: number): number {
    if (operando1 == 1 && operando2 == 1) {
      return 1;
    } else {
      return 0;
    }
  }

  private disyuncion(operando1: number, operando2: number): number {
    if (operando1 == 0 && operando2 == 0) {
      return 0;
    } else {
      return 1;
    }
  }

  private comparar(operando1: number, operando2: number): number {
    if (operando1 == operando2) {
      return 0;
    } else if (operando1 > operando2) {
      return 1;
    } else {
      return -1;
    }
  }
}