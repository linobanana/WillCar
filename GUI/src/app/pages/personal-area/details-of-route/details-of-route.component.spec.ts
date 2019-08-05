import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsOfRouteComponent } from './details-of-route.component';

describe('DetailsOfRouteComponent', () => {
  let component: DetailsOfRouteComponent;
  let fixture: ComponentFixture<DetailsOfRouteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsOfRouteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsOfRouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
