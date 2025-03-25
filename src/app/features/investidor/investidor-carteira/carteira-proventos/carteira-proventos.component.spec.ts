import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarteiraProventosComponent } from './carteira-proventos.component';

describe('CarteiraProventosComponent', () => {
  let component: CarteiraProventosComponent;
  let fixture: ComponentFixture<CarteiraProventosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CarteiraProventosComponent]
    });
    fixture = TestBed.createComponent(CarteiraProventosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
