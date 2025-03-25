import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarteiraLancamentosComponent } from './carteira-lancamentos.component';

describe('CarteiraLancamentosComponent', () => {
  let component: CarteiraLancamentosComponent;
  let fixture: ComponentFixture<CarteiraLancamentosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CarteiraLancamentosComponent]
    });
    fixture = TestBed.createComponent(CarteiraLancamentosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
