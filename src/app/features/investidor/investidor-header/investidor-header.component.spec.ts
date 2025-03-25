import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvestidorHeaderComponent } from './investidor-header.component';

describe('InvestidorHeaderComponent', () => {
  let component: InvestidorHeaderComponent;
  let fixture: ComponentFixture<InvestidorHeaderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InvestidorHeaderComponent]
    });
    fixture = TestBed.createComponent(InvestidorHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
