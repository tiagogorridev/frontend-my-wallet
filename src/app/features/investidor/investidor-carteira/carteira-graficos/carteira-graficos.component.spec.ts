import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarteiraGraficosComponent } from './carteira-graficos.component';

describe('CarteiraGraficosComponent', () => {
  let component: CarteiraGraficosComponent;
  let fixture: ComponentFixture<CarteiraGraficosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CarteiraGraficosComponent]
    });
    fixture = TestBed.createComponent(CarteiraGraficosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
