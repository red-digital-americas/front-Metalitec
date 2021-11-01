import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogGeneralMessageComponent } from './dialog-general-message.component';

describe('DialogGeneralMessageComponent', () => {
  let component: DialogGeneralMessageComponent;
  let fixture: ComponentFixture<DialogGeneralMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogGeneralMessageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogGeneralMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
