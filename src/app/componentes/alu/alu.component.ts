import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Operaciones } from '../../modelos/operaciones';
import { Instruccion } from '../../modelos/instruccion';
import { MemoriaService } from '../memoria.service';
import { Variables } from '../../modelos/variables';
import { MARMBRService } from '../mar-mbr.service';
import { AluService } from '../alu.service';

@Component({
  selector: 'app-alu',
  standalone: true,
  imports: [],
  templateUrl: './alu.component.html',
  styleUrl: './alu.component.css'
})

export class AluComponent {
  
  constructor(protected alu: AluService) {
  }


}
