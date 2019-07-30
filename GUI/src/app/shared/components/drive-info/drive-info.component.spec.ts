import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DriveInfoComponent } from './drive-info.component';

describe('DriveInfoComponent', () => {
  let component: DriveInfoComponent;
  let fixture: ComponentFixture<DriveInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DriveInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DriveInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
