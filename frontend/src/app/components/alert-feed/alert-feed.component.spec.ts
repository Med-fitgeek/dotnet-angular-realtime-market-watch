import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertFeedComponent } from './alert-feed.component';

describe('AlertFeedComponent', () => {
  let component: AlertFeedComponent;
  let fixture: ComponentFixture<AlertFeedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlertFeedComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AlertFeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
