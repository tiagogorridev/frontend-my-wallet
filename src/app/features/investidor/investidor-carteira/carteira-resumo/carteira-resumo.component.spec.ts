import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarteiraResumoComponent } from './carteira-resumo.component';

describe('CarteiraResumoComponent', () => {
  let component: CarteiraResumoComponent;
  let fixture: ComponentFixture<CarteiraResumoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CarteiraResumoComponent]
    });
    fixture = TestBed.createComponent(CarteiraResumoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
