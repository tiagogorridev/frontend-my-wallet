import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminBuscarInvestidoresComponent } from './admin-buscar-investidores.component';

describe('AdminBuscarInvestidoresComponent', () => {
  let component: AdminBuscarInvestidoresComponent;
  let fixture: ComponentFixture<AdminBuscarInvestidoresComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminBuscarInvestidoresComponent]
    });
    fixture = TestBed.createComponent(AdminBuscarInvestidoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
