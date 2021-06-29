import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductivadadComponent } from './productivadad.component';

describe('ProductivadadComponent', () => {
  let component: ProductivadadComponent;
  let fixture: ComponentFixture<ProductivadadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductivadadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductivadadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
