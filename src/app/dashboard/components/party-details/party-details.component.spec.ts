import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartyDetailsComponent } from './party-details.component';

describe('PartyDetailsComponent', () => {
  let component: PartyDetailsComponent;
  let fixture: ComponentFixture<PartyDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PartyDetailsComponent]
    });
    fixture = TestBed.createComponent(PartyDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
