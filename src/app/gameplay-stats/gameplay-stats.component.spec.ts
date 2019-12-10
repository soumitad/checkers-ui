import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameplayStatsComponent } from './gameplay-stats.component';

describe('GameplayStatsComponent', () => {
  let component: GameplayStatsComponent;
  let fixture: ComponentFixture<GameplayStatsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GameplayStatsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameplayStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
