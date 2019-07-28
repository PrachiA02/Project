import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewLiveScoreComponent } from './view-live-score.component';

describe('ViewLiveScoreComponent', () => {
  let component: ViewLiveScoreComponent;
  let fixture: ComponentFixture<ViewLiveScoreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewLiveScoreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewLiveScoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
