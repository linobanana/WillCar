import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainEditComponent } from './main-edit.component';

describe('MainEditComponent', () => {
  let component: MainEditComponent;
  let fixture: ComponentFixture<MainEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
