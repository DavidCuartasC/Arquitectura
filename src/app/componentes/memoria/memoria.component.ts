import { Component } from '@angular/core';
import { Variables } from '../../modelos/variables';
import { CommonModule } from '@angular/common';
import { MARMBRService } from '../mar-mbr.service';

@Component({
  selector: 'app-memoria',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './memoria.component.html',
  styleUrl: './memoria.component.css'
})
export class MemoriaComponent {
  memoriaDatos: number[] = new Array(20).fill(0);
  public operacionKeys: string[];
  constructor(protected MAR_MBR: MARMBRService) {
    this.operacionKeys = Object.keys(this.MAR_MBR.operacionMap);
  }

  public getIsActive(valor: number): boolean {
    const memo = this.MAR_MBR.memoria;
    if (memo[valor] !== this.memoriaDatos[valor]) {
      this.memoriaDatos[valor] = memo[valor];      
      return true
    } else {      
      return false;
    }
  }

}
