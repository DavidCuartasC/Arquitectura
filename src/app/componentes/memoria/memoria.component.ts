import { Component } from '@angular/core';
import { Variables } from '../../modelos/variables';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-memoria',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './memoria.component.html',
  styleUrl: './memoria.component.css'
})
export class MemoriaComponent {
  memoriaDatos: number[] = new Array(8).fill(0);
  variables = Object.keys(Variables).filter(key => isNaN(Number(key)));


}
