import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdicionarAtivoComponent } from './adicionar-ativo.component';

describe('AdicionarAtivoComponent', () => {
  let component: AdicionarAtivoComponent;
  let fixture: ComponentFixture<AdicionarAtivoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdicionarAtivoComponent]
    });
    fixture = TestBed.createComponent(AdicionarAtivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
