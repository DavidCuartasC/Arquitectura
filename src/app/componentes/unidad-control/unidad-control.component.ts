import { Component, Input } from '@angular/core';
import { Instruccion } from '../../modelos/instruccion';
import { AluService } from '../alu.service';
import { AluComponent } from "../alu/alu.component";
import { MARMBRService } from '../mar-mbr.service';
import { CommonModule } from '@angular/common';
import { Variables } from '../../modelos/variables';

@Component({
  selector: 'app-unidad-control',
  standalone: true,
  templateUrl: './unidad-control.component.html',
  styleUrl: './unidad-control.component.css',
  imports: [AluComponent, CommonModule]
})
export class UnidadControlComponent {
  public PC: number = 0;
  public IR: number = 0;
  public RVU: number[] = [0, 0, 0]
  componentes = Componentes;
  componentesActivo: boolean[] = new Array(11).fill(false);

  private _instrucciones: string[] = [];

  instruccionesCodificadas: string[][] = [];

  @Input()
  set instrucciones(value: string[]) {
    this._instrucciones = value;
    if (value.length > 0) {
      this.codificarInstruccion(value);
    }
  }

  constructor(protected MAR_MBR: MARMBRService, protected Alu: AluService) {
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
    this.ejecutar();
  }


  public async actualizarComponente(valor: number) {
    await new Promise(resolve => setTimeout(resolve, 1000));
    this.componentesActivo.fill(false);
    this.componentesActivo[valor] = true;
  }


  private async ejecutar() {
    for (let index = 0; index < this.instruccionesCodificadas.length; index++) {
      await this.actualizarComponente(Componentes.UC);
      await this.actualizarComponente(Componentes.PC);
      this.PC = index;
      const codificada = this.instruccionesCodificadas[index];
      await this.actualizarComponente(Componentes.MAR);
      await this.actualizarComponente(Componentes.MBR);
      await this.actualizarComponente(Componentes.BusDirecciones);
      await this.actualizarComponente(Componentes.BusControl);
      await this.actualizarComponente(Componentes.IR);
      this.IR = await this.MAR_MBR.getIntruccion(codificada[0]);
      const direccion = await this.MAR_MBR.getDireccion(codificada[1]);
      this.RVU[0] = await this.MAR_MBR.getDato(codificada[2]);
      this.RVU[1] = codificada[3] ? await this.MAR_MBR.getDato(codificada[3]) : 0;

      if (this.IR === 100) {
        await this.MAR_MBR.setDato(direccion, this.RVU[0]);
      } else {
        const res = this.Alu.ejecutarOperacion(this.IR, this.RVU[0], this.RVU[1]);
        await this.actualizarComponente(Componentes.ALU);
        await this.MAR_MBR.setDato(direccion, res);
      }
    }
  }

  processInput(input: string): string {
    const match = input.match(/([0-9]+|[A-Za-z])/);
    if (match) {
      return match[0];
    } else {
      throw new Error("No je que es eso");
    }
  }

}

export interface RVU {
  A:number

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