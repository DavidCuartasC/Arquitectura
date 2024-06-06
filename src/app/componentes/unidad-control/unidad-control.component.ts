import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { AluService } from '../alu.service';
import { MARMBRService } from '../mar-mbr.service';
import { RvuService } from '../rvu.service';

@Component({
  selector: 'app-unidad-control',
  standalone: true,
  templateUrl: './unidad-control.component.html',
  styleUrl: './unidad-control.component.css',
  imports: [CommonModule]
})
export class UnidadControlComponent {
  public PC: number = 0;
  public IR: number = 0;
  public datos = [0, 0];
  loop: string[][] = [];
  flag: number = -1;
  componentes = Componentes;
  componentesActivo: boolean[] = new Array(11).fill(false);

  private _instrucciones: string[] = [];

  instruccionesCodificadas: string[][] = [];
  variableMap: string[];

  @Input()
  set instrucciones(value: string[]) {
    this._instrucciones = value;
    if (value.length > 0) {
      this.codificarInstruccion(value);
    }
  }

  constructor(protected MAR_MBR: MARMBRService,
    protected Alu: AluService,
    protected RVU: RvuService) {
    this.variableMap = Object.keys(this.RVU.variableMap);
    this.componentesActivo[Componentes.UC] = true;
  }

  get instrucciones(): string[] {
    return this._instrucciones;
  }

  codificarInstruccion(instruccionArray: string[]) {
    instruccionArray.forEach(i => {
      const instruccion = i.toUpperCase().trim().split(" ");
      this.instruccionesCodificadas.push(instruccion);
    });

    for (let i = 0; i < this.instruccionesCodificadas.length; i++) {
      const aux = this.instruccionesCodificadas[i];
      if (!(aux[0] in this.MAR_MBR.operacionMap) && aux[0] !== " ") {
        this.loop.push([aux[0], i.toString()]);
      }
    }

    this.ejecutar();

  }

  public async actualizarComponente(valor: number) {
    let time = 0;
    if (valor == Componentes.MAR || valor == Componentes.MBR || valor == Componentes.BusControl
      || valor == Componentes.BusDatos || valor == Componentes.BusDirecciones) {
      time = 0;
    }
    await new Promise(resolve => setTimeout(resolve, time));
    this.componentesActivo.fill(false);
    this.componentesActivo[valor] = true;
  }

  private processInput(input: string): string {
    const match = input.match(/([0-9]+|[A-Za-z])/);
    if (match) {
      return match[0];
    } else {
      throw new Error("No je que es eso");
    }
  }

  private hasBrakets(input: string): boolean {
    return input.startsWith('[') && input.endsWith(']');
  }

  private async ejecutar() {
    for (let index = 0; index < this.instruccionesCodificadas.length; index++) {
      await this.actualizarComponente(Componentes.UC);
      await this.actualizarComponente(Componentes.PC);
      this.PC = index;

      if (this.loop.find(f => Number(f[1]) == index)) {
        continue;
      }

      let seGuardaEnVariable = false;
      let direccion = 0;
      this.datos = [0, 0];
      const codificada = this.instruccionesCodificadas[index];
      let n = codificada[3] ? 3 : codificada[2] ? 2 : 1;


      await this.actualizarComponente(Componentes.MAR);
      await this.actualizarComponente(Componentes.MBR);
      await this.actualizarComponente(Componentes.IR);
      this.IR = await this.MAR_MBR.getIntruccion(codificada[0]);

      if (this.IR === 1010 || this.IR === 1011) {
        if (this.flag === 0 && this.IR === 1010) {
          const salto = this.loop.find(f => f[0] === codificada[1]);
          if (salto) {
            index = Number(salto[1]);
            continue;
          } else {
            throw new Error(" Ese salto no existe")
          }
        } else if (this.IR === 1011 && this.flag !== 0) {
          const salto = this.loop.find(f => f[0] === codificada[1]);
          if (salto) {
            index = Number(salto[1]);
            continue;
          } else {
            throw new Error(" Ese salto no existe")
          }
        }
      }

      if (this.IR != 1001 && this.IR !== 1010 && this.IR !== 1011 && this.hasBrakets(codificada[1])) {
        const input = this.processInput(codificada[1]);
        direccion = isNaN(Number(input)) ? this.RVU.getValor(input) : Number(input);
      } else if (isNaN(Number(codificada[1])) && this.IR !== 1001 && this.IR !== 1010 && this.IR !== 1011) {
        seGuardaEnVariable = true;
        direccion = this.RVU.getDireccion(codificada[1]);
      }

      if (this.IR === 1001) {
        codificada[3] = codificada[2];
        codificada[2] = codificada[1];
        n = n === 3 ? n : n + 1;
      }

      for (let i = 2; i <= n; i++) {
        if (this.IR !== 1010 && this.IR !== 1011 && this.hasBrakets(codificada[i])) {
          const input = this.processInput(codificada[i]);
          this.datos[i - 2] = isNaN(Number(input)) ? this.MAR_MBR.getDato(this.RVU.getValor(input)) :
            this.MAR_MBR.getDato(Number(input));
        } else if (this.IR !== 1010 && this.IR !== 1011) {
          this.datos[i - 2] = isNaN(Number(codificada[i])) ? this.RVU.getValor(codificada[i]) : Number(codificada[i]);
        }
      }

      if (this.IR === 1001) {
        await this.actualizarComponente(Componentes.ALU);
        this.flag = this.Alu.ejecutarOperacion(this.IR, this.datos[0], this.datos[1]);
        let s = this.flag
      } else {
        this.ejecutarInstruccion(direccion, seGuardaEnVariable);
      }
    }
  }

  private async ejecutarInstruccion(direccion: number, seGuardaEnVariable: boolean) {
    if (this.IR === 100) {
      if (seGuardaEnVariable) {
        await this.actualizarComponente(Componentes.RVU);
        this.RVU.setDato(direccion, this.datos[0]);
      } else {
        this.MAR_MBR.setDato(direccion, this.datos[0]);
      }
    } else {
      await this.actualizarComponente(Componentes.ALU);
      const res = this.Alu.ejecutarOperacion(this.IR, this.datos[0], this.datos[1]);
      if (seGuardaEnVariable) {
        await this.actualizarComponente(Componentes.RVU);
        this.RVU.setDato(direccion, res);
      } else {
        this.MAR_MBR.setDato(direccion, res);
      }

    }
  }

}

export enum Componentes {
  UC,
  PC,
  MAR,
  BusDatos,
  BusControl,
  BusDirecciones,
  MemoriaDatos,
  MemoriaInstrucciones,
  MBR,
  IR,
  ALU,
  RVU,
}