import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AskDetailsComponent } from './ask-details.component';

describe('AskDetailsComponent', () => {
  let component: AskDetailsComponent;
  let fixture: ComponentFixture<AskDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AskDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AskDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
