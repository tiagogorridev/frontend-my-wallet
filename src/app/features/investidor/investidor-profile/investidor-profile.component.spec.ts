import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvestidorProfileComponent } from './investidor-profile.component';

describe('InvestidorProfileComponent', () => {
  let component: InvestidorProfileComponent;
  let fixture: ComponentFixture<InvestidorProfileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InvestidorProfileComponent]
    });
    fixture = TestBed.createComponent(InvestidorProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
