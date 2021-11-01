import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralConfirmacionComponent } from './general-confirmacion.component';

describe('GeneralConfirmacionComponent', () => {
  let component: GeneralConfirmacionComponent;
  let fixture: ComponentFixture<GeneralConfirmacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GeneralConfirmacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneralConfirmacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
