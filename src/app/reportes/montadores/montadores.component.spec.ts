import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MontadoresComponent } from './montadores.component';

describe('MontadoresComponent', () => {
  let component: MontadoresComponent;
  let fixture: ComponentFixture<MontadoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MontadoresComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MontadoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
