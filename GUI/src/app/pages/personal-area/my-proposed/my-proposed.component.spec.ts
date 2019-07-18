import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyProposedComponent } from './my-proposed.component';

describe('MyProposedComponent', () => {
  let component: MyProposedComponent;
  let fixture: ComponentFixture<MyProposedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyProposedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyProposedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
