import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBeanComponent } from './add-bean.component';

describe('AddBeanComponent', () => {
  let component: AddBeanComponent;
  let fixture: ComponentFixture<AddBeanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddBeanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddBeanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
