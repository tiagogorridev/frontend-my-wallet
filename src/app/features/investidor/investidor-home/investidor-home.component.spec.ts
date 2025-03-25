import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvestidorHomeComponent } from './investidor-home.component';

describe('InvestidorHomeComponent', () => {
  let component: InvestidorHomeComponent;
  let fixture: ComponentFixture<InvestidorHomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InvestidorHomeComponent]
    });
    fixture = TestBed.createComponent(InvestidorHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
