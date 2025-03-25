import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarteiraConfiguracoesComponent } from './carteira-configuracoes.component';

describe('CarteiraConfiguracoesComponent', () => {
  let component: CarteiraConfiguracoesComponent;
  let fixture: ComponentFixture<CarteiraConfiguracoesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CarteiraConfiguracoesComponent]
    });
    fixture = TestBed.createComponent(CarteiraConfiguracoesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
