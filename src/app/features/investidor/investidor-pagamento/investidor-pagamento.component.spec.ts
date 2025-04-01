import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvestidorPagamentoComponent } from './investidor-pagamento.component';

describe('InvestidorPagamentoComponent', () => {
  let component: InvestidorPagamentoComponent;
  let fixture: ComponentFixture<InvestidorPagamentoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InvestidorPagamentoComponent]
    });
    fixture = TestBed.createComponent(InvestidorPagamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
