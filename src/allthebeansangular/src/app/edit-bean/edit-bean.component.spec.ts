import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditBeanComponent } from './edit-bean.component';

describe('EditBeanComponent', () => {
  let component: EditBeanComponent;
  let fixture: ComponentFixture<EditBeanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditBeanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditBeanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
