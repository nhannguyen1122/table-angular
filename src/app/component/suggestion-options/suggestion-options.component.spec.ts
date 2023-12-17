import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuggestionOptionsComponent } from './suggestion-options.component';

describe('SuggestionOptionsComponent', () => {
  let component: SuggestionOptionsComponent;
  let fixture: ComponentFixture<SuggestionOptionsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SuggestionOptionsComponent]
    });
    fixture = TestBed.createComponent(SuggestionOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
