import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Instruccion } from '../../modelos/instruccion';
import { Operaciones } from '../../modelos/operaciones';
import { Variables } from '../../modelos/variables';

@Component({
  selector: 'app-unidad-control',
  standalone: true,
  imports: [],
  templateUrl: './unidad-control.component.html',
  styleUrl: './unidad-control.component.css'
})
export class UnidadControlComponent {
  private _instrucciones: string[] = [];
  // Elementos de la interfaz
  instruccionesIntroducidas: string = '';
  //elementoActivo: ElementoProcesador;
  //estadoComputador: EstadoComputador;
 
  // Elementos del procesador
  PC: number = 0;
  MAR: number = 0;
  MBR: Instruccion | undefined;
  IR: Instruccion | undefined;
  //almacenGeneral: AlmacenGeneral = new AlmacenGeneral();
  //output: number | string = '';

  instruccines: Array<Instruccion> = new Array<Instruccion>();

  @Input()
  set instrucciones(value: string[]) {
    this._instrucciones = value;
    if (this._instrucciones.length > 0) {
      this.agregarInstruccion(this._instrucciones);
      this.ejecutar();
    }
  }

  @Output() instruccionEmitter = new EventEmitter<Instruccion>();

  get instrucciones(): string[] {
    return this._instrucciones;
  }
 /** constructor(
    private ejecutarTareaService: EjecutarTareaService
    ) {
    //this.estadoComputador = EstadoComputador.SIN_INICIAR;
    //this.elementoActivo = ElementoProcesador.UNIDAD_CONTROL;
  }

*/ 
  private hayLineaPorEjecutar() {
    return this.PC < this.instruccines.length;
  }



  agregarInstruccion(instruccionArray: string[]) {
    instruccionArray.forEach(i => {
      const instruccion = this.descomponerInstruccion(i);
      this.instruccines.push(instruccion);
    });
  }

  descomponerInstruccion(instruccion: string): Instruccion {
    let instruccionArray = instruccion.split(" ");

    const instruccionCodificada = {
      operacion: this.obtenerOperacion(instruccionArray[0]),
      operando1: this.obtenerOperando(instruccionArray[1]),
      operando2: this.obtenerOperando(instruccionArray[2]),
      operando3: this.obtenerOperando(instruccionArray[3]),
    } as Instruccion;
    return instruccionCodificada;
  }  

  obtenerOperacion(operacion: string): Operaciones | undefined {
   
    const operacionMap: { [key: string]: Operaciones } = {
      "MUL": Operaciones.MUL,
      "ADD": Operaciones.ADD,
      "SUB": Operaciones.SUB,
      "DIV": Operaciones.DIV,
      "MOVE": Operaciones.MOVE,
      "INC": Operaciones.INC,
      "NOT": Operaciones.NOT,
      "AND": Operaciones.AND,
      "OR": Operaciones.OR,
      "CMP": Operaciones.CMP,
      "JMP": Operaciones.JMP,
      "JNE": Operaciones.JNE,
      "IN": Operaciones.IN
    };
    
    const upperCaseOperacion = operacion.toUpperCase();

    if (upperCaseOperacion in operacionMap) {
      return operacionMap[upperCaseOperacion];
    }
      return undefined;
  }

  obtenerOperando(operando: string): number | Variables | undefined{
    if (!operando) {
      return undefined;
    }
    if (operando in Variables) {
      
    }
  
    const variableMap: { [key: string]: Variables } = {
      "A": Variables.A,
      "B": Variables.B,
      "C": Variables.C,
      "D": Variables.D,
      "E": Variables.E,
      "F": Variables.F,
      "G": Variables.G,
      "H": Variables.H
    };
  
    const upperCaseOperando = operando.toUpperCase();
  
    if (upperCaseOperando in variableMap) {
      return variableMap[upperCaseOperando];
    }

    const num = Number(operando);
    return isNaN(num) ? undefined : num;
  }

  private async ejecutar(): Promise<void> {
    this.instruccines.forEach(i=>{
      setTimeout(()=>{
        this.instruccionEmitter.emit(i);
      },1000);        
    })
  }

