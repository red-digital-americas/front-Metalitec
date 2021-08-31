import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogGeneralConfirmationComponent } from './dialog-general-confirmation.component';

describe('DialogGeneralConfirmationComponent', () => {
  let component: DialogGeneralConfirmationComponent;
  let fixture: ComponentFixture<DialogGeneralConfirmationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogGeneralConfirmationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogGeneralConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
