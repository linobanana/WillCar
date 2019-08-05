import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoRouteComponent } from './info-route.component';

describe('InfoRouteComponent', () => {
  let component: InfoRouteComponent;
  let fixture: ComponentFixture<InfoRouteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfoRouteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoRouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
