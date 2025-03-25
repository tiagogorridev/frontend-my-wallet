import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarteiraMetasComponent } from './carteira-metas.component';

describe('CarteiraMetasComponent', () => {
  let component: CarteiraMetasComponent;
  let fixture: ComponentFixture<CarteiraMetasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CarteiraMetasComponent]
    });
    fixture = TestBed.createComponent(CarteiraMetasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
