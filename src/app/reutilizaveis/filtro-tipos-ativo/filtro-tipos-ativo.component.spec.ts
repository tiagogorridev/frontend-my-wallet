import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltroTiposAtivoComponent } from './filtro-tipos-ativo.component';

describe('FiltroTiposAtivoComponent', () => {
  let component: FiltroTiposAtivoComponent;
  let fixture: ComponentFixture<FiltroTiposAtivoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FiltroTiposAtivoComponent]
    });
    fixture = TestBed.createComponent(FiltroTiposAtivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