  //Flujo de captacion de instrucciones	
/** 
  private async ejecutarInstruccionesGuardadas() {
    await this.ejecutarTareaService.ejecutarTarea(() => {
      //this.elementoActivo = ElementoProcesador.PC;
    })
    await this.ejecutarTareaService.ejecutarTarea(() => {
      //this.elementoActivo = ElementoProcesador.MAR;
    })
    await this.ejecutarTareaService.ejecutarTarea(() => {
      this.MAR = this.PC;
    })
    await this.ejecutarTareaService.ejecutarTarea(() => {
      //this.elementoActivo = ElementoProcesador.BUS_CONTROL;
    })
    await this.ejecutarTareaService.ejecutarTarea(() => {
      //this.elementoActivo = ElementoProcesador.BUS_DIRECCIONES;
    })
    await this.ejecutarTareaService.ejecutarTarea(() => {
      //this.elementoActivo = ElementoProcesador.MEMORIA;
    })
    await this.ejecutarTareaService.ejecutarTarea(() => {
      //this.elementoActivo = ElementoProcesador.BUS_DATOS;
    })
    await this.ejecutarTareaService.ejecutarTarea(() => {
      //this.elementoActivo = ElementoProcesador.MBR;
    })
    await this.ejecutarTareaService.ejecutarTarea(() => {
      //this.MBR = this.memoria.obtenerInstruccion(this.PC);
    })
    await this.ejecutarTareaService.ejecutarTarea(() => {
      //this.elementoActivo = ElementoProcesador.IR;
    })
    await this.ejecutarTareaService.ejecutarTarea(() => {
      this.IR = this.MBR;
    })
    await this.ejecutarTareaService.ejecutarTarea(() => {
      //this.elementoActivo = ElementoProcesador.UNIDAD_CONTROL;
    })
    await this.ejecutarTareaService.ejecutarTarea(async () => {
      //await this.ejecutarInstruccion();
    })
    await this.ejecutarTareaService.ejecutarTarea(() => {
      //this.elementoActivo = ElementoProcesador.UNIDAD_CONTROL;
    })
    if (this.hayLineaPorEjecutar()) {
      this.PC++;
      this.ejecutarInstruccionesGuardadas();
    }else{
      //this.estadoComputador = EstadoComputador.FINALIZADO;
    }
  }

 

  private async ejecutarInstruccion(): Promise<void> {
    if (this.IR == undefined) {
      return;
    }

    const operacion = this.IR.operacion;
    const operando1: number | Variables | undefined = this.IR.operando1;
    const operando2: number | Variables | undefined = this.IR.operando2;
    const operando3: number | Variables | undefined = this.IR.operando3;
    switch (operacion) {
      case Operaciones.LOAD:
        await this.ejecutarInstruccionLoad(operando1, operando2);
        break;
      case Operaciones.ADD:
        await this.ejecutarInstruccionMatematica(Operaciones.ADD, operando1, operando2, operando3);
        break;
      case Operaciones.SUB:
        await this.ejecutarInstruccionMatematica(Operaciones.SUB, operando1, operando2, operando3);
        break;
      case Operaciones.MUL:
        await this.ejecutarInstruccionMatematica(Operaciones.MUL, operando1, operando2, operando3);
        break;
      case Operaciones.DIV:
        await this.ejecutarInstruccionMatematica(Operaciones.DIV, operando1, operando2, operando3);
        break;
      case Operaciones.MOVE:
        await this.ejecutarInstruccionMove(operando1, operando2);
        break;
      case Operaciones.INC:
        await this.ejecutarInstruccionInc(operando1, operando2);
        break;
      case Operaciones.NOT:
        await this.ejecutarInstruccionNot(operando1);
        break;
      case Operaciones.AND:
        await this.ejecutarInstruccionMatematica(Operaciones.AND, operando1, operando2, operando3);
        break;
      case Operaciones.OR:
        await this.ejecutarInstruccionMatematica(Operaciones.OR, operando1, operando2, operando3);
        break;
      case Operaciones.HALT:
        this.PC = this.memoria.celdas.length;
        this.MAR = this.PC;
        break;
      case Operaciones.OUT:
        this.output = this.obtenerValorAlmacenGeneral(operando1);
        break;
      case Operaciones.CMP:
        await this.ejecutarInstruccionMatematica(Operaciones.CMP, operando1, operando2, operando3);
        break;
      default:
        break;
    }
  }

  // Ejecucion de instrucciones
  // Cargar
  private async ejecutarInstruccionLoad(variableAGuardar: number | Variables | undefined, numero: number | Variables | undefined): Promise<void> {
    if (variableAGuardar == undefined || numero == undefined) {
      return;
    }
    await this.ejecutarTareaService.ejecutarTarea(() => {
      //this.elementoActivo = ElementoProcesador.ALMACEN_GENERAL;
    })
    await this.ejecutarTareaService.ejecutarTarea(() => {
      switch(variableAGuardar) {
        case Variables.A:
          this.almacenGeneral.A = numero;
          break;
        case Variables.B:
          this.almacenGeneral.B = numero;
          break;
        case Variables.C:
          this.almacenGeneral.C = numero;
          break;
        case Variables.D:
          this.almacenGeneral.D = numero;
          break;
        case Variables.E:
          this.almacenGeneral.E = numero;
          break;
        case Variables.F:
          this.almacenGeneral.F = numero;
          break;
        case Variables.G:
          this.almacenGeneral.G = numero;
          break;
        case Variables.H:
          this.almacenGeneral.H = numero;
          break;
        default:
          break;
      }
    })
  }

    //Matematicas
    private async ejecutarInstruccionMatematica(tipoOperacion: Operaciones, primeraVariable: number | Variables | undefined, segundaVariable: number | Variables | undefined, variableDestino: number | Variables | undefined): Promise<void> {
      if (primeraVariable == undefined || segundaVariable == undefined) {
        return;
      }
      switch(variableDestino) {
        case Variables.A:
          this.almacenGeneral.A = await this.ejecutarOperacionALU(tipoOperacion, primeraVariable, segundaVariable);
          break;
        case Variables.B:
          this.almacenGeneral.B = await this.ejecutarOperacionALU(tipoOperacion, primeraVariable, segundaVariable);
          break;
        case Variables.C:
          this.almacenGeneral.C = await this.ejecutarOperacionALU(tipoOperacion, primeraVariable, segundaVariable);
          break;
        case Variables.D:
          this.almacenGeneral.D = await this.ejecutarOperacionALU(tipoOperacion, primeraVariable, segundaVariable);
          break;
        case Variables.E:
          this.almacenGeneral.E = await this.ejecutarOperacionALU(tipoOperacion, primeraVariable, segundaVariable);
          break;
        case Variables.F:
          this.almacenGeneral.F = await this.ejecutarOperacionALU(tipoOperacion, primeraVariable, segundaVariable);
          break;
        case Variables.G:
          this.almacenGeneral.G = await this.ejecutarOperacionALU(tipoOperacion, primeraVariable, segundaVariable);
          break;
        case Variables.H:
          this.almacenGeneral.H = await this.ejecutarOperacionALU(tipoOperacion, primeraVariable, segundaVariable);
          break;
        default:
          break;
      }
    }

  
    //Mover
    private async ejecutarInstruccionMove(variableOrigen: number | Variables | undefined, variableDestino: number | Variables | undefined): Promise<void> {
      if (variableOrigen == undefined || variableDestino == undefined) {
        return;
      }
      await this.ejecutarTareaService.ejecutarTarea(() => {
        this.elementoActivo = ElementoProcesador.ALMACEN_GENERAL;
      })
      switch(variableDestino) {
        case Variables.A:
          this.almacenGeneral.A = this.obtenerValorAlmacenGeneral(variableOrigen);
          break;
        case Variables.B:
          this.almacenGeneral.B = this.obtenerValorAlmacenGeneral(variableOrigen);
          break;
        case Variables.C:
          this.almacenGeneral.C = this.obtenerValorAlmacenGeneral(variableOrigen);
          break;
        case Variables.D:
          this.almacenGeneral.D = this.obtenerValorAlmacenGeneral(variableOrigen);
          break;
        case Variables.E:
          this.almacenGeneral.E = this.obtenerValorAlmacenGeneral(variableOrigen);
          break;
        case Variables.F:
          this.almacenGeneral.F = this.obtenerValorAlmacenGeneral(variableOrigen);
          break;
        case Variables.G:
          this.almacenGeneral.G = this.obtenerValorAlmacenGeneral(variableOrigen);
          break;
        case Variables.H:
          this.almacenGeneral.H = this.obtenerValorAlmacenGeneral(variableOrigen);
          break;
        default:
          break;
      }
    }

  //Incrementar
  private async ejecutarInstruccionInc(variableOrigen: Variables | undefined, numero: number | Variables | undefined): Promise<void> {
    if (variableOrigen == undefined) {
      return;
    }
    await this.ejecutarTareaService.ejecutarTarea(() => {
      this.elementoActivo = ElementoProcesador.ALMACEN_GENERAL;
    })
    switch(variableOrigen) {
      case Variables.A:
        this.almacenGeneral.A = await this.ejecutarOperacionALUInc(Operaciones.INC, this.almacenGeneral.A, numero);
        break;
      case Variables.B:
        this.almacenGeneral.B = await this.ejecutarOperacionALUInc(Operaciones.INC, this.almacenGeneral.B, numero);
        break;
      case Variables.C:
        this.almacenGeneral.C = await this.ejecutarOperacionALUInc(Operaciones.INC, this.almacenGeneral.C, numero);
        break;
      case Variables.D:
        this.almacenGeneral.D = await this.ejecutarOperacionALUInc(Operaciones.INC, this.almacenGeneral.D, numero);
        break;
      case Variables.E:
        this.almacenGeneral.E = await this.ejecutarOperacionALUInc(Operaciones.INC, this.almacenGeneral.E, numero);
        break;
      case Variables.F:
        this.almacenGeneral.F = await this.ejecutarOperacionALUInc(Operaciones.INC, this.almacenGeneral.F, numero);
        break;
      case Variables.G:
        this.almacenGeneral.G = await this.ejecutarOperacionALUInc(Operaciones.INC, this.almacenGeneral.G, numero);
        break;
      case Variables.H:
        this.almacenGeneral.H = await this.ejecutarOperacionALUInc(Operaciones.INC, this.almacenGeneral.H, numero);
        break;
      default:
        break;
    }
  }

    //Negar
    private async ejecutarInstruccionNot(variableOrigen: Variables | undefined): Promise<void> {
      if (variableOrigen == undefined) {
        return;
      }
      await this.ejecutarTareaService.ejecutarTarea(() => {
        this.elementoActivo = ElementoProcesador.ALMACEN_GENERAL;
      })
      switch(variableOrigen) {
        case Variables.A:
          this.almacenGeneral.A = await this.ejecutarOperacionALUNot(Operaciones.NOT, this.almacenGeneral.A);
          break;
        case Variables.B:
          this.almacenGeneral.B = await this.ejecutarOperacionALUNot(Operaciones.NOT, this.almacenGeneral.B);
          break;
        case Variables.C:
          this.almacenGeneral.C = await this.ejecutarOperacionALUNot(Operaciones.NOT, this.almacenGeneral.C);
          break;
        case Variables.D:
          this.almacenGeneral.D = await this.ejecutarOperacionALUNot(Operaciones.NOT, this.almacenGeneral.D);
          break;
        case Variables.E:
          this.almacenGeneral.E = await this.ejecutarOperacionALUNot(Operaciones.NOT, this.almacenGeneral.E);
          break;
        case Variables.F:
          this.almacenGeneral.F = await this.ejecutarOperacionALUNot(Operaciones.NOT, this.almacenGeneral.F);
          break;
        case Variables.G:
          this.almacenGeneral.G = await this.ejecutarOperacionALUNot(Operaciones.NOT, this.almacenGeneral.G);
          break;
        case Variables.H:
          this.almacenGeneral.H = await this.ejecutarOperacionALUNot(Operaciones.NOT, this.almacenGeneral.H);
          break;
        default:
          break;
      }
    }

    private obtenerValorAlmacenGeneral(variableAObtener: number | Variables | undefined) {
      if (variableAObtener == undefined) {
        return 0;
      }
      switch(variableAObtener) {
        case Variables.A:
          return this.almacenGeneral.A;
        case Variables.B:
          return this.almacenGeneral.B;
        case Variables.C:
          return this.almacenGeneral.C;
        case Variables.D:
          return this.almacenGeneral.D;
        case Variables.E:
          return this.almacenGeneral.E;
        case Variables.F:
          return this.almacenGeneral.F;
        case Variables.G:
          return this.almacenGeneral.G;
        case Variables.H:
          return this.almacenGeneral.H;
        default:
          return 0;
      }
    }*/
}
