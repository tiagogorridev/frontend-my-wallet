import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltroDataComponent } from './filtro-data.component';

describe('FiltroDataComponent', () => {
  let component: FiltroDataComponent;
  let fixture: ComponentFixture<FiltroDataComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FiltroDataComponent]
    });
    fixture = TestBed.createComponent(FiltroDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
