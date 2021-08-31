import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAddRoleUserComponent } from './dialog-add-role-user.component';

describe('DialogAddRoleUserComponent', () => {
  let component: DialogAddRoleUserComponent;
  let fixture: ComponentFixture<DialogAddRoleUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogAddRoleUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogAddRoleUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
