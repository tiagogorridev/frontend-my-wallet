import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarteiraAnaliseComponent } from './carteira-analise.component';

describe('CarteiraAnaliseComponent', () => {
  let component: CarteiraAnaliseComponent;
  let fixture: ComponentFixture<CarteiraAnaliseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CarteiraAnaliseComponent]
    });
    fixture = TestBed.createComponent(CarteiraAnaliseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
