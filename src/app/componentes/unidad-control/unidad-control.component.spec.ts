import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnidadControlComponent } from './unidad-control.component';

describe('UnidadControlComponent', () => {
  let component: UnidadControlComponent;
  let fixture: ComponentFixture<UnidadControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UnidadControlComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UnidadControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
